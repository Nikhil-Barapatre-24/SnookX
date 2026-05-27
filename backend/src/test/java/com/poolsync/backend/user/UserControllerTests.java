package com.poolsync.backend.user;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.jwt;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.UUID;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.poolsync.backend.user.dto.CreateUserRequest;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class UserControllerTests {

	@Autowired
	private MockMvc mockMvc;

	@Autowired
	private ObjectMapper objectMapper;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private com.poolsync.backend.table.TableRepository tableRepository;

	@Autowired
	private com.poolsync.backend.table.TableSessionRepository tableSessionRepository;

	@Autowired
	private com.poolsync.backend.finance.FinancialTransactionRepository financialTransactionRepository;

	private UUID ownerId;

	@BeforeEach
	void setUp() throws Exception {
		financialTransactionRepository.deleteAll();
		tableSessionRepository.deleteAll();
		tableRepository.deleteAll();
		userRepository.deleteAll();

		User owner = new User(
				"Nikhil Barapatre",
				"nikhilbarapatre786@gmail.com",
				null,
				passwordEncoder.encode("Pass@1234"),
				UserRole.OWNER);
		owner = userRepository.save(owner);
		ownerId = owner.getId();
	}

	@Test
	void createUser_asOwner_returnsCreated() throws Exception {
		CreateUserRequest request = new CreateUserRequest(
				"John Doe",
				"john.doe@example.com",
				"9876543210",
				"Password@123");

		mockMvc.perform(post("/api/users")
				.with(jwt().jwt(j -> j.subject(ownerId.toString())).authorities(new SimpleGrantedAuthority("ROLE_OWNER")))
				.contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(request)))
				.andExpect(status().isCreated())
				.andExpect(jsonPath("$.id").exists())
				.andExpect(jsonPath("$.fullName").value("John Doe"))
				.andExpect(jsonPath("$.email").value("john.doe@example.com"))
				.andExpect(jsonPath("$.phone").value("9876543210"))
				.andExpect(jsonPath("$.role").value("USER"))
				.andExpect(jsonPath("$.verified").value(false))
				.andExpect(jsonPath("$.active").value(true));
	}

	@Test
	void createUser_asUser_returnsForbidden() throws Exception {
		// First create a regular user
		final User regularUser = new User(
				"Regular User",
				"regular@example.com",
				null,
				passwordEncoder.encode("Pass@1234"),
				UserRole.USER);
		userRepository.save(regularUser);

		CreateUserRequest request = new CreateUserRequest(
				"John Doe",
				"john.doe@example.com",
				"9876543210",
				"Password@123");

		mockMvc.perform(post("/api/users")
				.with(jwt().jwt(j -> j.subject(regularUser.getId().toString())).authorities(new SimpleGrantedAuthority("ROLE_USER")))
				.contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(request)))
				.andExpect(status().isForbidden());
	}

	@Test
	void createUser_withDuplicateEmail_returnsConflict() throws Exception {
		// Create first user
		CreateUserRequest firstRequest = new CreateUserRequest(
				"John Doe",
				"john.doe@example.com",
				"9876543210",
				"Password@123");

		mockMvc.perform(post("/api/users")
				.with(jwt().jwt(j -> j.subject(ownerId.toString())).authorities(new SimpleGrantedAuthority("ROLE_OWNER")))
				.contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(firstRequest)))
				.andExpect(status().isCreated());

		// Try to create second user with same email
		CreateUserRequest secondRequest = new CreateUserRequest(
				"Jane Smith",
				"john.doe@example.com",
				"9123456789",
				"Password@123");

		mockMvc.perform(post("/api/users")
				.with(jwt().jwt(j -> j.subject(ownerId.toString())).authorities(new SimpleGrantedAuthority("ROLE_OWNER")))
				.contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(secondRequest)))
				.andExpect(status().isConflict());
	}

	@Test
	void createUser_withDuplicatePhone_returnsConflict() throws Exception {
		// Create first user
		CreateUserRequest firstRequest = new CreateUserRequest(
				"John Doe",
				"john.doe@example.com",
				"9876543210",
				"Password@123");

		mockMvc.perform(post("/api/users")
				.with(jwt().jwt(j -> j.subject(ownerId.toString())).authorities(new SimpleGrantedAuthority("ROLE_OWNER")))
				.contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(firstRequest)))
				.andExpect(status().isCreated());

		// Try to create second user with same phone
		CreateUserRequest secondRequest = new CreateUserRequest(
				"Jane Smith",
				"jane.smith@example.com",
				"9876543210",
				"Password@123");

		mockMvc.perform(post("/api/users")
				.with(jwt().jwt(j -> j.subject(ownerId.toString())).authorities(new SimpleGrantedAuthority("ROLE_OWNER")))
				.contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(secondRequest)))
				.andExpect(status().isConflict());
	}

	@Test
	void createUser_withInvalidEmail_returnsBadRequest() throws Exception {
		CreateUserRequest request = new CreateUserRequest(
				"John Doe",
				"invalid-email",
				"9876543210",
				"Password@123");

		mockMvc.perform(post("/api/users")
				.with(jwt().jwt(j -> j.subject(ownerId.toString())).authorities(new SimpleGrantedAuthority("ROLE_OWNER")))
				.contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(request)))
				.andExpect(status().isBadRequest());
	}

	@Test
	void createUser_withInvalidPhone_returnsBadRequest() throws Exception {
		CreateUserRequest request = new CreateUserRequest(
				"John Doe",
				"john.doe@example.com",
				"123",
				"Password@123");

		mockMvc.perform(post("/api/users")
				.with(jwt().jwt(j -> j.subject(ownerId.toString())).authorities(new SimpleGrantedAuthority("ROLE_OWNER")))
				.contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(request)))
				.andExpect(status().isBadRequest());
	}

	@Test
	void createUser_withWeakPassword_returnsBadRequest() throws Exception {
		CreateUserRequest request = new CreateUserRequest(
				"John Doe",
				"john.doe@example.com",
				"9876543210",
				"weak");

		mockMvc.perform(post("/api/users")
				.with(jwt().jwt(j -> j.subject(ownerId.toString())).authorities(new SimpleGrantedAuthority("ROLE_OWNER")))
				.contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(request)))
				.andExpect(status().isBadRequest());
	}

	@Test
	void createUser_withoutFullName_returnsBadRequest() throws Exception {
		CreateUserRequest request = new CreateUserRequest(
				"",
				"john.doe@example.com",
				"9876543210",
				"Password@123");

		mockMvc.perform(post("/api/users")
				.with(jwt().jwt(j -> j.subject(ownerId.toString())).authorities(new SimpleGrantedAuthority("ROLE_OWNER")))
				.contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(request)))
				.andExpect(status().isBadRequest());
	}
}
