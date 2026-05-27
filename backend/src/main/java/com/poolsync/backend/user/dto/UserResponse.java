package com.poolsync.backend.user.dto;

import java.time.LocalDateTime;
import java.util.UUID;

import com.poolsync.backend.user.UserRole;

public record UserResponse(
		UUID id,
		String fullName,
		String email,
		String phone,
		UserRole role,
		boolean verified,
		boolean active,
		LocalDateTime lastLogin,
		LocalDateTime createdAt,
		LocalDateTime updatedAt
) {
}
