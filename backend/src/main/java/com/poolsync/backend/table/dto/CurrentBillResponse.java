package com.poolsync.backend.table.dto;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

public record CurrentBillResponse(
	UUID sessionId,
	UUID tableId,
	String tableNumber,
	String tableName,
	Instant startTime,
	BigDecimal pricePerHour,
	BigDecimal calculatedAmount,
	long durationMinutes,
	String customerName,
	String customerPhone
) {
}
