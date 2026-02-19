#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

DEFAULT_HOST="linux189.unoeuro.com"
DEFAULT_USER="autofiq.dk"
DEFAULT_PORT="22"
DEFAULT_APP_DIR="/home/autofiq.dk/autofiq"
DEFAULT_ENV_FILE=".env.simply"

read -r -p "Simply host [$DEFAULT_HOST]: " INPUT_HOST
read -r -p "Simply user [$DEFAULT_USER]: " INPUT_USER
read -r -p "Simply app dir [$DEFAULT_APP_DIR]: " INPUT_APP_DIR
read -r -p "SSH port [$DEFAULT_PORT]: " INPUT_PORT
read -r -p "Env file [$DEFAULT_ENV_FILE]: " INPUT_ENV

export SIMPLY_HOST="${INPUT_HOST:-$DEFAULT_HOST}"
export SIMPLY_USER="${INPUT_USER:-$DEFAULT_USER}"
export SIMPLY_APP_DIR="${INPUT_APP_DIR:-$DEFAULT_APP_DIR}"
export SIMPLY_SSH_PORT="${INPUT_PORT:-$DEFAULT_PORT}"
export ENV_FILE="${INPUT_ENV:-$DEFAULT_ENV_FILE}"

if [ ! -f "$ENV_FILE" ]; then
  echo "❌ Mangler $ENV_FILE. Kopiér først template: cp .env.simply.example .env.simply"
  exit 1
fi

echo ""
echo "Klar til deploy med:"
echo "  SIMPLY_HOST=$SIMPLY_HOST"
echo "  SIMPLY_USER=$SIMPLY_USER"
echo "  SIMPLY_APP_DIR=$SIMPLY_APP_DIR"
echo "  SIMPLY_SSH_PORT=$SIMPLY_SSH_PORT"
echo "  ENV_FILE=$ENV_FILE"
echo ""
read -r -p "Fortsæt deploy? (yes/no): " CONFIRM

if [ "$CONFIRM" != "yes" ]; then
  echo "Annulleret."
  exit 0
fi

bash scripts/simply-deploy.sh
