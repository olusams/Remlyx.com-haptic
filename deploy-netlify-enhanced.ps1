# Enhanced Netlify Deployment Preparation Script
# Includes mobile navigation enhancements and optimizations

Write-Host "🚀 Preparing Enhanced Remlyx Website for Netlify Deployment..." -ForegroundColor Green
Write-Host "   Including Mobile Navigation Enhancements" -ForegroundColor Cyan

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

Write-Host "`n🔍 Checking core deployment files..." -ForegroundColor Yellow
foreach ($file in $requiredFiles) {
    if (Test-Path $file) {
        Write-Host "✅ Found: $file" -ForegroundColor Green
    } else {
        Write-Host "❌ Missing: $file" -ForegroundColor Red
    }
}

# Check enhanced mobile navigation files
$enhancedFiles = @(
    "assets/css/mobile-fix.css",
    "assets/js/mobile-menu.js",
    "mobile-navigation-enhanced-demo.html",
    "test-mobile-navigation.html"
)

Write-Host "`n📱 Checking mobile navigation enhancements..." -ForegroundColor Yellow
foreach ($file in $enhancedFiles) {
    if (Test-Path $file) {
        $fileSize = (Get-Item $file).Length
        Write-Host "Found: $file ($([math]::Round($fileSize/1024, 1)) KB)" -ForegroundColor Green
    } else {
        Write-Host "Missing: $file" -ForegroundColor Red
    }
}

# Check assets directory structure
Write-Host "`n📂 Checking assets structure..." -ForegroundColor Yellow
$assetDirs = @("assets/css", "assets/js", "assets/img", "assets/fonts")
foreach ($dir in $assetDirs) {
    if (Test-Path $dir) {
        $fileCount = (Get-ChildItem -Path $dir -Recurse -File).Count
        Write-Host "✅ $dir ($fileCount files)" -ForegroundColor Green
    } else {
        Write-Host "❌ Missing: $dir" -ForegroundColor Red
    }
}

# Validate HTML files for mobile navigation includes
Write-Host "`n🔍 Validating mobile navigation integration..." -ForegroundColor Yellow
$htmlFiles = Get-ChildItem -Filter "*.html" -File | Where-Object { 
    $_.Name -notlike "*demo*" -and $_.Name -notlike "*test*" 
}

$mobileCSSCount = 0
$mobileJSCount = 0

foreach ($htmlFile in $htmlFiles) {
    $content = Get-Content $htmlFile.FullName -Raw
    $hasMobileCSS = $content -match 'mobile-fix\.css'
    $hasMobileJS = $content -match 'mobile-menu\.js'
    
    if ($hasMobileCSS -and $hasMobileJS) {
        Write-Host "✅ Enhanced: $($htmlFile.Name)" -ForegroundColor Green
        $mobileCSSCount++
        $mobileJSCount++
    } elseif ($hasMobileCSS) {
        Write-Host "⚠️  CSS Only: $($htmlFile.Name)" -ForegroundColor Yellow
        $mobileCSSCount++
    } elseif ($hasMobileJS) {
        Write-Host "⚠️  JS Only: $($htmlFile.Name)" -ForegroundColor Yellow
        $mobileJSCount++
    } else {
        Write-Host "❌ Missing enhancements: $($htmlFile.Name)" -ForegroundColor Red
    }
}

# Check for external dependencies
Write-Host "`n🌐 Checking for external dependencies..." -ForegroundColor Yellow
$indexContent = Get-Content "index.html" -Raw
if ($indexContent -match 'fonts\.googleapis\.com') {
    Write-Host "✅ Google Fonts detected" -ForegroundColor Green
}
if ($indexContent -match 'cdnjs\.cloudflare\.com|unpkg\.com|jsdelivr\.net') {
    Write-Host "⚠️  External CDN dependencies detected - ensure they're reliable" -ForegroundColor Yellow
}

# Performance check
Write-Host "`n⚡ Performance analysis..." -ForegroundColor Yellow
$cssFiles = Get-ChildItem -Path "assets/css" -Filter "*.css" -File
$totalCSSSize = ($cssFiles | Measure-Object -Property Length -Sum).Sum
Write-Host "Total CSS size: $([math]::Round($totalCSSSize/1024, 1))KB" -ForegroundColor Cyan

