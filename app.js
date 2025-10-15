// Navigation and page routing functionality
class WebsiteManager {
    constructor() {
        this.currentPage = 'home';
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupMobileMenu();
        this.setupSmoothScrolling();
        this.setupPageRouting();
        this.handleInitialRoute();
    }

    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const href = link.getAttribute('href');
                
                if (href.startsWith('#')) {
                    const targetPage = href.substring(1);
                    this.navigateToPage(targetPage);
                }
            });
        });
    }

    setupMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                hamburger.classList.toggle('active');
            });

            // Close mobile menu when clicking on nav links
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                });
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            });
        }
    }

    setupSmoothScrolling() {
        // Enable smooth scrolling for anchor links
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href === '#' || href.length === 1) return;
                
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    setupPageRouting() {
        // Handle browser back/forward buttons
        window.addEventListener('popstate', (e) => {
            const page = e.state?.page || 'home';
            this.navigateToPage(page, false);
        });
    }

    navigateToPage(pageId, updateHistory = true) {
        // Hide all pages
        const pages = document.querySelectorAll('.page');
        pages.forEach(page => {
            page.classList.remove('active');
        });

        // Show target page
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
            this.currentPage = pageId;

            // Update navigation active state
            this.updateNavActiveState(pageId);

            // Update browser history
            if (updateHistory) {
                const url = pageId === 'home' ? '/' : `/#${pageId}`;
                history.pushState({ page: pageId }, '', url);
            }

            // Scroll to top of page
            window.scrollTo(0, 0);

            // Update page title
            this.updatePageTitle(pageId);
        }
    }

    updateNavActiveState(activePageId) {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            
            const href = link.getAttribute('href');
            if (href === `#${activePageId}`) {
                link.classList.add('active');
            }
        });
    }

    updatePageTitle(pageId) {
        const titles = {
            'home': 'Blinder Pvt Ltd - AI Security Engineer for Data',
            'how-it-works': 'How It Works - Blinder Pvt Ltd',
            'about': 'About Us - Blinder Pvt Ltd',
            'team': 'Our Team - Blinder Pvt Ltd'
        };
        
        document.title = titles[pageId] || titles['home'];
    }

    handleInitialRoute() {
        const hash = window.location.hash;
        if (hash && hash.length > 1) {
            const pageId = hash.substring(1);
            this.navigateToPage(pageId, false);
        } else {
            this.navigateToPage('home', false);
        }
    }
}

// Interactive elements functionality
class InteractiveElements {
    constructor() {
        this.init();
    }

    init() {
        this.setupButtons();
        this.setupHoverEffects();
        this.setupScrollAnimations();
    }

    setupButtons() {
        // Handle CTA buttons
        const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
        
        ctaButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const buttonText = button.textContent.trim();
                
                switch (buttonText) {
                    case 'Get Started':
                        this.handleGetStarted();
                        break;
                    case 'Watch Demo':
                        this.handleWatchDemo();
                        break;
                    case 'Schedule a Demo':
                        this.handleScheduleDemo();
                        break;
                    default:
                        // Generic button click handler
                        this.handleGenericButtonClick(buttonText);
                }
            });
        });
    }

    handleGetStarted() {
        // Simulate getting started flow
        this.showNotification('Welcome to Blinder! Our team will contact you shortly.');
    }

    handleWatchDemo() {
        // Simulate demo viewing
        this.showNotification('Demo video will be available soon. Contact us for a live demo!');
    }

    handleScheduleDemo() {
        // Simulate demo scheduling
        this.showNotification('Thank you for your interest! Our sales team will reach out within 24 hours.');
    }

    handleGenericButtonClick(buttonText) {
        // Generic handler for other buttons
        console.log(`Button clicked: ${buttonText}`);
    }

    showNotification(message) {
        // Create and show a notification
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--color-success);
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
            font-weight: 500;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove after 4 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }

    setupHoverEffects() {
        // Add enhanced hover effects to cards
        const cards = document.querySelectorAll('.feature-card, .team-member, .value-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-4px)';
                card.style.boxShadow = 'var(--shadow-lg)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = '';
            });
        });
    }

    setupScrollAnimations() {
        // Simple scroll-based animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animateElements = document.querySelectorAll(
            '.feature-card, .feature-detailed, .team-member, .value-card, .integration-category'
        );
        
        animateElements.forEach((el, index) => {
            // Set initial state
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            
            observer.observe(el);
        });
    }
}

// Utility functions
class Utilities {
    static debounce(func, wait, immediate) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                timeout = null;
                if (!immediate) func(...args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func(...args);
        };
    }

    static throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize main application components
    const websiteManager = new WebsiteManager();
    const interactiveElements = new InteractiveElements();
    
    // Add loading state management
    document.body.classList.add('loaded');
    
    // Performance optimization: Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Add resize handler for responsive behaviors
    const handleResize = Utilities.throttle(() => {
        // Handle any resize-specific logic here
        const isMobile = window.innerWidth < 768;
        document.body.classList.toggle('mobile', isMobile);
    }, 250);
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call
    
    console.log('Blinder website initialized successfully!');
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { WebsiteManager, InteractiveElements, Utilities };
}