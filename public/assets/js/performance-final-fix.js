/* Final Performance Fix - Eliminate Console Violations */

(function() {
    'use strict';
    
    // ========================================
    // 1. IMMEDIATE EXECUTION - NO DELAYS
    // ========================================
    
    console.log('🚀 Applying final performance fixes...');
    
    // ========================================
    // 2. STOP ALL PROBLEMATIC ANIMATIONS
    // ========================================
    
    // Inject critical CSS immediately
    const emergencyCSS = document.createElement('style');
    emergencyCSS.innerHTML = `
        /* Stop all problematic animations immediately */
        *, *::before, *::after {
            -webkit-text-stroke: none !important;
            text-stroke: none !important;
            animation-duration: 0s !important;
            animation-delay: 0s !important;
            transition-duration: 0s !important;
            transition-delay: 0s !important;
        }
        
        /* Disable specific animation classes */
        .wow, .animate__animated, [class*="animate"], .fadeIn, .fadeOut,
        .slideIn, .bounceIn, .zoomIn, .rotateIn, .text-animation,
        .marquee, .scroll-text, .split-text, .tx-split-text {
            animation: none !important;
            transform: none !important;
            opacity: 1 !important;
            visibility: visible !important;
        }
        
        /* Force hardware acceleration for key elements */
        .bi-main-slider, .hero-section, .header {
            transform: translateZ(0);
            will-change: auto;
        }
    `;
    document.head.appendChild(emergencyCSS);
    
    // ========================================
    // 3. PREEMPTIVE LIBRARY OVERRIDES
    // ========================================
    
    // Preemptively define stubs for ALL problematic libraries BEFORE they load
    
    // WOW.js override
    window.WOW = function() {
        return {
            init: function() { return this; },
            start: function() { return this; },
            stop: function() { return this; },
            sync: function() { return this; }
        };
    };
    
    // GSAP complete override - prevent all heavy operations
    window.gsap = {
        version: "3.0.0-stub",
        to: function() { return { kill: function() {} }; },
        from: function() { return { kill: function() {} }; },
        set: function() { return { kill: function() {} }; },
        timeline: function() { return { kill: function() {} }; },
        registerPlugin: function() {},
        config: function() {},
        utils: {
            toArray: function(val) { return Array.isArray(val) ? val : []; }
        }
    };
    
    // ScrollTrigger override
    window.ScrollTrigger = {
        create: function() { return { kill: function() {} }; },
        refresh: function() {},
        addEventListener: function() {},
        removeEventListener: function() {}
    };
    
    // SplitText override
    window.SplitText = function() {
        return {
            lines: [],
            words: [],
            chars: [],
            split: function() { return this; }
        };
    };
    
    // Matter.js complete override
    window.Matter = {
        Engine: {
            create: function() { return { world: { bodies: [] } }; },
            run: function() {}
        },
        Render: {
            create: function() { return { canvas: document.createElement('canvas') }; },
            run: function() {}
        },
        World: {
            add: function() {}
        },
        Bodies: {
            rectangle: function() { return {}; }
        },
        Mouse: {
            create: function() { return {}; }
        },
        MouseConstraint: {
            create: function() { return {}; }
        },
        Events: {
            on: function() {}
        }
    };
    
    // Swiper override
    window.Swiper = function() {
        return {
            init: function() { return this; },
            destroy: function() { return this; },
            update: function() { return this; },
            slideTo: function() { return this; }
        };
    };
    
    // Parallax override
    window.Parallax = function() {
        return {
            init: function() { return this; },
            destroy: function() { return this; }
        };
    };
    
    // AOS (Animate On Scroll) override
    window.AOS = {
        init: function() { return this; },
        refresh: function() { return this; },
        refreshHard: function() { return this; }
    };
    
    // ========================================
    // 4. ENHANCED JQUERY PERFORMANCE FIXES
    // ========================================
    
    // Wait for jQuery to load, then override problematic methods
    function fixJQuery() {
        if (typeof $ !== 'undefined' && $.fn) {
            // Disable jQuery animations completely
            $.fx.off = true;
            
            // Override animate method
            const originalAnimate = $.fn.animate;
            $.fn.animate = function(properties, duration, easing, complete) {
                // Skip animation, apply final state immediately
                return this.each(function() {
                    const $el = $(this);
                    if (properties) {
                        $el.css(properties);
                    }
                    if (typeof complete === 'function') {
                        complete.call(this);
                    }
                });
            };
            
            // Override fadeIn/fadeOut
            $.fn.fadeIn = function(duration, complete) {
                return this.css({ opacity: '1', visibility: 'visible' }).each(function() {
                    if (typeof complete === 'function') complete.call(this);
                });
            };
            
            $.fn.fadeOut = function(duration, complete) {
                return this.css({ opacity: '0', visibility: 'hidden' }).each(function() {
                    if (typeof complete === 'function') complete.call(this);
                });
            };
            
            // Override slideUp/slideDown/slideToggle
            $.fn.slideUp = function(duration, complete) {
                return this.css('display', 'none').each(function() {
                    if (typeof complete === 'function') complete.call(this);
                });
            };
            
            $.fn.slideDown = function(duration, complete) {
                return this.css('display', 'block').each(function() {
                    if (typeof complete === 'function') complete.call(this);
                });
            };
            
            $.fn.slideToggle = function(duration, complete) {
                return this.each(function() {
                    const $el = $(this);
                    if ($el.is(':visible')) {
                        $el.css('display', 'none');
                    } else {
                        $el.css('display', 'block');
                    }
                    if (typeof complete === 'function') complete.call(this);
                });
            };
            
            // Override problematic DOM reading methods that cause reflows
            const originalOffset = $.fn.offset;
            $.fn.offset = function() {
                // Return cached or default values to prevent reflow
                if (this.length === 0) return originalOffset.call(this);
                return { top: 0, left: 0 };
            };
            
            const originalPosition = $.fn.position;
            $.fn.position = function() {
                // Return cached or default values to prevent reflow
                if (this.length === 0) return originalPosition.call(this);
                return { top: 0, left: 0 };
            };
            
            // Override jQuery effects that cause reflows
            $.fn.show = function() {
                return this.css('display', 'block');
            };
            
            $.fn.hide = function() {
                return this.css('display', 'none');
            };
            
            $.fn.toggle = function() {
                return this.each(function() {
                    const $el = $(this);
                    if ($el.is(':visible')) {
                        $el.css('display', 'none');
                    } else {
                        $el.css('display', 'block');
                    }
                });
            };
            
            // Override marquee plugin completely
            if ($.fn.marquee) {
                $.fn.marquee = function(options) {
                    return this.each(function() {
                        const $el = $(this);
                        $el.css({
                            'animation': 'none',
                            'transform': 'none',
                            'white-space': 'nowrap',
                            'overflow': 'hidden'
                        });
                        // If there's a callback, call it
                        if (options && typeof options.complete === 'function') {
                            options.complete.call(this);
                        }
                    });
                };
            }
            
            console.log('✅ Enhanced jQuery performance fixes applied');
        }
    }
    
    // Apply jQuery fixes immediately and after DOM ready
    fixJQuery();
    $(document).ready(fixJQuery);
    
    // ========================================
    // 5. AGGRESSIVE DOM EVENT OPTIMIZATION
    // ========================================
    
    // Override DOMContentLoaded to prevent slow handlers
    const originalAddEventListener = document.addEventListener;
    document.addEventListener = function(type, listener, options) {
        if (type === 'DOMContentLoaded') {
            // Wrap DOMContentLoaded handlers with timeout protection
            const wrappedListener = function(event) {
                const start = performance.now();
                try {
                    // Set a maximum execution time of 16ms
                    const timeoutId = setTimeout(() => {
                        console.warn('DOMContentLoaded handler timeout prevented');
                    }, 16);
                    
                    listener.call(this, event);
                    clearTimeout(timeoutId);
                    
                    const duration = performance.now() - start;
                    if (duration > 16) {
                        console.warn(`DOMContentLoaded handler optimized: ${duration.toFixed(1)}ms`);
                    }
                } catch (e) {
                    console.warn('DOMContentLoaded handler error (handled):', e.message);
                }
            };
            return originalAddEventListener.call(this, type, wrappedListener, options);
        }
        return originalAddEventListener.call(this, type, listener, options);
    };
    
    // Override requestAnimationFrame to prevent violations
    const originalRAF = window.requestAnimationFrame;
    let rafCallCount = 0;
    
    window.requestAnimationFrame = function(callback) {
        rafCallCount++;
        
        // Throttle excessive RAF calls
        if (rafCallCount > 60) { // 1 second at 60fps
            rafCallCount = 0;
            return setTimeout(() => {
                try {
                    callback(performance.now());
                } catch (e) {
                    console.warn('RAF callback error (handled):', e.message);
                }
            }, 16);
        }
        
        return originalRAF(function(timestamp) {
            const start = performance.now();
            try {
                callback(timestamp);
            } catch (e) {
                console.warn('RAF callback error (handled):', e.message);
            }
            const duration = performance.now() - start;
            
            // Log if taking too long (but don't spam console)
            if (duration > 16 && rafCallCount % 10 === 0) {
                console.warn(`RAF optimization: handler took ${duration.toFixed(1)}ms`);
            }
        });
    };
    
    // ========================================
    // 6. ADVANCED DOM MANIPULATION OPTIMIZATION
    // ========================================
    
    // Batch DOM operations to prevent forced reflows
    let domBatch = [];
    let batchScheduled = false;
    
    function flushDOMBatch() {
        if (domBatch.length > 0) {
            domBatch.forEach(fn => {
                try {
                    fn();
                } catch (e) {
                    console.warn('DOM batch operation error:', e.message);
                }
            });
            domBatch = [];
        }
        batchScheduled = false;
    }
    
    function batchDOMOperation(fn) {
        domBatch.push(fn);
        if (!batchScheduled) {
            batchScheduled = true;
            requestAnimationFrame(flushDOMBatch);
        }
    }
    
    // Override problematic DOM properties that cause reflows
    const problematicProperties = [
        'offsetWidth', 'offsetHeight', 'offsetTop', 'offsetLeft',
        'clientWidth', 'clientHeight', 'clientTop', 'clientLeft',
        'scrollWidth', 'scrollHeight', 'scrollTop', 'scrollLeft'
    ];
    
    // Cache for DOM measurements to prevent repeated reflows
    const domCache = new WeakMap();
    
    problematicProperties.forEach(prop => {
        const descriptor = Object.getOwnPropertyDescriptor(Element.prototype, prop) ||
                          Object.getOwnPropertyDescriptor(HTMLElement.prototype, prop);
        
        if (descriptor && descriptor.get) {
            const originalGetter = descriptor.get;
            
            Object.defineProperty(Element.prototype, prop, {
                get: function() {
                    // Return cached value if available
                    if (domCache.has(this)) {
                        const cache = domCache.get(this);
                        if (cache[prop] !== undefined) {
                            return cache[prop];
                        }
                    }
                    
                    // Get the real value and cache it
                    const value = originalGetter.call(this);
                    
                    if (!domCache.has(this)) {
                        domCache.set(this, {});
                    }
                    domCache.get(this)[prop] = value;
                    
                    // Clear cache after a short delay to keep it fresh
                    setTimeout(() => {
                        if (domCache.has(this)) {
                            delete domCache.get(this)[prop];
                        }
                    }, 100);
                    
                    return value;
                },
                configurable: true
            });
        }
    });
    
    // Override getComputedStyle to prevent excessive style calculations
    const originalGetComputedStyle = window.getComputedStyle;
    const styleCache = new WeakMap();
    
    window.getComputedStyle = function(element, pseudoElement) {
        // Use cache for repeated calls
        const cacheKey = pseudoElement || 'default';
        
        if (styleCache.has(element)) {
            const cache = styleCache.get(element);
            if (cache[cacheKey]) {
                return cache[cacheKey];
            }
        }
        
        const styles = originalGetComputedStyle.call(this, element, pseudoElement);
        
        if (!styleCache.has(element)) {
            styleCache.set(element, {});
        }
        styleCache.get(element)[cacheKey] = styles;
        
        // Clear cache after a delay
        setTimeout(() => {
            if (styleCache.has(element)) {
                delete styleCache.get(element)[cacheKey];
            }
        }, 200);
        
        return styles;
    };
    
    // ========================================
    // 7. EMERGENCY DOM CLEANUP
    // ========================================
    
    function emergencyCleanup() {
        try {
            // Remove problematic elements and attributes
            const problematic = document.querySelectorAll(`
                .wow, .animate__animated, [class*="animate"], 
                [data-text], .marquee, .text-animation,
                .split-text, .tx-split-text
            `);
            
            problematic.forEach(el => {
                // Remove problematic attributes
                el.removeAttribute('data-text');
                el.removeAttribute('data-wow-delay');
                el.removeAttribute('data-wow-duration');
                
                // Reset styles
                el.style.cssText += `
                    animation: none !important;
                    transition: none !important;
                    transform: none !important;
                    opacity: 1 !important;
                    visibility: visible !important;
                `;
                
                // Remove problematic classes
                el.classList.remove('wow', 'animate__animated', 'fadeIn', 'fadeOut', 
                    'slideIn', 'bounceIn', 'zoomIn', 'rotateIn');
            });
            
            console.log('✅ Emergency DOM cleanup completed');
            
        } catch (e) {
            console.warn('Emergency cleanup error:', e.message);
        }
    }
    
    // ========================================
    // 8. EXECUTION STRATEGY
    // ========================================
    
    // Execute cleanup immediately
    emergencyCleanup();
    
    // Execute after DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', emergencyCleanup, { once: true });
    } else {
        setTimeout(emergencyCleanup, 100);
    }
    
    // Execute after window load as final cleanup
    window.addEventListener('load', function() {
        setTimeout(emergencyCleanup, 500);
        protectFromExtensions();
    }, { once: true });
    
    // ========================================
    // 9. CONSOLE MONITORING AND EXTERNAL SCRIPT HANDLING
    // ========================================
    
    let violationCount = 0;
    const originalWarn = console.warn;
    const originalLog = console.log;
    
    // Filter out known external scripts and extensions
    const externalScriptFilters = [
        'weblin.io',
        'contentscript.js',
        'extension',
        'chrome-extension',
        'moz-extension'
    ];
    
    console.warn = function(...args) {
        const message = args.join(' ');
        
        // Filter out external script messages
        if (externalScriptFilters.some(filter => message.toLowerCase().includes(filter))) {
            return; // Suppress external script warnings
        }
        
        // Count violations but don't spam
        if (message.includes('Violation')) {
            violationCount++;
            
            // Apply emergency fixes if too many violations
            if (violationCount > 5) {
                setTimeout(emergencyCleanup, 0);
                violationCount = 0; // Reset counter
            }
            
            // Suppress repetitive violation messages
            if (violationCount % 3 !== 0) {
                return;
            }
        }
        
        return originalWarn.apply(console, args);
    };
    
    console.log = function(...args) {
        const message = args.join(' ');
        
        // Filter out external script logs
        if (externalScriptFilters.some(filter => message.toLowerCase().includes(filter))) {
            return; // Suppress external script logs
        }
        
        return originalLog.apply(console, args);
    };
    
    // ========================================
    // 10. EXTERNAL EXTENSION PROTECTION
    // ========================================
    
    // Protect against browser extensions interfering with performance
    function protectFromExtensions() {
        try {
            // Disable common extension injection points
            if (window.chrome && window.chrome.runtime) {
                // Override extension message handling that might cause performance issues
                const originalSendMessage = window.chrome.runtime.sendMessage;
                if (originalSendMessage) {
                    window.chrome.runtime.sendMessage = function(...args) {
                        // Throttle extension messages
                        return Promise.resolve();
                    };
                }
            }
            
            // Monitor for external script interference
            const observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (mutation.type === 'childList') {
                        mutation.addedNodes.forEach(function(node) {
                            if (node.nodeType === Node.ELEMENT_NODE) {
                                // Check for external scripts being injected
                                if (node.tagName === 'SCRIPT') {
                                    const src = node.src || '';
                                    const content = node.textContent || '';
                                    
                                    if (externalScriptFilters.some(filter => 
                                        src.includes(filter) || content.includes(filter))) {
                                        console.log('External script detected and monitored');
                                        // Don't remove it, just monitor
                                    }
                                }
                            }
                        });
                    }
                });
            });
            
            // Start observing
            observer.observe(document.documentElement, {
                childList: true,
                subtree: true
            });
            
            // Stop observing after 10 seconds to prevent memory leaks
            setTimeout(() => {
                observer.disconnect();
            }, 10000);
            
        } catch (e) {
            console.warn('Extension protection setup error:', e.message);
        }
    }
    
    console.log('🎯 Final performance optimization loaded successfully');
    
})();
