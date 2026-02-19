#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT_DIR"

echo "🚀 Starting AUTOFIQ on Simply.com"
echo "📁 Root: $ROOT_DIR"
echo "📦 Node: $(node --version)"

if [ ! -f package.json ]; then
  echo "❌ package.json not found"
  exit 1
fi

if [ ! -d node_modules ]; then
  echo "📥 Installing dependencies..."
  npm ci --legacy-peer-deps || npm install --legacy-peer-deps || npm install
fi

if [ ! -f dist/index.html ]; then
  echo "🏗️ dist/index.html missing, building app..."
  npm run build
fi

echo "✅ Build is ready"
exec node api/server.js
