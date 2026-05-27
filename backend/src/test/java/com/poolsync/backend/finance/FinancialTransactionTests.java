package com.poolsync.backend.finance;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.jwt;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
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

import com.fasterxml.jackson.databind.ObjectMapper;
import com.poolsync.backend.finance.dto.CreateTransactionRequest;
import com.poolsync.backend.table.GameTable;
import com.poolsync.backend.table.GameType;
import com.poolsync.backend.table.TableRepository;
import com.poolsync.backend.table.TableSession;
import com.poolsync.backend.table.TableSessionRepository;
import com.poolsync.backend.user.User;
import com.poolsync.backend.user.UserRepository;
import com.poolsync.backend.user.UserRole;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class FinancialTransactionTests {

	@Autowired
	private MockMvc mockMvc;

	@Autowired
	private ObjectMapper objectMapper;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private TableRepository tableRepository;

	@Autowired
	private TableSessionRepository tableSessionRepository;

	@Autowired
	private com.poolsync.backend.finance.FinancialTransactionRepository transactionRepository;

	private UUID ownerId;
	private UUID tableId;
	private UUID sessionId;

	@BeforeEach
	void setUp() {
		transactionRepository.deleteAll();
		tableSessionRepository.deleteAll();
		tableRepository.deleteAll();
		userRepository.deleteAll();

		User owner = new User(
				"Nikhil Barapatre",
				"nikhilbarapatre786@gmail.com",
				null,
				"password",
				UserRole.OWNER);
		owner = userRepository.save(owner);
		ownerId = owner.getId();

		GameTable table = new GameTable(
				UUID.randomUUID(),
				"T1",
				"Table 1",
				GameType.SNOOKER,
				new BigDecimal("150.00"),
				ownerId);
		table = tableRepository.save(table);
		tableId = table.getId();

		TableSession session = new TableSession(
				UUID.randomUUID(),
				tableId,
				Instant.now(),
				ownerId);
		session.setCustomerName("John Doe");
		session.setCustomerPhone("9876543210");
		session = tableSessionRepository.save(session);
		sessionId = session.getId();
	}

	@Test
	void createTransaction_createsTransactionSuccessfully() throws Exception {
		Instant startTime = Instant.now();
		Instant endTime = startTime.plusSeconds(3600); // 1 hour

		CreateTransactionRequest request = new CreateTransactionRequest(
				"John Doe",
				"9876543210",
				tableId,
				"T1",
				"Table 1",
				sessionId,
				startTime,
				endTime,
				60L,
				new BigDecimal("150.00"),
				new BigDecimal("150.00"),
				new BigDecimal("150.00"),
				BigDecimal.ZERO,
				FinancePaymentMethod.CASH,
				PaymentStatus.COMPLETED,
				LocalDate.now(),
				null,
				null);

		mockMvc.perform(post("/api/financial-transactions")
				.with(jwt().jwt(j -> j.subject(ownerId.toString())).authorities(new SimpleGrantedAuthority("ROLE_OWNER")))
				.contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(request)))
				.andExpect(status().isCreated())
				.andExpect(jsonPath("$.id").exists())
				.andExpect(jsonPath("$.transactionId").exists())
				.andExpect(jsonPath("$.customerName").value("John Doe"))
				.andExpect(jsonPath("$.customerPhone").value("9876543210"))
				.andExpect(jsonPath("$.tableNumber").value("T1"))
				.andExpect(jsonPath("$.paymentMethod").value("CASH"))
				.andExpect(jsonPath("$.paymentStatus").value("COMPLETED"));
	}

	@Test
	void getTransaction_returnsTransaction() throws Exception {
		// First create a transaction
		Instant startTime = Instant.now();
		Instant endTime = startTime.plusSeconds(3600);

		CreateTransactionRequest request = new CreateTransactionRequest(
				"Jane Smith",
				"9123456789",
				tableId,
				"T1",
				"Table 1",
				sessionId,
				startTime,
				endTime,
				60L,
				new BigDecimal("150.00"),
				new BigDecimal("150.00"),
				new BigDecimal("160.00"),
				new BigDecimal("10.00"),
				FinancePaymentMethod.ONLINE,
				PaymentStatus.COMPLETED,
				LocalDate.now(),
				"REF123",
				"Test transaction");

		var result = mockMvc.perform(post("/api/financial-transactions")
				.with(jwt().jwt(j -> j.subject(ownerId.toString())).authorities(new SimpleGrantedAuthority("ROLE_OWNER")))
				.contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(request)))
				.andExpect(status().isCreated())
				.andReturn();

		String response = result.getResponse().getContentAsString();
		String transactionId = objectMapper.readTree(response).get("id").asText();

		// Get the transaction
		mockMvc.perform(get("/api/financial-transactions/{id}", transactionId)
				.with(jwt().jwt(j -> j.subject(ownerId.toString())).authorities(new SimpleGrantedAuthority("ROLE_OWNER"))))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.customerName").value("Jane Smith"))
				.andExpect(jsonPath("$.referenceNumber").value("REF123"))
				.andExpect(jsonPath("$.notes").value("Test transaction"));
	}

	@Test
	void getEarnings_returnsEarningsSummary() throws Exception {
		// Create multiple transactions with different dates
		Instant startTime = Instant.now();
		Instant endTime = startTime.plusSeconds(3600);

		// Today's transaction
		CreateTransactionRequest todayRequest = new CreateTransactionRequest(
				"John Doe",
				"9876543210",
				tableId,
				"T1",
				"Table 1",
				sessionId,
				startTime,
				endTime,
				60L,
				new BigDecimal("150.00"),
				new BigDecimal("150.00"),
				new BigDecimal("150.00"),
				BigDecimal.ZERO,
				FinancePaymentMethod.CASH,
				PaymentStatus.COMPLETED,
				LocalDate.now(),
				null,
				null);

		mockMvc.perform(post("/api/financial-transactions")
				.with(jwt().jwt(j -> j.subject(ownerId.toString())).authorities(new SimpleGrantedAuthority("ROLE_OWNER")))
				.contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(todayRequest)))
				.andExpect(status().isCreated());

		// Get earnings
		mockMvc.perform(get("/api/financial-transactions/earnings")
				.with(jwt().jwt(j -> j.subject(ownerId.toString())).authorities(new SimpleGrantedAuthority("ROLE_OWNER"))))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.todayEarnings").value(150.00))
				.andExpect(jsonPath("$.monthlyEarnings").value(150.00))
				.andExpect(jsonPath("$.yearlyEarnings").value(150.00))
				.andExpect(jsonPath("$.allTimeEarnings").value(150.00));
	}
}
