# Simple file copy script for manual Netlify deployment

Write-Host "Preparing files for manual Netlify deployment..." -ForegroundColor Green

# Create deployment folder
$deployFolder = "netlify-deploy"
if (Test-Path $deployFolder) {
    Remove-Item $deployFolder -Recurse -Force
}
New-Item -ItemType Directory -Path $deployFolder

Write-Host "Created deployment folder: $deployFolder" -ForegroundColor Cyan

# Copy HTML files
Write-Host "Copying HTML pages..." -ForegroundColor Yellow
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
        Write-Host "  Copied: $file" -ForegroundColor Green
    }
}

# Copy configuration files
Write-Host "Copying configuration files..." -ForegroundColor Yellow
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
        Write-Host "  Copied: $file" -ForegroundColor Green
    }
}

# Copy assets folder
Write-Host "Copying assets folder..." -ForegroundColor Yellow
if (Test-Path "assets") {
    Copy-Item "assets" $deployFolder\ -Recurse
    Write-Host "  Copied: assets/ folder" -ForegroundColor Green
}

# Get folder size
$deploySize = (Get-ChildItem $deployFolder -Recurse | Measure-Object -Property Length -Sum).Sum
$deploySizeMB = [math]::Round($deploySize / 1MB, 1)

Write-Host "`nDeployment folder ready!" -ForegroundColor Green
Write-Host "Folder: $deployFolder" -ForegroundColor White
Write-Host "Size: $deploySizeMB MB" -ForegroundColor White

Write-Host "`nNext steps:" -ForegroundColor Cyan
Write-Host "1. Go to netlify.com" -ForegroundColor White
Write-Host "2. Click 'Deploy manually'" -ForegroundColor White
Write-Host "3. Drag the '$deployFolder' folder to Netlify" -ForegroundColor White
Write-Host "4. Wait for deployment" -ForegroundColor White
Write-Host "5. Test your site!" -ForegroundColor White
