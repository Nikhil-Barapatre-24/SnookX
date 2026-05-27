package com.poolsync.backend.table;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.Duration;
import java.time.Instant;
import java.time.LocalDate;
import java.time.Year;
import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.poolsync.backend.common.dto.PagedResponse;
import com.poolsync.backend.finance.FinancePaymentMethod;
import com.poolsync.backend.finance.FinancialTransaction;
import com.poolsync.backend.finance.FinancialTransactionRepository;
import com.poolsync.backend.finance.PaymentStatus;
import com.poolsync.backend.table.dto.CompletePaymentRequest;
import com.poolsync.backend.table.dto.CreateTableRequest;
import com.poolsync.backend.table.dto.CurrentBillResponse;
import com.poolsync.backend.table.dto.PaymentCompletionResponse;
import com.poolsync.backend.table.dto.TableResponse;
import com.poolsync.backend.table.dto.UpdateTableRequest;

@Service
public class TableService {

	private final TableRepository tableRepository;
	private final TableSessionRepository tableSessionRepository;
	private final FinancialTransactionRepository financialTransactionRepository;

	public TableService(TableRepository tableRepository, TableSessionRepository tableSessionRepository,
			FinancialTransactionRepository financialTransactionRepository) {
		this.tableRepository = tableRepository;
		this.tableSessionRepository = tableSessionRepository;
		this.financialTransactionRepository = financialTransactionRepository;
	}

	@Transactional
	public TableResponse createTable(CreateTableRequest request, UUID creatorId) {
		validateTableUniqueness(request.tableNumber(), request.tableName(), null);

		GameTable table = new GameTable(
				UUID.randomUUID(),
				request.tableNumber(),
				request.tableName(),
				request.gameType(),
				request.pricePerHour(),
				creatorId);
		GameTable savedTable = tableRepository.save(table);
		return TableResponse.fromEntity(savedTable);
	}

	@Transactional
	public TableResponse updateTable(UUID id, UpdateTableRequest request, UUID updaterId) {
		GameTable table = tableRepository.findById(id)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Table not found"));

		if (!table.isActive()) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Table is deactivated");
		}

		validateTableUniqueness(request.tableNumber() != null ? request.tableNumber() : table.getTableNumber(),
				request.tableName() != null ? request.tableName() : table.getTableName(), id);

		// Check if status is being changed from AVAILABLE to OCCUPIED
		if (request.status() != null && request.status() == TableStatus.OCCUPIED
				&& table.getStatus() == TableStatus.AVAILABLE) {
			// Create a new session
			TableSession session = new TableSession(
					UUID.randomUUID(),
					table.getId(),
					Instant.now(),
					updaterId);
			session.setCustomerName(request.customerName());
			session.setCustomerPhone(request.customerPhone());
			tableSessionRepository.save(session);
		}

		if (request.tableNumber() != null)
			table.setTableNumber(request.tableNumber());
		if (request.tableName() != null)
			table.setTableName(request.tableName());
		if (request.gameType() != null)
			table.setGameType(request.gameType());
		if (request.pricePerHour() != null)
			table.setPricePerHour(request.pricePerHour());
		if (request.status() != null)
			table.setStatus(request.status());

		table.setUpdatedBy(updaterId);

