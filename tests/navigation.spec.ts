import { test, expect } from '@playwright/test';

test.describe('Navigation Tests', () => {
    test('should have correct title on home page', async ({ page }) => {
        await page.goto('/');
        await expect(page).toHaveTitle(/Domaine de Lapistoule/);
    });

    test('should navigate to all main pages', async ({ page }) => {
        await page.goto('/');

        // Test navigation to Domaine page
        await page.click('a[href="domaine.html"]');
        await expect(page).toHaveURL(/domaine\.html/);

        // Test navigation to Vins page
        await page.goto('/');
        await page.click('a[href="vins.html"]');
        await expect(page).toHaveURL(/vins\.html/);

        // Test navigation to Visites page
        await page.goto('/');
        await page.click('a[href="visites.html"]');
        await expect(page).toHaveURL(/visites\.html/);

        // Test navigation to Contact page
        await page.goto('/');
        await page.click('a[href="contact.html"]');
        await expect(page).toHaveURL(/contact\.html/);
    });

    test('should show header on all pages', async ({ page }) => {
        const pages = ['/', '/domaine.html', '/vins.html', '/visites.html', '/contact.html'];

        for (const pagePath of pages) {
            await page.goto(pagePath);
            const header = page.locator('#main-header');
            await expect(header).toBeVisible();
        }
    });

    test('should show footer on all pages', async ({ page }) => {
        const pages = ['/', '/domaine.html', '/vins.html', '/visites.html', '/contact.html'];

        for (const pagePath of pages) {
            await page.goto(pagePath);
            const footer = page.locator('#footer');
            await expect(footer).toBeVisible();
        }
    });
});
