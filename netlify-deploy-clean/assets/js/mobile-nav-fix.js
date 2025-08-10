/* ===========================================
   MOBILE NAVIGATION FUNCTIONALITY FIX
   Ensures mobile menu works properly with background
   =========================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // Get mobile menu elements
    const mobileMenuButton = document.querySelector('.mobile_menu_button');
    const mobileMenuWrap = document.querySelector('.mobile_menu_wrap');
    const mobileMenuOverlay = document.querySelector('.mobile_menu_overlay');
    const mobileMenuClose = document.querySelector('.mobile_menu_close');
    
    // Function to open mobile menu
    function openMobileMenu() {
        if (mobileMenuWrap) {
            mobileMenuWrap.classList.add('mobile_menu_on');
            document.body.classList.add('mobile-menu-open');
            
            // Ensure overlay is visible
            if (mobileMenuOverlay) {
                mobileMenuOverlay.style.opacity = '1';
                mobileMenuOverlay.style.visibility = 'visible';
            }
            
            // Prevent body scroll
            document.body.style.overflow = 'hidden';
        }
    }
    
    // Function to close mobile menu
    function closeMobileMenu() {
        if (mobileMenuWrap) {
            mobileMenuWrap.classList.remove('mobile_menu_on');
            document.body.classList.remove('mobile-menu-open');
            
            // Hide overlay
            if (mobileMenuOverlay) {
                mobileMenuOverlay.style.opacity = '0';
                mobileMenuOverlay.style.visibility = 'hidden';
            }
            
            // Restore body scroll
            document.body.style.overflow = '';
        }
    }
    
    // Event listeners for mobile menu
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            openMobileMenu();
        });
    }
    
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeMobileMenu();
        });
    }
    
    // Close menu when clicking overlay
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', function(e) {
            e.preventDefault();
            closeMobileMenu();
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (mobileMenuWrap && mobileMenuWrap.classList.contains('mobile_menu_on')) {
            if (!mobileMenuWrap.contains(e.target) && !mobileMenuButton.contains(e.target)) {
                closeMobileMenu();
            }
        }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenuWrap && mobileMenuWrap.classList.contains('mobile_menu_on')) {
            closeMobileMenu();
        }
    });
    
    // Close menu on window resize (if switching to desktop)
    window.addEventListener('resize', function() {
        if (window.innerWidth > 991 && mobileMenuWrap && mobileMenuWrap.classList.contains('mobile_menu_on')) {
            closeMobileMenu();
        }
    });
    
    // Enhanced mobile menu button visibility
    function ensureMobileMenuButton() {
        if (window.innerWidth <= 991) {
            if (mobileMenuButton) {
                mobileMenuButton.style.display = 'flex';
                mobileMenuButton.style.visibility = 'visible';
                mobileMenuButton.style.opacity = '1';
            }
        }
    }
    
    // Run on load and resize
    ensureMobileMenuButton();
    window.addEventListener('resize', ensureMobileMenuButton);
    
    // Add smooth transitions to menu items
    const menuItems = document.querySelectorAll('.mobile-main-navigation .navbar-nav li');
    if (menuItems.length > 0) {
        menuItems.forEach((item, index) => {
            item.style.animationDelay = `${(index + 1) * 0.1}s`;
        });
    }
    
    // Enhanced search functionality
    const mobileSearchForm = document.querySelector('.mobile-search-bar form');
    if (mobileSearchForm) {
        mobileSearchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchInput = this.querySelector('input[name="search"]');
            if (searchInput && searchInput.value.trim()) {
                // You can implement search functionality here
                console.log('Searching for:', searchInput.value.trim());
                // For now, just close the menu
                closeMobileMenu();
            }
        });
    }
    
    // Add loading state to mobile menu
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            this.style.pointerEvents = 'none';
            setTimeout(() => {
                this.style.pointerEvents = '';
            }, 300);
        });
    }
    
    // Ensure proper z-index stacking
    function fixZIndex() {
        const header = document.querySelector('header');
        if (header) {
            header.style.zIndex = '1000';
        }
        
        if (mobileMenuWrap) {
            mobileMenuWrap.style.zIndex = '100001';
        }
        
        if (mobileMenuOverlay) {
            mobileMenuOverlay.style.zIndex = '100002';
        }
    }
    
    // Fix z-index on load
    fixZIndex();
    
    // Add touch support for mobile devices
    if ('ontouchstart' in window) {
        let touchStartY = 0;
        let touchEndY = 0;
        
        if (mobileMenuContent) {
            mobileMenuContent.addEventListener('touchstart', function(e) {
                touchStartY = e.touches[0].clientY;
            });
            
            mobileMenuContent.addEventListener('touchend', function(e) {
                touchEndY = e.changedTouches[0].clientY;
                const diff = touchStartY - touchEndY;
                
                // Swipe up to close menu
                if (diff > 50 && mobileMenuWrap.classList.contains('mobile_menu_on')) {
                    closeMobileMenu();
                }
            });
        }
    }
    
    console.log('Mobile navigation fix loaded successfully');
});

// Fallback for older browsers
if (!document.addEventListener) {
    // For very old browsers, use attachEvent
    if (document.attachEvent) {
        document.attachEvent('onreadystatechange', function() {
            if (document.readyState === 'complete') {
                // Initialize mobile menu for older browsers
                console.log('Mobile navigation initialized for older browser');
            }
        });
    }
}
