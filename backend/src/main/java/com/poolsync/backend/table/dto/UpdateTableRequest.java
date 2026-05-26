package com.poolsync.backend.table.dto;

import java.math.BigDecimal;
import com.poolsync.backend.table.GameType;
import com.poolsync.backend.table.TableStatus;

public record UpdateTableRequest(
		String tableNumber,
		String tableName,
		GameType gameType,
		BigDecimal pricePerHour,
		TableStatus status) {
}
