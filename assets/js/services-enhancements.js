/* ===========================================
   REMLYX-STYLE SERVICES SECTION ENHANCEMENTS
   =========================================== */

(function($) {
    'use strict';
    
    var ServicesEnhancements = {
        init: function() {
            this.enhanceServiceItems();
            this.enhancePricingCards();
            this.enhanceCategories();
            this.animateOnScroll();
        },
        
        // Enhanced service items interactions
        enhanceServiceItems: function() {
            $('.bi-service-item-4').hover(
                function() {
                    $(this).addClass('hovered');
                    $(this).find('.icon').addClass('animated');
                },
                function() {
                    $(this).removeClass('hovered');
                    $(this).find('.icon').removeClass('animated');
                }
            );
            
            // Click effects
            $('.bi-service-item-4').on('click', function() {
                $(this).addClass('clicked');
                setTimeout(function() {
                    $('.bi-service-item-4').removeClass('clicked');
                }, 200);
            });
        },
        
        // Enhanced pricing cards
        enhancePricingCards: function() {
            $('.pricing-card').hover(
                function() {
                    $(this).addClass('hovered');
                },
                function() {
                    $(this).removeClass('hovered');
                }
            );
            
            // Pricing card click effects
            $('.pricing-card .plan-cta a').on('click', function(e) {
                var href = $(this).attr('href');
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    var target = $(href);
                    if (target.length) {
                        $('html, body').animate({
                            scrollTop: target.offset().top - 100
                        }, 800, 'easeInOutQuart');
                    }
                }
                
                // Add click feedback
                $(this).addClass('clicked');
                setTimeout(function() {
                    $('.pricing-card .plan-cta a').removeClass('clicked');
                }, 200);
            });
        },
        
        // Enhanced categories
        enhanceCategories: function() {
            $('.service-category-item').hover(
                function() {
                    $(this).addClass('hovered');
                    $(this).find('.category-icon').addClass('animated');
                },
                function() {
                    $(this).removeClass('hovered');
                    $(this).find('.category-icon').removeClass('animated');
                }
            );
        },
        
        // Enhanced scroll animations
        animateOnScroll: function() {
            var $animatedElements = $('.wow');
            
            if ($animatedElements.length) {
                var observer = new IntersectionObserver(function(entries) {
                    entries.forEach(function(entry) {
                        if (entry.isIntersecting) {
                            var $element = $(entry.target);
                            var animationType = $element.hasClass('fadeInUp') ? 'fadeInUp' : 
                                              $element.hasClass('fadeInRight') ? 'fadeInRight' : 
                                              $element.hasClass('zoomIn') ? 'zoomIn' : 'fadeInUp';
                            
                            $element.addClass('animated ' + animationType);
                            observer.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.1 });
                
                $animatedElements.each(function() {
                    observer.observe(this);
                });
            }
        }
    };
    
    // Initialize when document is ready
    $(document).ready(function() {
        ServicesEnhancements.init();
    });
    
    // Re-initialize on window resize
    $(window).on('resize', function() {
        // Recalculate positions if needed
        ServicesEnhancements.animateOnScroll();
    });
    
})(jQuery);

// Additional CSS for enhanced interactions
var servicesEnhancementStyles = `
<style>
.bi-service-item-4.hovered {
    transform: translateY(-15px) scale(1.02);
    box-shadow: 0 25px 70px rgba(0, 0, 0, 0.2);
}

.bi-service-item-4.clicked {
    transform: translateY(-10px) scale(0.98);
}

.bi-service-item-4 .icon.animated {
    animation: iconPulse 0.6s ease-out;
}

.pricing-card.hovered {
    transform: translateY(-15px);
    box-shadow: 0 25px 70px rgba(0, 0, 0, 0.2);
}

.pricing-card .plan-cta a.clicked {
    transform: scale(0.95);
}

.service-category-item.hovered {
    transform: translateY(-5px);
}

.service-category-item .category-icon.animated {
    animation: iconBounce 0.6s ease-out;
}

/* Enhanced animations */
@keyframes iconPulse {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.2);
    }
    100% {
        transform: scale(1.1);
    }
}

@keyframes iconBounce {
    0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-10px);
    }
    60% {
        transform: translateY(-5px);
    }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(40px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeInRight {
    from {
        opacity: 0;
        transform: translateX(40px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes zoomIn {
    from {
        opacity: 0;
        transform: scale(0.8);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

.animated.fadeInUp {
    animation: fadeInUp 0.8s ease-out forwards;
}

.animated.fadeInRight {
    animation: fadeInRight 0.8s ease-out forwards;
}

.animated.zoomIn {
    animation: zoomIn 0.8s ease-out forwards;
}

/* Smooth transitions */
.bi-service-item-4,
.pricing-card,
.service-category-item {
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.bi-service-item-4 .icon,
.pricing-card .plan-cta a,
.service-category-item .category-icon {
    transition: all 0.3s ease;
}

/* Enhanced hover effects */
.bi-service-item-4:hover .icon {
    transform: scale(1.1) rotate(5deg);
}

.pricing-card:hover .plan-cta a {
    transform: translateY(-2px);
}

.service-category-item:hover .category-icon {
    transform: scale(1.1);
}
</style>
`;

// Inject styles
document.head.insertAdjacentHTML('beforeend', servicesEnhancementStyles);
