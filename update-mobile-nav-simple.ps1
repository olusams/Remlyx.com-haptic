# PowerShell script to update all HTML pages with mobile navigation fixes

Write-Host "Updating all HTML pages with mobile navigation fixes..." -ForegroundColor Green

# Get all HTML files in the root directory
$htmlFiles = Get-ChildItem -Path "." -Filter "*.html" | Where-Object { $_.Name -ne "index.html" }

foreach ($file in $htmlFiles) {
    Write-Host "Processing: $($file.Name)" -ForegroundColor Cyan
    
    try {
        # Read file content
        $content = Get-Content $file.FullName -Raw -Encoding UTF8
        
        # Check if mobile-fix.css is already included
        if ($content -notmatch 'mobile-fix\.css') {
            # Add mobile-fix.css after meanmenu.css
            $content = $content -replace '(\s*<link rel="stylesheet" href="assets/css/meanmenu\.css">)', "`$1`n`t<link rel=""stylesheet"" href=""assets/css/mobile-fix.css"">"
            Write-Host "  Added mobile-fix.css" -ForegroundColor Green
        } else {
            Write-Host "  mobile-fix.css already exists" -ForegroundColor Yellow
        }
        
        # Check if mobile-menu.js is already included
        if ($content -notmatch 'mobile-menu\.js') {
            # Add mobile-menu.js after script.js
            $content = $content -replace '(\s*<script src="assets/js/script\.js"></script>)', "`$1`n`t<script src=""assets/js/mobile-menu.js""></script>"
            Write-Host "  Added mobile-menu.js" -ForegroundColor Green
        } else {
            Write-Host "  mobile-menu.js already exists" -ForegroundColor Yellow
        }
        
        # Write updated content back to file
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8
        Write-Host "  Updated $($file.Name)" -ForegroundColor Green
        
    } catch {
        Write-Host "  Error updating $($file.Name): $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "Mobile navigation updates completed!" -ForegroundColor Green
Write-Host "Mobile menu button should now be visible on all pages for screen widths under 992px" -ForegroundColor Cyan
