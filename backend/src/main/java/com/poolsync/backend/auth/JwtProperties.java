package com.poolsync.backend.auth;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "app.jwt")
public record JwtProperties(
		String issuer,
		String secret,
		long accessTokenTtlMinutes,
		long refreshTokenTtlDays) {
}
