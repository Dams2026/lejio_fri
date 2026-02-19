#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

ENV_FILE="${1:-.env.simply}"
REQUIRED_ENV_KEYS=(
  NODE_ENV
  PORT
  SUPABASE_URL
  SUPABASE_ANON_KEY
  SUPABASE_SERVICE_KEY
)

if [ ! -f "$ENV_FILE" ]; then
  echo "❌ Mangler env-fil: $ENV_FILE"
  echo "   Opret den ved at kopiere fra .env.simply.example og tilføje produktion værdier."
  exit 1
fi

echo "✅ Finder env-fil: $ENV_FILE"

for key in "${REQUIRED_ENV_KEYS[@]}"; do
  if ! grep -Eq "^${key}=" "$ENV_FILE"; then
    echo "❌ Mangler nøgle i $ENV_FILE: $key"
    exit 1
  fi
  echo "✅ $key er sat"
done

echo "✅ Kører build check..."
npm run build:simply >/tmp/simply-build.log 2>&1 || {
  echo "❌ Build fejlede. Se /tmp/simply-build.log"
  tail -n 60 /tmp/simply-build.log || true
  exit 1
}

echo "✅ Build success"

if [ ! -f "dist/index.html" ]; then
  echo "❌ dist/index.html mangler efter build"
  exit 1
fi

echo "✅ dist/index.html findes"

echo "🎉 Preflight OK - klar til Simply deploy"
