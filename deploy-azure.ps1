#!/usr/bin/env pwsh
<#
.SYNOPSIS
Quick deployment script for AUTOFIQ on Azure using AZD
.DESCRIPTION
One-command deployment of entire infrastructure using Azure Developer CLI
#>

$ErrorActionPreference = "Stop"

Write-Host "🚀 AUTOFIQ - Azure Deployment Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check prerequisites
Write-Host "📋 Checking prerequisites..." -ForegroundColor Yellow

$checks = @{
    "Azure CLI" = "az --version"
    "Azure Developer CLI" = "azd --version"
    "Node.js" = "node --version"
}

foreach ($check in $checks.GetEnumerator()) {
    try {
        Invoke-Expression $check.Value | Out-Null
        Write-Host "✅ $($check.Key) - OK" -ForegroundColor Green
    } catch {
        Write-Host "❌ $($check.Key) - NOT FOUND" -ForegroundColor Red
        Write-Host "   Install from: https://learn.microsoft.com/en-us/azure/developer/azure-developer-cli/install-azd" -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "✅ All prerequisites found!" -ForegroundColor Green
Write-Host ""

# Login
Write-Host "🔐 Azure Login..." -ForegroundColor Yellow
az login | Out-Null
azd auth login | Out-Null
Write-Host "✅ Logged in to Azure" -ForegroundColor Green
Write-Host ""

# Initialize
Write-Host "⚙️  Initializing AZD project..." -ForegroundColor Yellow
azd init
Write-Host ""

# Provision
Write-Host "🏗️  Provisioning Azure infrastructure..." -ForegroundColor Yellow
Write-Host "   (This will take 5-10 minutes...)" -ForegroundColor Gray
Write-Host ""

$null = azd provision --preview
if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Preview successful!" -ForegroundColor Green
    Write-Host "Review the resources above and press Enter to continue, or Ctrl+C to cancel..."
    Read-Host
    
    Write-Host ""
    Write-Host "🏗️  Creating resources..." -ForegroundColor Cyan
    azd provision
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "✅ Infrastructure provisioned!" -ForegroundColor Green
    } else {
        Write-Host "❌ Provisioning failed!" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "❌ Preview failed!" -ForegroundColor Red
    exit 1
}

# Deploy
Write-Host ""
Write-Host "📦 Deploying application..." -ForegroundColor Yellow
Write-Host "   (This will take 2-3 minutes...)" -ForegroundColor Gray

azd deploy

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Application deployed!" -ForegroundColor Green
} else {
    Write-Host "❌ Deployment failed!" -ForegroundColor Red
    exit 1
}

# Show details
Write-Host ""
Write-Host "📊 Deployment Complete!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

azd show

Write-Host ""
Write-Host "🌐 Your app is now live!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next Steps:" -ForegroundColor Yellow
Write-Host "   1. Wait 2-3 minutes for Static Web App to fully deploy"
Write-Host "   2. Visit your app URL above"
Write-Host "   3. Run database migrations:"
Write-Host ""
Write-Host "   sqlcmd -S '<server>.database.windows.net' -U sqladmin -P '<password>' -d 'autofiq' -i 'infra/migrations/001-init-fri-schema.sql'" -ForegroundColor Cyan
Write-Host ""
Write-Host "📚 Full guide: AZURE_SETUP_GUIDE.md" -ForegroundColor Gray
Write-Host ""
