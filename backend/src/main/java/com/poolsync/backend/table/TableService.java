package com.poolsync.backend.table;

import java.util.UUID;

import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.poolsync.backend.common.dto.PagedResponse;
import com.poolsync.backend.table.dto.CreateTableRequest;
import com.poolsync.backend.table.dto.TableResponse;
import com.poolsync.backend.table.dto.UpdateTableRequest;

@Service
public class TableService {

	private final TableRepository tableRepository;

	public TableService(TableRepository tableRepository) {
		this.tableRepository = tableRepository;
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
				creatorId
		);
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

		if (request.tableNumber() != null) table.setTableNumber(request.tableNumber());
		if (request.tableName() != null) table.setTableName(request.tableName());
		if (request.gameType() != null) table.setGameType(request.gameType());
		if (request.pricePerHour() != null) table.setPricePerHour(request.pricePerHour());
		if (request.status() != null) table.setStatus(request.status());

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
		GameTable existingByNumber = tableRepository.findByTableNumberIgnoreCaseAndIsActiveTrue(tableNumber);
		if (existingByNumber != null && (excludeId == null || !existingByNumber.getId().equals(excludeId))) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Table number already exists");
		}

		if (tableName != null && !tableName.isBlank()) {
			GameTable existingByName = tableRepository.findByTableNameIgnoreCaseAndIsActiveTrue(tableName);
			if (existingByName != null && (excludeId == null || !existingByName.getId().equals(excludeId))) {
				throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Table name already exists");
			}
		}
	}
}
