/* Optimized Animation Fix - Lightweight Performance Version */

(function() {
    'use strict';
    
    // ========================================
    // 1. IMMEDIATE CSS INJECTION (NO DOM WAIT)
    // ========================================
    
    const criticalCSS = document.createElement('style');
    criticalCSS.innerHTML = `
        /* Stop problematic animations immediately */
        *, *::before, *::after {
            -webkit-text-stroke: none !important;
            text-stroke: none !important;
        }
        
        /* Hide specific problematic elements */
        .wow, .fadeIn, .fadeInUp, .fadeInDown, .fadeInLeft, .fadeInRight,
        .slideInUp, .slideInDown, .bounceIn, .zoomIn, .rotateIn,
        .text-animation, .animated-text, .marquee, .scroll-text {
            animation: none !important;
            transform: none !important;
            opacity: 1 !important;
            visibility: visible !important;
        }
    `;
    document.head.appendChild(criticalCSS);
    
    // ========================================
    // 2. LIGHTWEIGHT DOM READY HANDLER
    // ========================================
    
    function quickFix() {
        // Only target the most problematic elements
        const problemSelectors = [
            '[data-text]',
            '.wow',
            '.marquee',
            '.text-animation'
        ];
        
        problemSelectors.forEach(selector => {
            try {
                const elements = document.querySelectorAll(selector);
                elements.forEach(el => {
                    el.style.animation = 'none';
                    el.style.webkitTextStroke = 'none';
                    el.removeAttribute('data-text');
                });
            } catch (e) {
                // Silently handle errors
            }
        });
        
        console.log('✅ Quick animation fixes applied');
    }
    
    // ========================================
    // 3. EFFICIENT EXECUTION
    // ========================================
    
    // Execute immediately if DOM is ready, otherwise wait
    if (document.readyState !== 'loading') {
        quickFix();
    } else {
        document.addEventListener('DOMContentLoaded', quickFix, { once: true });
    }
    
    // ========================================
    // 4. LIBRARY OVERRIDES (MINIMAL)
    // ========================================
    
    // Override WOW.js if it exists
    if (typeof WOW !== 'undefined') {
        WOW.prototype.start = function() { return this; };
    }
    
    // Override jQuery marquee if it exists
    window.addEventListener('load', function() {
        if (typeof $ !== 'undefined' && $.fn.marquee) {
            $.fn.marquee = function() { return this; };
        }
    }, { once: true, passive: true });
    
})();
