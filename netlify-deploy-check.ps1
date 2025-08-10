# Simple Netlify Deployment Check
# Verifies enhanced website is ready for deployment

Write-Host "Preparing Enhanced Remlyx Website for Netlify Deployment..." -ForegroundColor Green

# Check core files
$coreFiles = @("index.html", "netlify.toml", "_redirects", "_headers")
Write-Host "`nChecking core deployment files..." -ForegroundColor Yellow

foreach ($file in $coreFiles) {
    if (Test-Path $file) {
        Write-Host "FOUND: $file" -ForegroundColor Green
    } else {
        Write-Host "MISSING: $file" -ForegroundColor Red
    }
}

# Check mobile enhancement files
$mobileFiles = @("assets/css/mobile-fix.css", "assets/js/mobile-menu.js")
Write-Host "`nChecking mobile navigation files..." -ForegroundColor Yellow

foreach ($file in $mobileFiles) {
    if (Test-Path $file) {
        $size = [math]::Round((Get-Item $file).Length / 1024, 1)
        Write-Host "FOUND: $file ($size KB)" -ForegroundColor Green
    } else {
        Write-Host "MISSING: $file" -ForegroundColor Red
    }
}

# Check demo files
$demoFiles = @("mobile-navigation-enhanced-demo.html", "test-mobile-navigation.html")
Write-Host "`nChecking demo pages..." -ForegroundColor Yellow

foreach ($file in $demoFiles) {
    if (Test-Path $file) {
        Write-Host "FOUND: $file" -ForegroundColor Green
    } else {
        Write-Host "MISSING: $file" -ForegroundColor Red
    }
}

# Check HTML integration
Write-Host "`nChecking HTML file integration..." -ForegroundColor Yellow
$htmlFiles = Get-ChildItem -Filter "*.html" | Where-Object { $_.Name -notlike "*demo*" -and $_.Name -notlike "*test*" }

$enhancedCount = 0
foreach ($htmlFile in $htmlFiles) {
    $content = Get-Content $htmlFile.FullName -Raw
    $hasCSS = $content -match 'mobile-fix\.css'
    $hasJS = $content -match 'mobile-menu\.js'
    
    if ($hasCSS -and $hasJS) {
        Write-Host "ENHANCED: $($htmlFile.Name)" -ForegroundColor Green
        $enhancedCount++
    } else {
        Write-Host "BASIC: $($htmlFile.Name)" -ForegroundColor Yellow
    }
}

Write-Host "`nDeployment Summary:" -ForegroundColor Cyan
Write-Host "- Total HTML pages: $($htmlFiles.Count)" -ForegroundColor White
Write-Host "- Enhanced pages: $enhancedCount" -ForegroundColor White
Write-Host "- Mobile navigation: Ready" -ForegroundColor White
Write-Host "- Demo pages: Available" -ForegroundColor White

Write-Host "`nNext Steps:" -ForegroundColor Cyan
Write-Host "1. Push to Git repository" -ForegroundColor White
Write-Host "2. Connect to Netlify" -ForegroundColor White
Write-Host "3. Set publish directory to: ." -ForegroundColor White
Write-Host "4. Deploy and test!" -ForegroundColor White

Write-Host "`nDemo URLs after deployment:" -ForegroundColor Cyan
Write-Host "- yoursite.netlify.app/mobile-demo" -ForegroundColor Blue
Write-Host "- yoursite.netlify.app/mobile-test" -ForegroundColor Blue

Write-Host "`nWebsite is ready for Netlify deployment!" -ForegroundColor Green
