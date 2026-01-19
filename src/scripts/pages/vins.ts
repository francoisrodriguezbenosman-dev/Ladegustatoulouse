export function initVinsPage() {
    initScrollAnimations();
}

function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries, observerInstance) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observerInstance.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const targets = document.querySelectorAll(
        '.product-block, .interlude-philosophie, .hero-content'
    );

    targets.forEach(target => {
        target.classList.add('fade-element');
        observer.observe(target);
    });
}
