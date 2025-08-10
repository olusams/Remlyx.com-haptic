/* Mobile Menu Fix - Enhanced Compatibility Version */
(function() {
    'use strict';
    
    // Wait for DOM to load
    document.addEventListener('DOMContentLoaded', function() {
        initMobileMenuFix();
    });
    
    function initMobileMenuFix() {
        // Remove any existing mobile menu event listeners
        const existingButtons = document.querySelectorAll('.open_mobile_menu');
        existingButtons.forEach(button => {
            // Clone to remove all event listeners
            const newButton = button.cloneNode(true);
            button.parentNode.replaceChild(newButton, button);
        });
        
        // Get elements
        const mobileMenuButton = document.querySelector('.mobile_menu_button');
        const mobileMenuWrap = document.querySelector('.mobile_menu_wrap');
        const mobileMenuOverlay = document.querySelector('.mobile_menu_overlay');
        const mobileMenuClose = document.querySelector('.mobile_menu_close');
        const body = document.body;
        
        if (!mobileMenuButton || !mobileMenuWrap) {
            console.log('Mobile menu elements not found');
            return;
        }
        
        console.log('Enhanced mobile menu fix initialized');
        
        // Toggle function with dual class support
        function toggleMobileMenu() {
            const isOpen = mobileMenuWrap.classList.contains('mobile_menu_on') || 
                          mobileMenuWrap.classList.contains('active');
            
            if (isOpen) {
                // Close menu - remove both possible classes
                mobileMenuWrap.classList.remove('mobile_menu_on', 'active');
                body.classList.remove('mobile_menu_overlay_on');
                console.log('Mobile menu closed');
            } else {
                // Open menu - add both classes for compatibility
                mobileMenuWrap.classList.add('mobile_menu_on', 'active');
                body.classList.add('mobile_menu_overlay_on');
                console.log('Mobile menu opened');
            }
        }
        
        // Add event listeners
        mobileMenuButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMobileMenu();
        });
        
        if (mobileMenuClose) {
            mobileMenuClose.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                mobileMenuWrap.classList.remove('mobile_menu_on', 'active');
                body.classList.remove('mobile_menu_overlay_on');
                console.log('Mobile menu closed via close button');
            });
        }
        
        if (mobileMenuOverlay) {
            mobileMenuOverlay.addEventListener('click', function(e) {
                if (e.target === mobileMenuOverlay) {
                    mobileMenuWrap.classList.remove('mobile_menu_on', 'active');
                    body.classList.remove('mobile_menu_overlay_on');
                    console.log('Mobile menu closed via overlay');
                }
            });
        }
        
        // Close menu when pressing escape key
        document.addEventListener('keydown', function(e) {
            const isOpen = mobileMenuWrap.classList.contains('mobile_menu_on') || 
                          mobileMenuWrap.classList.contains('active');
            if (e.key === 'Escape' && isOpen) {
                mobileMenuWrap.classList.remove('mobile_menu_on', 'active');
                body.classList.remove('mobile_menu_overlay_on');
                console.log('Mobile menu closed via escape key');
            }
        });
        
        // Ensure mobile menu button is visible on mobile
        function checkMobileMenuVisibility() {
            if (window.innerWidth <= 991) {
                mobileMenuButton.style.display = 'block';
                // Hide desktop menu
                const desktopNav = document.querySelector('.bi-header-main-navigation');
                if (desktopNav) {
                    desktopNav.style.display = 'none';
                }
            } else {
                mobileMenuButton.style.display = 'none';
                // Show desktop menu
                const desktopNav = document.querySelector('.bi-header-main-navigation');
                if (desktopNav) {
                    desktopNav.style.display = 'block';
                }
                // Close mobile menu if open
                const isOpen = mobileMenuWrap.classList.contains('mobile_menu_on') || 
                              mobileMenuWrap.classList.contains('active');
                if (isOpen) {
                    mobileMenuWrap.classList.remove('mobile_menu_on', 'active');
                    body.classList.remove('mobile_menu_overlay_on');
                }
            }
        }
        
        // Check on load and resize
        checkMobileMenuVisibility();
        window.addEventListener('resize', checkMobileMenuVisibility);
        
        // Force mobile menu button to be visible on mobile
        setTimeout(function() {
            if (window.innerWidth <= 991) {
                mobileMenuButton.style.display = 'block';
                mobileMenuButton.style.visibility = 'visible';
                mobileMenuButton.style.opacity = '1';
                mobileMenuButton.style.zIndex = '99998';
            }
        }, 1000);
    }
})();
