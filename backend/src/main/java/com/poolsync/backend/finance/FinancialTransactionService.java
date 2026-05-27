package com.poolsync.backend.finance;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.Duration;
import java.time.Instant;
import java.time.LocalDate;
import java.time.Year;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.poolsync.backend.finance.dto.CreateTransactionRequest;
import com.poolsync.backend.finance.dto.EarningsResponse;
import com.poolsync.backend.finance.dto.TransactionResponse;

@Service
public class FinancialTransactionService {

	private final FinancialTransactionRepository transactionRepository;

	public FinancialTransactionService(FinancialTransactionRepository transactionRepository) {
		this.transactionRepository = transactionRepository;
	}

	@Transactional
	public TransactionResponse createTransaction(CreateTransactionRequest request, UUID creatorId) {
		// Generate transaction ID: TXN-YYYY-XXXXX
		String transactionId = generateTransactionId();

		FinancialTransaction transaction = new FinancialTransaction(
				UUID.randomUUID(),
				transactionId,
				request.customerName(),
				request.customerPhone(),
				request.tableId(),
				request.tableNumber(),
				request.tableName(),
				request.sessionId(),
				request.startTime(),
				request.endTime(),
				request.durationMinutes(),
				request.pricePerHour(),
				request.expectedAmount(),
				request.actualAmount(),
				request.difference(),
				request.paymentMethod(),
				request.paymentStatus(),
				request.transactionDate(),
				creatorId);

		transaction.setReferenceNumber(request.referenceNumber());
		transaction.setNotes(request.notes());

		FinancialTransaction saved = transactionRepository.save(transaction);
		return toResponse(saved);
	}

	@Transactional(readOnly = true)
	public TransactionResponse getTransaction(UUID id) {
		FinancialTransaction transaction = transactionRepository.findById(id)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Transaction not found"));
		return toResponse(transaction);
	}

	@Transactional(readOnly = true)
	public TransactionResponse getTransactionByTransactionId(String transactionId) {
		FinancialTransaction transaction = transactionRepository.findByTransactionId(transactionId)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Transaction not found"));
		return toResponse(transaction);
	}

	@Transactional(readOnly = true)
	public Page<TransactionResponse> getAllTransactions(Pageable pageable) {
		return transactionRepository.findAll(pageable).map(this::toResponse);
	}

	@Transactional(readOnly = true)
	public Page<TransactionResponse> searchTransactions(String customerPhone, UUID tableId,
			PaymentStatus paymentStatus, LocalDate startDate, LocalDate endDate, Pageable pageable) {
		return transactionRepository.searchTransactions(customerPhone, tableId, paymentStatus, startDate, endDate, pageable)
				.map(this::toResponse);
	}

	@Transactional(readOnly = true)
	public Page<TransactionResponse> getTransactionsByCustomerPhone(String customerPhone, Pageable pageable) {
		return transactionRepository.findByCustomerPhone(customerPhone, pageable).map(this::toResponse);
	}

	@Transactional(readOnly = true)
	public Page<TransactionResponse> getTransactionsByTableId(UUID tableId, Pageable pageable) {
		return transactionRepository.findByTableId(tableId, pageable).map(this::toResponse);
	}

	@Transactional(readOnly = true)
	public Page<TransactionResponse> getTransactionsByDate(LocalDate transactionDate, Pageable pageable) {
		return transactionRepository.findByTransactionDate(transactionDate, pageable).map(this::toResponse);
	}

	@Transactional(readOnly = true)
	public Page<TransactionResponse> getTransactionsByPaymentStatus(PaymentStatus paymentStatus, Pageable pageable) {
		return transactionRepository.findByPaymentStatus(paymentStatus, pageable).map(this::toResponse);
	}

	private String generateTransactionId() {
		Year year = Year.now();
		long count = transactionRepository.count() + 1;
		return String.format("TXN-%d-%05d", year.getValue(), count);
	}

	private TransactionResponse toResponse(FinancialTransaction transaction) {
		return new TransactionResponse(
				transaction.getId(),
				transaction.getTransactionId(),
				transaction.getCustomerName(),
				transaction.getCustomerPhone(),
				transaction.getTableId(),
				transaction.getTableNumber(),
				transaction.getTableName(),
				transaction.getSessionId(),
				transaction.getStartTime(),
				transaction.getEndTime(),
				transaction.getDurationMinutes(),
				transaction.getPricePerHour(),
				transaction.getExpectedAmount(),
				transaction.getActualAmount(),
				transaction.getDifference(),
				transaction.getPaymentMethod(),
				transaction.getPaymentStatus(),
				transaction.getTransactionDate(),
				transaction.getReferenceNumber(),
				transaction.getNotes(),
				transaction.getCreatedAt(),
				transaction.getUpdatedAt());
	}

	@Transactional(readOnly = true)
	public EarningsResponse getEarnings() {
		LocalDate today = LocalDate.now();
		LocalDate monthStart = today.withDayOfMonth(1);
		LocalDate monthEnd = today.withDayOfMonth(today.lengthOfMonth());
		LocalDate yearStart = today.withDayOfYear(1);
		LocalDate yearEnd = today.withDayOfYear(today.lengthOfYear());

		BigDecimal todayEarnings = transactionRepository.sumActualAmountByDate(today);
		BigDecimal monthlyEarnings = transactionRepository.sumActualAmountBetweenDates(monthStart, monthEnd);
		BigDecimal yearlyEarnings = transactionRepository.sumActualAmountByYear(today.getYear());
		BigDecimal allTimeEarnings = transactionRepository.sumAllActualAmount();

		return new EarningsResponse(
				todayEarnings != null ? todayEarnings : BigDecimal.ZERO,
				monthlyEarnings != null ? monthlyEarnings : BigDecimal.ZERO,
				yearlyEarnings != null ? yearlyEarnings : BigDecimal.ZERO,
				allTimeEarnings != null ? allTimeEarnings : BigDecimal.ZERO);
	}
}
