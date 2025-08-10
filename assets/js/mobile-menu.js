/* Mobile Menu Functionality */
(function() {
    'use strict';
    
    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', function() {
        initMobileMenu();
    });
    
    function initMobileMenu() {
        // Disable the original mobile menu script to prevent conflicts
        if (window.jQuery) {
            jQuery('.open_mobile_menu').off('click');
        }
        
        const mobileMenuButton = document.querySelector('.mobile_menu_button');
        const mobileMenuWrap = document.querySelector('.mobile_menu_wrap');
        const mobileMenuOverlay = document.querySelector('.mobile_menu_overlay');
        const mobileMenuClose = document.querySelector('.mobile_menu_close');
        const body = document.body;
        
        // Check if elements exist
        if (!mobileMenuButton || !mobileMenuWrap || !mobileMenuOverlay || !mobileMenuClose) {
            console.log('Mobile menu elements not found');
            return;
        }
        
        console.log('Mobile menu initialized successfully');
        
        // Open mobile menu
        function openMobileMenu() {
            console.log('Opening mobile menu...');
            // Add opening animation to button
            mobileMenuButton.classList.add('opening');
            setTimeout(() => {
                mobileMenuButton.classList.remove('opening');
            }, 600);
            
            // Use the original classes that the CSS expects
            mobileMenuWrap.classList.add('mobile_menu_on');
            body.classList.add('mobile_menu_overlay_on');
            console.log('Mobile menu classes added:', mobileMenuWrap.classList.contains('mobile_menu_on'));
            
            // Focus trap for accessibility
            const firstFocusableElement = mobileMenuWrap.querySelector('a, button, [tabindex]:not([tabindex="-1"])');
            if (firstFocusableElement) {
                firstFocusableElement.focus();
            }
        }
        
        // Close mobile menu
        function closeMobileMenu() {
            // Use the original classes that the CSS expects
            mobileMenuWrap.classList.remove('mobile_menu_on');
            body.classList.remove('mobile_menu_overlay_on');
            
            // Return focus to menu button
            mobileMenuButton.focus();
        }
        
        // Toggle mobile menu
        function toggleMobileMenu() {
            if (mobileMenuWrap.classList.contains('mobile_menu_on')) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        }
        
        // Event listeners
        mobileMenuButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Mobile menu button clicked!');
            toggleMobileMenu();
        });
        
        mobileMenuClose.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeMobileMenu();
        });
        
        mobileMenuOverlay.addEventListener('click', function(e) {
            e.preventDefault();
            closeMobileMenu();
        });
        
        // Close menu when clicking on menu links
        const menuLinks = mobileMenuWrap.querySelectorAll('.mobile-main-navigation a');
        menuLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                // Add a small delay to allow navigation to complete
                setTimeout(closeMobileMenu, 100);
            });
        });
        
        // Close menu on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileMenuWrap.classList.contains('active')) {
                closeMobileMenu();
            }
        });
        
        // Handle window resize - close menu if desktop view
        window.addEventListener('resize', function() {
            if (window.innerWidth > 991 && mobileMenuWrap.classList.contains('active')) {
                closeMobileMenu();
            }
        });
        
        // Prevent body scroll when menu is open
        let lastScrollPosition = 0;
        
        function preventBodyScroll() {
            lastScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
            body.style.position = 'fixed';
            body.style.top = `-${lastScrollPosition}px`;
            body.style.width = '100%';
        }
        
        function restoreBodyScroll() {
            body.style.position = '';
            body.style.top = '';
            body.style.width = '';
            window.scrollTo(0, lastScrollPosition);
        }
        
        // Apply scroll prevention when menu opens/closes
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    if (body.classList.contains('mobile-menu-open')) {
                        preventBodyScroll();
                    } else {
                        restoreBodyScroll();
                    }
                }
            });
        });
        
        observer.observe(body, {
            attributes: true,
            attributeFilter: ['class']
        });
        
        // Smooth scrolling for anchor links in mobile menu
        const anchorLinks = mobileMenuWrap.querySelectorAll('a[href^="#"]');
        anchorLinks.forEach(function(link) {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                const target = document.querySelector(href);
                
                if (target) {
                    e.preventDefault();
                    closeMobileMenu();
                    
                    setTimeout(function() {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }, 300);
                }
            });
        });
        
        // Add touch support for better mobile experience
        let touchStartY = 0;
        let touchEndY = 0;
        
        mobileMenuWrap.addEventListener('touchstart', function(e) {
            touchStartY = e.changedTouches[0].screenY;
        }, false);
        
        mobileMenuWrap.addEventListener('touchend', function(e) {
            touchEndY = e.changedTouches[0].screenY;
            handleSwipe();
        }, false);
        
        function handleSwipe() {
            // Swipe up to close menu (if swiped more than 100px)
            if (touchStartY - touchEndY > 100) {
                closeMobileMenu();
            }
        }
        
        console.log('Mobile menu initialized successfully');
    }
    
    // Alternative initialization for older browsers
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMobileMenu);
    } else {
        initMobileMenu();
    }
})();
