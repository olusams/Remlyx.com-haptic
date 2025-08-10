# Deployment Optimization Script for Sharptic Website
# This script removes unnecessary files and optimizes the project for deployment

Write-Host "Starting deployment optimization..." -ForegroundColor Green

# Create optimized directory structure
$optimizedDir = "deploy-optimized"
if (Test-Path $optimizedDir) {
    Remove-Item $optimizedDir -Recurse -Force
}
New-Item -ItemType Directory -Path $optimizedDir
New-Item -ItemType Directory -Path "$optimizedDir/assets"
New-Item -ItemType Directory -Path "$optimizedDir/assets/css"
New-Item -ItemType Directory -Path "$optimizedDir/assets/js"
New-Item -ItemType Directory -Path "$optimizedDir/assets/img"
New-Item -ItemType Directory -Path "$optimizedDir/assets/fonts"

Write-Host "Created optimized directory structure" -ForegroundColor Yellow

# Copy essential HTML files
Copy-Item "*.html" -Destination $optimizedDir -Exclude "deploy-optimized.html"
Copy-Item "*.xml" -Destination $optimizedDir
Copy-Item "*.txt" -Destination $optimizedDir
Copy-Item "manifest.json" -Destination $optimizedDir -ErrorAction SilentlyContinue
Copy-Item "sw.js" -Destination $optimizedDir -ErrorAction SilentlyContinue

Write-Host "Copied HTML and configuration files" -ForegroundColor Yellow

# Copy optimized CSS files only
Copy-Item "assets/css/bootstrap.min.css" -Destination "$optimizedDir/assets/css/"
Copy-Item "assets/css/style.min.css" -Destination "$optimizedDir/assets/css/"
Copy-Item "assets/css/swiper.min.css" -Destination "$optimizedDir/assets/css/"
Copy-Item "assets/css/magnific-popup.css" -Destination "$optimizedDir/assets/css/"
Copy-Item "assets/css/meanmenu.css" -Destination "$optimizedDir/assets/css/"
Copy-Item "assets/css/fontawesome.css" -Destination "$optimizedDir/assets/css/"
Copy-Item "assets/css/flaticon_aina.css" -Destination "$optimizedDir/assets/css/"
Copy-Item "assets/css/animate.css" -Destination "$optimizedDir/assets/css/"

Write-Host "Copied optimized CSS files" -ForegroundColor Yellow

# Copy essential JS files only
Copy-Item "assets/js/jquery-3.6.0.min.js" -Destination "$optimizedDir/assets/js/"
Copy-Item "assets/js/bootstrap.bundle.min.js" -Destination "$optimizedDir/assets/js/"
Copy-Item "assets/js/swiper-bundle.min.js" -Destination "$optimizedDir/assets/js/"
Copy-Item "assets/js/script.min.js" -Destination "$optimizedDir/assets/js/"
Copy-Item "assets/js/wow.min.js" -Destination "$optimizedDir/assets/js/"
Copy-Item "assets/js/jquery.meanmenu.min.js" -Destination "$optimizedDir/assets/js/"
Copy-Item "assets/js/jquery.magnific-popup.min.js" -Destination "$optimizedDir/assets/js/"
Copy-Item "assets/js/gsap.min.js" -Destination "$optimizedDir/assets/js/"
Copy-Item "assets/js/ScrollTrigger.min.js" -Destination "$optimizedDir/assets/js/"
Copy-Item "assets/js/SplitText.min.js" -Destination "$optimizedDir/assets/js/"

Write-Host "Copied essential JS files" -ForegroundColor Yellow

# Copy essential images (excluding large files)
Get-ChildItem "assets/img" -Recurse -File | Where-Object {
    $_.Length -lt 500KB -and $_.Name -notlike "*imac*" -and $_.Name -notlike "*mockup*"
} | ForEach-Object {
    $relativePath = $_.FullName.Replace("$PWD\assets\img\", "")
    $targetDir = Split-Path "$optimizedDir/assets/img/$relativePath" -Parent
    if (!(Test-Path $targetDir)) {
        New-Item -ItemType Directory -Path $targetDir -Force
    }
    Copy-Item $_.FullName -Destination "$optimizedDir/assets/img/$relativePath"
}

Write-Host "Copied optimized images" -ForegroundColor Yellow

# Copy fonts
Copy-Item "assets/fonts/*" -Destination "$optimizedDir/assets/fonts/" -Recurse

Write-Host "Copied font files" -ForegroundColor Yellow

# Create optimized index.html
Copy-Item "deploy-optimized.html" -Destination "$optimizedDir/index.html"

Write-Host "Created optimized index.html" -ForegroundColor Yellow

# Calculate total size
$totalSize = (Get-ChildItem $optimizedDir -Recurse -File | Measure-Object -Property Length -Sum).Sum
$totalSizeMB = [math]::Round($totalSize / 1MB, 2)

Write-Host "Deployment optimization complete!" -ForegroundColor Green
Write-Host "Total optimized size: $totalSizeMB MB" -ForegroundColor Cyan
Write-Host "Optimized files are in: $optimizedDir" -ForegroundColor Cyan

# List file sizes for verification
Write-Host "`nLargest files in optimized build:" -ForegroundColor Yellow
Get-ChildItem $optimizedDir -Recurse -File | Sort-Object Length -Descending | Select-Object -First 10 | ForEach-Object {
    $sizeKB = [math]::Round($_.Length / 1KB, 1)
    Write-Host "$($_.Name): $sizeKB KB" -ForegroundColor Gray
} 