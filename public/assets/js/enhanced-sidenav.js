/* Enhanced Side Navigation JavaScript */

(function() {
    'use strict';
    
    // ========================================
    // 1. ENHANCED SIDEBAR FUNCTIONALITY
    // ========================================
    
    class EnhancedSidebar {
        constructor() {
            this.sidebar = document.querySelector('.xs-sidebar-group.info-group');
            this.sidebarWidget = document.querySelector('.xs-sidebar-widget');
            this.overlay = document.querySelector('.xs-overlay');
            this.openButton = document.querySelector('.open_mobile_menu');
            this.closeButton = document.querySelector('.close-side-widget');
            this.menuItems = document.querySelectorAll('.sidebar-menu li a');
            this.isOpen = false;
            this.isAnimating = false;
            
            this.init();
        }
        
        init() {
            this.bindEvents();
            this.setupKeyboardNavigation();
            this.setupTouchGestures();
            this.addLoadingState();
        }
        
        bindEvents() {
            // Open sidebar
            if (this.openButton) {
                this.openButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.openSidebar();
                });
            }
            
            // Close sidebar
            if (this.closeButton) {
                this.closeButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.closeSidebar();
                });
            }
            
            // Close on overlay click
            if (this.overlay) {
                this.overlay.addEventListener('click', () => {
                    this.closeSidebar();
                });
            }
            
            // Enhanced menu item interactions
            this.menuItems.forEach((item, index) => {
                this.enhanceMenuItem(item, index);
            });
            
            // Close on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.isOpen) {
                    this.closeSidebar();
                }
            });
            
            // Prevent scroll when sidebar is open
            this.preventBodyScroll();
        }
        
        openSidebar() {
            if (this.isAnimating) return;
            
            this.isAnimating = true;
            this.isOpen = true;
            
            // Add loading state
            this.showLoading();
            
            // Open sidebar with delay for loading effect
            setTimeout(() => {
                this.sidebar.classList.add('isActive');
                document.body.classList.add('sidebar-open');
                
                // Hide loading after animation
                setTimeout(() => {
                    this.hideLoading();
                    this.isAnimating = false;
                    
                    // Focus first menu item for accessibility
                    const firstMenuItem = this.menuItems[0];
                    if (firstMenuItem) {
                        firstMenuItem.focus();
                    }
                }, 600);
            }, 200);
            
            // Add ripple effect to open button
            this.addRippleEffect(this.openButton);
            
            console.log('✨ Enhanced sidebar opened');
        }
        
        closeSidebar() {
            if (this.isAnimating) return;
            
            this.isAnimating = true;
            this.isOpen = false;
            
            this.sidebar.classList.remove('isActive');
            document.body.classList.remove('sidebar-open');
            
            setTimeout(() => {
                this.isAnimating = false;
            }, 600);
            
            console.log('✨ Enhanced sidebar closed');
        }
        
        enhanceMenuItem(item, index) {
            // Add hover sound effect (optional)
            item.addEventListener('mouseenter', () => {
                this.addHoverEffect(item);
            });
            
            // Add click ripple effect
            item.addEventListener('click', (e) => {
                this.addRippleEffect(item, e);
                
                // Add click animation
                item.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    item.style.transform = '';
                }, 150);
            });
            
            // Add stagger animation delay
            item.style.setProperty('--delay', `${index * 0.1}s`);
        }
        
        addRippleEffect(element, event = null) {
            const ripple = document.createElement('span');
            const rect = element.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            
            let x, y;
            if (event) {
                x = event.clientX - rect.left - size / 2;
                y = event.clientY - rect.top - size / 2;
            } else {
                x = rect.width / 2 - size / 2;
                y = rect.height / 2 - size / 2;
            }
            
            ripple.style.cssText = `
                position: absolute;
                left: ${x}px;
                top: ${y}px;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                background: rgba(255, 71, 87, 0.3);
                transform: scale(0);
                animation: rippleEffect 0.6s ease-out;
                pointer-events: none;
                z-index: 1000;
            `;
            
            // Add ripple styles if not already added
            if (!document.getElementById('ripple-styles')) {
                const style = document.createElement('style');
                style.id = 'ripple-styles';
                style.innerHTML = `
                    @keyframes rippleEffect {
                        to {
                            transform: scale(2);
                            opacity: 0;
                        }
                    }
                `;
                document.head.appendChild(style);
            }
            
            element.style.position = 'relative';
            element.style.overflow = 'hidden';
            element.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        }
        
        addHoverEffect(item) {
            // Create sparkle effect on hover
            const sparkle = document.createElement('div');
            sparkle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: #ff4757;
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                animation: sparkleEffect 0.8s ease-out;
            `;
            
            const rect = item.getBoundingClientRect();
            sparkle.style.left = Math.random() * rect.width + 'px';
            sparkle.style.top = Math.random() * rect.height + 'px';
            
            // Add sparkle animation if not already added
            if (!document.getElementById('sparkle-styles')) {
                const style = document.createElement('style');
                style.id = 'sparkle-styles';
                style.innerHTML = `
                    @keyframes sparkleEffect {
                        0% {
                            transform: scale(0) rotate(0deg);
                            opacity: 1;
                        }
                        50% {
                            transform: scale(1) rotate(180deg);
                            opacity: 1;
                        }
                        100% {
                            transform: scale(0) rotate(360deg);
                            opacity: 0;
                        }
                    }
                `;
                document.head.appendChild(style);
            }
            
            item.style.position = 'relative';
            item.appendChild(sparkle);
            
            setTimeout(() => {
                sparkle.remove();
            }, 800);
        }
        
        setupKeyboardNavigation() {
            // Enhanced keyboard navigation
            this.menuItems.forEach((item, index) => {
                item.addEventListener('keydown', (e) => {
                    switch (e.key) {
                        case 'ArrowDown':
                            e.preventDefault();
                            const nextIndex = (index + 1) % this.menuItems.length;
                            this.menuItems[nextIndex].focus();
                            break;
                        case 'ArrowUp':
                            e.preventDefault();
                            const prevIndex = (index - 1 + this.menuItems.length) % this.menuItems.length;
                            this.menuItems[prevIndex].focus();
                            break;
                        case 'Home':
                            e.preventDefault();
                            this.menuItems[0].focus();
                            break;
                        case 'End':
                            e.preventDefault();
                            this.menuItems[this.menuItems.length - 1].focus();
                            break;
                    }
                });
            });
        }
        
        setupTouchGestures() {
            let startX = 0;
            let startY = 0;
            let currentX = 0;
            let currentY = 0;
            
            if (this.sidebarWidget) {
                this.sidebarWidget.addEventListener('touchstart', (e) => {
                    startX = e.touches[0].clientX;
                    startY = e.touches[0].clientY;
                }, { passive: true });
                
                this.sidebarWidget.addEventListener('touchmove', (e) => {
                    currentX = e.touches[0].clientX;
                    currentY = e.touches[0].clientY;
                }, { passive: true });
                
                this.sidebarWidget.addEventListener('touchend', () => {
                    const diffX = startX - currentX;
                    const diffY = Math.abs(startY - currentY);
                    
                    // Swipe right to close (minimum 100px, mostly horizontal)
                    if (diffX < -100 && diffY < 50) {
                        this.closeSidebar();
                    }
                }, { passive: true });
            }
        }
        
        preventBodyScroll() {
            const originalOverflow = document.body.style.overflow;
            
            // Prevent body scroll when sidebar is open
            this.sidebar.addEventListener('transitionstart', () => {
                if (this.isOpen) {
                    document.body.style.overflow = 'hidden';
                }
            });
            
            this.sidebar.addEventListener('transitionend', () => {
                if (!this.isOpen) {
                    document.body.style.overflow = originalOverflow;
                }
            });
        }
        
        showLoading() {
            if (!document.querySelector('.sidebar-loading')) {
                const loading = document.createElement('div');
                loading.className = 'sidebar-loading';
                loading.style.display = 'block';
                this.sidebarWidget.appendChild(loading);
            }
        }
        
        hideLoading() {
            const loading = document.querySelector('.sidebar-loading');
            if (loading) {
                loading.style.display = 'none';
            }
        }
        
        addLoadingState() {
            // Add loading state for menu items
            this.menuItems.forEach(item => {
                item.addEventListener('click', () => {
                    if (item.getAttribute('href') && !item.getAttribute('href').startsWith('#')) {
                        item.style.opacity = '0.7';
                        item.style.pointerEvents = 'none';
                        
                        // Add loading spinner to clicked item
                        const spinner = document.createElement('div');
                        spinner.style.cssText = `
                            display: inline-block;
                            width: 16px;
                            height: 16px;
                            border: 2px solid rgba(255, 71, 87, 0.3);
                            border-top: 2px solid #ff4757;
                            border-radius: 50%;
                            animation: spin 1s linear infinite;
                            margin-left: 10px;
                        `;
                        
                        // Add spin animation if not already added
                        if (!document.getElementById('spin-styles')) {
                            const style = document.createElement('style');
                            style.id = 'spin-styles';
                            style.innerHTML = `
                                @keyframes spin {
                                    0% { transform: rotate(0deg); }
                                    100% { transform: rotate(360deg); }
                                }
                            `;
                            document.head.appendChild(style);
                        }
                        
                        item.appendChild(spinner);
                    }
                });
            });
        }
    }
    
    // ========================================
    // 2. INITIALIZE ENHANCED SIDEBAR
    // ========================================
    
    function initEnhancedSidebar() {
        new EnhancedSidebar();
        console.log('🚀 Enhanced sidebar initialized');
    }
    
    // Initialize when DOM is ready
    if (document.readyState !== 'loading') {
        initEnhancedSidebar();
    } else {
        document.addEventListener('DOMContentLoaded', initEnhancedSidebar, { once: true });
    }
    
    // ========================================
    // 3. ADDITIONAL SIDEBAR UTILITIES
    // ========================================
    
    // Add smooth scrolling to sidebar menu items
    function addSmoothScrolling() {
        const sidebarLinks = document.querySelectorAll('.sidebar-menu a[href^="#"]');
        
        sidebarLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Close sidebar first
                    const sidebar = document.querySelector('.xs-sidebar-group.info-group');
                    if (sidebar) {
                        sidebar.classList.remove('isActive');
                    }
                    
                    // Then scroll to target
                    setTimeout(() => {
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }, 300);
                }
            });
        });
    }
    
    // Initialize smooth scrolling
    document.addEventListener('DOMContentLoaded', addSmoothScrolling, { once: true });
    
    // ========================================
    // 4. EXPORT FOR EXTERNAL USE
    // ========================================
    
    window.EnhancedSidebar = {
        init: initEnhancedSidebar,
        addSmoothScrolling: addSmoothScrolling
    };
    
})();

