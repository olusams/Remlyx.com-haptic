# Update Dropdown Navigation Script
# This script updates all pages with complex dropdown navigation to use simple, consistent navigation

Write-Host "Updating dropdown navigation on all HTML pages..." -ForegroundColor Green

# Get all HTML files in the current directory
$htmlFiles = Get-ChildItem -Path "." -Filter "*.html" -Recurse | Where-Object { $_.Name -notlike "*test*" -and $_.Name -notlike "*debug*" -and $_.Name -notlike "*backup*" -and $_.Name -notlike "*deploy*" -and $_.Name -notlike "*netlify*" }

$updatedCount = 0

foreach ($file in $htmlFiles) {
    Write-Host "Processing: $($file.Name)" -ForegroundColor Yellow
    
    try {
        # Read file content
        $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
        
        # Check if file has dropdown navigation
        if ($content -match 'dropdown-menu.*clearfix') {
            # Replace complex dropdown navigation with simple navigation
            $oldDropdownNav = '<nav class="mobile-main-navigation\s+clearfix ul-li">\s*<ul[^>]*>.*?</ul>\s*</nav>'
            $newSimpleNav = @'
					<nav class="mobile-main-navigation  clearfix ul-li">
						<ul id="m-main-nav" class="nav navbar-nav clearfix">
							<li><a href="index.html">Home</a></li>
							<li><a href="About.html">About</a></li>
							<li><a href="Services.html">Services</a></li>
							<li><a href="Portfolio.html">Portfolio</a></li>
							<li><a href="Blog.html">Blog</a></li>
							<li><a href="Contact.html">Contact</a></li>
							<li><a href="FAQ.html">FAQ</a></li>
							<li><a href="Testimonials.html">Testimonials</a></li>
							<li><a href="Privacy.html">Privacy Policy</a></li>
							<li><a href="Terms.html">Terms & Conditions</a></li>
							<li><a href="Agreement.html">Agreement</a></li>
						</ul>
					</nav>
'@
            
            # Replace the dropdown navigation
            $newContent = $content -replace $oldDropdownNav, $newSimpleNav
            
            # Update active class based on current page
            $currentPage = $file.BaseName
            switch ($currentPage) {
                "index" { $newContent = $newContent -replace '<li><a href="index.html">Home</a></li>', '<li class="active"><a href="index.html">Home</a></li>' }
                "About" { $newContent = $newContent -replace '<li><a href="About.html">About</a></li>', '<li class="active"><a href="About.html">About</a></li>' }
                "Services" { $newContent = $newContent -replace '<li><a href="Services.html">Services</a></li>', '<li class="active"><a href="Services.html">Services</a></li>' }
                "Portfolio" { $newContent = $newContent -replace '<li><a href="Portfolio.html">Portfolio</a></li>', '<li class="active"><a href="Portfolio.html">Portfolio</a></li>' }
                "Blog" { $newContent = $newContent -replace '<li><a href="Blog.html">Blog</a></li>', '<li class="active"><a href="Blog.html">Blog</a></li>' }
                "Contact" { $newContent = $newContent -replace '<li><a href="Contact.html">Contact</a></li>', '<li class="active"><a href="Contact.html">Contact</a></li>' }
                "FAQ" { $newContent = $newContent -replace '<li><a href="FAQ.html">FAQ</a></li>', '<li class="active"><a href="FAQ.html">FAQ</a></li>' }
                "Testimonials" { $newContent = $newContent -replace '<li><a href="Testimonials.html">Testimonials</a></li>', '<li class="active"><a href="Testimonials.html">Testimonials</a></li>' }
                "Privacy" { $newContent = $newContent -replace '<li><a href="Privacy.html">Privacy Policy</a></li>', '<li class="active"><a href="Privacy.html">Privacy Policy</a></li>' }
                "Terms" { $newContent = $newContent -replace '<li><a href="Terms.html">Terms & Conditions</a></li>', '<li class="active"><a href="Terms.html">Terms & Conditions</a></li>' }
                "Agreement" { $newContent = $newContent -replace '<li><a href="Agreement.html">Agreement</a></li>', '<li class="active"><a href="Agreement.html">Agreement</a></li>' }
            }
            
            # Write updated content back to file
            Set-Content -Path $file.FullName -Value $newContent -Encoding UTF8
            $updatedCount++
            Write-Host "  ✓ Updated dropdown navigation to simple navigation" -ForegroundColor Green
        } else {
            Write-Host "  - No dropdown navigation found" -ForegroundColor Gray
        }
        
    } catch {
        Write-Host "  ✗ Error updating $($file.Name): $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host "`nDropdown navigation update completed!" -ForegroundColor Green
Write-Host "Updated $updatedCount HTML files" -ForegroundColor Cyan
Write-Host "`nAll pages now have simple, consistent mobile navigation without complex dropdowns!" -ForegroundColor Yellow
