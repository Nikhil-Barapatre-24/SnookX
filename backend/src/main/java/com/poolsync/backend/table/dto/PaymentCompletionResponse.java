package com.poolsync.backend.table.dto;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

import com.poolsync.backend.table.PaymentMethod;

public record PaymentCompletionResponse(
	UUID sessionId,
	UUID tableId,
	String tableNumber,
	String tableName,
	Instant startTime,
	Instant endTime,
	BigDecimal calculatedAmount,
	BigDecimal receivedAmount,
	BigDecimal difference,
	PaymentMethod paymentMethod,
	long durationMinutes,
	String customerName,
	String customerPhone
) {
}
