package com.poolsync.backend.table;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TableSessionRepository extends JpaRepository<TableSession, UUID> {

	Optional<TableSession> findByTableIdAndEndTimeIsNull(UUID tableId);
}
