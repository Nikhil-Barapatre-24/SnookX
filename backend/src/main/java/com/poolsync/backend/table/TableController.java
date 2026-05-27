package com.poolsync.backend.table;

import java.util.UUID;

import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.poolsync.backend.common.dto.PagedResponse;
import com.poolsync.backend.table.dto.CompletePaymentRequest;
import com.poolsync.backend.table.dto.CreateTableRequest;
import com.poolsync.backend.table.dto.CurrentBillResponse;
import com.poolsync.backend.table.dto.PaymentCompletionResponse;
import com.poolsync.backend.table.dto.TableResponse;
import com.poolsync.backend.table.dto.UpdateTableRequest;

@RestController
@RequestMapping("/api/tables")
public class TableController {

	private final TableService tableService;

	public TableController(TableService tableService) {
		this.tableService = tableService;
	}

	private UUID getUserId(Authentication auth) {
		if (auth.getPrincipal() instanceof Jwt jwt) {
			return UUID.fromString(jwt.getSubject());
		}
		throw new IllegalStateException("Authentication principal is not a JWT");
	}

	@PostMapping
	@PreAuthorize("hasRole('OWNER')")
	@ResponseStatus(HttpStatus.CREATED)
	public TableResponse createTable(@RequestBody CreateTableRequest request, Authentication auth) {
		return tableService.createTable(request, getUserId(auth));
	}

	@PutMapping("/{id}")
	@PreAuthorize("hasAnyRole('OWNER', 'USER')")
	public TableResponse updateTable(@PathVariable UUID id, @RequestBody UpdateTableRequest request, Authentication auth) {
		return tableService.updateTable(id, request, getUserId(auth));
	}

	@GetMapping("/{id}")
	@PreAuthorize("hasAnyRole('OWNER', 'USER')")
	public TableResponse getTable(@PathVariable UUID id) {
		return tableService.getTable(id);
	}

	@GetMapping
	@PreAuthorize("hasAnyRole('OWNER', 'USER')")
	public PagedResponse<TableResponse> getTables(
			@RequestParam(required = false) String search,
			@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "10") int size) {
		PageRequest pageable = PageRequest.of(page, size);
		if (search != null && !search.isBlank()) {
			return tableService.searchActiveTables(search, pageable);
		}
		return tableService.getAllActiveTables(pageable);
	}

	@DeleteMapping("/{id}")
	@PreAuthorize("hasRole('OWNER')")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void softDeleteTable(@PathVariable UUID id, Authentication auth) {
		tableService.softDeleteTable(id, getUserId(auth));
	}

	@GetMapping("/{id}/current-bill")
	@PreAuthorize("hasAnyRole('OWNER', 'USER')")
	public CurrentBillResponse getCurrentBill(@PathVariable UUID id) {
		return tableService.getCurrentBill(id);
	}

	@PostMapping("/{id}/complete-payment")
	@PreAuthorize("hasAnyRole('OWNER', 'USER')")
	public PaymentCompletionResponse completePayment(
			@PathVariable UUID id,
			@RequestBody CompletePaymentRequest request,
			Authentication auth) {
		return tableService.completePayment(id, request, getUserId(auth));
	}
}
