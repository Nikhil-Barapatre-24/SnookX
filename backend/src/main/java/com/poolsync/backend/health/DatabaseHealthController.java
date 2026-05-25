package com.poolsync.backend.health;

import java.util.Map;

import javax.sql.DataSource;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/health")
public class DatabaseHealthController {

	private final JdbcTemplate jdbcTemplate;

	public DatabaseHealthController(DataSource dataSource) {
		this.jdbcTemplate = new JdbcTemplate(dataSource);
	}

	@GetMapping("/db")
	public Map<String, Object> checkDatabase() {
		Integer result = jdbcTemplate.queryForObject("select 1", Integer.class);

		return Map.of(
				"database", "up",
				"result", result);
	}
}
