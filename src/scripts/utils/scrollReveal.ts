/**
 * Scroll Reveal Utility
 * Uses IntersectionObserver to trigger animations when elements enter the viewport.
 */

export function initScrollReveal() {
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Run only once
            }
        });
    }, observerOptions);

    // Target elements with [data-reveal] attribute
    const revealElements = document.querySelectorAll('[data-reveal]');
    revealElements.forEach(el => observer.observe(el));
}
