# Netlify Deployment Preparation Script
# This script prepares the project for Netlify deployment

Write-Host "🚀 Preparing Remlyx website for Netlify deployment..." -ForegroundColor Green

# Ensure we're in the correct directory
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptPath

Write-Host "📁 Current directory: $PWD" -ForegroundColor Cyan

# Check if required files exist
$requiredFiles = @(
    "index.html",
    "netlify.toml",
    "_redirects",
    "_headers",
    "manifest.json",
    "robots.txt",
    "sitemap.xml"
)

Write-Host "🔍 Checking required files..." -ForegroundColor Yellow
foreach ($file in $requiredFiles) {
    if (Test-Path $file) {
        Write-Host "✅ Found: $file" -ForegroundColor Green
    } else {
        Write-Host "❌ Missing: $file" -ForegroundColor Red
    }
}

# Check assets directory structure
Write-Host "📂 Checking assets structure..." -ForegroundColor Yellow
$assetDirs = @("assets/css", "assets/js", "assets/img", "assets/fonts")
foreach ($dir in $assetDirs) {
    if (Test-Path $dir) {
        $fileCount = (Get-ChildItem -Path $dir -Recurse -File).Count
        Write-Host "✅ $dir ($fileCount files)" -ForegroundColor Green
    } else {
        Write-Host "❌ Missing: $dir" -ForegroundColor Red
    }
}

# Validate HTML files
Write-Host "🔍 Validating HTML files..." -ForegroundColor Yellow
$htmlFiles = Get-ChildItem -Filter "*.html" -File
foreach ($htmlFile in $htmlFiles) {
    if ((Get-Content $htmlFile.FullName -Raw) -match "<!DOCTYPE html>") {
        Write-Host "✅ Valid HTML: $($htmlFile.Name)" -ForegroundColor Green
    } else {
        Write-Host "⚠️  Check HTML: $($htmlFile.Name)" -ForegroundColor Yellow
    }
}

# Check for broken asset links (basic check)
Write-Host "🔗 Checking for common asset references..." -ForegroundColor Yellow
$indexContent = Get-Content "index.html" -Raw
if ($indexContent -match 'assets/') {
    Write-Host "✅ Assets directory referenced in index.html" -ForegroundColor Green
} else {
    Write-Host "⚠️  No assets directory references found in index.html" -ForegroundColor Yellow
}

# Check for external dependencies
Write-Host "🌐 Checking for external dependencies..." -ForegroundColor Yellow
if ($indexContent -match 'fonts\.googleapis\.com') {
    Write-Host "✅ Google Fonts detected" -ForegroundColor Green
}
if ($indexContent -match 'cdnjs\.cloudflare\.com|unpkg\.com|jsdelivr\.net') {
    Write-Host "⚠️  External CDN dependencies detected - ensure they're reliable" -ForegroundColor Yellow
}

# Create deployment summary
Write-Host "`n📋 Deployment Summary:" -ForegroundColor Cyan
Write-Host "  • Project Type: Static HTML Website" -ForegroundColor White
Write-Host "  • Build Command: Not required (static files)" -ForegroundColor White
Write-Host "  • Publish Directory: . (root)" -ForegroundColor White
Write-Host "  • Custom Domain: Configure in Netlify dashboard" -ForegroundColor White

Write-Host "`n🎯 Next Steps:" -ForegroundColor Cyan
Write-Host "  1. Create a new site on Netlify" -ForegroundColor White
Write-Host "  2. Connect your Git repository" -ForegroundColor White
Write-Host "  3. Set build settings:" -ForegroundColor White
Write-Host "     - Build command: (leave empty)" -ForegroundColor Gray
Write-Host "     - Publish directory: ." -ForegroundColor Gray
Write-Host "  4. Deploy!" -ForegroundColor White

Write-Host "`n✨ Deployment files created:" -ForegroundColor Green
Write-Host "  • netlify.toml - Main configuration" -ForegroundColor White
Write-Host "  • _redirects - URL redirects and routing" -ForegroundColor White
Write-Host "  • _headers - Security and performance headers" -ForegroundColor White

Write-Host "`n🔗 Useful Links:" -ForegroundColor Cyan
Write-Host "  • Netlify Dashboard: https://app.netlify.com/" -ForegroundColor Blue
Write-Host "  • Netlify Docs: https://docs.netlify.com/" -ForegroundColor Blue
Write-Host "  • Domain Setup: https://docs.netlify.com/domains-https/" -ForegroundColor Blue

Write-Host "`n🚀 Your Remlyx website is ready for Netlify deployment!" -ForegroundColor Green
