package com.poolsync.backend.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record RegisterRequest(
		@NotBlank
		@Size(max = 100)
		String fullName,

		@NotBlank
		@Email
		@Size(max = 255)
		String email,

		@Pattern(regexp = "^[+]?[0-9]{7,20}$", message = "phone must contain 7 to 20 digits and may start with +")
		String phone,

		@NotBlank
		@Size(min = 8, max = 72)
		String password) {
}
