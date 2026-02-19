param(
  [int]$ApiPort = 3010,
  [int]$WebPort = 4173
)

$ErrorActionPreference = 'Stop'

function Require-Command([string]$Name, [string]$InstallHint) {
  if (-not (Get-Command $Name -ErrorAction SilentlyContinue)) {
    Write-Host "[autofiq] '$Name' was not found in PATH." -ForegroundColor Red
    Write-Host $InstallHint -ForegroundColor Yellow
    exit 1
  }
}

if (-not (Test-Path "./package.json")) {
  Write-Host "[autofiq] Run this script from the project root (folder containing package.json)." -ForegroundColor Red
  exit 1
}

Require-Command -Name 'node' -InstallHint 'Install Node.js LTS from https://nodejs.org/en/download and reopen PowerShell.'
Require-Command -Name 'npm' -InstallHint 'npm is installed with Node.js. Reinstall Node.js LTS and reopen PowerShell.'

if (-not (Test-Path "./node_modules")) {
  Write-Host "[autofiq] Installing dependencies (npm install)..." -ForegroundColor Cyan
  npm install
}

Write-Host "[autofiq] Starting local API on port $ApiPort ..." -ForegroundColor Cyan
$apiCommand = "set PORT=$ApiPort && node api/server.js"
$apiProcess = Start-Process cmd.exe -ArgumentList '/c', $apiCommand -NoNewWindow -PassThru -WorkingDirectory (Get-Location) -RedirectStandardOutput "$env:TEMP/autofiq-api.log" -RedirectStandardError "$env:TEMP/autofiq-api.log"

Start-Sleep -Seconds 1

Write-Host "[autofiq] API log: $env:TEMP/autofiq-api.log" -ForegroundColor DarkGray
Write-Host "[autofiq] Starting Vite on http://localhost:$WebPort ..." -ForegroundColor Cyan
Write-Host "[autofiq] Press Ctrl+C to stop. API process will be stopped automatically." -ForegroundColor Cyan

try {
  $env:VITE_API_PROXY_TARGET = "http://127.0.0.1:$ApiPort"
  npm run dev -- --host 0.0.0.0 --port $WebPort
}
finally {
  if ($apiProcess -and -not $apiProcess.HasExited) {
    Stop-Process -Id $apiProcess.Id -Force
  }
}
