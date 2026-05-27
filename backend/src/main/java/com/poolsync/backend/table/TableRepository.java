package com.poolsync.backend.table;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TableRepository extends JpaRepository<GameTable, UUID> {
    Page<GameTable> findByIsActiveTrue(Pageable pageable);

    @Query("SELECT t FROM GameTable t WHERE t.isActive = true AND " +
            "(LOWER(t.tableNumber) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "LOWER(t.tableName) LIKE LOWER(CONCAT('%', :query, '%')))")
    Page<GameTable> searchActiveTables(@Param("query") String query, Pageable pageable);

    List<GameTable> findByTableNumberIgnoreCaseAndIsActiveTrue(String tableNumber);

    List<GameTable> findByTableNameIgnoreCaseAndIsActiveTrue(String tableName);
}
