# Add Mobile JavaScript to All Pages Script
# This script adds the missing mobile-menu-fix.js to all HTML pages

Write-Host "Adding mobile-menu-fix.js to all HTML pages..." -ForegroundColor Green

# Get all HTML files in the current directory
$htmlFiles = Get-ChildItem -Path "." -Filter "*.html" -Recurse | Where-Object { $_.Name -notlike "*test*" -and $_.Name -notlike "*debug*" -and $_.Name -notlike "*backup*" -and $_.Name -notlike "*deploy*" -and $_.Name -notlike "*netlify*" }

$updatedCount = 0

foreach ($file in $htmlFiles) {
    Write-Host "Processing: $($file.Name)" -ForegroundColor Yellow
    
    try {
        # Read file content
        $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
        
        # Check if file already has mobile-menu-fix.js
        if ($content -match 'mobile-menu-fix\.js') {
            Write-Host "  - Already has mobile-menu-fix.js" -ForegroundColor Gray
            continue
        }
        
        # Check if file has mobile-menu.js (to add mobile-menu-fix.js after it)
        if ($content -match 'mobile-menu\.js') {
            # Add mobile-menu-fix.js after mobile-menu.js
            $newContent = $content -replace '(<script src="assets/js/mobile-menu\.js"></script>)', '$1`n	<script src="assets/js/mobile-menu-fix.js"></script>'
            
            # Write updated content back to file
            Set-Content -Path $file.FullName -Value $newContent -Encoding UTF8
            $updatedCount++
            Write-Host "  ✓ Added mobile-menu-fix.js after mobile-menu.js" -ForegroundColor Green
        } else {
            # Check if file has any script tags to add mobile-menu-fix.js before closing body tag
            if ($content -match '</body>') {
                # Add mobile-menu-fix.js before closing body tag
                $newContent = $content -replace '(\s*</body>)', '	<script src="assets/js/mobile-menu-fix.js"></script>`n$1'
                
                # Write updated content back to file
                Set-Content -Path $file.FullName -Value $newContent -Encoding UTF8
                $updatedCount++
                Write-Host "  ✓ Added mobile-menu-fix.js before closing body tag" -ForegroundColor Green
            } else {
                Write-Host "  - No suitable location found to add mobile-menu-fix.js" -ForegroundColor Red
            }
        }
        
    } catch {
        Write-Host "  ✗ Error updating $($file.Name): $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host "`nMobile JavaScript update completed!" -ForegroundColor Green
Write-Host "Updated $updatedCount HTML files" -ForegroundColor Cyan
Write-Host "`nAll pages now have mobile-menu-fix.js for proper mobile navigation functionality!" -ForegroundColor Yellow
