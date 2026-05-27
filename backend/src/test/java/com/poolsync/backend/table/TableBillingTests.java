package com.poolsync.backend.table;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.jwt;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
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
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.poolsync.backend.table.dto.CompletePaymentRequest;
import com.poolsync.backend.table.dto.CreateTableRequest;
import com.poolsync.backend.table.dto.UpdateTableRequest;
import com.poolsync.backend.user.User;
import com.poolsync.backend.user.UserRepository;
import com.poolsync.backend.user.UserRole;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class TableBillingTests {

	@Autowired
	private MockMvc mockMvc;

	@Autowired
	private ObjectMapper objectMapper;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private TableRepository tableRepository;

	@Autowired
	private TableSessionRepository tableSessionRepository;

	@Autowired
	private com.poolsync.backend.finance.FinancialTransactionRepository financialTransactionRepository;

	private UUID ownerId;
	private UUID tableId;

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

		// Create table via service (bypassing auth for test setup)
		// We'll use the repository directly for simplicity
		GameTable table = new GameTable(
				UUID.randomUUID(),
				"T1",
				"Table 1",
				GameType.SNOOKER,
				new BigDecimal("150.00"),
				ownerId);
		table = tableRepository.save(table);
		tableId = table.getId();
	}

	@Test
	void getCurrentBill_whenTableIsNotOccupied_returnsBadRequest() throws Exception {
		mockMvc.perform(get("/api/tables/{id}/current-bill", tableId)
				.with(jwt().jwt(j -> j.subject(ownerId.toString())).authorities(new SimpleGrantedAuthority("ROLE_OWNER"))))
				.andExpect(status().isBadRequest());
	}

	@Test
	void getCurrentBill_whenTableIsOccupied_returnsBill() throws Exception {
		// First, occupy the table
		UpdateTableRequest occupyRequest = new UpdateTableRequest(
				null,
				null,
				null,
				null,
				TableStatus.OCCUPIED,
				"John Doe",
				"9876543210");
		String occupyRequestJson = objectMapper.writeValueAsString(occupyRequest);

		mockMvc.perform(put("/api/tables/{id}", tableId)
				.with(jwt().jwt(j -> j.subject(ownerId.toString())).authorities(new SimpleGrantedAuthority("ROLE_OWNER")))
				.contentType(MediaType.APPLICATION_JSON)
				.content(occupyRequestJson))
				.andExpect(status().isOk());

		// Wait a bit to ensure some duration
		Thread.sleep(1000);

		// Get current bill
		mockMvc.perform(get("/api/tables/{id}/current-bill", tableId)
				.with(jwt().jwt(j -> j.subject(ownerId.toString())).authorities(new SimpleGrantedAuthority("ROLE_OWNER"))))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.sessionId").exists())
				.andExpect(jsonPath("$.tableId").value(tableId.toString()))
				.andExpect(jsonPath("$.tableNumber").value("T1"))
				.andExpect(jsonPath("$.tableName").value("Table 1"))
				.andExpect(jsonPath("$.pricePerHour").value(150.00))
				.andExpect(jsonPath("$.calculatedAmount").exists())
				.andExpect(jsonPath("$.durationMinutes").exists())
				.andExpect(jsonPath("$.customerName").value("John Doe"))
				.andExpect(jsonPath("$.customerPhone").value("9876543210"));
	}

	@Test
	void completePayment_whenTableIsNotOccupied_returnsBadRequest() throws Exception {
		CompletePaymentRequest paymentRequest = new CompletePaymentRequest(
				new BigDecimal("160.00"),
				PaymentMethod.CASH);
		String paymentRequestJson = objectMapper.writeValueAsString(paymentRequest);

		mockMvc.perform(post("/api/tables/{id}/complete-payment", tableId)
				.with(jwt().jwt(j -> j.subject(ownerId.toString())).authorities(new SimpleGrantedAuthority("ROLE_OWNER")))
				.contentType(MediaType.APPLICATION_JSON)
				.content(paymentRequestJson))
				.andExpect(status().isBadRequest());
	}

	@Test
	void completePayment_whenTableIsOccupied_completesPaymentAndChangesStatus() throws Exception {
		// First, occupy the table
		UpdateTableRequest occupyRequest = new UpdateTableRequest(
				null,
				null,
				null,
				null,
				TableStatus.OCCUPIED,
				"Jane Smith",
				"9123456789");
		String occupyRequestJson = objectMapper.writeValueAsString(occupyRequest);

		mockMvc.perform(put("/api/tables/{id}", tableId)
				.with(jwt().jwt(j -> j.subject(ownerId.toString())).authorities(new SimpleGrantedAuthority("ROLE_OWNER")))
				.contentType(MediaType.APPLICATION_JSON)
				.content(occupyRequestJson))
				.andExpect(status().isOk());

		// Wait a bit to ensure some duration
		Thread.sleep(1000);

		// Complete payment
		CompletePaymentRequest paymentRequest = new CompletePaymentRequest(
				new BigDecimal("160.00"),
				PaymentMethod.CASH);
		String paymentRequestJson = objectMapper.writeValueAsString(paymentRequest);

		mockMvc.perform(post("/api/tables/{id}/complete-payment", tableId)
				.with(jwt().jwt(j -> j.subject(ownerId.toString())).authorities(new SimpleGrantedAuthority("ROLE_OWNER")))
				.contentType(MediaType.APPLICATION_JSON)
				.content(paymentRequestJson))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.sessionId").exists())
				.andExpect(jsonPath("$.tableId").value(tableId.toString()))
				.andExpect(jsonPath("$.tableNumber").value("T1"))
				.andExpect(jsonPath("$.tableName").value("Table 1"))
				.andExpect(jsonPath("$.calculatedAmount").exists())
				.andExpect(jsonPath("$.receivedAmount").value(160.00))
				.andExpect(jsonPath("$.difference").exists())
				.andExpect(jsonPath("$.paymentMethod").value("CASH"))
				.andExpect(jsonPath("$.endTime").exists())
				.andExpect(jsonPath("$.customerName").value("Jane Smith"))
				.andExpect(jsonPath("$.customerPhone").value("9123456789"));

		// Verify table status is back to AVAILABLE
		mockMvc.perform(get("/api/tables/{id}", tableId)
				.with(jwt().jwt(j -> j.subject(ownerId.toString())).authorities(new SimpleGrantedAuthority("ROLE_OWNER"))))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.status").value("AVAILABLE"));

		// Verify financial transaction was automatically created
		var transactions = financialTransactionRepository.findAll();
		assert transactions.size() == 1;
		var transaction = transactions.get(0);
		assert transaction.getCustomerName().equals("Jane Smith");
		assert transaction.getCustomerPhone().equals("9123456789");
		assert transaction.getTableId().equals(tableId);
		assert transaction.getPaymentStatus() == com.poolsync.backend.finance.PaymentStatus.COMPLETED;
	}

	@Test
	void completePayment_createsFinancialTransactionAutomatically() throws Exception {
		// First, occupy the table
		UpdateTableRequest occupyRequest = new UpdateTableRequest(
				null,
				null,
				null,
				null,
				TableStatus.OCCUPIED,
				"Bob Wilson",
				"9988776655");
		String occupyRequestJson = objectMapper.writeValueAsString(occupyRequest);

		mockMvc.perform(put("/api/tables/{id}", tableId)
				.with(jwt().jwt(j -> j.subject(ownerId.toString())).authorities(new SimpleGrantedAuthority("ROLE_OWNER")))
				.contentType(MediaType.APPLICATION_JSON)
				.content(occupyRequestJson))
				.andExpect(status().isOk());

		// Wait a bit to ensure some duration
		Thread.sleep(1000);

		// Complete payment
		CompletePaymentRequest paymentRequest = new CompletePaymentRequest(
				new BigDecimal("200.00"),
				PaymentMethod.CASH);
		String paymentRequestJson = objectMapper.writeValueAsString(paymentRequest);

		mockMvc.perform(post("/api/tables/{id}/complete-payment", tableId)
				.with(jwt().jwt(j -> j.subject(ownerId.toString())).authorities(new SimpleGrantedAuthority("ROLE_OWNER")))
				.contentType(MediaType.APPLICATION_JSON)
				.content(paymentRequestJson))
				.andExpect(status().isOk());

		// Verify financial transaction was automatically created
		var transactions = financialTransactionRepository.findAll();
		assert transactions.size() == 1;
		var transaction = transactions.get(0);
		assert transaction.getCustomerName().equals("Bob Wilson");
		assert transaction.getCustomerPhone().equals("9988776655");
		assert transaction.getTableId().equals(tableId);
		assert transaction.getPaymentStatus() == com.poolsync.backend.finance.PaymentStatus.COMPLETED;
		assert transaction.getTransactionId() != null;
		assert transaction.getTransactionId().startsWith("TXN-");
	}
}
