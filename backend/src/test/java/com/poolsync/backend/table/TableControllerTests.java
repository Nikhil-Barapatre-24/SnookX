package com.poolsync.backend.table;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.jwt;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.math.BigDecimal;
import java.util.UUID;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.poolsync.backend.table.dto.CreateTableRequest;
import com.poolsync.backend.user.User;
import com.poolsync.backend.user.UserRepository;
import com.poolsync.backend.user.UserRole;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class TableControllerTests {

	@Autowired
	private MockMvc mockMvc;

	@Autowired
	private ObjectMapper objectMapper;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private TableRepository tableRepository;

	private User testOwner;
	private User testUser;

	@BeforeEach
	void setup() {
		tableRepository.deleteAll();
		userRepository.deleteAll();

		testOwner = new User("Test Owner", "owner@test.com", "1234567890", "pass", UserRole.OWNER);
		testOwner = userRepository.save(testOwner);

		testUser = new User("Test User", "user@test.com", "0987654321", "pass", UserRole.USER);
		testUser = userRepository.save(testUser);
	}

	@Test
	void ownerCanCreateAndManageTables() throws Exception {
		CreateTableRequest request = new CreateTableRequest(
				"T1",
				"Main Snooker Table",
				GameType.SNOOKER,
				new BigDecimal("15.50")
		);

		MvcResult createResult = mockMvc.perform(post("/api/tables")
						.with(jwt().jwt(j -> j.subject(testOwner.getId().toString())).authorities(new SimpleGrantedAuthority("ROLE_OWNER")))
						.contentType(MediaType.APPLICATION_JSON)
						.content(objectMapper.writeValueAsString(request)))
				.andExpect(status().isCreated())
				.andExpect(jsonPath("$.tableNumber").value("T1"))
				.andReturn();

		String responseBody = createResult.getResponse().getContentAsString();
		String id = objectMapper.readTree(responseBody).get("id").asText();

		// Use USER role to fetch, validating USER can access
		mockMvc.perform(get("/api/tables/" + id)
						.with(jwt().jwt(j -> j.subject(testUser.getId().toString())).authorities(new SimpleGrantedAuthority("ROLE_USER"))))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.tableNumber").value("T1"));
	}

	@Test
	void ownerCannotCreateDuplicateTables() throws Exception {
		CreateTableRequest request = new CreateTableRequest(
				"T-DUP",
				"Duplicate Setup",
				GameType.POOL,
				new BigDecimal("10.00")
		);

		// First succeeds
		mockMvc.perform(post("/api/tables")
						.with(jwt().jwt(j -> j.subject(testOwner.getId().toString())).authorities(new SimpleGrantedAuthority("ROLE_OWNER")))
						.contentType(MediaType.APPLICATION_JSON)
						.content(objectMapper.writeValueAsString(request)))
				.andExpect(status().isCreated());
				
		// Second fails with 400
		mockMvc.perform(post("/api/tables")
						.with(jwt().jwt(j -> j.subject(testOwner.getId().toString())).authorities(new SimpleGrantedAuthority("ROLE_OWNER")))
						.contentType(MediaType.APPLICATION_JSON)
						.content(objectMapper.writeValueAsString(request)))
				.andExpect(status().isBadRequest());
	}

	@Test
	void userCannotCreateTables() throws Exception {
		CreateTableRequest request = new CreateTableRequest(
				"T2",
				"Pool Table",
				GameType.POOL,
				new BigDecimal("10.00")
		);

		mockMvc.perform(post("/api/tables")
						.with(jwt().jwt(j -> j.subject(testUser.getId().toString())).authorities(new SimpleGrantedAuthority("ROLE_USER")))
						.contentType(MediaType.APPLICATION_JSON)
						.content(objectMapper.writeValueAsString(request)))
				.andExpect(status().isForbidden());
	}
}
