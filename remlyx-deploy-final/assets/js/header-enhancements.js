/* ===========================================
   REMLYX-STYLE HEADER ENHANCEMENTS
   =========================================== */

(function($) {
    'use strict';

    // Header Enhancements
    var HeaderEnhancements = {
        init: function() {
            this.stickyHeader();
            this.activePageHighlight();
            this.smoothScrolling();
            this.mobileMenuEnhancements();
        },

        // Sticky Header Functionality
        stickyHeader: function() {
            var $header = $('.bi-header-section');
            var $window = $(window);
            var scrollThreshold = 200;

            $window.on('scroll', function() {
                var scrollTop = $window.scrollTop();

                if (scrollTop > scrollThreshold) {
                    if (!$header.hasClass('sticky-on')) {
                        $header.addClass('sticky-on');
                        $('body').addClass('header-sticky');
                    }
                } else {
                    if ($header.hasClass('sticky-on')) {
                        $header.removeClass('sticky-on');
                        $('body').removeClass('header-sticky');
                    }
                }
            });
        },

        // Active Page Highlighting
        activePageHighlight: function() {
            var currentPage = window.location.pathname;
            var $navLinks = $('.bi-header-main-navigation .main-navigation li a, .mobile-main-navigation .navbar-nav li a');

            $navLinks.each(function() {
                var $link = $(this);
                var href = $link.attr('href');

                // Handle different href formats
                if (href === currentPage || 
                    (currentPage === '/' && href === '/home') ||
                    (currentPage === '/index.html' && href === '/home')) {
                    $link.addClass('active');
                    $link.parent().addClass('active');
                }
            });
        },

        // Smooth Scrolling for Anchor Links
        smoothScrolling: function() {
            $('a[href^="#"]').on('click', function(e) {
                var target = $(this.getAttribute('href'));
                if (target.length) {
                    e.preventDefault();
                    $('html, body').stop().animate({
                        scrollTop: target.offset().top - 80
                    }, 1000, 'easeInOutQuart');
                }
            });
        },

        // Mobile Menu Enhancements
        mobileMenuEnhancements: function() {
            var $mobileMenu = $('.mobile_menu');
            var $mobileMenuButton = $('.mobile_menu_button');
            var $mobileMenuContent = $('.mobile_menu_content');
            var $mobileMenuOverlay = $('.mobile_menu_overlay');
            var $body = $('body');

            // Enhanced mobile menu toggle
            $mobileMenuButton.on('click', function(e) {
                e.preventDefault();
                $mobileMenu.toggleClass('mobile_menu_on');
                $body.toggleClass('mobile_menu_overlay_on');
                
                // Add animation classes
                if ($mobileMenu.hasClass('mobile_menu_on')) {
                    $mobileMenuContent.addClass('slide-in');
                    $mobileMenuOverlay.addClass('fade-in');
                } else {
                    $mobileMenuContent.removeClass('slide-in');
                    $mobileMenuOverlay.removeClass('fade-in');
                }
            });

            // Close mobile menu on overlay click
            $mobileMenuOverlay.on('click', function() {
                $mobileMenu.removeClass('mobile_menu_on');
                $body.removeClass('mobile_menu_overlay_on');
                $mobileMenuContent.removeClass('slide-in');
                $mobileMenuOverlay.removeClass('fade-in');
            });

            // Close mobile menu on close button click
            $('.mobile_menu_close').on('click', function() {
                $mobileMenu.removeClass('mobile_menu_on');
                $body.removeClass('mobile_menu_overlay_on');
                $mobileMenuContent.removeClass('slide-in');
                $mobileMenuOverlay.removeClass('fade-in');
            });

            // Enhanced mobile menu item interactions
            $('.mobile-main-navigation .navbar-nav li a').on('click', function() {
                var $this = $(this);
                var $parent = $this.parent();

                // Remove active class from all items
                $('.mobile-main-navigation .navbar-nav li').removeClass('active');
                $('.mobile-main-navigation .navbar-nav li a').removeClass('active');

                // Add active class to clicked item
                $parent.addClass('active');
                $this.addClass('active');

                // Close mobile menu after item click (optional)
                setTimeout(function() {
                    $mobileMenu.removeClass('mobile_menu_on');
                    $body.removeClass('mobile_menu_overlay_on');
                    $mobileMenuContent.removeClass('slide-in');
                    $mobileMenuOverlay.removeClass('fade-in');
                }, 300);
            });
        }
    };

    // Initialize when document is ready
    $(document).ready(function() {
        HeaderEnhancements.init();
    });

    // Re-initialize on window resize
    $(window).on('resize', function() {
        // Re-initialize if needed
        HeaderEnhancements.activePageHighlight();
    });

})(jQuery);

/* ===========================================
   ADDITIONAL CSS ANIMATIONS FOR MOBILE MENU
   =========================================== */

// Add these styles dynamically for better mobile menu animations
var mobileMenuStyles = `
<style>
.mobile_menu_content.slide-in {
    animation: slideInLeft 0.3s ease-out;
}

.mobile_menu_overlay.fade-in {
    animation: fadeIn 0.3s ease-out;
}

@keyframes slideInLeft {
    from {
        transform: translateX(-100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

/* Enhanced mobile menu transitions */
.mobile_menu_content {
    transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.mobile_menu_overlay {
    transition: opacity 0.3s ease-out;
}

/* Active page indicator */
.bi-header-main-navigation .main-navigation li a.active,
.mobile-main-navigation .navbar-nav li a.active {
    color: #EB5C18 !important;
    font-weight: 700 !important;
}

.bi-header-main-navigation .main-navigation li a.active::before,
.mobile-main-navigation .navbar-nav li a.active::before {
    width: 100% !important;
}

/* Hover effects for mobile menu items */
.mobile_menu_content .mobile-main-navigation .navbar-nav li {
    position: relative;
    overflow: hidden;
}

.mobile_menu_content .mobile-main-navigation .navbar-nav li::before {
    content: '';
    position: absolute;
    left: -100%;
    top: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(235, 92, 24, 0.1), rgba(249, 80, 85, 0.1));
    transition: left 0.3s ease;
    z-index: -1;
}

.mobile_menu_content .mobile-main-navigation .navbar-nav li:hover::before {
    left: 0;
}
</style>
`;

// Inject the styles into the document
document.head.insertAdjacentHTML('beforeend', mobileMenuStyles);
