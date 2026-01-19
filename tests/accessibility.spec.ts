import { test, expect } from '@playwright/test';

test.describe('Accessibility Tests', () => {
    test('should have proper heading hierarchy on home page', async ({ page }) => {
        await page.goto('/');

        const h1 = page.locator('h1');
        await expect(h1).toHaveCount(1);
        await expect(h1).toContainText('Domaine de Lapistoule');
    });

    test('should have alt text on images', async ({ page }) => {
        await page.goto('/');

        const images = page.locator('img');
        const count = await images.count();

        for (let i = 0; i < count; i++) {
            const img = images.nth(i);
            const alt = await img.getAttribute('alt');
            // Alt can be empty for decorative images, but should exist
            expect(alt).not.toBeNull();
        }
    });

    test('should have aria-labels on icon buttons', async ({ page }) => {
        await page.goto('/');

        // Check social media links have proper aria-labels
        const instagramLink = page.locator('a[aria-label="Instagram"]');
        await expect(instagramLink).toBeVisible();

        const facebookLink = page.locator('a[aria-label="Facebook"]');
        await expect(facebookLink).toBeVisible();
    });

    test('should have proper language attribute', async ({ page }) => {
        await page.goto('/');

        const html = page.locator('html');
        await expect(html).toHaveAttribute('lang', 'fr');
    });

    test('should have meta viewport for mobile', async ({ page }) => {
        await page.goto('/');

        const viewport = page.locator('meta[name="viewport"]');
        await expect(viewport).toHaveAttribute('content', /width=device-width/);
    });
});
