/**
 * Lazy Loading Utility
 * Implements Intersection Observer API for performant lazy loading
 * Falls back to immediate loading for browsers without support
 */

interface LazyLoadOptions {
    rootMargin?: string;
    threshold?: number;
    loadingClass?: string;
    loadedClass?: string;
    errorClass?: string;
}

const DEFAULT_OPTIONS: LazyLoadOptions = {
    rootMargin: '50px',
    threshold: 0.01,
    loadingClass: 'lazy-loading',
    loadedClass: 'lazy-loaded',
    errorClass: 'lazy-error',
};

/**
 * Initialize lazy loading for images
 * Usage: Add data-src attribute to images instead of src
 * Optionally add data-srcset for responsive images
 */
export function initLazyLoading(options: LazyLoadOptions = {}): void {
    const config = { ...DEFAULT_OPTIONS, ...options };

    // Check for Intersection Observer support
    if (!('IntersectionObserver' in window)) {
        // Fallback: load all images immediately
        loadAllImages();
        return;
    }

    const imageObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target as HTMLImageElement;
                    loadImage(img, config);
                    observer.unobserve(img);
                }
            });
        },
        {
            rootMargin: config.rootMargin,
            threshold: config.threshold,
        }
    );

    // Observe all lazy images
    const lazyImages = document.querySelectorAll<HTMLImageElement>('img[data-src]');
    lazyImages.forEach(img => {
        img.classList.add(config.loadingClass!);
        imageObserver.observe(img);
    });
}

/**
 * Load a single image
 */
function loadImage(img: HTMLImageElement, config: LazyLoadOptions): void {
    const src = img.dataset.src;
    const srcset = img.dataset.srcset;

    if (!src) return;

    // Create a new image to preload
    const tempImg = new Image();

    tempImg.onload = () => {
        img.src = src;
        if (srcset) {
            img.srcset = srcset;
        }
        img.classList.remove(config.loadingClass!);
        img.classList.add(config.loadedClass!);

        // Remove data attributes to prevent reloading
        delete img.dataset.src;
        delete img.dataset.srcset;
    };

    tempImg.onerror = () => {
        img.classList.remove(config.loadingClass!);
        img.classList.add(config.errorClass!);
        console.error(`Failed to load image: ${src}`);
    };

    tempImg.src = src;
}

/**
 * Fallback: Load all images immediately (for browsers without Intersection Observer)
 */
function loadAllImages(): void {
    const lazyImages = document.querySelectorAll<HTMLImageElement>('img[data-src]');
    lazyImages.forEach(img => {
        const src = img.dataset.src;
        const srcset = img.dataset.srcset;

        if (src) {
            img.src = src;
        }
        if (srcset) {
            img.srcset = srcset;
        }

        delete img.dataset.src;
        delete img.dataset.srcset;
    });
}

/**
 * Manually trigger lazy loading for dynamically added images
 */
export function lazyLoadElement(element: HTMLImageElement, options: LazyLoadOptions = {}): void {
    const config = { ...DEFAULT_OPTIONS, ...options };
    loadImage(element, config);
}
