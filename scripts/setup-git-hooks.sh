#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(git rev-parse --show-toplevel)"

cd "${ROOT_DIR}"
chmod +x .githooks/pre-commit scripts/pre-commit-builds.sh
git config core.hooksPath .githooks

echo "Git hooks configured from .githooks"
