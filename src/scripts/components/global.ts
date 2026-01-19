import { createIcons, icons } from 'lucide';
import { HEADER_TEMPLATE, FOOTER_TEMPLATE } from './layoutTemplates';
import { initLazyLoading } from '../utils/lazyLoad';

export function initGlobal() {
    try {
        const headerEl = document.getElementById('main-header');
        if (headerEl) {
            headerEl.innerHTML = HEADER_TEMPLATE;
            setActiveLink();
        } else {
            console.error('Header element #main-header not found');
        }

        const footerEl = document.getElementById('footer');
        if (footerEl) {
            footerEl.innerHTML = FOOTER_TEMPLATE;
        }
    } catch (e) {
        console.error('Erreur lors de l’injection header/footer:', e);
    }

    try {
        createIcons({
            icons: {
                Menu: icons.Menu,
                X: icons.X,
                ShoppingBag: icons.ShoppingBag,
                Instagram: icons.Instagram,
                Facebook: icons.Facebook,
                MapPin: icons.MapPin,
                Phone: icons.Phone,
                Mail: icons.Mail,
                ArrowDown: icons.ArrowDown,
                ArrowRight: icons.ArrowRight,
                Quote: icons.Quote,
                ChevronsDown: icons.ChevronsDown,
                Leaf: icons.Leaf,
                Clock: icons.Clock,
                FileDown: icons.FileDown,
            },
        });
    } catch (error) {
        console.error("Erreur lors de l'initialisation des icônes (Lucide):", error);
    }

    // Initialize lazy loading for images
    try {
        initLazyLoading({
            rootMargin: '100px',
            threshold: 0.01,
        });
    } catch (error) {
        console.error("Erreur lors de l'initialisation du lazy loading:", error);
    }
}

function setActiveLink() {
    try {
        const pageFromDataset = document.body.dataset.page || '';
        const current =
            pageFromDataset === 'home' || pageFromDataset === ''
                ? 'index.html'
                : `${pageFromDataset}.html`;

        document.querySelectorAll<HTMLElement>('.nav-link').forEach(link => {
            const target = link.getAttribute('data-link');
            link.classList.toggle('active', target === current);
        });
    } catch (e) {
        console.warn('Erreur lors de l’activation du lien nav:', e);
    }
}
