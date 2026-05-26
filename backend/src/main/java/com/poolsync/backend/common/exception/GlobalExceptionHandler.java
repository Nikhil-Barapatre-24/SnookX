package com.poolsync.backend.common.exception;

import java.time.Instant;
import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;

import jakarta.servlet.http.HttpServletRequest;

@RestControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(ResponseStatusException.class)
	public ResponseEntity<Map<String, Object>> handleResponseStatus(
			ResponseStatusException ex, HttpServletRequest request) {

		Map<String, Object> body = new LinkedHashMap<>();
		body.put("timestamp", Instant.now().toString());
		body.put("status", ex.getStatusCode().value());
		body.put("error", ex.getReason() != null ? ex.getReason() : ex.getMessage());
		body.put("path", request.getRequestURI());

		return ResponseEntity.status(ex.getStatusCode()).body(body);
	}
}
