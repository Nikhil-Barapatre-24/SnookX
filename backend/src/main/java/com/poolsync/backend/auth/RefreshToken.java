package com.poolsync.backend.auth;

import java.time.LocalDateTime;
import java.util.UUID;

import com.poolsync.backend.user.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

@Entity
@Table(name = "refresh_tokens")
public class RefreshToken {

	@Id
	private UUID id;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "user_id", nullable = false)
	private User user;

	@Column(name = "token_hash", nullable = false, unique = true, length = 64)
	private String tokenHash;

	@Column(name = "expires_at", nullable = false)
	private LocalDateTime expiresAt;

	@Column(name = "revoked_at")
	private LocalDateTime revokedAt;

	@Column(name = "replaced_by_token_hash", length = 64)
	private String replacedByTokenHash;

	@Column(name = "created_at", nullable = false, updatable = false)
	private LocalDateTime createdAt;

	protected RefreshToken() {
	}

	public RefreshToken(User user, String tokenHash, LocalDateTime expiresAt) {
		this.id = UUID.randomUUID();
		this.user = user;
		this.tokenHash = tokenHash;
		this.expiresAt = expiresAt;
	}

	@PrePersist
	void prePersist() {
		this.createdAt = LocalDateTime.now();
	}

	public User getUser() {
		return user;
	}

	public String getTokenHash() {
		return tokenHash;
	}

	public boolean isActive() {
		return revokedAt == null && expiresAt.isAfter(LocalDateTime.now());
	}

	public void revoke(String replacementTokenHash) {
		this.revokedAt = LocalDateTime.now();
		this.replacedByTokenHash = replacementTokenHash;
	}
}
