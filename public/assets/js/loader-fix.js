/* Immediate Loader Fix - Force Remove Stuck Preloader */

(function() {
    'use strict';
    
    // Force remove preloader immediately
    function forceRemoveLoader() {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            preloader.style.pointerEvents = 'none';
            preloader.style.display = 'none';
            
            // Also remove it from DOM
            setTimeout(() => {
                if (preloader.parentNode) {
                    preloader.parentNode.removeChild(preloader);
                }
            }, 100);
        }
        
        // Add loaded class to body
        document.body.classList.add('loaded');
        
        console.log('✅ Preloader force removed');
    }
    
    // Try multiple approaches to ensure loader is removed
    
    // 1. Immediate execution
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', forceRemoveLoader);
    } else {
        forceRemoveLoader();
    }
    
    // 2. Backup after 1 second
    setTimeout(forceRemoveLoader, 1000);
    
    // 3. Force remove on window load
    window.addEventListener('load', forceRemoveLoader);
    
    // 4. Emergency backup after 3 seconds
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        if (preloader && preloader.style.display !== 'none') {
            console.warn('⚠️ Emergency preloader removal activated');
            forceRemoveLoader();
        }
    }, 3000);
    
})();
