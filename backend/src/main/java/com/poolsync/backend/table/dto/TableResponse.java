package com.poolsync.backend.table.dto;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

import com.poolsync.backend.table.GameTable;
import com.poolsync.backend.table.GameType;
import com.poolsync.backend.table.TableStatus;

public record TableResponse(
		UUID id,
		String tableNumber,
		String tableName,
		GameType gameType,
		BigDecimal pricePerHour,
		TableStatus status,
		UUID createdBy,
		UUID updatedBy,
		boolean isActive,
		Instant createdAt,
		Instant updatedAt) {

	public static TableResponse fromEntity(GameTable table) {
		return new TableResponse(
				table.getId(),
				table.getTableNumber(),
				table.getTableName(),
				table.getGameType(),
				table.getPricePerHour(),
				table.getStatus(),
				table.getCreatedBy(),
				table.getUpdatedBy(),
				table.isActive(),
				table.getCreatedAt(),
				table.getUpdatedAt()
		);
	}
}
