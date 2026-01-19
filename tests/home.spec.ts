import { test, expect } from '@playwright/test';

test.describe('Home Page Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('should display hero section', async ({ page }) => {
        const hero = page.locator('#hero');
        await expect(hero).toBeVisible();

        const heroTitle = page.locator('.hero-title');
        await expect(heroTitle).toContainText('Domaine de Lapistoule');
    });

    test('should display philosophy section', async ({ page }) => {
        const philosophySection = page.locator('text=Notre Philosophie');
        await expect(philosophySection).toBeVisible();

        // Check for the three feature cards
        const featureCards = page.locator('.feature-card');
        await expect(featureCards).toHaveCount(3);
    });

    test('should display wine preview section', async ({ page }) => {
        // Scroll to wines section
        await page.locator('text=La Cave').scrollIntoViewIfNeeded();

        const wineCards = page.locator('.wine-card');
        await expect(wineCards.first()).toBeVisible();
    });

    test('should have working CTA buttons', async ({ page }) => {
        // Test primary CTA
        const primaryCTA = page.locator('a[href="vins.html"].btn-primary').first();
        await expect(primaryCTA).toBeVisible();

        // Test secondary CTA
        const secondaryCTA = page.locator('a[href="visites.html"]').first();
        await expect(secondaryCTA).toBeVisible();
    });

    test('should load hero video', async ({ page }) => {
        const video = page.locator('.hero video');
        await expect(video).toBeVisible();
        await expect(video).toHaveAttribute('autoplay');
        await expect(video).toHaveAttribute('muted');
        await expect(video).toHaveAttribute('loop');
    });
});
