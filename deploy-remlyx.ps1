# Remlyx.com Deployment Script
Write-Host "🚀 Remlyx.com Deployment Script" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Cyan

# Check if git is available
try {
    $gitVersion = git --version
    Write-Host "✅ Git found: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Git not found. Please install Git first." -ForegroundColor Red
    Write-Host "Download from: https://git-scm.com/downloads" -ForegroundColor Yellow
    exit 1
}

# Check current git status
Write-Host "`n📋 Checking Git Status..." -ForegroundColor Yellow
$gitStatus = git status --porcelain
if ($gitStatus) {
    Write-Host "⚠️  Uncommitted changes detected:" -ForegroundColor Yellow
    $gitStatus | ForEach-Object { Write-Host "   $_" -ForegroundColor Gray }
    
    $commit = Read-Host "`nDo you want to commit these changes? (y/n)"
    if ($commit -eq 'y' -or $commit -eq 'Y') {
        $commitMessage = Read-Host "Enter commit message (or press Enter for default)"
        if (-not $commitMessage) {
            $commitMessage = "Prepare for remlyx.com deployment - Enhanced mobile navigation ready"
        }
        
        Write-Host "`n📝 Committing changes..." -ForegroundColor Cyan
        git add .
        git commit -m $commitMessage
        
        $push = Read-Host "`nDo you want to push to remote repository? (y/n)"
        if ($push -eq 'y' -or $push -eq 'Y') {
            Write-Host "`n📤 Pushing to remote..." -ForegroundColor Cyan
            git push origin main
        }
    }
} else {
    Write-Host "✅ All changes committed" -ForegroundColor Green
}

# Check if remote repository is configured
Write-Host "`n🌐 Checking remote repository..." -ForegroundColor Yellow
$remoteUrl = git remote get-url origin
if ($remoteUrl) {
    Write-Host "✅ Remote repository: $remoteUrl" -ForegroundColor Green
} else {
    Write-Host "❌ No remote repository configured" -ForegroundColor Red
    Write-Host "Please add a remote repository first:" -ForegroundColor Yellow
    Write-Host "git remote add origin <your-repo-url>" -ForegroundColor Gray
}

# Deployment instructions
Write-Host "`n🎯 Deployment Instructions for remlyx.com:" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor White

Write-Host "`n1️⃣  NETLIFY DEPLOYMENT (Recommended):" -ForegroundColor Green
Write-Host "   • Go to: https://app.netlify.com/" -ForegroundColor White
Write-Host "   • Click 'New site from Git'" -ForegroundColor White
Write-Host "   • Connect your repository: $remoteUrl" -ForegroundColor Gray
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

if ($ready) {
    Write-Host "`n🎉 Your Remlyx website is ready for deployment!" -ForegroundColor Green
    Write-Host "   Follow the steps above to deploy to remlyx.com" -ForegroundColor White
} else {
    Write-Host "`n⚠️  Please fix the missing files before deployment" -ForegroundColor Yellow
}

Write-Host "`n📚 For detailed instructions, see: REMLYX-DEPLOYMENT-GUIDE.md" -ForegroundColor Cyan
Write-Host "🚀 Happy deploying to remlyx.com!" -ForegroundColor Magenta
