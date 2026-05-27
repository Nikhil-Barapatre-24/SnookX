package com.poolsync.backend.finance;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface FinancialTransactionRepository extends JpaRepository<FinancialTransaction, UUID> {

	Optional<FinancialTransaction> findByTransactionId(String transactionId);

	Page<FinancialTransaction> findByCustomerPhone(String customerPhone, Pageable pageable);

	Page<FinancialTransaction> findByTableId(UUID tableId, Pageable pageable);

	Page<FinancialTransaction> findByTransactionDate(LocalDate transactionDate, Pageable pageable);

	Page<FinancialTransaction> findByPaymentStatus(PaymentStatus paymentStatus, Pageable pageable);

	@Query("SELECT f FROM FinancialTransaction f WHERE " +
			"(:customerPhone IS NULL OR f.customerPhone LIKE %:customerPhone%) AND " +
			"(:tableId IS NULL OR f.tableId = :tableId) AND " +
			"(:paymentStatus IS NULL OR f.paymentStatus = :paymentStatus) AND " +
			"(:startDate IS NULL OR f.transactionDate >= :startDate) AND " +
			"(:endDate IS NULL OR f.transactionDate <= :endDate)")
	Page<FinancialTransaction> searchTransactions(
			@Param("customerPhone") String customerPhone,
			@Param("tableId") UUID tableId,
			@Param("paymentStatus") PaymentStatus paymentStatus,
			@Param("startDate") LocalDate startDate,
			@Param("endDate") LocalDate endDate,
			Pageable pageable);

	@Query("SELECT COALESCE(SUM(f.actualAmount), 0) FROM FinancialTransaction f WHERE f.transactionDate = :date AND f.paymentStatus = 'COMPLETED'")
	BigDecimal sumActualAmountByDate(@Param("date") LocalDate date);

	@Query("SELECT COALESCE(SUM(f.actualAmount), 0) FROM FinancialTransaction f WHERE f.transactionDate >= :startDate AND f.transactionDate <= :endDate AND f.paymentStatus = 'COMPLETED'")
	BigDecimal sumActualAmountBetweenDates(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);

	@Query("SELECT COALESCE(SUM(f.actualAmount), 0) FROM FinancialTransaction f WHERE EXTRACT(YEAR FROM f.transactionDate) = :year AND f.paymentStatus = 'COMPLETED'")
	BigDecimal sumActualAmountByYear(@Param("year") int year);

	@Query("SELECT COALESCE(SUM(f.actualAmount), 0) FROM FinancialTransaction f WHERE f.paymentStatus = 'COMPLETED'")
	BigDecimal sumAllActualAmount();
}
