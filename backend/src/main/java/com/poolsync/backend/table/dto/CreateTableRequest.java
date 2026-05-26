package com.poolsync.backend.table.dto;

import java.math.BigDecimal;
import com.poolsync.backend.table.GameType;

public record CreateTableRequest(
		String tableNumber,
		String tableName,
		GameType gameType,
		BigDecimal pricePerHour) {
}
