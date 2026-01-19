import { test, expect } from '@playwright/test';

test.describe('Mobile Navigation Tests', () => {
    test.use({ viewport: { width: 375, height: 667 } });

    test('should toggle mobile menu', async ({ page }) => {
        await page.goto('/');

        // Check mobile menu button is visible
        const menuBtn = page.locator('#mobile-menu-btn');
        await expect(menuBtn).toBeVisible();

        // Click to open menu
        await menuBtn.click();

        // Check mobile menu is open
        const mobileMenu = page.locator('#mobile-menu');
        await expect(mobileMenu).toHaveClass(/open/);

        // Click to close menu
        await menuBtn.click();

        // Check mobile menu is closed
        await expect(mobileMenu).not.toHaveClass(/open/);
    });

    test('should navigate from mobile menu', async ({ page }) => {
        await page.goto('/');

        // Open mobile menu
        await page.click('#mobile-menu-btn');

        // Click on a link in mobile menu
        await page.click('#mobile-menu a[href="domaine.html"]');

        // Check navigation occurred
        await expect(page).toHaveURL(/domaine\.html/);
    });

    test('should be responsive on mobile', async ({ page }) => {
        await page.goto('/');

        // Check that desktop nav is hidden on mobile
        const desktopNav = page.locator('nav.hidden.md-flex');
        await expect(desktopNav).not.toBeVisible();

        // Check that mobile menu button is visible
        const mobileMenuBtn = page.locator('#mobile-menu-btn');
        await expect(mobileMenuBtn).toBeVisible();
    });
});
