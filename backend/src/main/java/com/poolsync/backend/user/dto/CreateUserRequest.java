package com.poolsync.backend.user.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record CreateUserRequest(
		@NotBlank(message = "Full name is required")
		@Size(min = 2, max = 100, message = "Full name must be between 2 and 100 characters")
		String fullName,

		@NotBlank(message = "Email is required")
		@Email(message = "Email must be valid")
		String email,

		@Pattern(regexp = "^[0-9]{10}$", message = "Phone must be a valid 10-digit number")
		String phone,

		@NotBlank(message = "Password is required")
		@Size(min = 8, max = 100, message = "Password must be between 8 and 100 characters")
		@Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]+$",
				message = "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character")
		String password
) {
}
