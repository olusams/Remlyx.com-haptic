/* Critical JavaScript for mobile-first performance and SEO */

(function() {
    'use strict';

    // Performance monitoring
    const performanceMetrics = {
        startTime: performance.now(),
        
        mark: function(name) {
            performance.mark(name);
        },
        
        measure: function(name, startMark, endMark) {
            performance.measure(name, startMark, endMark);
        }
    };

    performanceMetrics.mark('critical-js-start');

    // Critical DOM helpers
    const DOM = {
        ready: function(callback) {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', callback);
            } else {
                callback();
            }
        },
        
        $: function(selector) {
            return document.querySelector(selector);
        },
        
        $$: function(selector) {
            return document.querySelectorAll(selector);
        }
    };

    // Mobile-first navigation
    const Navigation = {
        init: function() {
            this.setupMobileMenu();
            this.setupStickyHeader();
            this.setupSmoothScroll();
        },

        setupMobileMenu: function() {
            const toggle = DOM.$('.mobile-menu-toggle');
            const nav = DOM.$('.main-navigation');
            
            if (toggle && nav) {
                toggle.addEventListener('click', function() {
                    nav.classList.toggle('active');
                    toggle.classList.toggle('active');
                    document.body.classList.toggle('menu-open');
                });

                // Close menu on link click
                const navLinks = DOM.$$('.main-navigation a');
                navLinks.forEach(function(link) {
                    link.addEventListener('click', function() {
                        nav.classList.remove('active');
                        toggle.classList.remove('active');
                        document.body.classList.remove('menu-open');
                    });
                });
            }
        },

        setupStickyHeader: function() {
            const header = DOM.$('.bi-header-section');
            if (!header) return;

            let lastScrollTop = 0;
            const headerHeight = header.offsetHeight;

            function handleScroll() {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                if (scrollTop > headerHeight) {
                    header.classList.add('sticky-on');
                } else {
                    header.classList.remove('sticky-on');
                }
                
                // Hide header on scroll down, show on scroll up (mobile)
                if (window.innerWidth <= 768) {
                    if (scrollTop > lastScrollTop && scrollTop > headerHeight) {
                        header.style.transform = 'translateY(-100%)';
                    } else {
                        header.style.transform = 'translateY(0)';
                    }
                }
                
                lastScrollTop = scrollTop;
            }

            // Throttled scroll handler
            let ticking = false;
            window.addEventListener('scroll', function() {
                if (!ticking) {
                    requestAnimationFrame(function() {
                        handleScroll();
                        ticking = false;
                    });
                    ticking = true;
                }
            });
        },

        setupSmoothScroll: function() {
            const links = DOM.$$('a[href^="#"]');
            links.forEach(function(link) {
                link.addEventListener('click', function(e) {
                    const href = this.getAttribute('href');
                    if (href === '#') return;
                    
                    const target = DOM.$(href);
                    if (target) {
                        e.preventDefault();
                        const headerHeight = DOM.$('.bi-header-section').offsetHeight;
                        const targetPosition = target.offsetTop - headerHeight - 20;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                });
            });
        }
    };

    // Lazy loading for images
    const LazyLoading = {
        init: function() {
            if ('IntersectionObserver' in window) {
                this.setupIntersectionObserver();
            } else {
                this.fallbackLazyLoad();
            }
        },

        setupIntersectionObserver: function() {
            const images = DOM.$$('img[data-src], img.lazyload');
            const imageObserver = new IntersectionObserver(function(entries, observer) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        const src = img.dataset.src || img.src;
                        
                        if (img.dataset.src) {
                            img.src = src;
                            img.removeAttribute('data-src');
                        }
                        
                        img.classList.add('lazyloaded');
                        img.classList.remove('lazyload');
                        observer.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.01
            });

            images.forEach(function(img) {
                imageObserver.observe(img);
            });
        },

        fallbackLazyLoad: function() {
            const images = DOM.$$('img[data-src]');
            images.forEach(function(img) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                img.classList.add('lazyloaded');
                img.classList.remove('lazyload');
            });
        }
    };

    // Critical performance optimizations
    const Performance = {
        init: function() {
            this.optimizeImages();
            this.preloadCriticalResources();
            this.setupResourceHints();
        },

        optimizeImages: function() {
            // Convert images to lazy loading
            const images = DOM.$$('img:not([data-src]):not(.no-lazy)');
            images.forEach(function(img, index) {
                if (index > 2) { // Keep first 3 images for immediate loading
                    const src = img.src;
                    img.dataset.src = src;
                    img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E';
                    img.classList.add('lazyload');
                }
            });
        },

        preloadCriticalResources: function() {
            const criticalResources = [
                '/assets/css/critical-mobile.css',
                '/assets/js/critical-mobile.js'
            ];

            criticalResources.forEach(function(resource) {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.href = resource;
                link.as = resource.endsWith('.css') ? 'style' : 'script';
                document.head.appendChild(link);
            });
        },

        setupResourceHints: function() {
            // DNS prefetch for external resources
            const domains = [
                '//fonts.googleapis.com',
                '//fonts.gstatic.com'
            ];

            domains.forEach(function(domain) {
                const link = document.createElement('link');
                link.rel = 'dns-prefetch';
                link.href = domain;
                document.head.appendChild(link);
            });
        }
    };

    // SEO enhancements
    const SEO = {
        init: function() {
            this.enhanceStructuredData();
            this.optimizeMetaTags();
            this.setupBreadcrumbs();
        },

        enhanceStructuredData: function() {
            // Add WebPage structured data
            const structuredData = {
                "@context": "https://schema.org",
                "@type": "WebPage",
                "name": document.title,
                "description": DOM.$('meta[name="description"]')?.content || '',
                "url": window.location.href,
                "inLanguage": "en-GB",
                "isPartOf": {
                    "@type": "WebSite",
                    "name": "Remlyx",
                    "url": window.location.origin
                }
            };

            const script = document.createElement('script');
            script.type = 'application/ld+json';
            script.textContent = JSON.stringify(structuredData);
            document.head.appendChild(script);
        },

        optimizeMetaTags: function() {
            // Add missing meta tags if they don't exist
            const metaTags = [
                { name: 'robots', content: 'index, follow' },
                { name: 'googlebot', content: 'index, follow' },
                { property: 'og:type', content: 'website' },
                { property: 'og:locale', content: 'en_GB' }
            ];

            metaTags.forEach(function(tag) {
                const selector = tag.name ? `meta[name="${tag.name}"]` : `meta[property="${tag.property}"]`;
                if (!DOM.$(selector)) {
                    const meta = document.createElement('meta');
                    if (tag.name) meta.name = tag.name;
                    if (tag.property) meta.property = tag.property;
                    meta.content = tag.content;
                    document.head.appendChild(meta);
                }
            });
        },

        setupBreadcrumbs: function() {
            const breadcrumbContainer = DOM.$('.breadcrumb');
            if (!breadcrumbContainer) return;

            const pathSegments = window.location.pathname.split('/').filter(Boolean);
            const breadcrumbs = [{ name: 'Home', url: '/' }];

            let currentPath = '';
            pathSegments.forEach(function(segment) {
                currentPath += '/' + segment;
                const name = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/[-_]/g, ' ');
                breadcrumbs.push({ name: name, url: currentPath });
            });

            // Generate breadcrumb structured data
            const breadcrumbStructuredData = {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": breadcrumbs.map(function(crumb, index) {
                    return {
                        "@type": "ListItem",
                        "position": index + 1,
                        "name": crumb.name,
                        "item": window.location.origin + crumb.url
                    };
                })
            };

            const script = document.createElement('script');
            script.type = 'application/ld+json';
            script.textContent = JSON.stringify(breadcrumbStructuredData);
            document.head.appendChild(script);
        }
    };

    // Form enhancements for mobile
    const Forms = {
        init: function() {
            this.enhanceFormInputs();
            this.setupFormValidation();
        },

        enhanceFormInputs: function() {
            const inputs = DOM.$$('input, textarea, select');
            inputs.forEach(function(input) {
                // Add mobile-friendly input types
                if (input.type === 'text') {
                    if (input.name && input.name.includes('email')) {
                        input.type = 'email';
                    } else if (input.name && input.name.includes('phone')) {
                        input.type = 'tel';
                    }
                }

                // Add autocomplete attributes
                if (input.name) {
                    if (input.name.includes('name')) input.autocomplete = 'name';
                    if (input.name.includes('email')) input.autocomplete = 'email';
                    if (input.name.includes('phone')) input.autocomplete = 'tel';
                }
            });
        },

        setupFormValidation: function() {
            const forms = DOM.$$('form');
            forms.forEach(function(form) {
                form.addEventListener('submit', function(e) {
                    const requiredFields = form.querySelectorAll('[required]');
                    let isValid = true;

                    requiredFields.forEach(function(field) {
                        if (!field.value.trim()) {
                            isValid = false;
                            field.classList.add('error');
                        } else {
                            field.classList.remove('error');
                        }
                    });

                    if (!isValid) {
                        e.preventDefault();
                        const firstError = form.querySelector('.error');
                        if (firstError) {
                            firstError.focus();
                            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }
                    }
                });
            });
        }
    };

    // Initialize everything when DOM is ready
    DOM.ready(function() {
        performanceMetrics.mark('dom-ready');
        
        // Initialize core modules
        Navigation.init();
        LazyLoading.init();
        Performance.init();
        SEO.init();
        Forms.init();

        // Remove preloader
        const preloader = DOM.$('#preloader');
        if (preloader) {
            setTimeout(function() {
                preloader.style.opacity = '0';
                setTimeout(function() {
                    preloader.remove();
                }, 300);
            }, 100);
        }

        performanceMetrics.mark('critical-js-end');
        performanceMetrics.measure('critical-js-execution', 'critical-js-start', 'critical-js-end');
        
        // Log performance metrics in development
        if (window.location.hostname === 'localhost') {
            console.log('Critical JS execution time:', performance.getEntriesByName('critical-js-execution')[0].duration + 'ms');
        }
    });

    // Load non-critical resources after page load
    window.addEventListener('load', function() {
        performanceMetrics.mark('page-load-complete');
        
        // Load non-critical CSS
        const nonCriticalCSS = [
            '/assets/css/fontawesome.css',
            '/assets/css/animate.css',
            '/assets/css/swiper.min.css'
        ];

        nonCriticalCSS.forEach(function(href) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = href;
            link.media = 'print';
            link.onload = function() { this.media = 'all'; };
            document.head.appendChild(link);
        });

        // Load non-critical JavaScript
        const nonCriticalJS = [
            '/assets/js/jquery-3.6.0.min.js',
            '/assets/js/bootstrap.bundle.min.js',
            '/assets/js/script.js'
        ];

        let loadedCount = 0;
        nonCriticalJS.forEach(function(src, index) {
            setTimeout(function() {
                const script = document.createElement('script');
                script.src = src;
                script.async = true;
                script.onload = function() {
                    loadedCount++;
                    if (loadedCount === nonCriticalJS.length) {
                        performanceMetrics.mark('all-js-loaded');
                    }
                };
                document.body.appendChild(script);
            }, index * 100); // Stagger loading
        });
    });

    // Export for debugging
    window.RemlixPerformance = performanceMetrics;

})();
