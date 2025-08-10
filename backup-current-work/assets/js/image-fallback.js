/**
 * Image Fallback Handler
 * Handles missing images gracefully by replacing with placeholders or hiding them
 */

(function() {
    'use strict';
    
    // List of known missing images
    const missingImages = [
        'remlyon.png',
        'test-2.jpg',
        'test-5.jpg',
        'avatar_02.jpg',
        '03_testimoniald.jpg',
        'texture.png',
        'awards-bg.jpg'
    ];
    
    // Function to handle image load errors
    function handleImageError(img) {
        const src = img.src;
        
        // Check if this is a known missing image
        if (missingImages.some(missing => src.includes(missing))) {
            // For service images, replace with a placeholder
            if (src.includes('service/')) {
                img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlNlcnZpY2UgSW1hZ2U8L3RleHQ+PC9zdmc+';
                img.alt = 'Service Image Placeholder';
            }
            // For testimonial images, replace with a placeholder
            else if (src.includes('testimonial/') || src.includes('avatar_02.jpg')) {
                img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI0MCIgZmlsbD0iI2YwZjBmMCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5BdmF0YXI8L3RleHQ+PC9zdmc+';
                img.alt = 'Avatar Placeholder';
            }
            // For background images, hide the element
            else if (src.includes('bg/') || src.includes('texture.png') || src.includes('awards-bg.jpg')) {
                img.style.display = 'none';
            }
            // For other missing images, hide them
            else {
                img.style.display = 'none';
            }
        }
    }
    
    // Function to check and handle images that might already be broken
    function checkExistingImages() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            // Check if image is already broken
            if (img.complete && img.naturalHeight === 0) {
                handleImageError(img);
            }
            
            // Check if src contains any of our missing images
            const src = img.src || img.getAttribute('src') || '';
            if (missingImages.some(missing => src.includes(missing))) {
                handleImageError(img);
            }
        });
    }
    
    // Function to initialize image error handling
    function initImageFallbacks() {
        // Handle existing images immediately
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            // Add error event listener
            img.addEventListener('error', () => handleImageError(img));
            
            // Check if image already failed to load
            if (img.complete && img.naturalHeight === 0) {
                handleImageError(img);
            }
        });
        
        // Handle dynamically added images
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === 1) { // Element node
                        const newImages = node.querySelectorAll ? node.querySelectorAll('img') : [];
                        if (node.tagName === 'IMG') {
                            newImages.push(node);
                        }
                        newImages.forEach(img => {
                            img.addEventListener('error', () => handleImageError(img));
                            // Check if it's already a missing image
                            const src = img.src || img.getAttribute('src') || '';
                            if (missingImages.some(missing => src.includes(missing))) {
                                handleImageError(img);
                            }
                        });
                    }
                });
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    
    // Initialize immediately
    initImageFallbacks();
    checkExistingImages();
    
    // Also run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initImageFallbacks();
            checkExistingImages();
        });
    }
    
    // Run multiple times to catch all images
    setTimeout(() => {
        initImageFallbacks();
        checkExistingImages();
    }, 50);
    
    setTimeout(() => {
        initImageFallbacks();
        checkExistingImages();
    }, 100);
    
    setTimeout(() => {
        initImageFallbacks();
        checkExistingImages();
    }, 500);
    
    setTimeout(() => {
        initImageFallbacks();
        checkExistingImages();
    }, 1000);
    
    // Also run on window load
    window.addEventListener('load', () => {
        initImageFallbacks();
        checkExistingImages();
    });
    
})();
