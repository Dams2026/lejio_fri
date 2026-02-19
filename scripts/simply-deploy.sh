#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

SIMPLY_HOST="${SIMPLY_HOST:-}"
SIMPLY_USER="${SIMPLY_USER:-}"
SIMPLY_APP_DIR="${SIMPLY_APP_DIR:-}"
SIMPLY_SSH_PORT="${SIMPLY_SSH_PORT:-22}"
ENV_FILE="${ENV_FILE:-.env.simply}"
REMOTE_ENV_FILE="${REMOTE_ENV_FILE:-.env}"

if [ -z "$SIMPLY_HOST" ] || [ -z "$SIMPLY_USER" ] || [ -z "$SIMPLY_APP_DIR" ]; then
  echo "❌ Sæt SIMPLY_HOST, SIMPLY_USER og SIMPLY_APP_DIR før deploy."
  exit 1
fi

if [ ! -f "$ENV_FILE" ]; then
  echo "❌ Env-fil ikke fundet: $ENV_FILE"
  exit 1
fi

echo "🚀 Starter preflight..."
bash scripts/simply-preflight.sh "$ENV_FILE"

echo "📦 Pakker release..."
rm -f /tmp/autofiq_release.tgz
tar --exclude='.git' --exclude='node_modules' --exclude='dist' -czf /tmp/autofiq_release.tgz .

echo "📤 Opretter remote mappe..."
ssh -p "$SIMPLY_SSH_PORT" "$SIMPLY_USER@$SIMPLY_HOST" "mkdir -p '$SIMPLY_APP_DIR'"

echo "📤 Uploader release..."
scp -P "$SIMPLY_SSH_PORT" /tmp/autofiq_release.tgz "$SIMPLY_USER@$SIMPLY_HOST:$SIMPLY_APP_DIR/release.tgz"
scp -P "$SIMPLY_SSH_PORT" "$ENV_FILE" "$SIMPLY_USER@$SIMPLY_HOST:$SIMPLY_APP_DIR/$REMOTE_ENV_FILE"

echo "🛠️ Deployer på server..."
ssh -p "$SIMPLY_SSH_PORT" "$SIMPLY_USER@$SIMPLY_HOST" "
  set -euo pipefail
  cd '$SIMPLY_APP_DIR'
  tar -xzf release.tgz
  npm ci --legacy-peer-deps || npm install --legacy-peer-deps || npm install
  npm run build:simply
  if command -v pm2 >/dev/null 2>&1; then
    pm2 delete autofiq >/dev/null 2>&1 || true
    pm2 start simply-start.sh --name autofiq --interpreter bash
    pm2 save
  else
    nohup bash simply-start.sh > app.log 2>&1 &
  fi
"

echo "✅ Deploy færdig til $SIMPLY_HOST"
