#!/usr/bin/env bash
set -euo pipefail

API_PORT="${API_PORT:-3010}"
WEB_PORT="${WEB_PORT:-4173}"

cleanup() {
  if [[ -n "${API_PID:-}" ]] && kill -0 "$API_PID" 2>/dev/null; then
    kill "$API_PID" >/dev/null 2>&1 || true
  fi
}

trap cleanup EXIT INT TERM

echo "[autofiq] Starting local API on port ${API_PORT} ..."
PORT="$API_PORT" node api/server.js >/tmp/autofiq-api.log 2>&1 &
API_PID=$!

# Give API a short boot window before starting Vite
sleep 1

echo "[autofiq] API log: /tmp/autofiq-api.log"
echo "[autofiq] Starting Vite on http://localhost:${WEB_PORT} ..."
echo "[autofiq] Press Ctrl+C to stop both servers"

VITE_API_PROXY_TARGET="http://127.0.0.1:${API_PORT}" npm run dev -- --host 0.0.0.0 --port "$WEB_PORT"
