package com.poolsync.backend.finance.dto;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

import com.poolsync.backend.finance.FinancePaymentMethod;
import com.poolsync.backend.finance.PaymentStatus;

public record CreateTransactionRequest(
		String customerName,
		String customerPhone,
		UUID tableId,
		String tableNumber,
		String tableName,
		UUID sessionId,
		Instant startTime,
		Instant endTime,
		Long durationMinutes,
		BigDecimal pricePerHour,
		BigDecimal expectedAmount,
		BigDecimal actualAmount,
		BigDecimal difference,
		FinancePaymentMethod paymentMethod,
		PaymentStatus paymentStatus,
		LocalDate transactionDate,
		String referenceNumber,
		String notes
) {
}
