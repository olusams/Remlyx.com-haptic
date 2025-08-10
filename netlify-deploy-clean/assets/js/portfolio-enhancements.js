// Portfolio Section Enhancements - Remlyx Style

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Portfolio Features
    initPortfolioFilter();
    initPortfolioLightbox();
    initProjectDetailsModal();
    initPortfolioStats();
    initLoadMorePortfolio();
    initPortfolioAnimations();
});

// Portfolio Filtering
function initPortfolioFilter() {
    const filterItems = document.querySelectorAll('.filter-item');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all filter items
            filterItems.forEach(filter => filter.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter portfolio items
            portfolioItems.forEach(portfolioItem => {
                if (filterValue === '*' || portfolioItem.classList.contains(filterValue.replace('.', ''))) {
                    portfolioItem.style.display = 'block';
                    portfolioItem.style.animation = 'fadeInUp 0.6s ease forwards';
                } else {
                    portfolioItem.style.display = 'none';
                }
            });
            
            // Update portfolio grid layout
            setTimeout(() => {
                updatePortfolioLayout();
            }, 100);
        });
    });
}

// Portfolio Lightbox
function initPortfolioLightbox() {
    const lightboxLinks = document.querySelectorAll('.lightbox-link');
    
    lightboxLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const imageSrc = this.getAttribute('href');
            const imageTitle = this.getAttribute('data-title');
            
            openLightbox(imageSrc, imageTitle);
        });
    });
    
    // Close lightbox on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });
}

function openLightbox(imageSrc, imageTitle) {
    // Create lightbox overlay
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox-overlay';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <button class="lightbox-close" aria-label="Close lightbox">
                <i class="fas fa-times"></i>
            </button>
            <div class="lightbox-image-container">
                <img src="${imageSrc}" alt="${imageTitle}" class="lightbox-image">
            </div>
            <div class="lightbox-caption">
                <h3>${imageTitle}</h3>
            </div>
        </div>
    `;
    
    // Add lightbox styles
    const lightboxStyles = `
        <style>
            .lightbox-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                backdrop-filter: blur(10px);
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            
            .lightbox-overlay.active {
                opacity: 1;
            }
            
            .lightbox-content {
                position: relative;
                max-width: 90%;
                max-height: 90%;
                text-align: center;
            }
            
            .lightbox-close {
                position: absolute;
                top: -50px;
                right: 0;
                background: none;
                border: none;
                color: #fff;
                font-size: 2rem;
                cursor: pointer;
                transition: color 0.3s ease;
            }
            
            .lightbox-close:hover {
                color: #4ecdc4;
            }
            
            .lightbox-image {
                max-width: 100%;
                max-height: 70vh;
                border-radius: 10px;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
            }
            
            .lightbox-caption {
                margin-top: 20px;
                color: #fff;
            }
            
            .lightbox-caption h3 {
                font-size: 1.5rem;
                font-weight: 600;
                margin: 0;
            }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', lightboxStyles);
    document.body.appendChild(lightbox);
    
    // Animate in
    setTimeout(() => {
        lightbox.classList.add('active');
    }, 10);
    
    // Close functionality
    const closeBtn = lightbox.querySelector('.lightbox-close');
    closeBtn.addEventListener('click', closeLightbox);
    
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
}

function closeLightbox() {
    const lightbox = document.querySelector('.lightbox-overlay');
    if (lightbox) {
        lightbox.classList.remove('active');
        setTimeout(() => {
            lightbox.remove();
        }, 300);
    }
}

// Project Details Modal
function initProjectDetailsModal() {
    const projectLinks = document.querySelectorAll('.project-details-link');
    
    projectLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const projectId = this.getAttribute('data-project');
            openProjectModal(projectId);
        });
    });
}

