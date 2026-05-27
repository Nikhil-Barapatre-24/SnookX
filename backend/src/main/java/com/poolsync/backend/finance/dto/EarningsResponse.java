package com.poolsync.backend.finance.dto;

import java.math.BigDecimal;

public record EarningsResponse(
		BigDecimal todayEarnings,
		BigDecimal monthlyEarnings,
		BigDecimal yearlyEarnings,
		BigDecimal allTimeEarnings
) {
}
