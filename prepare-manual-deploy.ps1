# Prepare files for manual Netlify deployment
# This script copies only the essential files needed

Write-Host "🚀 Preparing files for manual Netlify deployment..." -ForegroundColor Green

# Create deployment folder
$deployFolder = "remlyx-manual-deploy"
if (Test-Path $deployFolder) {
    Remove-Item $deployFolder -Recurse -Force
}
New-Item -ItemType Directory -Path $deployFolder | Out-Null

Write-Host "📁 Created deployment folder: $deployFolder" -ForegroundColor Cyan

# Copy HTML files
Write-Host "📄 Copying HTML pages..." -ForegroundColor Yellow
$htmlFiles = @(
    "index.html",
    "About.html", 
    "Services.html",
    "Portfolio.html",
    "Blog.html",
    "Contact.html",
    "FAQ.html",
    "Terms.html",
    "Privacy.html",
    "Testimonials.html",
    "404.html",
    "mobile-navigation-enhanced-demo.html",
    "test-mobile-navigation.html"
)

foreach ($file in $htmlFiles) {
    if (Test-Path $file) {
        Copy-Item $file $deployFolder\
        Write-Host "  ✅ $file" -ForegroundColor Green
    } else {
        Write-Host "  ⚠️  Missing: $file" -ForegroundColor Yellow
    }
}

# Copy configuration files
Write-Host "⚙️  Copying configuration files..." -ForegroundColor Yellow
$configFiles = @(
    "netlify.toml",
    "_redirects", 
    "_headers",
    "robots.txt",
    "sitemap.xml",
    "manifest.json"
)

foreach ($file in $configFiles) {
    if (Test-Path $file) {
        Copy-Item $file $deployFolder\
        Write-Host "  ✅ $file" -ForegroundColor Green
    } else {
        Write-Host "  ⚠️  Missing: $file" -ForegroundColor Yellow
    }
}

# Copy assets folder
Write-Host "📦 Copying assets folder..." -ForegroundColor Yellow
if (Test-Path "assets") {
    Copy-Item "assets" $deployFolder\ -Recurse
    Write-Host "  ✅ assets/ folder copied" -ForegroundColor Green
    
    # Verify enhanced files
    if (Test-Path "$deployFolder\assets\css\mobile-fix.css") {
        Write-Host "  ✅ Enhanced mobile CSS included" -ForegroundColor Green
    }
    if (Test-Path "$deployFolder\assets\js\mobile-menu.js") {
        Write-Host "  ✅ Enhanced mobile JS included" -ForegroundColor Green
    }
} else {
    Write-Host "  ❌ assets/ folder not found!" -ForegroundColor Red
}

# Get folder size
$deploySize = (Get-ChildItem $deployFolder -Recurse | Measure-Object -Property Length -Sum).Sum
$deploySizeMB = [math]::Round($deploySize / 1MB, 1)

Write-Host "`n📊 Deployment Summary:" -ForegroundColor Cyan
Write-Host "  • Folder: $deployFolder" -ForegroundColor White
Write-Host "  • Total size: $deploySizeMB MB" -ForegroundColor White
Write-Host "  • Files ready for manual deployment" -ForegroundColor White

Write-Host "`n🎯 Next Steps:" -ForegroundColor Cyan
Write-Host "  1. Go to netlify.com" -ForegroundColor White
Write-Host "  2. Click 'Deploy manually'" -ForegroundColor White
Write-Host "  3. Drag the '$deployFolder' folder to Netlify" -ForegroundColor White
Write-Host "  4. Wait for deployment to complete" -ForegroundColor White
Write-Host "  5. Test your enhanced mobile navigation!" -ForegroundColor White

Write-Host "`n✨ Enhanced features included:" -ForegroundColor Green
Write-Host "  • Colorful mobile navigation button" -ForegroundColor White
Write-Host "  • Gradient backgrounds and borders" -ForegroundColor White
Write-Host "  • Smooth animations and effects" -ForegroundColor White
Write-Host "  • Demo pages at /mobile-demo" -ForegroundColor White

Write-Host "`nReady for manual deployment!" -ForegroundColor Green
