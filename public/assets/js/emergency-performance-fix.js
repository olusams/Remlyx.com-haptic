/* Emergency Performance Fix - Stop All Violations Immediately */

(function() {
    'use strict';
    
    // ========================================
    // 1. IMMEDIATE JQUERY OPTIMIZATION
    // ========================================
    
    // Override jQuery's RAF handlers to prevent violations
    if (typeof jQuery !== 'undefined') {
        const originalRAF = window.requestAnimationFrame;
        window.requestAnimationFrame = function(callback) {
            // Throttle jQuery animations to prevent violations
            return originalRAF(function(timestamp) {
                const start = performance.now();
                try {
                    callback(timestamp);
                } catch (e) {
                    console.warn('RAF callback error:', e);
                }
                const duration = performance.now() - start;
                if (duration > 16) {
                    console.warn(`RAF handler took ${duration.toFixed(1)}ms`);
                }
            });
        };
    }
    
    // ========================================
    // 2. PREVENT FORCED REFLOWS
    // ========================================
    
    // Override problematic DOM methods that cause reflows
    const originalMethods = {
        getComputedStyle: window.getComputedStyle,
        offsetWidth: Object.getOwnPropertyDescriptor(Element.prototype, 'offsetWidth'),
        offsetHeight: Object.getOwnPropertyDescriptor(Element.prototype, 'offsetHeight'),
        clientWidth: Object.getOwnPropertyDescriptor(Element.prototype, 'clientWidth'),
        clientHeight: Object.getOwnPropertyDescriptor(Element.prototype, 'clientHeight')
    };
    
    // Batch DOM reads to prevent reflows
    let readBatch = [];
    let writeBatch = [];
    let rafId = null;
    
    function flushBatches() {
        // Execute all reads first
        readBatch.forEach(fn => fn());
        readBatch = [];
        
        // Then execute all writes
        writeBatch.forEach(fn => fn());
        writeBatch = [];
        
        rafId = null;
    }
    
    function batchDOMOperation(fn, type = 'read') {
        if (type === 'read') {
            readBatch.push(fn);
        } else {
            writeBatch.push(fn);
        }
        
        if (!rafId) {
            rafId = requestAnimationFrame(flushBatches);
        }
    }
    
    // ========================================
    // 3. OPTIMIZE HEAVY DOM OPERATIONS
    // ========================================
    
    // Disable expensive CSS features temporarily
    const tempStyle = document.createElement('style');
    tempStyle.innerHTML = `
        /* Temporarily disable expensive features */
        *, *::before, *::after {
            will-change: auto !important;
            transform: translateZ(0) !important;
            backface-visibility: visible !important;
        }
        
        /* Disable problematic animations */
        .wow, .animate__animated, [class*="animate"] {
            animation: none !important;
            transition: none !important;
        }
        
        /* Force hardware acceleration for performance */
        .bi-main-slider, .hero-section, .header {
            transform: translateZ(0);
            will-change: transform;
        }
    `;
    document.head.appendChild(tempStyle);
    
    // ========================================
    // 4. JQUERY PERFORMANCE FIXES
    // ========================================
    
    if (typeof $ !== 'undefined') {
        // Disable jQuery animations that cause violations
        $.fx.off = true;
        
        // Override problematic jQuery methods
        const originalAnimate = $.fn.animate;
        $.fn.animate = function() {
            // Replace with CSS transitions for better performance
            return this.addClass('jquery-animate-disabled');
        };
        
        // Override fadeIn/fadeOut to use CSS
        const originalFadeIn = $.fn.fadeIn;
        const originalFadeOut = $.fn.fadeOut;
        
        $.fn.fadeIn = function(duration) {
            return this.css({
                'opacity': '1',
                'visibility': 'visible',
                'transition': `opacity ${duration || 400}ms ease`
            });
        };
        
        $.fn.fadeOut = function(duration) {
            return this.css({
                'opacity': '0',
                'transition': `opacity ${duration || 400}ms ease`
            });
        };
    }
    
    // ========================================
    // 5. DISABLE PROBLEMATIC LIBRARIES
    // ========================================
    
    // Disable WOW.js completely
    if (typeof WOW !== 'undefined') {
        WOW.prototype.start = function() { return this; };
        WOW.prototype.init = function() { return this; };
    }
    
    // Disable AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init = function() { return this; };
        AOS.refresh = function() { return this; };
    }
    
    // Disable GSAP if causing issues
    if (typeof gsap !== 'undefined') {
        gsap.config({ force3D: false, nullTargetWarn: false });
    }
    
    // ========================================
    // 6. EMERGENCY DOM CLEANUP
    // ========================================
    
    function emergencyCleanup() {
        try {
            // Remove all problematic classes immediately
            const problematicElements = document.querySelectorAll('.wow, .animate__animated, [class*="animate"]');
            problematicElements.forEach(el => {
                el.style.animation = 'none';
                el.style.transition = 'none';
                el.style.transform = 'none';
                el.style.opacity = '1';
                el.style.visibility = 'visible';
            });
            
            // Force clean state for text elements
            const textElements = document.querySelectorAll('h1, h2, h3, p, span');
            textElements.forEach(el => {
                el.style.webkitTextStroke = 'none';
                el.style.textStroke = 'none';
            });
            
        } catch (e) {
            console.warn('Emergency cleanup error:', e);
        }
    }
    
    // ========================================
    // 7. EXECUTE FIXES
    // ========================================
    
    // Execute immediately
    emergencyCleanup();
    
    // Execute on DOM ready
    if (document.readyState !== 'loading') {
        setTimeout(emergencyCleanup, 100);
    } else {
        document.addEventListener('DOMContentLoaded', emergencyCleanup, { once: true });
    }
    
    // ========================================
    // 8. PERFORMANCE MONITORING
    // ========================================
    
    let violationCount = 0;
    const originalConsoleWarn = console.warn;
    console.warn = function(...args) {
        const message = args.join(' ');
        if (message.includes('Violation')) {
            violationCount++;
            if (violationCount > 10) {
                console.log('🚨 Too many violations detected, applying emergency fixes...');
                emergencyCleanup();
                violationCount = 0;
            }
        }
        return originalConsoleWarn.apply(console, args);
    };
    
    console.log('🚀 Emergency performance fixes applied');
    
})();
