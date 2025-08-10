// Hero Section Enhancements

document.addEventListener('DOMContentLoaded', function() {
    // Smooth slide-in for smen-2 element
    const sliderMen = document.querySelector('.slider_men');
    if (sliderMen) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'slideInFromRight 0.8s ease-out';
                }
            });
        });
        observer.observe(sliderMen);
    }

    // Animate trust badges on scroll
    const trustBadges = document.querySelectorAll('.trust-badge, .google-partner-badge, .trustpilot-badge');
    trustBadges.forEach((badge, index) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.animation = 'fadeInUp 0.6s ease-out';
                    }, index * 200);
                }
            });
        });
        observer.observe(badge);
    });

    // Google Partner badge hover effects
    const googleBadge = document.querySelector('.google-badge');
    if (googleBadge) {
        googleBadge.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        googleBadge.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    }

    // Trustpilot badge hover effects
    const trustpilotBadge = document.querySelector('.trustpilot-badge-inner');
    if (trustpilotBadge) {
        trustpilotBadge.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        trustpilotBadge.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    }

    // Awards section animations
    const awardItems = document.querySelectorAll('.bi-award-item-4');
    awardItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
            this.style.boxShadow = '0 15px 40px rgba(235, 92, 24, 0.3)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 8px 25px rgba(235, 92, 24, 0.2)';
        });
    });

    // Award glow animation on scroll
    const awardsSection = document.querySelector('.bi-awards-section-4');
    if (awardsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const awardItems = entry.target.querySelectorAll('.bi-award-item-4');
                    awardItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('awardGlow');
                        }, index * 200);
                    });
                }
            });
        });
        observer.observe(awardsSection);
    }

    // Gallery filtering functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter gallery items
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Gallery card hover effects
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
            this.style.boxShadow = '0 20px 50px rgba(0, 0, 0, 0.3)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
        });
    });

    // Gallery link click handlers
    const galleryLinks = document.querySelectorAll('.gallery-link');
    galleryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // Add your gallery modal or lightbox functionality here
            console.log('Gallery item clicked:', this.getAttribute('href'));
        });
    });

    // Enhanced smen-2 slide-in animation
    const smenElement = document.querySelector('.slider_men');
    if (smenElement) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'slideInFromRight 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                }
            });
        });
        observer.observe(smenElement);
    }

    // Animate statistics on scroll with counter animation
    const statisticsSection = document.querySelector('.hero-statistics');
    if (statisticsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statNumbers = entry.target.querySelectorAll('.stat-number');
                    statNumbers.forEach((number, index) => {
                        setTimeout(() => {
                            const targetText = number.textContent;
                            const targetNumber = parseInt(targetText.replace(/[^\d]/g, ''));
                            const suffix = targetText.replace(/[\d]/g, '');
                            animateCounter(number, 0, targetNumber, suffix, 2000); // 2 seconds duration
                            number.style.animation = 'fadeInUp 0.6s ease-out';
                        }, index * 300); // Staggered start
                    });
                }
            });
        });
        observer.observe(statisticsSection);
    }

    // Counter animation function
    function animateCounter(element, start, end, suffix, duration) {
        const startTime = performance.now();
        const difference = end - start;
        element.classList.add('animating'); // Add animating class for pulse effect

        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4); // Easing function
            const currentValue = Math.floor(start + (difference * easeOutQuart));
            element.textContent = currentValue + suffix;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = end + suffix; // Ensure final value is exact
                setTimeout(() => {
                    element.classList.remove('animating'); // Remove animating class after animation completes
                    // Ensure the element is properly positioned after animation
                    element.style.transform = '';
                }, 500);
            }
        }
        requestAnimationFrame(updateCounter);
    }

    // Floating action button interactions
    const fabBtn = document.querySelector('.fab-btn');
    if (fabBtn) {
        fabBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.1)';
        });
        
        fabBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    }

    // Scroll indicator functionality
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });
    }

    // Enhanced Get Quote Button Interactions
    const getQuoteBtn = document.querySelector('.bi-header-btn .theme-btn');
    
    if (getQuoteBtn) {
        // Add click ripple effect
        getQuoteBtn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
        
        // Add hover sound effect (optional - can be disabled)
        getQuoteBtn.addEventListener('mouseenter', function() {
            // Add a subtle class for additional hover effects
            this.classList.add('quote-btn-hover');
        });
        
        getQuoteBtn.addEventListener('mouseleave', function() {
            this.classList.remove('quote-btn-hover');
        });
        
        // Add keyboard navigation support
        getQuoteBtn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    }
});

// Add ripple animation keyframes to CSS
const heroStyle = document.createElement('style');
heroStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .quote-btn-hover {
        animation: pulse 0.3s ease-in-out;
    }
    
    @keyframes slideInFromRight {
        0% {
            opacity: 0;
            transform: translateX(50px);
        }
        100% {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes awardGlow {
        0% {
            box-shadow: 0 8px 25px rgba(235, 92, 24, 0.2);
        }
        50% {
            box-shadow: 0 15px 40px rgba(235, 92, 24, 0.4);
        }
        100% {
            box-shadow: 0 8px 25px rgba(235, 92, 24, 0.2);
        }
    }
`;
document.head.appendChild(heroStyle); 