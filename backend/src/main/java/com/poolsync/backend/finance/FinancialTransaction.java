package com.poolsync.backend.finance;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.Table;
import jakarta.persistence.Table;

@Entity
@Table(name = "financial_transactions", indexes = {
	@Index(name = "idx_financial_transactions_transaction_id", columnList = "transaction_id"),
	@Index(name = "idx_financial_transactions_customer_phone", columnList = "customer_phone"),
	@Index(name = "idx_financial_transactions_table_id", columnList = "table_id"),
	@Index(name = "idx_financial_transactions_transaction_date", columnList = "transaction_date"),
	@Index(name = "idx_financial_transactions_payment_status", columnList = "payment_status"),
	@Index(name = "idx_financial_transactions_created_at", columnList = "created_at")
})
public class FinancialTransaction {

	@Id
	private UUID id;

	@Column(name = "transaction_id", unique = true, nullable = false, length = 50)
	private String transactionId;

	@Column(name = "customer_name", nullable = false)
	private String customerName;

	@Column(name = "customer_phone", nullable = false, length = 20)
	private String customerPhone;

	@Column(name = "table_id", nullable = false)
	private UUID tableId;

	@Column(name = "table_number", nullable = false, length = 50)
	private String tableNumber;

	@Column(name = "table_name", nullable = false)
	private String tableName;

	@Column(name = "session_id")
	private UUID sessionId;

	@Column(name = "start_time", nullable = false)
	private Instant startTime;

	@Column(name = "end_time", nullable = false)
	private Instant endTime;

	@Column(name = "duration_minutes", nullable = false)
	private Long durationMinutes;

	@Column(name = "price_per_hour", nullable = false, precision = 10, scale = 2)
	private BigDecimal pricePerHour;

	@Column(name = "expected_amount", nullable = false, precision = 10, scale = 2)
	private BigDecimal expectedAmount;

	@Column(name = "actual_amount", nullable = false, precision = 10, scale = 2)
	private BigDecimal actualAmount;

	@Column(name = "difference", nullable = false, precision = 10, scale = 2)
	private BigDecimal difference;

	@Enumerated(EnumType.STRING)
	@Column(name = "payment_method", nullable = false, length = 20)
	private FinancePaymentMethod paymentMethod;

	@Enumerated(EnumType.STRING)
	@Column(name = "payment_status", nullable = false, length = 20)
	private PaymentStatus paymentStatus;

	@Column(name = "transaction_date", nullable = false)
	private LocalDate transactionDate;

	@Column(name = "reference_number", length = 100)
	private String referenceNumber;

	@Column(name = "notes", columnDefinition = "TEXT")
	private String notes;

	@Column(name = "created_by", nullable = false)
	private UUID createdBy;

	@Column(name = "updated_by")
	private UUID updatedBy;

	@Column(name = "created_at", insertable = false, updatable = false)
	private Instant createdAt;

	@Column(name = "updated_at", insertable = false, updatable = false)
	private Instant updatedAt;

	public FinancialTransaction() {
	}

	public FinancialTransaction(UUID id, String transactionId, String customerName, String customerPhone,
			UUID tableId, String tableNumber, String tableName, UUID sessionId, Instant startTime, Instant endTime,
			Long durationMinutes, BigDecimal pricePerHour, BigDecimal expectedAmount, BigDecimal actualAmount,
			BigDecimal difference, FinancePaymentMethod paymentMethod, PaymentStatus paymentStatus,
			LocalDate transactionDate, UUID createdBy) {
		this.id = id;
		this.transactionId = transactionId;
		this.customerName = customerName;
		this.customerPhone = customerPhone;
		this.tableId = tableId;
		this.tableNumber = tableNumber;
		this.tableName = tableName;
		this.sessionId = sessionId;
		this.startTime = startTime;
		this.endTime = endTime;
		this.durationMinutes = durationMinutes;
		this.pricePerHour = pricePerHour;
		this.expectedAmount = expectedAmount;
		this.actualAmount = actualAmount;
		this.difference = difference;
		this.paymentMethod = paymentMethod;
		this.paymentStatus = paymentStatus;
		this.transactionDate = transactionDate;
		this.createdBy = createdBy;
	}

	// Getters and Setters
	public UUID getId() {
		return id;
	}

	public void setId(UUID id) {
		this.id = id;
	}

	public String getTransactionId() {
		return transactionId;
	}

	public void setTransactionId(String transactionId) {
		this.transactionId = transactionId;
	}

	public String getCustomerName() {
		return customerName;
	}

	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}

	public String getCustomerPhone() {
		return customerPhone;
	}

	public void setCustomerPhone(String customerPhone) {
		this.customerPhone = customerPhone;
	}

	public UUID getTableId() {
		return tableId;
	}

	public void setTableId(UUID tableId) {
		this.tableId = tableId;
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

	public UUID getSessionId() {
		return sessionId;
	}

	public void setSessionId(UUID sessionId) {
		this.sessionId = sessionId;
	}

	public Instant getStartTime() {
		return startTime;
	}

	public void setStartTime(Instant startTime) {
		this.startTime = startTime;
	}

	public Instant getEndTime() {
		return endTime;
	}

	public void setEndTime(Instant endTime) {
		this.endTime = endTime;
	}

	public Long getDurationMinutes() {
		return durationMinutes;
	}

	public void setDurationMinutes(Long durationMinutes) {
		this.durationMinutes = durationMinutes;
	}

	public BigDecimal getPricePerHour() {
		return pricePerHour;
	}

	public void setPricePerHour(BigDecimal pricePerHour) {
		this.pricePerHour = pricePerHour;
	}

	public BigDecimal getExpectedAmount() {
		return expectedAmount;
	}

	public void setExpectedAmount(BigDecimal expectedAmount) {
		this.expectedAmount = expectedAmount;
	}

	public BigDecimal getActualAmount() {
		return actualAmount;
	}

	public void setActualAmount(BigDecimal actualAmount) {
		this.actualAmount = actualAmount;
	}

	public BigDecimal getDifference() {
		return difference;
	}

	public void setDifference(BigDecimal difference) {
		this.difference = difference;
	}

	public FinancePaymentMethod getPaymentMethod() {
		return paymentMethod;
	}

	public void setPaymentMethod(FinancePaymentMethod paymentMethod) {
		this.paymentMethod = paymentMethod;
	}

	public PaymentStatus getPaymentStatus() {
		return paymentStatus;
	}

	public void setPaymentStatus(PaymentStatus paymentStatus) {
		this.paymentStatus = paymentStatus;
	}

	public LocalDate getTransactionDate() {
		return transactionDate;
	}

	public void setTransactionDate(LocalDate transactionDate) {
		this.transactionDate = transactionDate;
	}

	public String getReferenceNumber() {
		return referenceNumber;
	}

	public void setReferenceNumber(String referenceNumber) {
		this.referenceNumber = referenceNumber;
	}

	public String getNotes() {
		return notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}

	public UUID getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(UUID createdBy) {
		this.createdBy = createdBy;
	}

	public UUID getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(UUID updatedBy) {
		this.updatedBy = updatedBy;
	}

	public Instant getCreatedAt() {
		return createdAt;
	}

	public Instant getUpdatedAt() {
		return updatedAt;
	}
}