function openProjectModal(projectId) {
    // Project data (in a real application, this would come from a database)
    const projectData = {
        project1: {
            title: 'Modern E-commerce Platform',
            description: 'A comprehensive e-commerce solution built with React and Node.js. Features include advanced product management, secure payment processing, and responsive design.',
            technologies: ['React', 'Node.js', 'MongoDB', 'Stripe API', 'Redux'],
            duration: '3 months',
            team: '4 developers',
            challenges: 'Implementing real-time inventory management and secure payment processing.',
            solutions: 'Used WebSocket for real-time updates and integrated multiple payment gateways for redundancy.',
            results: 'Increased conversion rate by 35% and reduced cart abandonment by 25%.'
        },
        project2: {
            title: 'Corporate Website Redesign',
            description: 'Complete brand transformation for a leading corporation, including new visual identity and improved user experience.',
            technologies: ['WordPress', 'PHP', 'JavaScript', 'CSS3', 'SEO'],
            duration: '2 months',
            team: '3 designers, 2 developers',
            challenges: 'Maintaining brand consistency while modernizing the design.',
            solutions: 'Created comprehensive brand guidelines and implemented modular design system.',
            results: 'Improved page load speed by 40% and increased organic traffic by 60%.'
        },
        project3: {
            title: 'Custom CRM System',
            description: 'Enterprise-level customer relationship management system with advanced reporting and automation features.',
            technologies: ['Laravel', 'Vue.js', 'MySQL', 'Redis', 'Docker'],
            duration: '4 months',
            team: '6 developers',
            challenges: 'Handling large datasets and ensuring system scalability.',
            solutions: 'Implemented caching strategies and database optimization techniques.',
            results: 'Reduced customer response time by 50% and improved data accuracy by 95%.'
        },
        project4: {
            title: 'Online Store Platform',
            description: 'Scalable e-commerce platform with advanced features including inventory management and analytics.',
            technologies: ['Shopify', 'Liquid', 'JavaScript', 'Payment API', 'Analytics'],
            duration: '3 months',
            team: '3 developers',
            challenges: 'Integrating multiple payment gateways and ensuring PCI compliance.',
            solutions: 'Used Shopify\'s secure payment infrastructure and implemented custom checkout flow.',
            results: 'Achieved 99.9% uptime and processed over £1M in transactions.',
        },
        project5: {
            title: 'Mobile App Development',
            description: 'Cross-platform mobile application with real-time features and offline functionality.',
            technologies: ['React Native', 'Firebase', 'Redux', 'Native APIs', 'Push Notifications'],
            duration: '5 months',
            team: '4 developers',
            challenges: 'Ensuring consistent performance across iOS and Android platforms.',
            solutions: 'Used React Native for code sharing and implemented platform-specific optimizations.',
            results: 'Achieved 4.8-star rating on both app stores with 100K+ downloads.',
        },
        project6: {
            title: 'Brand Identity Design',
            description: 'Complete brand identity system including logo design, brand guidelines, and marketing materials.',
            technologies: ['Adobe Creative Suite', 'Brand Guidelines', 'Print Design', 'Digital Assets'],
            duration: '1 month',
            team: '2 designers',
            challenges: 'Creating a unique brand identity that stands out in a competitive market.',
            solutions: 'Conducted extensive market research and created multiple design iterations.',
            results: 'Increased brand recognition by 80% and improved customer trust scores.',
        }
    };
    
    const project = projectData[projectId];
    if (!project) return;
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'project-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2 class="modal-title">${project.title}</h2>
                <button class="modal-close" aria-label="Close modal">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="project-description">
                    <h3>Project Overview</h3>
                    <p>${project.description}</p>
                </div>
                
                <div class="project-details">
                    <div class="detail-row">
                        <div class="detail-item">
                            <h4>Technologies</h4>
                            <div class="tech-tags">
                                ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                            </div>
                        </div>
                        <div class="detail-item">
                            <h4>Duration</h4>
                            <p>${project.duration}</p>
                        </div>
                        <div class="detail-item">
                            <h4>Team Size</h4>
                            <p>${project.team}</p>
                        </div>
                    </div>
                    
                    <div class="project-challenges">
                        <h3>Challenges & Solutions</h3>
                        <div class="challenge-item">
                            <h4>Challenge</h4>
                            <p>${project.challenges}</p>
                        </div>
                        <div class="solution-item">
                            <h4>Solution</h4>
                            <p>${project.solutions}</p>
                        </div>
                    </div>
                    
                    <div class="project-results">
                        <h3>Results</h3>
                        <p>${project.results}</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles
    const modalStyles = `
        <style>
            .project-modal {
                display: block;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                z-index: 9999;
                backdrop-filter: blur(10px);
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            
            .project-modal.active {
                opacity: 1;
            }
            
            .modal-content {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%) scale(0.9);
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 20px;
                padding: 40px;
                max-width: 700px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
                backdrop-filter: blur(20px);
                transition: transform 0.3s ease;
            }
            
            .project-modal.active .modal-content {
                transform: translate(-50%, -50%) scale(1);
            }
            
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 30px;
                padding-bottom: 20px;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .modal-title {
                font-size: 1.8rem;
                font-weight: 600;
                color: #fff;
                margin: 0;
            }
            
            .modal-close {
                background: none;
                border: none;
                color: rgba(255, 255, 255, 0.7);
                font-size: 1.5rem;
                cursor: pointer;
                transition: color 0.3s ease;
            }
            
            .modal-close:hover {
                color: #fff;
            }
            
            .modal-body {
                color: rgba(255, 255, 255, 0.8);
                line-height: 1.6;
            }
            
            .modal-body h3 {
                color: #fff;
                font-size: 1.3rem;
                margin-bottom: 15px;
                margin-top: 25px;
            }
            
            .modal-body h4 {
                color: #4ecdc4;
                font-size: 1.1rem;
                margin-bottom: 8px;
            }
            
            .detail-row {
                display: grid;
                grid-template-columns: 2fr 1fr 1fr;
                gap: 20px;
                margin-bottom: 30px;
            }
            
            .tech-tags {
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
            }
            
            .tech-tag {
                padding: 4px 12px;
                background: linear-gradient(135deg, #ff6b6b, #4ecdc4);
                color: #fff;
                border-radius: 20px;
                font-size: 0.8rem;
                font-weight: 500;
            }
            
            .challenge-item,
            .solution-item {
                margin-bottom: 20px;
                padding: 15px;
                background: rgba(255, 255, 255, 0.02);
                border-radius: 10px;
                border: 1px solid rgba(255, 255, 255, 0.05);
            }
            
            @media (max-width: 768px) {
                .detail-row {
                    grid-template-columns: 1fr;
                    gap: 15px;
                }
                
                .modal-content {
                    padding: 25px;
                    width: 95%;
                }
                
                .modal-title {
                    font-size: 1.5rem;
                }
            }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', modalStyles);
    document.body.appendChild(modal);
    
    // Animate in
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
    
    // Close functionality
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', closeProjectModal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeProjectModal();
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeProjectModal();
        }
    });
}

function closeProjectModal() {
    const modal = document.querySelector('.project-modal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// Portfolio Statistics Animation
function initPortfolioStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target;
                const targetCount = parseInt(statNumber.getAttribute('data-count'));
                animateCounter(statNumber, targetCount);
                observer.unobserve(statNumber);
            }
        });
    }, observerOptions);
    
    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 20);
}

// Load More Portfolio
function initLoadMorePortfolio() {
    const loadMoreBtn = document.getElementById('load-more-portfolio');
    if (!loadMoreBtn) return;
    
    let currentPage = 1;
    const itemsPerPage = 6;
    
    loadMoreBtn.addEventListener('click', function() {
        this.classList.add('loading');
        
        // Simulate loading more items
        setTimeout(() => {
            loadMorePortfolioItems();
            this.classList.remove('loading');
            
            // Hide button if no more items
            if (currentPage >= 3) { // Assuming 3 pages total
                this.style.display = 'none';
            }
        }, 1000);
    });
}

function loadMorePortfolioItems() {
    // In a real application, this would fetch data from an API
    const portfolioGrid = document.getElementById('portfolio-grid');
    
    // Simulate adding new items
    const newItems = [
        {
            category: 'web-design',
            title: 'Restaurant Website',
            description: 'Modern restaurant website with online ordering',
            image: 'assets/img/portfolio/port-4-7.jpg',
            tags: ['WordPress', 'WooCommerce', 'Responsive']
        },
        {
            category: 'mobile',
            title: 'Fitness App',
            description: 'Cross-platform fitness tracking application',
            image: 'assets/img/portfolio/port-4-8.jpg',
            tags: ['React Native', 'Firebase', 'Health API']
        }
    ];
    
    newItems.forEach((item, index) => {
        const portfolioItem = createPortfolioItem(item, index);
        portfolioGrid.appendChild(portfolioItem);
        
        // Animate in
        setTimeout(() => {
            portfolioItem.style.animation = 'fadeInUp 0.6s ease forwards';
        }, index * 100);
    });
}

function createPortfolioItem(item, index) {
    const div = document.createElement('div');
    div.className = `col-lg-4 col-md-6 portfolio-item ${item.category}`;
    div.style.opacity = '0';
    div.style.transform = 'translateY(30px)';
    
    div.innerHTML = `
        <div class="bi-portfolio-item-4-item">
            <div class="portfolio-card">
                <div class="portfolio-image">
                    <img src="${item.image}" alt="${item.title}">
                    <div class="portfolio-overlay">
                        <div class="overlay-content">
                            <div class="overlay-icons">
                                <a href="${item.image}" class="lightbox-link" data-title="${item.title}">
                                    <i class="fas fa-search-plus"></i>
                                </a>
                                <a href="#" class="project-details-link" data-project="project${index + 7}">
                                    <i class="fas fa-external-link-alt"></i>
                                </a>
                            </div>
                            <div class="overlay-text">
                                <h4>${item.title}</h4>
                                <p>${item.description}</p>
                                <div class="project-tags">
                                    ${item.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="portfolio-info">
                    <h4>${item.title}</h4>
                    <p>${item.description}</p>
                    <div class="project-meta">
                        <span class="category">${item.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                        <span class="duration">2 months</span>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    return div;
}

// Portfolio Animations
function initPortfolioAnimations() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    portfolioItems.forEach(item => {
        observer.observe(item);
    });
}

// Update Portfolio Layout
function updatePortfolioLayout() {
    const portfolioGrid = document.getElementById('portfolio-grid');
    if (portfolioGrid) {
        // Trigger reflow for smooth animations
        portfolioGrid.style.display = 'none';
        portfolioGrid.offsetHeight; // Force reflow
        portfolioGrid.style.display = 'block';
    }
}

// Utility Functions
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

// Handle window resize
window.addEventListener('resize', debounce(() => {
    updatePortfolioLayout();
}, 250));
