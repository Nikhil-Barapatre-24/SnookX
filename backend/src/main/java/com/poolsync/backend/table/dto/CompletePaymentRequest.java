package com.poolsync.backend.table.dto;

import java.math.BigDecimal;

import com.poolsync.backend.table.PaymentMethod;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record CompletePaymentRequest(
	@NotNull(message = "Received amount is required")
	@DecimalMin(value = "0.01", message = "Received amount must be greater than 0")
	BigDecimal receivedAmount,

	@NotNull(message = "Payment method is required")
	PaymentMethod paymentMethod
) {
}
