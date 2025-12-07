/**
 * Homepage Interactive Elements
 * Handles carousel functionality, animations, and form interactions
 */

// Deals Carousel
class DealsCarousel {
    constructor() {
        this.slides = document.querySelectorAll('.deal-slide');
        this.dots = document.querySelectorAll('.carousel-dot');
        this.currentSlide = 0;
        this.autoplayInterval = null;
        this.autoplayDelay = 5000; // 5 seconds

        this.init();
    }

    init() {
        if (this.slides.length === 0) return;

        // Add click handlers to dots
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });

        // Start autoplay
        this.startAutoplay();

        // Pause on hover
        const carouselContainer = document.querySelector('.deals-carousel');
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', () => this.stopAutoplay());
            carouselContainer.addEventListener('mouseleave', () => this.startAutoplay());
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.previousSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });

        // Touch/swipe support
        this.addSwipeSupport();
    }

    goToSlide(index) {
        if (index < 0 || index >= this.slides.length) return;

        // Remove active class from current slide and dot
        this.slides[this.currentSlide].classList.remove('active');
        this.dots[this.currentSlide].classList.remove('active');

        // Set new current slide
        this.currentSlide = index;

        // Add active class to new slide and dot
        this.slides[this.currentSlide].classList.add('active');
        this.dots[this.currentSlide].classList.add('active');
    }

    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }

    previousSlide() {
        const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prevIndex);
    }

    startAutoplay() {
        this.stopAutoplay(); // Clear any existing interval
        this.autoplayInterval = setInterval(() => this.nextSlide(), this.autoplayDelay);
    }

    stopAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    }

    addSwipeSupport() {
        const carousel = document.querySelector('.deals-carousel');
        if (!carousel) return;

        let touchStartX = 0;
        let touchEndX = 0;

        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        }, { passive: true });

        const handleSwipe = () => {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    this.nextSlide();
                } else {
                    this.previousSlide();
                }
            }
        };

        this.handleSwipe = handleSwipe;
    }
}

// Newsletter Form Handler
class NewsletterForm {
    constructor() {
        this.form = document.getElementById('newsletterForm');
        this.emailInput = document.getElementById('newsletterEmail');
        this.init();
    }

    init() {
        if (!this.form) return;

        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    handleSubmit(e) {
        e.preventDefault();

        const email = this.emailInput.value.trim();

        if (!this.isValidEmail(email)) {
            this.showMessage('Please enter a valid email address.', 'error');
            return;
        }

        // Simulate form submission (replace with actual API call)
        this.submitEmail(email);
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    async submitEmail(email) {
        // Show loading state
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Subscribing...';
        submitBtn.disabled = true;

        try {
            // Simulate API call (replace with actual endpoint)
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Store in localStorage for now (replace with actual backend)
            const subscribers = JSON.parse(localStorage.getItem('newsletterSubscribers') || '[]');
            if (!subscribers.includes(email)) {
                subscribers.push(email);
                localStorage.setItem('newsletterSubscribers', JSON.stringify(subscribers));
            }

            this.showMessage('Success! Check your email for your 15% discount code.', 'success');
            this.form.reset();

        } catch (error) {
            this.showMessage('Something went wrong. Please try again.', 'error');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }

    showMessage(message, type) {
        // Remove any existing message
        const existingMessage = this.form.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create message element
        const messageEl = document.createElement('div');
        messageEl.className = `form-message alert alert-${type === 'success' ? 'success' : 'danger'}`;
        messageEl.textContent = message;
        messageEl.style.marginTop = 'var(--space-4)';

        // Insert after form
        this.form.insertAdjacentElement('afterend', messageEl);

        // Remove message after 5 seconds
        setTimeout(() => {
            messageEl.style.transition = 'opacity var(--transition-base)';
            messageEl.style.opacity = '0';
            setTimeout(() => messageEl.remove(), 250);
        }, 5000);
    }
}

// Scroll Animations
class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        this.init();
    }

    init() {
        // Create intersection observer
        this.observer = new IntersectionObserver(
            (entries) => this.handleIntersection(entries),
            this.observerOptions
        );

        // Observe all sections
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            this.observer.observe(section);
        });

        // Observe category cards for stagger effect
        const categoryCards = document.querySelectorAll('.category-card');
        categoryCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = `opacity 0.5s ease-out ${index * 0.1}s, transform 0.5s ease-out ${index * 0.1}s`;
            this.observer.observe(card);
        });

        // Observe value props for stagger effect
        const valueProps = document.querySelectorAll('.value-prop');
        valueProps.forEach((prop, index) => {
            prop.style.opacity = '0';
            prop.style.transform = 'translateY(20px)';
            prop.style.transition = `opacity 0.5s ease-out ${index * 0.15}s, transform 0.5s ease-out ${index * 0.15}s`;
            this.observer.observe(prop);
        });

        // Observe testimonials for stagger effect
        const testimonials = document.querySelectorAll('.testimonial-card');
        testimonials.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = `opacity 0.5s ease-out ${index * 0.1}s, transform 0.5s ease-out ${index * 0.1}s`;
            this.observer.observe(card);
        });
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                // Stop observing after animation
                this.observer.unobserve(entry.target);
            }
        });
    }
}

// Smooth Scroll for Anchor Links
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        // Handle all anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');

                // Skip if it's just "#"
                if (href === '#') return;

                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    e.preventDefault();

                    // Get header height for offset
                    const header = document.querySelector('header');
                    const headerHeight = header ? header.offsetHeight : 0;

                    // Calculate scroll position
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

                    // Smooth scroll
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Lazy Loading Images (for future image implementation)
class LazyLoader {
    constructor() {
        this.images = document.querySelectorAll('img[data-src]');
        this.init();
    }

    init() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                });
            });

            this.images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for browsers that don't support IntersectionObserver
            this.images.forEach(img => {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            });
        }
    }
}

// Performance: Debounce function for scroll/resize events
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

// Initialize all components when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize carousel
    new DealsCarousel();

    // Initialize newsletter form
    new NewsletterForm();

    // Initialize scroll animations
    new ScrollAnimations();

    // Initialize smooth scroll
    new SmoothScroll();

    // Initialize lazy loading
    new LazyLoader();

    // Log initialization for debugging
    console.log('Homepage interactive elements initialized');
});

// Export for potential use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        DealsCarousel,
        NewsletterForm,
        ScrollAnimations,
        SmoothScroll,
        LazyLoader
    };
}
