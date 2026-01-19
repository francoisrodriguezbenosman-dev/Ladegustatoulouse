import { createIcons, icons } from 'lucide';

// Central list of icons used across the site
export const APP_ICONS = {
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
    ArrowUp: icons.ArrowUp,
    Clock: icons.Clock,
    Quote: icons.Quote,
    ChevronsDown: icons.ChevronsDown,
    Leaf: icons.Leaf,
    FileDown: icons.FileDown,
};

/**
 * Initialise ou rafraîchit les icônes Lucide avec un set cohérent sur tout le site.
 */
export function initIcons(extraIcons: Record<string, unknown> = {}) {
    createIcons({
        icons: {
            ...APP_ICONS,
            ...extraIcons,
        },
    });
}

/**
 * Raccourci pour re-render les icônes après un changement de data-lucide.
 */
export function refreshIcons(extraIcons: Record<string, unknown> = {}) {
    initIcons(extraIcons);
}
