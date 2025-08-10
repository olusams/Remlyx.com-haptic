# Simple Deployment Check Script
Write-Host "🚀 Checking Remlyx Website Deployment Status..." -ForegroundColor Green

# Check core files
$coreFiles = @("index.html", "netlify.toml", "_redirects", "_headers")
Write-Host "`n📋 Core Files:" -ForegroundColor Yellow
foreach ($file in $coreFiles) {
    if (Test-Path $file) {
        Write-Host "✅ $file" -ForegroundColor Green
    } else {
        Write-Host "❌ $file" -ForegroundColor Red
    }
}

# Check assets
Write-Host "`n📁 Assets:" -ForegroundColor Yellow
$assetDirs = @("assets/css", "assets/js", "assets/img", "assets/fonts")
foreach ($dir in $assetDirs) {
    if (Test-Path $dir) {
        $fileCount = (Get-ChildItem -Path $dir -Recurse -File).Count
        Write-Host "✅ $dir ($fileCount files)" -ForegroundColor Green
    } else {
        Write-Host "❌ Missing: $dir" -ForegroundColor Red
    }
}

# Check HTML pages
Write-Host "`n📄 HTML Pages:" -ForegroundColor Yellow
$htmlFiles = Get-ChildItem -Filter "*.html" -File | Where-Object { 
    $_.Name -notlike "*demo*" -and $_.Name -notlike "*test*" -and $_.Name -notlike "*backup*"
}
Write-Host "Found $($htmlFiles.Count) main HTML pages" -ForegroundColor Cyan

Write-Host "`n🎯 Ready for remlyx.com deployment!" -ForegroundColor Green
