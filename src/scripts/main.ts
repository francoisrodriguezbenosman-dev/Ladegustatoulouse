import '../styles/style.css';
import { initHeader } from './components/header';
import { initGlobal } from './components/global';
import { initScrollReveal } from './utils/scrollReveal';
import { createIcons, icons } from 'lucide';

type PageInitializer = () => Promise<void>;

const pageInitializers: Record<string, PageInitializer> = {
    home: async () => (await import('./pages/home')).initHomePage(),
    domaine: async () => (await import('./pages/domaine')).initDomainePage(),
    vins: async () => (await import('./pages/vins')).initVinsPage(),
    visites: async () => (await import('./pages/visites')).initVisitesPage(),
    contact: async () => (await import('./pages/contact')).initContactPage(),
};

// --- FEATURES LOGIC ---
function initPageTransitions() {
    document.querySelectorAll('a').forEach(link => {
        const isSameHost = link.hostname === window.location.hostname;
        const isHashLink = Boolean(link.hash);
        const isNewTab = link.target === '_blank';
        const isDownload = link.hasAttribute('download');
        const isExternalProtocol =
            link.protocol === 'mailto:' ||
            link.protocol === 'tel:' ||
            link.protocol === 'sms:';

        if (isSameHost && !isHashLink && !isNewTab && !isDownload && !isExternalProtocol) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const href = link.href;
                document.body.classList.add('fade-out');
                setTimeout(() => {
                    window.location.href = href;
                }, 400); // Matches CSS transition
            });
        }
    });
}

function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img') as HTMLImageElement;
    const lightboxClose = document.getElementById('lightbox-close');

    if (lightbox && lightboxImg && lightboxClose) {
        // Open lightbox on wine image click (Homepage & Vins)
        document.querySelectorAll('.wine-card .wine-image-wrapper img, .product-image img').forEach((element) => {
            const img = element as HTMLImageElement;
            img.style.cursor = 'zoom-in';
            img.addEventListener('click', (e) => {
                const src = (e.target as HTMLImageElement).src;
                lightboxImg.src = src;
                lightbox.classList.add('open');
            });
        });

        const closeLightbox = () => {
            lightbox.classList.remove('open');
            setTimeout(() => { lightboxImg.src = ''; }, 300);
        };

        lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
        });
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    initGlobal();
    initHeader();

    const page = document.body.dataset.page || '';
    const initPage = pageInitializers[page];

    if (initPage) {
        try {
            await initPage();
        } catch (error) {
            console.error('Error loading page script:', error);
        }
    } else {
        console.warn(`No specific logic found for page: ${page}`);
    }
    
    // Init Global Features after DOM is ready and potentially injected
    setTimeout(() => {
        initPageTransitions();
        initBackToTop();
        initLightbox();
        initScrollReveal();
        createIcons({ icons: { ArrowUp: icons.ArrowUp, X: icons.X } });
    }, 100);
});

