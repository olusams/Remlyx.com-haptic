# Update All Pages Navigation Script
# This script updates the mobile navigation on all HTML pages to include missing pages

Write-Host "Updating mobile navigation on all HTML pages..." -ForegroundColor Green

# Get all HTML files in the current directory
$htmlFiles = Get-ChildItem -Path "." -Filter "*.html" -Recurse | Where-Object { $_.Name -notlike "*test*" -and $_.Name -notlike "*debug*" -and $_.Name -notlike "*backup*" -and $_.Name -notlike "*deploy*" -and $_.Name -notlike "*netlify*" }

$updatedCount = 0

foreach ($file in $htmlFiles) {
    Write-Host "Processing: $($file.Name)" -ForegroundColor Yellow
    
    try {
        # Read file content
        $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
        
        # Check if file has mobile navigation
        if ($content -match 'mobile-main-navigation.*clearfix ul-li') {
            # Update mobile navigation to include all pages
            $oldMobileNav = '<nav class="mobile-main-navigation\s+clearfix ul-li">\s*<ul[^>]*>.*?</ul>\s*</nav>'
            $newMobileNav = @'
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
            
            # Replace the mobile navigation
            $newContent = $content -replace $oldMobileNav, $newMobileNav
            
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
            Write-Host "  ✓ Updated mobile navigation" -ForegroundColor Green
        } else {
            Write-Host "  - No mobile navigation found" -ForegroundColor Gray
        }
        
        # Also update sidebar navigation if it exists
        if ($content -match 'sidebar-menu.*ul-li-block') {
            $oldSidebarMenu = '<div class="sidebar-menu ul-li-block">\s*<ul>.*?</ul>\s*</div>'
            $newSidebarMenu = @'
							<div class="sidebar-menu ul-li-block">
								<ul>
									<li><a href="index.html"><i class="fal fa-home"></i> Home </a></li>
									<li><a href="About.html"><i class="fal fa-info"></i> About </a></li>
									<li><a href="Services.html"><i class="fal fa-cogs"></i> Services </a></li>
									<li><a href="Portfolio.html"><i class="fal fa-briefcase"></i> Portfolio </a></li>
									<li><a href="Blog.html"><i class="fal fa-blog"></i> Blog </a></li>
									<li><a href="Contact.html"><i class="fal fa-envelope"></i> Contact </a></li>
									<li><a href="FAQ.html"><i class="fal fa-question-circle"></i> FAQ </a></li>
									<li><a href="Testimonials.html"><i class="fal fa-star"></i> Testimonials </a></li>
								</ul>
							</div>
'@
            
            $newContent = $newContent -replace $oldSidebarMenu, $newSidebarMenu
            
            # Update sidebar more menu
            $oldSidebarMore = '<div class="sidebar-more-menu text-uppercase d-flex ul-li">\s*<span>More:</span>\s*<ul>.*?</ul>\s*</div>'
            $newSidebarMore = @'
							<div class="sidebar-more-menu text-uppercase d-flex ul-li">
								<span>More:</span>
								<ul>
									<li><a href="Privacy.html">Privacy Policy </a></li>
									<li><a href="Terms.html">Terms & Conditions </a></li>
									<li><a href="Agreement.html">Agreement </a></li>
								</ul> 
							</div>
'@
            
            $newContent = $newContent -replace $oldSidebarMore, $newSidebarMore
            
            # Write updated content back to file
            Set-Content -Path $file.FullName -Value $newContent -Encoding UTF8
            Write-Host "  ✓ Updated sidebar navigation" -ForegroundColor Green
        }
        
    } catch {
        Write-Host "  ✗ Error updating $($file.Name): $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host "`nNavigation update completed!" -ForegroundColor Green
Write-Host "Updated $updatedCount HTML files" -ForegroundColor Cyan
Write-Host "`nAll pages now include:" -ForegroundColor Yellow
Write-Host "  • Home, About, Services, Portfolio, Blog, Contact" -ForegroundColor White
Write-Host "  • FAQ, Testimonials, Privacy Policy, Terms & Conditions, Agreement" -ForegroundColor White
