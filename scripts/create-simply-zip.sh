#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

OUT_DIR="${1:-build-artifacts}"
TS="$(date +%Y%m%d-%H%M%S)"
OUT_FILE="$OUT_DIR/autofiq_simply_deploy_${TS}.zip"

mkdir -p "$OUT_DIR"

zip -rq "$OUT_FILE" . \
  -x ".git/*" \
  -x "node_modules/*" \
  -x "dist/*" \
  -x "build-artifacts/*" \
  -x "*.log" \
  -x ".env" \
  -x ".env.local" \
  -x ".env.simply" \
  -x ".env.production"

echo "$OUT_FILE"
