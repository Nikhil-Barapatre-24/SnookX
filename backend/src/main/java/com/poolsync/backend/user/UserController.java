package com.poolsync.backend.user;

import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poolsync.backend.user.dto.CreateUserRequest;
import com.poolsync.backend.user.dto.UserResponse;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/users")
public class UserController {

	private final UserService userService;

	public UserController(UserService userService) {
		this.userService = userService;
	}

	@PostMapping
	@PreAuthorize("hasRole('OWNER')")
	public ResponseEntity<UserResponse> createUser(@Valid @RequestBody CreateUserRequest request,
			Authentication auth) {
		UUID creatorId = getUserId(auth);
		UserResponse response = userService.createUser(request, creatorId);
		return ResponseEntity.status(HttpStatus.CREATED).body(response);
	}

	private UUID getUserId(Authentication auth) {
		return UUID.fromString(auth.getName());
	}
}
