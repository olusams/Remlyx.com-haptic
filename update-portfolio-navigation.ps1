# Update Portfolio Navigation Script
# This script specifically updates the Portfolio.html page navigation

Write-Host "Updating Portfolio.html navigation..." -ForegroundColor Green

try {
    # Read Portfolio.html content
    $content = Get-Content -Path "Portfolio.html" -Raw -Encoding UTF8
    
    # Define the old complex dropdown navigation
    $oldNav = @'
						<nav class="mobile-main-navigation  clearfix ul-li">
							<ul id="m-main-nav" class="nav navbar-nav clearfix">
								<li class="dropdown">
									<a href="index.html">Home</a>
									<ul class="dropdown-menu clearfix">
										<li class="dropdown">
											<a href="index.html">Web Agency</a>
											<ul class="dropdown-menu clearfix">
												<li><a href="index.html" target="_blank">One Page</a></li>
												<li><a href="index.html" target="_blank">Multi Page</a></li>
											</ul>
										</li>
										<li class="dropdown">
											<a href="Portfolio.html">Personal Portfolio</a>
											<ul class="dropdown-menu clearfix">
												<li><a href="Portfolio.html" target="_blank">One Page</a></li>
												<li><a href="Portfolio.html" target="_blank">Multi Page</a></li>
											</ul>
										</li>
										<li class="dropdown">
											<a href="Services.html">Creative Agency</a>
											<ul class="dropdown-menu clearfix">
												<li><a href="Services.html" target="_blank">One Page</a></li>
												<li><a href="Services.html" target="_blank">Multi Page</a></li>
											</ul>
										</li>
										<li class="dropdown">
											<a href="Services.html">Creative Web Agency</a>
											<ul class="dropdown-menu clearfix">
												<li><a href="Services.html" target="_blank">One Page</a></li>
												<li><a href="Services.html" target="_blank">Multi Page</a></li>
											</ul>
										</li>
										<li class="dropdown">
											<a href="Services.html">Digital Web Agency</a>
											<ul class="dropdown-menu clearfix">
												<li><a href="Services.html" target="_blank">One Page</a></li>
												<li><a href="Services.html" target="_blank">Multi Page</a></li>
											</ul>
										</li>
										<li class="dropdown">
											<a href="Services.html">Business Agency</a>
											<ul class="dropdown-menu clearfix">
												<li><a href="Services.html" target="_blank">One Page</a></li>
												<li><a href="Services.html" target="_blank">Multi Page</a></li>
											</ul>
										</li>
										<li class="dropdown">
											<a href="Services.html">Digital Agency</a>
											<ul class="dropdown-menu clearfix">
												<li><a href="Services.html" target="_blank">One Page</a></li>
												<li><a href="Services.html" target="_blank">Multi Page</a></li>
											</ul>
										</li>
									</ul>
								</li>
								<li><a href="About.html">About</a></li>
								<li><a href="Blog.html">Blog</a></li>
								
								<li class="dropdown">
									<a href="Services.html">Pages</a>
									<ul class="dropdown-menu clearfix">
										<li><a href="Services.html">Service Page</a></li>
										<li><a href="Contact.html">Contact</a></li>
										<li class="active"><a href="Portfolio.html">Portfolio</a></li>
										<li><a href="FAQ.html">FAQ</a></li>
										
									</ul>
								</li>
								<li class="dropdown">
									<a href="Testimonials.html">Others</a>
									<ul class="dropdown-menu clearfix">
										<li><a href="Testimonials.html">Testimonial</a></li>
										<li><a href="FAQ.html">Faq Page</a></li>
										<li><a href="Terms.html">Terms & Condition</a></li>
										<li><a href="Privacy.html">Privacy Policy</a></li>
										<li><a href="404.html">Not Found</a></li>
									</ul>
								</li>
							</ul>
						</nav>
'@

    # Define the new simple navigation
    $newNav = @'
						<nav class="mobile-main-navigation  clearfix ul-li">
							<ul id="m-main-nav" class="nav navbar-nav clearfix">
								<li><a href="index.html">Home</a></li>
								<li><a href="About.html">About</a></li>
								<li><a href="Services.html">Services</a></li>
								<li class="active"><a href="Portfolio.html">Portfolio</a></li>
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

    # Replace the old navigation with the new one
    $newContent = $content -replace [regex]::Escape($oldNav), $newNav
    
    # Write updated content back to file
    Set-Content -Path "Portfolio.html" -Value $newContent -Encoding UTF8
    
    Write-Host "✓ Successfully updated Portfolio.html navigation!" -ForegroundColor Green
    Write-Host "  - Replaced complex dropdown navigation with simple navigation" -ForegroundColor White
    Write-Host "  - Set Portfolio as active page" -ForegroundColor White
    Write-Host "  - Added all 11 navigation links" -ForegroundColor White
    
} catch {
    Write-Host "✗ Error updating Portfolio.html: $($_.Exception.Message)" -ForegroundColor Red
}
