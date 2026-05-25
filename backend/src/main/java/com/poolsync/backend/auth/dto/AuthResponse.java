package com.poolsync.backend.auth.dto;

import java.time.LocalDateTime;
import java.util.UUID;

import com.poolsync.backend.user.UserRole;

public record AuthResponse(
		UUID userId,
		String fullName,
		String email,
		UserRole role,
		String tokenType,
		String accessToken,
		LocalDateTime accessTokenExpiresAt,
		String refreshToken,
		LocalDateTime refreshTokenExpiresAt) {
}
