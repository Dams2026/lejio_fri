@echo off
setlocal

REM One-click launcher for Windows users
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
  echo [autofiq] Node.js mangler. Installer Node.js LTS fra https://nodejs.org/en/download
  pause
  exit /b 1
)

where npm >nul 2>nul
if errorlevel 1 (
  echo [autofiq] npm mangler i PATH. Geninstaller Node.js LTS og genstart terminalen.
  pause
  exit /b 1
)

if not exist package.json (
  echo [autofiq] package.json ikke fundet. Kør filen fra projektets rodmappe.
  pause
  exit /b 1
)

powershell -ExecutionPolicy Bypass -File "%~dp0scripts\start-local-browser.ps1"
set EXIT_CODE=%ERRORLEVEL%

if not "%EXIT_CODE%"=="0" (
  echo.
  echo [autofiq] Opstart fejlede med kode %EXIT_CODE%.
  pause
)

exit /b %EXIT_CODE%
