package com.poolsync.backend.auth;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.poolsync.backend.auth.JwtTokenService.IssuedAccessToken;
import com.poolsync.backend.auth.RefreshTokenService.IssuedRefreshToken;
import com.poolsync.backend.auth.dto.AuthResponse;
import com.poolsync.backend.auth.dto.LoginRequest;
import com.poolsync.backend.auth.dto.RefreshTokenRequest;
import com.poolsync.backend.user.User;
import com.poolsync.backend.user.UserRepository;

@Service
public class AuthService {

	private final UserRepository userRepository;
	private final RefreshTokenRepository refreshTokenRepository;
	private final AuthenticationManager authenticationManager;
	private final JwtTokenService jwtTokenService;
	private final RefreshTokenService refreshTokenService;

	public AuthService(
			UserRepository userRepository,
			RefreshTokenRepository refreshTokenRepository,
			AuthenticationManager authenticationManager,
			JwtTokenService jwtTokenService,
			RefreshTokenService refreshTokenService) {
		this.userRepository = userRepository;
		this.refreshTokenRepository = refreshTokenRepository;
		this.authenticationManager = authenticationManager;
		this.jwtTokenService = jwtTokenService;
		this.refreshTokenService = refreshTokenService;
	}


	@Transactional
	public AuthResponse login(LoginRequest request) {
		String normalizedEmail = normalizeEmail(request.email());
		authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(normalizedEmail, request.password()));

		User user = userRepository.findByEmailIgnoreCase(normalizedEmail)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials"));
		user.markLoggedIn();

		return issueAuthResponse(user);
	}

	@Transactional
	public AuthResponse refresh(RefreshTokenRequest request) {
		String oldTokenHash = refreshTokenService.hashToken(request.refreshToken());
		RefreshToken oldRefreshToken = refreshTokenRepository.findByTokenHash(oldTokenHash)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid refresh token"));

		if (!oldRefreshToken.isActive() || !oldRefreshToken.getUser().isActive()) {
			throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid refresh token");
		}

		User user = oldRefreshToken.getUser();
		IssuedAccessToken accessToken = jwtTokenService.issueAccessToken(user);
		IssuedRefreshToken newRefreshToken = refreshTokenService.issueRefreshToken(user);
		oldRefreshToken.revoke(newRefreshToken.tokenHash());

		return toResponse(user, accessToken, newRefreshToken);
	}

	@Transactional
	public void logout(RefreshTokenRequest request) {
		refreshTokenService.revoke(request.refreshToken());
	}

	private AuthResponse issueAuthResponse(User user) {
		IssuedAccessToken accessToken = jwtTokenService.issueAccessToken(user);
		IssuedRefreshToken refreshToken = refreshTokenService.issueRefreshToken(user);

		return toResponse(user, accessToken, refreshToken);
	}

	private AuthResponse toResponse(User user, IssuedAccessToken accessToken, IssuedRefreshToken refreshToken) {
		return new AuthResponse(
				user.getId(),
				user.getFullName(),
				user.getEmail(),
				user.getRole(),
				"Bearer",
				accessToken.token(),
				accessToken.expiresAt(),
				refreshToken.token(),
				refreshToken.expiresAt());
	}

	private String normalizeEmail(String email) {
		return email.trim().toLowerCase();
	}

	private String normalizePhone(String phone) {
		if (phone == null || phone.isBlank()) {
			return null;
		}
		return phone.trim();
	}
}
