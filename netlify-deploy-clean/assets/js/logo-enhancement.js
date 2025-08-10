/**
 * Logo Enhancement and Debugging JavaScript
 * This file handles logo-related functionality, debugging, and enhancement features
 */

(function() {
    'use strict';

    // Logo Enhancement Class
    class LogoEnhancer {
        constructor() {
            this.logos = [];
            this.init();
        }

        init() {
            this.findAllLogos();
            this.enhanceLogos();
            this.setupLogoErrorHandling();
            this.setupLogoAnalytics();
            this.setupLogoAccessibility();
        }

        // Find all logo elements on the page
        findAllLogos() {
            this.logos = [
                ...document.querySelectorAll('.brand-logo img'),
                ...document.querySelectorAll('.m-brand-logo img'),
                ...document.querySelectorAll('.sidebar-logo img'),
                ...document.querySelectorAll('.bi-footer-logo .brand-logo img')
            ];
            
            console.log(`LogoEnhancer: Found ${this.logos.length} logo images`);
        }

        // Enhance logo functionality
        enhanceLogos() {
            this.logos.forEach((logo, index) => {
                this.enhanceSingleLogo(logo, index);
            });
        }

        // Enhance a single logo
        enhanceSingleLogo(logo, index) {
            // Add loading state
            logo.addEventListener('load', () => {
                this.onLogoLoad(logo, index);
            });

            // Add error handling
            logo.addEventListener('error', () => {
                this.onLogoError(logo, index);
            });

            // Add click tracking
            logo.addEventListener('click', () => {
                this.onLogoClick(logo, index);
            });

            // Add hover effects
            logo.addEventListener('mouseenter', () => {
                this.onLogoHover(logo, index);
            });

            // Ensure proper alt text
            this.ensureAltText(logo);
        }

        // Handle logo load success
        onLogoLoad(logo, index) {
            logo.style.opacity = '1';
            logo.classList.add('logo-loaded');
            
            // Add success indicator
            this.addLogoStatus(logo, 'success');
            
            console.log(`Logo ${index + 1} loaded successfully:`, logo.src);
        }

        // Handle logo load error
        onLogoError(logo, index) {
            logo.style.opacity = '0.5';
            logo.classList.add('logo-error');
            
            // Add error indicator
            this.addLogoStatus(logo, 'error');
            
            // Try to load fallback logo
            this.loadFallbackLogo(logo, index);
            
            console.error(`Logo ${index + 1} failed to load:`, logo.src);
        }

        // Load fallback logo
        loadFallbackLogo(logo, index) {
            const fallbackSrc = 'assets/img/logo/logo1.png'; // Fallback logo
            
            if (logo.src !== fallbackSrc) {
                logo.src = fallbackSrc;
                logo.alt = 'Remlyx - Web Design Agency Leeds (Fallback)';
                
                console.log(`Logo ${index + 1}: Loading fallback logo`);
            }
        }

        // Handle logo click
        onLogoClick(logo, index) {
            // Track logo clicks for analytics
            this.trackLogoClick(logo, index);
            
            // Add click animation
            logo.style.transform = 'scale(0.95)';
            setTimeout(() => {
                logo.style.transform = '';
            }, 150);
        }

        // Handle logo hover
        onLogoHover(logo, index) {
            logo.style.cursor = 'pointer';
        }

        // Ensure proper alt text
        ensureAltText(logo) {
            if (!logo.alt || logo.alt.trim() === '') {
                logo.alt = 'Remlyx - Web Design Agency Leeds';
                console.log('LogoEnhancer: Added missing alt text to logo');
            }
        }

        // Add logo status indicator
        addLogoStatus(logo, status) {
            const statusClass = status === 'success' ? 'logo-status-success' : 'logo-status-error';
            logo.classList.add(statusClass);
        }

        // Track logo clicks for analytics
        trackLogoClick(logo, index) {
            // You can integrate with Google Analytics or other tracking services here
            const logoData = {
                src: logo.src,
                alt: logo.alt,
                index: index,
                timestamp: new Date().toISOString(),
                page: window.location.pathname
            };
            
            console.log('Logo click tracked:', logoData);
            
            // Store in localStorage for debugging
            this.storeLogoClick(logoData);
        }

        // Store logo click data
        storeLogoClick(data) {
            try {
                const clicks = JSON.parse(localStorage.getItem('logoClicks') || '[]');
                clicks.push(data);
                
                // Keep only last 100 clicks
                if (clicks.length > 100) {
                    clicks.splice(0, clicks.length - 100);
                }
                
                localStorage.setItem('logoClicks', JSON.stringify(clicks));
            } catch (error) {
                console.error('Failed to store logo click data:', error);
            }
        }

        // Setup logo error handling
        setupLogoErrorHandling() {
            // Global error handler for images
            window.addEventListener('error', (event) => {
                if (event.target.tagName === 'IMG') {
                    this.handleGlobalImageError(event.target);
                }
            }, true);
        }

        // Handle global image errors
        handleGlobalImageError(img) {
            if (img.classList.contains('brand-logo') || 
                img.closest('.brand-logo') || 
                img.src.includes('rebirted') ||
                img.src.includes('logo')) {
                
                console.error('Global logo error detected:', img.src);
                this.onLogoError(img, -1);
            }
        }

        // Setup logo analytics
        setupLogoAnalytics() {
            // Track logo visibility
            this.trackLogoVisibility();
            
            // Track logo performance
            this.trackLogoPerformance();
        }

        // Track logo visibility
        trackLogoVisibility() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const logo = entry.target;
                        logo.classList.add('logo-visible');
                        
                        // Track logo view
                        this.trackLogoView(logo);
                    }
                });
            }, { threshold: 0.1 });

            this.logos.forEach(logo => {
                observer.observe(logo);
            });
        }

        // Track logo view
        trackLogoView(logo) {
            const viewData = {
                src: logo.src,
                alt: logo.alt,
                timestamp: new Date().toISOString(),
                page: window.location.pathname
            };
            
            console.log('Logo view tracked:', viewData);
        }

        // Track logo performance
        trackLogoPerformance() {
            // Use Performance API to track logo loading times
            if ('performance' in window) {
                this.logos.forEach(logo => {
                    const startTime = performance.now();
                    
                    logo.addEventListener('load', () => {
                        const loadTime = performance.now() - startTime;
                        console.log(`Logo load time: ${loadTime.toFixed(2)}ms`);
                    });
                });
            }
        }

        // Setup logo accessibility
        setupLogoAccessibility() {
            this.logos.forEach(logo => {
                // Ensure proper ARIA labels
                if (!logo.getAttribute('aria-label')) {
                    logo.setAttribute('aria-label', logo.alt || 'Remlyx Logo');
                }
                
                // Add keyboard navigation
                logo.addEventListener('keydown', (event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        logo.click();
                    }
                });
            });
        }

        // Debug method to get logo information
        debug() {
            console.group('LogoEnhancer Debug Information');
            console.log('Total logos found:', this.logos.length);
            
            this.logos.forEach((logo, index) => {
                console.group(`Logo ${index + 1}`);
                console.log('Source:', logo.src);
                console.log('Alt text:', logo.alt);
                console.log('Classes:', logo.className);
                console.log('Dimensions:', logo.naturalWidth + 'x' + logo.naturalHeight);
                console.log('Loaded:', logo.complete);
                console.groupEnd();
            });
            
            console.groupEnd();
        }

        // Get logo statistics
        getStats() {
            const stats = {
                total: this.logos.length,
                loaded: this.logos.filter(logo => logo.complete).length,
                errors: this.logos.filter(logo => logo.classList.contains('logo-error')).length,
                clicks: JSON.parse(localStorage.getItem('logoClicks') || '[]').length
            };
            
            return stats;
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.logoEnhancer = new LogoEnhancer();
        });
    } else {
        window.logoEnhancer = new LogoEnhancer();
    }

    // Expose LogoEnhancer globally for debugging
    window.LogoEnhancer = LogoEnhancer;

    // Add some utility functions to global scope
    window.logoDebug = () => {
        if (window.logoEnhancer) {
            window.logoEnhancer.debug();
        }
    };

    window.logoStats = () => {
        if (window.logoEnhancer) {
            return window.logoEnhancer.getStats();
        }
        return null;
    };

    console.log('LogoEnhancer: Script loaded successfully');
    console.log('Use logoDebug() to see debug information');
    console.log('Use logoStats() to see logo statistics');

})();
