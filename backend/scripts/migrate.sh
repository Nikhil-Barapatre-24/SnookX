#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"

DB_URL="${DB_URL:-jdbc:postgresql://localhost:5432/poolsync}"
DB_USERNAME="${DB_USERNAME:-poolsync}"
DB_PASSWORD="${DB_PASSWORD:-poolsync}"

cd "${BACKEND_DIR}"

./mvnw org.flywaydb:flyway-maven-plugin:11.7.2:migrate \
  -Dflyway.url="${DB_URL}" \
  -Dflyway.user="${DB_USERNAME}" \
  -Dflyway.password="${DB_PASSWORD}" \
  -Dflyway.locations="filesystem:src/main/resources/db/migration"
