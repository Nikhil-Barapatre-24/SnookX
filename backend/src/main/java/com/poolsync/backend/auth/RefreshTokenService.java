package com.poolsync.backend.auth;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.HexFormat;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.poolsync.backend.user.User;

@Service
public class RefreshTokenService {

	private static final int TOKEN_BYTE_LENGTH = 64;

	private final SecureRandom secureRandom = new SecureRandom();
	private final RefreshTokenRepository refreshTokenRepository;
	private final JwtProperties jwtProperties;

	public RefreshTokenService(RefreshTokenRepository refreshTokenRepository, JwtProperties jwtProperties) {
		this.refreshTokenRepository = refreshTokenRepository;
		this.jwtProperties = jwtProperties;
	}

	@Transactional
	public IssuedRefreshToken issueRefreshToken(User user) {
		String rawToken = generateToken();
		String tokenHash = hashToken(rawToken);
		LocalDateTime expiresAt = LocalDateTime.now().plusDays(jwtProperties.refreshTokenTtlDays());

		refreshTokenRepository.save(new RefreshToken(user, tokenHash, expiresAt));

		return new IssuedRefreshToken(rawToken, tokenHash, expiresAt);
	}

	@Transactional
	public void revoke(String rawToken) {
		refreshTokenRepository.findByTokenHash(hashToken(rawToken))
				.ifPresent(refreshToken -> refreshToken.revoke(null));
	}

	public String hashToken(String rawToken) {
		try {
			MessageDigest digest = MessageDigest.getInstance("SHA-256");
			byte[] hash = digest.digest(rawToken.getBytes(StandardCharsets.UTF_8));
			return HexFormat.of().formatHex(hash);
		}
		catch (NoSuchAlgorithmException exception) {
			throw new IllegalStateException("SHA-256 hashing is not available", exception);
		}
	}

	private String generateToken() {
		byte[] bytes = new byte[TOKEN_BYTE_LENGTH];
		secureRandom.nextBytes(bytes);
		return java.util.Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
	}

	public record IssuedRefreshToken(String token, String tokenHash, LocalDateTime expiresAt) {
	}
}