		GameTable savedTable = tableRepository.save(table);
		return TableResponse.fromEntity(savedTable);
	}

	@Transactional(readOnly = true)
	public TableResponse getTable(UUID id) {
		GameTable table = tableRepository.findById(id)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Table not found"));
		return TableResponse.fromEntity(table);
	}

	@Transactional(readOnly = true)
	public PagedResponse<TableResponse> getAllActiveTables(Pageable pageable) {
		return PagedResponse.of(tableRepository.findByIsActiveTrue(pageable).map(TableResponse::fromEntity));
	}

	@Transactional(readOnly = true)
	public PagedResponse<TableResponse> searchActiveTables(String query, Pageable pageable) {
		return PagedResponse.of(tableRepository.searchActiveTables(query, pageable).map(TableResponse::fromEntity));
	}

	@Transactional
	public void softDeleteTable(UUID id, UUID deleterId) {
		GameTable table = tableRepository.findById(id)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Table not found"));

		table.setActive(false);
		table.setUpdatedBy(deleterId);
		tableRepository.save(table);
	}

	private void validateTableUniqueness(String tableNumber, String tableName, UUID excludeId) {
		List<GameTable> tablesByNumber = tableRepository.findByTableNumberIgnoreCaseAndIsActiveTrue(tableNumber);
		boolean numberConflict = tablesByNumber.stream()
				.anyMatch(t -> excludeId == null || !t.getId().equals(excludeId));
		if (numberConflict) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Table number already exists");
		}

		if (tableName != null && !tableName.isBlank()) {
			List<GameTable> tablesByName = tableRepository.findByTableNameIgnoreCaseAndIsActiveTrue(tableName);
			boolean nameConflict = tablesByName.stream()
					.anyMatch(t -> excludeId == null || !t.getId().equals(excludeId));
			if (nameConflict) {
				throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Table name already exists");
			}
		}
	}

	@Transactional(readOnly = true)
	public CurrentBillResponse getCurrentBill(UUID tableId) {
		GameTable table = tableRepository.findById(tableId)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Table not found"));

		if (!table.isActive()) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Table is deactivated");
		}

		if (table.getStatus() != TableStatus.OCCUPIED) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Table is not currently occupied");
		}

		TableSession session = tableSessionRepository.findByTableIdAndEndTimeIsNull(tableId)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No active session found for this table"));

		Instant now = Instant.now();
		long durationMinutes = Duration.between(session.getStartTime(), now).toMinutes();
		BigDecimal calculatedAmount = calculateAmount(session.getStartTime(), now, table.getPricePerHour());

		return new CurrentBillResponse(
				session.getId(),
				table.getId(),
				table.getTableNumber(),
				table.getTableName(),
				session.getStartTime(),
				table.getPricePerHour(),
				calculatedAmount,
				durationMinutes,
				session.getCustomerName(),
				session.getCustomerPhone());
	}

	@Transactional
	public PaymentCompletionResponse completePayment(UUID tableId, CompletePaymentRequest request, UUID updaterId) {
		GameTable table = tableRepository.findById(tableId)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Table not found"));

		if (!table.isActive()) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Table is deactivated");
		}

		if (table.getStatus() != TableStatus.OCCUPIED) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Table is not currently occupied");
		}

		TableSession session = tableSessionRepository.findByTableIdAndEndTimeIsNull(tableId)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No active session found for this table"));

		Instant now = Instant.now();
		long durationMinutes = Duration.between(session.getStartTime(), now).toMinutes();
		BigDecimal calculatedAmount = calculateAmount(session.getStartTime(), now, table.getPricePerHour());
		BigDecimal difference = request.receivedAmount().subtract(calculatedAmount);

		// Update session
		session.setEndTime(now);
		session.setCalculatedAmount(calculatedAmount);
		session.setReceivedAmount(request.receivedAmount());
		session.setPaymentMethod(request.paymentMethod());
		session.setUpdatedBy(updaterId);
		tableSessionRepository.save(session);

		// Update table status to AVAILABLE
		table.setStatus(TableStatus.AVAILABLE);
		table.setUpdatedBy(updaterId);
		tableRepository.save(table);

		// Automatically create financial transaction
		createFinancialTransaction(session, table, calculatedAmount, request.receivedAmount(), difference,
				request.paymentMethod(), updaterId);

		return new PaymentCompletionResponse(
				session.getId(),
				table.getId(),
				table.getTableNumber(),
				table.getTableName(),
				session.getStartTime(),
				session.getEndTime(),
				calculatedAmount,
				request.receivedAmount(),
				difference,
				request.paymentMethod(),
				durationMinutes,
				session.getCustomerName(),
				session.getCustomerPhone());
	}

	private BigDecimal calculateAmount(Instant startTime, Instant endTime, BigDecimal pricePerHour) {
		long durationMinutes = Duration.between(startTime, endTime).toMinutes();
		// Calculate exact amount: (durationMinutes / 60) * pricePerHour
		BigDecimal hours = BigDecimal.valueOf(durationMinutes).divide(BigDecimal.valueOf(60), 10, RoundingMode.HALF_UP);
		return hours.multiply(pricePerHour).setScale(2, RoundingMode.HALF_UP);
	}

	private void createFinancialTransaction(TableSession session, GameTable table, BigDecimal expectedAmount,
			BigDecimal actualAmount, BigDecimal difference, PaymentMethod paymentMethod, UUID creatorId) {
		// Generate transaction ID: TXN-YYYY-XXXXX
		String transactionId = generateTransactionId();

		// Convert table PaymentMethod to finance FinancePaymentMethod
		FinancePaymentMethod financePaymentMethod = convertPaymentMethod(paymentMethod);

		FinancialTransaction transaction = new FinancialTransaction(
				UUID.randomUUID(),
				transactionId,
				session.getCustomerName(),
				session.getCustomerPhone(),
				table.getId(),
				table.getTableNumber(),
				table.getTableName(),
				session.getId(),
				session.getStartTime(),
				session.getEndTime(),
				Duration.between(session.getStartTime(), session.getEndTime()).toMinutes(),
				table.getPricePerHour(),
				expectedAmount,
				actualAmount,
				difference,
				financePaymentMethod,
				PaymentStatus.COMPLETED,
				LocalDate.now(),
				creatorId);

		financialTransactionRepository.save(transaction);
	}

	private String generateTransactionId() {
		Year year = Year.now();
		long count = financialTransactionRepository.count() + 1;
		return String.format("TXN-%d-%05d", year.getValue(), count);
	}

	private FinancePaymentMethod convertPaymentMethod(PaymentMethod paymentMethod) {
		return switch (paymentMethod) {
			case CASH -> FinancePaymentMethod.CASH;
			case ONLINE -> FinancePaymentMethod.ONLINE;
		};
	}
}
