/**
 * Quote Button Enhancements
 * Optimizes all "Get Quote" buttons across the website
 */

class QuoteButtonOptimizer {
    constructor() {
        this.buttons = [];
        this.init();
    }

    init() {
        this.findQuoteButtons();
        this.enhanceButtons();
        this.addEventListeners();
        this.setupAnalytics();
    }

    findQuoteButtons() {
        // Find all quote buttons across the site
        this.buttons = [
            ...document.querySelectorAll('.theme-btn'),
            ...document.querySelectorAll('.bi-btn-4 a'),
            ...document.querySelectorAll('a[href*="contact"]:not(.nav-link)')
        ].filter(btn => {
            const text = btn.textContent.toLowerCase();
            return text.includes('quote') || text.includes('get') && text.includes('quote');
        });
    }

    enhanceButtons() {
        this.buttons.forEach((button, index) => {
            // Add unique identifiers
            button.setAttribute('data-quote-btn', `quote-${index + 1}`);
            
            // Add ARIA labels for accessibility
            if (!button.getAttribute('aria-label')) {
                button.setAttribute('aria-label', 'Get a free quote for your web design project');
            }
            
            // Add role for screen readers
            button.setAttribute('role', 'button');
            
            // Add tabindex for keyboard navigation
            button.setAttribute('tabindex', '0');
            
            // Add loading state capability
            button.setAttribute('data-loading', 'false');
            
            // Add attention class for hero buttons
            if (button.closest('.bi-header-btn') || button.closest('.bi-main-slider')) {
                button.classList.add('attention');
            }
        });
    }

    addEventListeners() {
        this.buttons.forEach(button => {
            // Click event with analytics
            button.addEventListener('click', (e) => this.handleQuoteClick(e, button));
            
            // Keyboard navigation
            button.addEventListener('keydown', (e) => this.handleKeyPress(e, button));
            
            // Mouse enter for enhanced hover
            button.addEventListener('mouseenter', (e) => this.handleMouseEnter(e, button));
            
            // Mouse leave
            button.addEventListener('mouseleave', (e) => this.handleMouseLeave(e, button));
            
            // Focus for accessibility
            button.addEventListener('focus', (e) => this.handleFocus(e, button));
            
            // Blur
            button.addEventListener('blur', (e) => this.handleBlur(e, button));
        });
    }

    handleQuoteClick(e, button) {
        // Prevent default if it's a hash link
        if (button.getAttribute('href') === '#') {
            e.preventDefault();
        }
        
        // Add loading state
        this.setLoadingState(button, true);
        
        // Track analytics
        this.trackQuoteClick(button);
        
        // Add click animation
        this.addClickAnimation(button);
        
        // Simulate loading for better UX
        setTimeout(() => {
            this.setLoadingState(button, false);
        }, 1000);
    }

