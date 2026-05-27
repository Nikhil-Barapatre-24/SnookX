package com.poolsync.backend.table;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tables")
public class GameTable {

	@Id
	private UUID id;

	@Column(name = "table_number", nullable = false, length = 50)
	private String tableNumber;

	@Column(name = "table_name", length = 100)
	private String tableName;

	@Enumerated(EnumType.STRING)
	@Column(name = "game_type", nullable = false, length = 20)
	private GameType gameType;

	@Column(name = "price_per_hour", nullable = false, precision = 10, scale = 2)
	private BigDecimal pricePerHour;

	@Enumerated(EnumType.STRING)
	@Column(length = 20)
	private TableStatus status;

	@Column(name = "created_by", nullable = false)
	private UUID createdBy;

	@Column(name = "updated_by")
	private UUID updatedBy;

	@Column(name = "is_active")
	private boolean isActive = true;

	@Column(name = "created_at", insertable = false, updatable = false)
	private Instant createdAt;

	@Column(name = "updated_at", insertable = false, updatable = false)
	private Instant updatedAt;

	public GameTable() {
	}

	public GameTable(UUID id, String tableNumber, String tableName, GameType gameType, BigDecimal pricePerHour, UUID createdBy) {
		this.id = id;
		this.tableNumber = tableNumber;
		this.tableName = tableName;
		this.gameType = gameType;
		this.pricePerHour = pricePerHour;
		this.status = TableStatus.AVAILABLE;
		this.createdBy = createdBy;
		this.isActive = true;
	}

	public UUID getId() {
		return id;
	}

	public String getTableNumber() {
		return tableNumber;
	}

	public void setTableNumber(String tableNumber) {
		this.tableNumber = tableNumber;
	}

	public String getTableName() {
		return tableName;
	}

	public void setTableName(String tableName) {
		this.tableName = tableName;
	}

	public GameType getGameType() {
		return gameType;
	}

	public void setGameType(GameType gameType) {
		this.gameType = gameType;
	}

	public BigDecimal getPricePerHour() {
		return pricePerHour;
	}

	public void setPricePerHour(BigDecimal pricePerHour) {
		this.pricePerHour = pricePerHour;
	}

	public TableStatus getStatus() {
		return status;
	}

	public void setStatus(TableStatus status) {
		this.status = status;
	}

	public UUID getCreatedBy() {
		return createdBy;
	}

	public UUID getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(UUID updatedBy) {
		this.updatedBy = updatedBy;
	}

	public boolean isActive() {
		return isActive;
	}

	public void setActive(boolean active) {
		isActive = active;
	}

	public Instant getCreatedAt() {
		return createdAt;
	}

	public Instant getUpdatedAt() {
		return updatedAt;
	}
}
