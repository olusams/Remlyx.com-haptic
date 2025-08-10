// Haptic Template Enhanced Interactions
// Modern Creative Agency JavaScript Features

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // 1. MODERN HEADER SCROLL EFFECTS
    // ========================================
    
    const header = document.querySelector('.bi-header-section');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add sticky class when scrolling
        if (scrollTop > 100) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
        
        // Hide/show header on scroll
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    }, { passive: true });
    
    // ========================================
    // 2. MODERN HERO ANIMATIONS
    // ========================================
    
    // Animate hero elements on load
    function animateHeroElements() {
        const heroTitle = document.querySelector('.bi-banner-main-text h1');
        const heroText = document.querySelector('.bi-banner-main-text p');
        const heroButton = document.querySelector('.bi-btn-main');
        
        if (heroTitle) {
            setTimeout(() => {
                heroTitle.classList.add('fade-in-up');
            }, 300);
        }
        
        if (heroText) {
            setTimeout(() => {
                heroText.classList.add('fade-in-up');
            }, 600);
        }
        
        if (heroButton) {
            setTimeout(() => {
                heroButton.classList.add('fade-in-up');
            }, 900);
        }
    }
    
    animateHeroElements();
    
    // ========================================
    // 3. MODERN SERVICE CARD ANIMATIONS
    // ========================================
    
    // Add service card classes and animations
    const serviceItems = document.querySelectorAll('.bi-service-area .service-item, .bi-about-service .about-service-item');
    
    serviceItems.forEach((item, index) => {
        item.classList.add('service-card');
        
        // Add icon wrapper if not present
        const icon = item.querySelector('i, .icon');
        if (icon && !icon.parentElement.classList.contains('icon')) {
            const iconWrapper = document.createElement('div');
            iconWrapper.className = 'icon';
            icon.parentNode.insertBefore(iconWrapper, icon);
            iconWrapper.appendChild(icon);
        }
        
        // Animate on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('fade-in-up');
                    }, index * 200);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(item);
    });
    
    // ========================================
    // 4. MODERN TEAM CARD ENHANCEMENTS
    // ========================================
    
    const teamMembers = document.querySelectorAll('.team-member, .tm-item');
    
    teamMembers.forEach((member, index) => {
        member.classList.add('team-card');
        
        // Add proper structure if needed
        const img = member.querySelector('img');
        const content = member.querySelector('.tm-text, .team-content');
        
        if (img && !img.parentElement.classList.contains('team-image')) {
            const imageWrapper = document.createElement('div');
            imageWrapper.className = 'team-image';
            img.parentNode.insertBefore(imageWrapper, img);
            imageWrapper.appendChild(img);
        }
        
        if (content && !content.classList.contains('team-content')) {
            content.classList.add('team-content');
        }
        
        // Animate on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('fade-in-up');
                    }, index * 150);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(member);
    });
    
    // ========================================
    // 5. MODERN PORTFOLIO GRID ENHANCEMENTS
    // ========================================
    
    const portfolioItems = document.querySelectorAll('.gallery-item, .portfolio-item, .pf-item');
    
    portfolioItems.forEach((item, index) => {
        if (!item.classList.contains('portfolio-item')) {
            item.classList.add('portfolio-item');
        }
        
        // Add overlay if not present
        const img = item.querySelector('img');
        if (img && !item.querySelector('.portfolio-overlay')) {
            const overlay = document.createElement('div');
            overlay.className = 'portfolio-overlay';
            overlay.innerHTML = '<i class="fas fa-eye fa-2x" style="color: white;"></i>';
            
            const imageWrapper = img.parentElement;
            if (!imageWrapper.classList.contains('portfolio-image')) {
                imageWrapper.classList.add('portfolio-image');
            }
            imageWrapper.appendChild(overlay);
        }
        
        // Add content wrapper
        const title = item.querySelector('h3, h4, .title');
        const desc = item.querySelector('p, .desc');
        
        if ((title || desc) && !item.querySelector('.portfolio-content')) {
            const contentWrapper = document.createElement('div');
            contentWrapper.className = 'portfolio-content';
            
            if (title) contentWrapper.appendChild(title);
            if (desc) contentWrapper.appendChild(desc);
            
            item.appendChild(contentWrapper);
        }
        
        // Animate on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('fade-in-up');
                    }, index * 100);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(item);
    });
    
    // ========================================
    // 6. MODERN TESTIMONIAL ENHANCEMENTS
    // ========================================
    
    const testimonials = document.querySelectorAll('.testimonial-item, .test-item');
    
    testimonials.forEach((item, index) => {
        item.classList.add('testimonial-card');
        
        // Add client image wrapper
        const img = item.querySelector('img');
        if (img && !img.parentElement.classList.contains('client-image')) {
            const imageWrapper = document.createElement('div');
            imageWrapper.className = 'client-image';
            img.parentNode.insertBefore(imageWrapper, img);
            imageWrapper.appendChild(img);
        }
        
        // Animate on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('fade-in-up');
                    }, index * 200);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(item);
    });
    
    // ========================================
    // 7. MODERN BLOG CARD ENHANCEMENTS
    // ========================================
    
    const blogItems = document.querySelectorAll('.blog-item, .bi-blog-item');
    
    blogItems.forEach((item, index) => {
        item.classList.add('blog-card');
        
        // Add proper structure
        const img = item.querySelector('img');
        const content = item.querySelector('.blog-text, .blog-content');
        const date = item.querySelector('.date, .meta');
        const readMore = item.querySelector('a[href*="blog"], .read-more');
        
        if (img && !img.parentElement.classList.contains('blog-image')) {
            const imageWrapper = document.createElement('div');
            imageWrapper.className = 'blog-image';
            img.parentNode.insertBefore(imageWrapper, img);
            imageWrapper.appendChild(img);
        }
        
        if (content && !content.classList.contains('blog-content')) {
            content.classList.add('blog-content');
        }
        
        if (date && !date.classList.contains('blog-meta')) {
            date.classList.add('blog-meta');
        }
        
        if (readMore && !readMore.classList.contains('read-more')) {
            readMore.classList.add('read-more');
        }
        
        // Animate on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('fade-in-up');
                    }, index * 150);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(item);
    });
    
    // ========================================
    // 8. MODERN BUTTON ENHANCEMENTS
    // ========================================
    
    // Enhance all buttons with modern styling
    const buttons = document.querySelectorAll('.btn, .theme-btn, .bi-btn, button[type="submit"]');
    
    buttons.forEach(button => {
        if (!button.classList.contains('bi-btn-main')) {
            button.classList.add('bi-btn-main');
        }
        
        // Add ripple effect
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // ========================================
    // 9. MODERN COUNTER ANIMATIONS
    // ========================================
    
    const counters = document.querySelectorAll('.counter, .stat-number');
    
    counters.forEach(counter => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(counter.textContent.replace(/\D/g, ''));
                    const increment = target / 100;
                    let current = 0;
                    
                    const updateCounter = () => {
                        if (current < target) {
                            current += increment;
                            counter.textContent = Math.ceil(current).toLocaleString();
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target.toLocaleString();
                        }
                    };
                    
                    updateCounter();
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
    
    // ========================================
    // 10. MODERN FLOATING ANIMATIONS
    // ========================================
    
    // Add floating animation to specific elements
    const floatingElements = document.querySelectorAll('.logo img, .hero-shape, .floating');
    
    floatingElements.forEach(element => {
        element.classList.add('float-animation');
    });
    
    // ========================================
    // 11. MODERN PARALLAX EFFECTS
    // ========================================
    
    const parallaxElements = document.querySelectorAll('.parallax, .hero-bg');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach(element => {
            element.style.transform = `translateY(${rate}px)`;
        });
    }, { passive: true });
    
    // ========================================
    // 12. MODERN LOADING ANIMATIONS
    // ========================================
    
    // Add loading states to dynamic content
    const dynamicContent = document.querySelectorAll('.dynamic-load');
    
    dynamicContent.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100);
    });
    
});

// ========================================
// 13. MODERN CSS ANIMATIONS (via JS)
// ========================================

// Add custom CSS for animations
const animationCSS = `
<style>
/* Ripple Effect */
.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
}

@keyframes ripple-animation {
    to {
        transform: scale(4);
        opacity: 0;
    }
}

/* Modern Hover Effects */
.modern-hover {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.modern-hover:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
}

/* Stagger Animation */
.stagger-animation {
    animation-delay: calc(var(--animation-order) * 0.1s);
}

/* Modern Loading State */
.loading-skeleton {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: loading-skeleton 1.5s infinite;
}

@keyframes loading-skeleton {
    0% {
        background-position: 200% 0;
    }
    100% {
        background-position: -200% 0;
    }
}

/* Enhanced Focus States */
.enhanced-focus:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.3);
    border-color: #ff6b35;
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', animationCSS);
