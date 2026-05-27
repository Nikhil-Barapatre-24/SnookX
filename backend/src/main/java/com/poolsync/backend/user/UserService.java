package com.poolsync.backend.user;

import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.poolsync.backend.user.dto.CreateUserRequest;
import com.poolsync.backend.user.dto.UserResponse;

@Service
public class UserService {

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;

	public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
	}

	@Transactional
	public UserResponse createUser(CreateUserRequest request, UUID creatorId) {
		// Check if email already exists
		if (userRepository.existsByEmailIgnoreCase(request.email())) {
			throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already registered");
		}

		// Check if phone already exists (if provided)
		if (request.phone() != null && userRepository.existsByPhone(request.phone())) {
			throw new ResponseStatusException(HttpStatus.CONFLICT, "Phone number already registered");
		}

		// Create user with USER role (table management only)
		User user = new User(
				request.fullName(),
				request.email(),
				request.phone(),
				passwordEncoder.encode(request.password()),
				UserRole.USER);

		User savedUser = userRepository.save(user);
		return toResponse(savedUser);
	}

	private UserResponse toResponse(User user) {
		return new UserResponse(
				user.getId(),
				user.getFullName(),
				user.getEmail(),
				user.getPhone(),
				user.getRole(),
				user.isVerified(),
				user.isActive(),
				user.getLastLogin(),
				user.getCreatedAt(),
				user.getUpdatedAt());
	}
}
