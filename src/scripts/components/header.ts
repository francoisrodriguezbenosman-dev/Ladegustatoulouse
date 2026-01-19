import { refreshIcons } from '../utils/icons';

export function initHeader() {
    try {
        const header = document.getElementById('main-header');
        const menuIcon = document.getElementById('menu-icon');

        if (header) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });
        }

        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        // Select all clickable items within the menu: links and the new CTA button
        const mobileClickables = mobileMenu?.querySelectorAll('a, .mobile-menu-cta');

        if (mobileMenuBtn && mobileMenu && menuIcon && header) {
            const toggleMenu = () => {
                const isOpen = mobileMenu.classList.contains('open');
                if (isOpen) {
                    mobileMenu.classList.remove('open');
                    header.classList.remove('mobile-menu-open');
                    document.body.style.overflow = '';
                    menuIcon.setAttribute('data-lucide', 'menu');
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                } else {
                    mobileMenu.classList.add('open');
                    header.classList.add('mobile-menu-open');
                    document.body.style.overflow = 'hidden';
                    menuIcon.setAttribute('data-lucide', 'x');
                    mobileMenuBtn.setAttribute('aria-expanded', 'true');
                }
                refreshIcons();
            };

            // Close with Escape key
            const handleEscape = (e: KeyboardEvent) => {
                if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
                    toggleMenu();
                }
            };

            mobileMenuBtn.addEventListener('click', toggleMenu);
            document.addEventListener('keydown', handleEscape);
            
            // Close when clicking the background overlay
            mobileMenu.addEventListener('click', (e) => {
                if (e.target === mobileMenu) {
                    toggleMenu();
                }
            });

            // Close when a link or the CTA is clicked
            mobileClickables?.forEach(link => {
                link.addEventListener('click', () => {
                    if (mobileMenu.classList.contains('open')) {
                        toggleMenu();
                    }
                });
            });

            // Initialize aria-expanded state
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }

        refreshIcons();
    } catch (error) {
        console.error('Error in initHeader:', error);
    }
}