    handleKeyPress(e, button) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            button.click();
        }
    }

    handleMouseEnter(e, button) {
        // Add hover class
        button.classList.add('hover-active');
        
        // Add subtle scale effect
        button.style.transform = 'translateY(-2px) scale(1.02)';
        
        // Add ripple effect
        this.addRippleEffect(e, button);
    }

    handleMouseLeave(e, button) {
        // Remove hover class
        button.classList.remove('hover-active');
        
        // Reset transform
        button.style.transform = '';
    }

    handleFocus(e, button) {
        // Add focus class
        button.classList.add('focused');
        
        // Add focus ring
        button.style.outline = '3px solid rgba(235, 92, 24, 0.5)';
        button.style.outlineOffset = '2px';
    }

    handleBlur(e, button) {
        // Remove focus class
        button.classList.remove('focused');
        
        // Remove focus ring
        button.style.outline = '';
        button.style.outlineOffset = '';
    }

    setLoadingState(button, isLoading) {
        if (isLoading) {
            button.classList.add('loading');
            button.setAttribute('data-loading', 'true');
            button.setAttribute('aria-busy', 'true');
            
            // Store original text
            const originalText = button.textContent;
            button.setAttribute('data-original-text', originalText);
            
            // Update text
            button.textContent = 'Processing...';
        } else {
            button.classList.remove('loading');
            button.setAttribute('data-loading', 'false');
            button.setAttribute('aria-busy', 'false');
            
            // Restore original text
            const originalText = button.getAttribute('data-original-text');
            if (originalText) {
                button.textContent = originalText;
            }
        }
    }

    addClickAnimation(button) {
        // Add click animation class
        button.classList.add('clicked');
        
        // Remove after animation completes
        setTimeout(() => {
            button.classList.remove('clicked');
        }, 300);
    }

    addRippleEffect(e, button) {
        // Create ripple element
        const ripple = document.createElement('span');
        ripple.classList.add('ripple-effect');
        
        // Calculate position
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        // Style ripple
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        // Add to button
        button.appendChild(ripple);
        
        // Remove after animation
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    trackQuoteClick(button) {
        // Google Analytics tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', 'quote_button_click', {
                'event_category': 'engagement',
                'event_label': button.getAttribute('data-quote-btn'),
                'value': 1
            });
        }
        
        // Custom analytics
        const analyticsData = {
            buttonId: button.getAttribute('data-quote-btn'),
            buttonText: button.textContent.trim(),
            buttonLocation: this.getButtonLocation(button),
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            screenSize: `${window.innerWidth}x${window.innerHeight}`
        };
        
        // Send to analytics endpoint (if available)
        this.sendAnalytics(analyticsData);
        
        // Store in localStorage for tracking
        this.storeAnalytics(analyticsData);
    }

    getButtonLocation(button) {
        if (button.closest('.bi-header-btn')) return 'header';
        if (button.closest('.bi-main-slider')) return 'hero';
        if (button.closest('.bi-footer-cta')) return 'footer';
        if (button.closest('.bi-service-section')) return 'services';
        if (button.closest('.bi-about-section')) return 'about';
        return 'other';
    }

    sendAnalytics(data) {
        // Send to your analytics endpoint
        fetch('/api/analytics/quote-clicks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).catch(error => {
            console.log('Analytics endpoint not available:', error);
        });
    }

    storeAnalytics(data) {
        try {
            const stored = JSON.parse(localStorage.getItem('quoteAnalytics') || '[]');
            stored.push(data);
            
            // Keep only last 100 entries
            if (stored.length > 100) {
                stored.splice(0, stored.length - 100);
            }
            
            localStorage.setItem('quoteAnalytics', JSON.stringify(stored));
        } catch (error) {
            console.log('Could not store analytics:', error);
        }
    }

    setupAnalytics() {
        // Track button visibility
        this.trackButtonVisibility();
        
        // Track scroll depth
        this.trackScrollDepth();
    }

    trackButtonVisibility() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const button = entry.target;
                    const buttonId = button.getAttribute('data-quote-btn');
                    
                    // Track visibility
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'quote_button_view', {
                            'event_category': 'engagement',
                            'event_label': buttonId,
                            'value': 1
                        });
                    }
                }
            });
        }, { threshold: 0.5 });
        
        this.buttons.forEach(button => observer.observe(button));
    }

    trackScrollDepth() {
        let maxScroll = 0;
        
        window.addEventListener('scroll', () => {
            const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
            
            if (scrollPercent > maxScroll) {
                maxScroll = scrollPercent;
                
                // Track at 25%, 50%, 75%, 100%
                if ([25, 50, 75, 100].includes(maxScroll)) {
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'scroll_depth', {
                            'event_category': 'engagement',
                            'event_label': `${maxScroll}%`,
                            'value': maxScroll
                        });
                    }
                }
            }
        });
    }

    // Public methods for external use
    getQuoteButtons() {
        return this.buttons;
    }

    addQuoteButton(button) {
        this.buttons.push(button);
        this.enhanceButtons();
        this.addEventListeners();
    }

    removeQuoteButton(button) {
        const index = this.buttons.indexOf(button);
        if (index > -1) {
            this.buttons.splice(index, 1);
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.quoteButtonOptimizer = new QuoteButtonOptimizer();
});

// Add CSS for ripple effect
const rippleCSS = `
    .ripple-effect {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .quote-btn.clicked {
        animation: clickPulse 0.3s ease-out;
    }
    
    @keyframes clickPulse {
        0% { transform: scale(1); }
        50% { transform: scale(0.95); }
        100% { transform: scale(1); }
    }
    
    .quote-btn.hover-active {
        transform: translateY(-2px) scale(1.02);
    }
    
    .quote-btn.focused {
        outline: 3px solid rgba(235, 92, 24, 0.5);
        outline-offset: 2px;
    }
`;

// Inject CSS
const quoteButtonStyle = document.createElement('style');
quoteButtonStyle.textContent = rippleCSS;
document.head.appendChild(quoteButtonStyle); 