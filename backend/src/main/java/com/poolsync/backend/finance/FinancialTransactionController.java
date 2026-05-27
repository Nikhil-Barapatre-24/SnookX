package com.poolsync.backend.finance;

import java.time.LocalDate;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.poolsync.backend.common.dto.PagedResponse;
import com.poolsync.backend.finance.dto.CreateTransactionRequest;
import com.poolsync.backend.finance.dto.EarningsResponse;
import com.poolsync.backend.finance.dto.TransactionResponse;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/financial-transactions")
public class FinancialTransactionController {

	private final FinancialTransactionService transactionService;

	public FinancialTransactionController(FinancialTransactionService transactionService) {
		this.transactionService = transactionService;
	}

	@PostMapping
	@PreAuthorize("hasRole('OWNER')")
	@Deprecated(since = "Transactions are now automatically created when table payment is completed")
	public ResponseEntity<TransactionResponse> createTransaction(@Valid @RequestBody CreateTransactionRequest request,
			Authentication auth) {
		UUID creatorId = getUserId(auth);
		TransactionResponse response = transactionService.createTransaction(request, creatorId);
		return ResponseEntity.status(HttpStatus.CREATED).body(response);
	}

	@GetMapping("/{id}")
	@PreAuthorize("hasAnyRole('OWNER', 'USER')")
	public ResponseEntity<TransactionResponse> getTransaction(@PathVariable UUID id) {
		TransactionResponse response = transactionService.getTransaction(id);
		return ResponseEntity.ok(response);
	}

	@GetMapping("/transaction-id/{transactionId}")
	@PreAuthorize("hasAnyRole('OWNER', 'USER')")
	public ResponseEntity<TransactionResponse> getTransactionByTransactionId(@PathVariable String transactionId) {
		TransactionResponse response = transactionService.getTransactionByTransactionId(transactionId);
		return ResponseEntity.ok(response);
	}

	@GetMapping
	@PreAuthorize("hasRole('OWNER')")
	public ResponseEntity<PagedResponse<TransactionResponse>> getAllTransactions(
			@PageableDefault(size = 20, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {
		Page<TransactionResponse> page = transactionService.getAllTransactions(pageable);
		return ResponseEntity.ok(PagedResponse.of(page));
	}

	@GetMapping("/search")
	@PreAuthorize("hasRole('OWNER')")
	public ResponseEntity<PagedResponse<TransactionResponse>> searchTransactions(
			@RequestParam(required = false) String customerPhone,
			@RequestParam(required = false) UUID tableId,
			@RequestParam(required = false) PaymentStatus paymentStatus,
			@RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
			@RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
			@PageableDefault(size = 20, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {
		Page<TransactionResponse> page = transactionService.searchTransactions(customerPhone, tableId, paymentStatus,
				startDate, endDate, pageable);
		return ResponseEntity.ok(PagedResponse.of(page));
	}

	@GetMapping("/customer/{customerPhone}")
	@PreAuthorize("hasRole('OWNER')")
	public ResponseEntity<PagedResponse<TransactionResponse>> getTransactionsByCustomerPhone(
			@PathVariable String customerPhone,
			@PageableDefault(size = 20, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {
		Page<TransactionResponse> page = transactionService.getTransactionsByCustomerPhone(customerPhone, pageable);
		return ResponseEntity.ok(PagedResponse.of(page));
	}

	@GetMapping("/table/{tableId}")
	@PreAuthorize("hasRole('OWNER')")
	public ResponseEntity<PagedResponse<TransactionResponse>> getTransactionsByTableId(@PathVariable UUID tableId,
			@PageableDefault(size = 20, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {
		Page<TransactionResponse> page = transactionService.getTransactionsByTableId(tableId, pageable);
		return ResponseEntity.ok(PagedResponse.of(page));
	}

	@GetMapping("/date/{transactionDate}")
	@PreAuthorize("hasRole('OWNER')")
	public ResponseEntity<PagedResponse<TransactionResponse>> getTransactionsByDate(
			@PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate transactionDate,
			@PageableDefault(size = 20, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {
		Page<TransactionResponse> page = transactionService.getTransactionsByDate(transactionDate, pageable);
		return ResponseEntity.ok(PagedResponse.of(page));
	}

	@GetMapping("/status/{paymentStatus}")
	@PreAuthorize("hasRole('OWNER')")
	public ResponseEntity<PagedResponse<TransactionResponse>> getTransactionsByPaymentStatus(
			@PathVariable PaymentStatus paymentStatus,
			@PageableDefault(size = 20, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {
		Page<TransactionResponse> page = transactionService.getTransactionsByPaymentStatus(paymentStatus, pageable);
		return ResponseEntity.ok(PagedResponse.of(page));
	}

	@GetMapping("/earnings")
	@PreAuthorize("hasRole('OWNER')")
	public ResponseEntity<EarningsResponse> getEarnings() {
		EarningsResponse response = transactionService.getEarnings();
		return ResponseEntity.ok(response);
	}

	private UUID getUserId(Authentication auth) {
		return UUID.fromString(auth.getName());
	}
}