$jsFiles = Get-ChildItem -Path "assets/js" -Filter "*.js" -File
$totalJSSize = ($jsFiles | Measure-Object -Property Length -Sum).Sum
Write-Host "Total JS size: $([math]::Round($totalJSSize/1024, 1))KB" -ForegroundColor Cyan

# Mobile navigation specific checks
Write-Host "`n📱 Mobile Navigation Enhancement Status:" -ForegroundColor Cyan
Write-Host "  • Pages with mobile CSS: $mobileCSSCount" -ForegroundColor White
Write-Host "  • Pages with mobile JS: $mobileJSCount" -ForegroundColor White
Write-Host "  • Demo page available: $(Test-Path 'mobile-navigation-enhanced-demo.html')" -ForegroundColor White
Write-Host "  • Test page available: $(Test-Path 'test-mobile-navigation.html')" -ForegroundColor White

# Create deployment summary
Write-Host "`n📋 Enhanced Deployment Summary:" -ForegroundColor Cyan
Write-Host "  • Project Type: Enhanced Static HTML Website with Mobile Navigation" -ForegroundColor White
Write-Host "  • Mobile Features: Gradient buttons, animated menu, brand colors" -ForegroundColor White
Write-Host "  • Build Command: Not required (static files)" -ForegroundColor White
Write-Host "  • Publish Directory: . (root)" -ForegroundColor White
Write-Host "  • Custom Domain: Configure in Netlify dashboard" -ForegroundColor White
Write-Host "  • Demo URLs: /mobile-demo and /mobile-test" -ForegroundColor White

Write-Host "`n🎯 Enhanced Features Included:" -ForegroundColor Cyan
Write-Host "  ✨ Brand-colored mobile menu button" -ForegroundColor White
Write-Host "  ✨ Gradient backgrounds and borders" -ForegroundColor White
Write-Host "  ✨ Smooth animations and transitions" -ForegroundColor White
Write-Host "  ✨ Enhanced accessibility features" -ForegroundColor White
Write-Host "  ✨ Touch-optimized interface" -ForegroundColor White
Write-Host "  ✨ Professional styling throughout" -ForegroundColor White

Write-Host "`n🎯 Next Steps:" -ForegroundColor Cyan
Write-Host "  1. Create a new site on Netlify" -ForegroundColor White
Write-Host "  2. Connect your Git repository" -ForegroundColor White
Write-Host "  3. Set build settings:" -ForegroundColor White
Write-Host "     - Build command: (leave empty)" -ForegroundColor Gray
Write-Host "     - Publish directory: ." -ForegroundColor Gray
Write-Host "  4. Deploy and test mobile navigation!" -ForegroundColor White

Write-Host "`n✨ Deployment files ready:" -ForegroundColor Green
Write-Host "  • netlify.toml - Enhanced configuration with demo redirects" -ForegroundColor White
Write-Host "  • _redirects - Clean URLs and mobile demo routes" -ForegroundColor White
Write-Host "  • _headers - Optimized caching for enhanced assets" -ForegroundColor White
Write-Host "  • mobile-fix.css - All visual enhancements" -ForegroundColor White
Write-Host "  • mobile-menu.js - Enhanced functionality" -ForegroundColor White

Write-Host "`n🔗 Demo URLs (after deployment):" -ForegroundColor Cyan
Write-Host "  • yoursite.netlify.app/mobile-demo - Enhanced showcase" -ForegroundColor Blue
Write-Host "  • yoursite.netlify.app/mobile-test - Testing interface" -ForegroundColor Blue
Write-Host "  • Netlify Dashboard: https://app.netlify.com/" -ForegroundColor Blue

Write-Host "`n🚀 Your Enhanced Remlyx Website is Ready for Netlify!" -ForegroundColor Green
Write-Host "   Mobile navigation with beautiful colors and borders included! 🎨📱" -ForegroundColor Magenta
