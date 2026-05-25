#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(git rev-parse --show-toplevel)"
STAGED_FILES="$(git diff --cached --name-only --diff-filter=ACMR)"

if [[ -z "${STAGED_FILES}" ]]; then
  echo "No staged files to check."
  exit 0
fi

has_staged_change_in() {
  local directory="$1"
  grep -qE "^${directory}/" <<< "${STAGED_FILES}"
}

run_backend_checks() {
  echo "Running backend build checks..."
  (
    cd "${ROOT_DIR}/backend"
    ./mvnw test
  )
}

run_web_checks() {
  echo "Running web build checks..."
  (
    cd "${ROOT_DIR}/web"
    npm run build
  )
}

run_mobile_checks() {
  echo "Running mobile build checks..."
  (
    cd "${ROOT_DIR}/mobile"
    npm run build
  )
}

ran_checks=false

if has_staged_change_in "backend"; then
  run_backend_checks
  ran_checks=true
fi

if has_staged_change_in "web"; then
  run_web_checks
  ran_checks=true
fi

if has_staged_change_in "mobile"; then
  run_mobile_checks
  ran_checks=true
fi

if [[ "${ran_checks}" == "false" ]]; then
  echo "No staged backend, web, or mobile changes to check."
fi
