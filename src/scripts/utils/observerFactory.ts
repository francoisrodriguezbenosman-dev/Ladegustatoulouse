export type ObserverConfig = IntersectionObserverInit & {
    onEnter?: (entry: IntersectionObserverEntry, observer: IntersectionObserver) => void;
};

/**
 * Crée un IntersectionObserver configurable pour réutilisation.
 */
export function createElementObserver(config: ObserverConfig) {
    const { onEnter, ...options } = config;
    return new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && onEnter) {
                onEnter(entry, observer);
            }
        });
    }, options);
}

/**
 * Observe une liste d'éléments et ajoute une classe quand ils entrent dans le viewport.
 */
export function observeAndReveal(
    selector: string,
    className = 'visible',
    options: IntersectionObserverInit = { threshold: 0.1 }
) {
    const observer = createElementObserver({
        ...options,
        onEnter: (entry, obs) => {
            entry.target.classList.add(className);
            obs.unobserve(entry.target);
        },
    });

    document.querySelectorAll<HTMLElement>(selector).forEach(el => observer.observe(el));
    return observer;
}
