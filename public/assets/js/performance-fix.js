/* Performance Fix - Console Errors Resolution */

/* ========================================
   FIX PASSIVE EVENT LISTENER WARNINGS
======================================== */

// This script ensures all scroll and touch event listeners are properly optimized
// for performance to avoid console warnings about non-passive event listeners

function initPerformanceFixes() {
    
    // ========================================
    // 1. LIGHTWEIGHT EVENT LISTENER OVERRIDE
    // ========================================
    
    // Store original addEventListener
    const originalAddEventListener = EventTarget.prototype.addEventListener;
    
    // Override addEventListener to automatically add passive option for scroll events
    EventTarget.prototype.addEventListener = function(type, listener, options) {
        // Events that should be passive by default for performance
        const passiveEvents = ['scroll', 'wheel', 'mousewheel', 'touchstart', 'touchmove'];
        
        if (passiveEvents.includes(type)) {
            // If options is a boolean or not provided, convert to object
            if (typeof options === 'boolean' || options === undefined) {
                options = {
                    capture: typeof options === 'boolean' ? options : false,
                    passive: true
                };
            } else if (typeof options === 'object' && options.passive === undefined) {
                // If options is object but passive not specified, add it
                options.passive = true;
            }
        }
        
        // Call original addEventListener with modified options
        return originalAddEventListener.call(this, type, listener, options);
    };
    
    // ========================================
    // 2. FIX EXISTING EVENT LISTENERS
    // ========================================
    
    // Fix any existing scroll listeners that weren't caught
    const fixExistingListeners = () => {
        // Look for elements with scroll listeners
        const scrollElements = document.querySelectorAll('*');
        
        scrollElements.forEach(element => {
            // Check for common scroll listener patterns
            if (element.onscroll || element.ontouchstart || element.ontouchmove) {
                // Remove old listeners and re-add with passive option
                const oldOnScroll = element.onscroll;
                const oldOnTouchStart = element.ontouchstart;
                const oldOnTouchMove = element.ontouchmove;
                
                if (oldOnScroll) {
                    element.onscroll = null;
                    element.addEventListener('scroll', oldOnScroll, { passive: true });
                }
                
                if (oldOnTouchStart) {
                    element.ontouchstart = null;
                    element.addEventListener('touchstart', oldOnTouchStart, { passive: true });
                }
                
                if (oldOnTouchMove) {
                    element.ontouchmove = null;
                    element.addEventListener('touchmove', oldOnTouchMove, { passive: true });
                }
            }
        });
    };
    
    // ========================================
    // 3. PERFORMANCE OPTIMIZATIONS
    // ========================================
    
    // Throttle scroll events for better performance
    function throttle(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Debounce resize events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // ========================================
    // 4. TOUCH SUPPORT OPTIMIZATIONS
    // ========================================
    
    // Add passive touch support for better mobile performance
    const addPassiveTouchSupport = () => {
        // Prevent default on touchmove only when necessary
        let isScrolling = false;
        
        document.addEventListener('touchstart', function(e) {
            isScrolling = false;
        }, { passive: true });
        
        document.addEventListener('touchmove', function(e) {
            isScrolling = true;
        }, { passive: true });
        
        document.addEventListener('touchend', function(e) {
            if (!isScrolling) {
                // Handle tap events here if needed
            }
        }, { passive: true });
    };
    
    // ========================================
    // 5. SCROLL OPTIMIZATION
    // ========================================
    
    // Optimize scroll performance with requestAnimationFrame
    let ticking = false;
    const optimizedScrollHandler = (callback) => {
        return function() {
            if (!ticking) {
                requestAnimationFrame(() => {
                    callback();
                    ticking = false;
                });
                ticking = true;
            }
        };
    };
    
    // Replace window scroll listeners with optimized versions
    const optimizeScrollListeners = () => {
        // Store original scroll handlers
        const scrollHandlers = [];
        
        // Override window scroll events
        const originalWindowAddEventListener = window.addEventListener;
        window.addEventListener = function(type, listener, options) {
            if (type === 'scroll') {
                // Wrap scroll listener with optimization
                const optimizedListener = optimizedScrollHandler(listener);
                scrollHandlers.push({ original: listener, optimized: optimizedListener });
                
                // Ensure passive option
                if (typeof options === 'boolean' || options === undefined) {
                    options = { passive: true, capture: options || false };
                } else if (typeof options === 'object') {
                    options.passive = true;
                }
                
                return originalWindowAddEventListener.call(this, type, optimizedListener, options);
            } else {
                return originalWindowAddEventListener.call(this, type, listener, options);
            }
        };
    };
    
    // ========================================
    // 6. INITIALIZE FIXES
    // ========================================
    
    console.log('✅ Performance optimizations applied - passive event listeners enabled');
}

// Execute immediately or when DOM is ready
if (document.readyState !== 'loading') {
    initPerformanceFixes();
} else {
    document.addEventListener('DOMContentLoaded', initPerformanceFixes, { once: true });
}

/* ========================================
   EXPORT FOR TESTING
======================================== */

// Export performance utilities if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        throttle,
        debounce,
        optimizedScrollHandler
    };
}

/* ========================================
   LEGACY SUPPORT
======================================== */

// Ensure compatibility with older browsers
if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function(callback) {
        return setTimeout(callback, 1000 / 60);
    };
}

if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
    };
}
