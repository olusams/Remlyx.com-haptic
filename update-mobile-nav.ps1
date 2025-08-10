# PowerShell script to update all HTML pages with mobile navigation fixes

Write-Host "🔧 Updating all HTML pages with mobile navigation fixes..." -ForegroundColor Green

# Get all HTML files in the root directory
$htmlFiles = Get-ChildItem -Path "." -Filter "*.html" | Where-Object { $_.Name -ne "index.html" }

foreach ($file in $htmlFiles) {
    Write-Host "📄 Processing: $($file.Name)" -ForegroundColor Cyan
    
    try {
        # Read file content
        $content = Get-Content $file.FullName -Raw -Encoding UTF8
        
        # Check if mobile-fix.css is already included
        if ($content -notmatch 'mobile-fix\.css') {
            # Add mobile-fix.css after meanmenu.css
            $content = $content -replace '(\s*<link rel="stylesheet" href="assets/css/meanmenu\.css">)', "`$1`n`t<link rel=""stylesheet"" href=""assets/css/mobile-fix.css"">"
            Write-Host "  ✅ Added mobile-fix.css" -ForegroundColor Green
        } else {
            Write-Host "  ⚠️  mobile-fix.css already exists" -ForegroundColor Yellow
        }
        
        # Check if mobile-menu.js is already included
        if ($content -notmatch 'mobile-menu\.js') {
            # Add mobile-menu.js after script.js
            $content = $content -replace '(\s*<script src="assets/js/script\.js"></script>)', "`$1`n`t<script src=""assets/js/mobile-menu.js""></script>"
            Write-Host "  ✅ Added mobile-menu.js" -ForegroundColor Green
        } else {
            Write-Host "  ⚠️  mobile-menu.js already exists" -ForegroundColor Yellow
        }
        
        # Write updated content back to file
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8
        Write-Host "  ✅ Updated $($file.Name)" -ForegroundColor Green
        
    } catch {
        Write-Host "  ❌ Error updating $($file.Name): $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host "`n🎉 Mobile navigation updates completed!" -ForegroundColor Green
Write-Host "📱 Mobile menu button should now be visible on all pages for screen widths < 992px" -ForegroundColor Cyan

# Provide testing instructions
Write-Host "`n🧪 Testing Instructions:" -ForegroundColor Yellow
Write-Host "1. Open any page in a browser" -ForegroundColor White
Write-Host "2. Resize browser width to less than 992px or use mobile device" -ForegroundColor White
Write-Host "3. You should see a hamburger menu button in the top right" -ForegroundColor White
Write-Host "4. Click the button to open the mobile menu" -ForegroundColor White
Write-Host "5. Click the X or overlay to close the menu" -ForegroundColor White

Write-Host "`n🔍 Browser Dev Tools Testing:" -ForegroundColor Yellow
Write-Host "1. Press F12 to open developer tools" -ForegroundColor White
Write-Host "2. Click the device toolbar icon or press Ctrl+Shift+M" -ForegroundColor White
Write-Host "3. Select a mobile device or set custom width less than 992px" -ForegroundColor White
Write-Host "4. Test the mobile navigation functionality" -ForegroundColor White
