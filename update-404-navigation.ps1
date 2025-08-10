# Update 404.html Navigation Script
# This script updates 404.html to use simple, consistent navigation

Write-Host "Updating 404.html mobile navigation..." -ForegroundColor Green

try {
    # Read file content
    $content = Get-Content -Path "404.html" -Raw -Encoding UTF8
    
    # Replace the complex dropdown navigation with simple navigation
    $oldDropdownNav = '<li class="dropdown">\s*<a href="!#">Home</a>\s*<ul class="dropdown-menu clearfix">\s*<li class="dropdown">\s*<a href="!#">Web Agency</a>\s*<ul class="dropdown-menu clearfix">\s*<li><a href="index-5\.1\.html" target="_blank">One Page</a></li>\s*<li><a href="index-5\.html" target="_blank">Multi Page</a></li>\s*</ul>\s*</li>\s*<li class="dropdown">\s*<a href="!#">Personal Portfolio</a>\s*<ul class="dropdown-menu clearfix">\s*<li><a href="index-1\.1\.html" target="_blank">One Page</a></li>\s*<li><a href="index-1\.html" target="_blank">Multi Page</a></li>\s*</ul>\s*</li>\s*<li class="dropdown">\s*<a href="!#">Creative Agency</a>\s*<ul class="dropdown-menu clearfix">\s*<li><a href="index-2\.html" target="_blank">One Page</a></li>\s*<li><a href="index-4\.html" target="_blank">Multi Page</a></li>\s*</ul>\s*</li>\s*<li class="dropdown">\s*<a href="!#">Creative Web Agency</a>\s*<ul class="dropdown-menu clearfix">\s*<li><a href="index-3\.html" target="_blank">One Page</a></li>\s*<li><a href="index-4\.html" target="_blank">Multi Page</a></li>\s*</ul>\s*</li>\s*<li class="dropdown">\s*<a href="!#">Digital Web Agency</a>\s*<ul class="dropdown-menu clearfix">\s*<li><a href="index-4\.html" target="_blank">One Page</a></li>\s*<li><a href="index-4\.html" target="_blank">Multi Page</a></li>\s*</ul>\s*</li>\s*<li class="dropdown">\s*<a href="!#">Business Agency</a>\s*<ul class="dropdown-menu clearfix">\s*<li><a href="index-6\.html" target="_blank">One Page</a></li>\s*<li><a href="index-4\.html" target="_blank">Multi Page</a></li>\s*</ul>\s*</li>\s*<li class="dropdown">\s*<a href="!#">Digital Agency</a>\s*<ul class="dropdown-menu clearfix">\s*<li><a href="index-7\.html" target="_blank">One Page</a></li>\s*<li><a href="index-4\.html" target="_blank">Multi Page</a></li>\s*</ul>\s*</li>\s*</ul>\s*</li>'
    
    $newSimpleNav = '<li><a href="index.html">Home</a></li>
								<li><a href="About.html">About</a></li>
								<li><a href="Services.html">Services</a></li>
								<li><a href="Portfolio.html">Portfolio</a></li>
								<li><a href="Blog.html">Blog</a></li>
								<li><a href="Contact.html">Contact</a></li>
								<li><a href="FAQ.html">FAQ</a></li>
								<li><a href="Testimonials.html">Testimonials</a></li>
								<li><a href="Privacy.html">Privacy Policy</a></li>
								<li><a href="Terms.html">Terms & Conditions</a></li>
								<li><a href="Agreement.html">Agreement</a></li>'
    
    # Replace the dropdown navigation
    $newContent = $content -replace $oldDropdownNav, $newSimpleNav
    
    # Write updated content back to file
    Set-Content -Path "404.html" -Value $newContent -Encoding UTF8
    
    Write-Host "✓ Successfully updated 404.html navigation!" -ForegroundColor Green
    Write-Host "Navigation now includes all 11 pages with simple, flat structure" -ForegroundColor Cyan
    
} catch {
    Write-Host "✗ Error updating 404.html: $($_.Exception.Message)" -ForegroundColor Red
}
