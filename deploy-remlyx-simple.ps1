# Simple Remlyx.com Deployment Script
Write-Host "🚀 Remlyx.com Deployment Script" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Cyan

# Check deployment readiness
Write-Host "`n🔍 Deployment Readiness Check:" -ForegroundColor Yellow
$ready = $true

# Check required files
$requiredFiles = @("index.html", "netlify.toml", "_redirects", "_headers")
foreach ($file in $requiredFiles) {
    if (Test-Path $file) {
        Write-Host "✅ $file" -ForegroundColor Green
    } else {
        Write-Host "❌ $file" -ForegroundColor Red
        $ready = $false
    }
}

# Check assets
if (Test-Path "assets") {
    Write-Host "✅ assets/ directory" -ForegroundColor Green
} else {
    Write-Host "❌ assets/ directory missing" -ForegroundColor Red
    $ready = $false
}

# Check HTML pages
$htmlFiles = Get-ChildItem -Filter "*.html" -File | Where-Object { 
    $_.Name -notlike "*demo*" -and $_.Name -notlike "*test*" -and $_.Name -notlike "*backup*"
}
Write-Host "✅ Found $($htmlFiles.Count) main HTML pages" -ForegroundColor Green

if ($ready) {
    Write-Host "`n🎉 Your Remlyx website is ready for deployment!" -ForegroundColor Green
    Write-Host "   Follow the steps below to deploy to remlyx.com" -ForegroundColor White
} else {
    Write-Host "`n⚠️  Please fix the missing files before deployment" -ForegroundColor Yellow
}

# Deployment instructions
Write-Host "`n🎯 Deployment Instructions for remlyx.com:" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor White

Write-Host "`n1️⃣  NETLIFY DEPLOYMENT (Recommended):" -ForegroundColor Green
Write-Host "   • Go to: https://app.netlify.com/" -ForegroundColor White
Write-Host "   • Click 'New site from Git'" -ForegroundColor White
Write-Host "   • Connect your Git repository" -ForegroundColor White
Write-Host "   • Build settings:" -ForegroundColor White
Write-Host "     - Build command: (leave empty)" -ForegroundColor Gray
Write-Host "     - Publish directory: ." -ForegroundColor Gray
Write-Host "   • Click 'Deploy site'" -ForegroundColor White

Write-Host "`n2️⃣  CONNECT remlyx.com DOMAIN:" -ForegroundColor Green
Write-Host "   • In Netlify Dashboard → Domain management" -ForegroundColor White
Write-Host "   • Click 'Add custom domain'" -ForegroundColor White
Write-Host "   • Enter: remlyx.com" -ForegroundColor White
Write-Host "   • Configure DNS: CNAME remlyx.com → yoursite.netlify.app" -ForegroundColor Gray

Write-Host "`n3️⃣  POST-DEPLOYMENT:" -ForegroundColor Green
Write-Host "   • Test all pages and functionality" -ForegroundColor White
Write-Host "   • Verify mobile navigation works" -ForegroundColor White
Write-Host "   • Check contact forms" -ForegroundColor White
Write-Host "   • Test on multiple devices" -ForegroundColor White

Write-Host "`n📚 For detailed instructions, see: REMLYX-DEPLOYMENT-GUIDE.md" -ForegroundColor Cyan
Write-Host "🚀 Happy deploying to remlyx.com!" -ForegroundColor Magenta
