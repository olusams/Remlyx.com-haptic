/* ===========================================
   REMLYX-STYLE ABOUT SECTION ENHANCEMENTS
   =========================================== */

(function($) {
    'use strict';
    
    var AboutEnhancements = {
        init: function() {
            this.statisticsCounter();
            this.animateOnScroll();
            this.enhanceInteractions();
        },
        
        // Statistics Counter Animation
        statisticsCounter: function() {
            var $statNumbers = $('.stat-number');
            
            if ($statNumbers.length) {
                $statNumbers.each(function() {
                    var $this = $(this);
                    var countTo = $this.attr('data-count');
                    var countFrom = 0;
                    var duration = 2000;
                    var startTime = null;
                    
                    function updateCounter(timestamp) {
                        if (!startTime) startTime = timestamp;
                        var progress = Math.min((timestamp - startTime) / duration, 1);
                        var currentCount = Math.floor(progress * (countTo - countFrom) + countFrom);
                        
                        $this.text(currentCount);
                        
                        if (progress < 1) {
                            requestAnimationFrame(updateCounter);
                        } else {
                            $this.text(countTo);
                        }
                    }
                    
                    // Start counter when element is in view
                    var observer = new IntersectionObserver(function(entries) {
                        entries.forEach(function(entry) {
                            if (entry.isIntersecting) {
                                requestAnimationFrame(updateCounter);
                                observer.unobserve(entry.target);
                            }
                        });
                    }, { threshold: 0.5 });
                    
                    observer.observe($this[0]);
                });
            }
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
        },
        
        // Enhanced interactions
        enhanceInteractions: function() {
            // Enhanced hover effects for feature items
            $('.bi-about-feature-4 ul li').hover(
                function() {
                    $(this).addClass('hovered');
                },
                function() {
                    $(this).removeClass('hovered');
                }
            );
            
            // Smooth scrolling for CTA buttons
            $('.about-cta-btn a').on('click', function(e) {
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
            });
            
            // Phone number click enhancement
            $('.about-cta-phone a').on('click', function() {
                // Add click feedback
                $(this).addClass('clicked');
                setTimeout(function() {
                    $('.about-cta-phone a').removeClass('clicked');
                }, 200);
            });
        }
    };
    
    // Initialize when document is ready
    $(document).ready(function() {
        AboutEnhancements.init();
    });
    
    // Re-initialize on window resize
    $(window).on('resize', function() {
        // Recalculate positions if needed
        AboutEnhancements.animateOnScroll();
    });
    
})(jQuery);

// Additional CSS for enhanced interactions
var aboutEnhancementStyles = `
<style>
.bi-about-feature-4 ul li.hovered {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
}

.about-cta-btn a.clicked {
    transform: scale(0.95);
}

.stat-number {
    transition: all 0.3s ease;
}

.stat-item:hover .stat-number {
    transform: scale(1.1);
    text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
}

.about-cta-phone:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255, 255, 255, 0.2);
}

.about-cta-phone a.clicked {
    transform: scale(0.95);
}

/* Enhanced animations */
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
.bi-about-feature-4 ul li,
.about-cta-btn,
.about-cta-phone,
.stat-item {
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
</style>
`;

// Inject styles
document.head.insertAdjacentHTML('beforeend', aboutEnhancementStyles);
