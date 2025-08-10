// Enhanced Features for Remlyx Website

document.addEventListener('DOMContentLoaded', function() {
    
    // Enhanced Scroll to Top Button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #ff6b35;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
    `;
    
    document.body.appendChild(scrollTopBtn);
    
    // Show/Hide scroll button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
        }
    }, { passive: true });
    
    // Smooth scroll to top
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Enhanced Form Validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    input.style.borderColor = '#ff6b35';
                    isValid = false;
                } else {
                    input.style.borderColor = '#ddd';
                }
            });
            
            if (isValid) {
                // Show success message
                showNotification('Thank you! Your message has been sent.', 'success');
            } else {
                showNotification('Please fill in all required fields.', 'error');
            }
        });
    });
    
    // Notification System
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 5px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
            ${type === 'success' ? 'background: #28a745;' : 'background: #dc3545;'}
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
    
    // Enhanced Loading Animation
    const preloader = document.querySelector('.preloader, .loader');
    if (preloader) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            }, 1000);
        });
    }
    
    // Smooth Anchor Scrolling
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Enhanced Image Loading with Lazy Loading
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Enhanced Button Animations
    const buttons = document.querySelectorAll('.btn, button, .service_more');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Enhanced Page Transition Effect
    const pageLinks = document.querySelectorAll('a[href$=".html"]');
    pageLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.hostname === window.location.hostname) {
                e.preventDefault();
                const href = this.href;
                
                // Create transition overlay
                const overlay = document.createElement('div');
                overlay.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: #ff6b35;
                    z-index: 10000;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                `;
                
                document.body.appendChild(overlay);
                
                setTimeout(() => {
                    overlay.style.opacity = '1';
                }, 10);
                
                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            }
        });
    });
});

// Add CSS for enhanced features
const enhancedCSS = `
<style>
.notification {
    max-width: 300px;
    word-wrap: break-word;
}

.scroll-top-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 107, 53, 0.4) !important;
}

.lazy {
    opacity: 0;
    transition: opacity 0.3s ease;
}

.lazy.loaded {
    opacity: 1;
}

/* Enhanced button styles */
.btn, button, .service_more {
    transition: all 0.3s ease !important;
}

/* Loading animation improvements */
.preloader {
    transition: opacity 0.5s ease;
}

/* Smooth scrolling for all browsers */
html {
    scroll-behavior: smooth;
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', enhancedCSS);

