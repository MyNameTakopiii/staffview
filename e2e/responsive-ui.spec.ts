import { test, expect } from '@playwright/test';

const viewports = [
  { name: 'mobile-small', width: 320, height: 568 },
  { name: 'mobile-medium', width: 375, height: 667 },
  { name: 'mobile-large', width: 390, height: 844 },
  { name: 'tablet-portrait', width: 768, height: 1024 },
  { name: 'tablet-landscape', width: 1024, height: 768 },
  { name: 'desktop-hd', width: 1280, height: 800 },
  { name: 'desktop-fhd', width: 1440, height: 900 },
  { name: 'desktop-4k', width: 1920, height: 1080 },
];

test.describe('Responsive Viewport Visual & Layout Audit', () => {
  for (const viewport of viewports) {
    test.describe(`Viewport: ${viewport.name} (${viewport.width}x${viewport.height})`, () => {
      test.use({ viewport: { width: viewport.width, height: viewport.height } });

      test(`Portal Home - ${viewport.name}`, async ({ page }) => {
        await page.goto('/');
        await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
        await page.screenshot({
          path: `test-results/screenshots/home-${viewport.name}.png`,
          fullPage: true,
        });
      });

      test(`Patient Form Page - ${viewport.name}`, async ({ page }) => {
        await page.goto('/patient');
        await expect(page.getByRole('heading', { name: 'Patient Information Form' })).toBeVisible();
        await page.screenshot({
          path: `test-results/screenshots/patient-${viewport.name}.png`,
          fullPage: true,
        });
      });

      test(`Staff View Page - ${viewport.name}`, async ({ page }) => {
        await page.goto('/staff');
        await expect(
          page.getByRole('heading', { name: 'Live Patient Input Stream' })
        ).toBeVisible();
        await page.screenshot({
          path: `test-results/screenshots/staff-${viewport.name}.png`,
          fullPage: true,
        });
      });

      test(`404 Not Found Page - ${viewport.name}`, async ({ page }) => {
        await page.goto('/non-existent-page');
        await expect(page.getByRole('heading', { name: 'Oops! Page Not Found' })).toBeVisible();
        await page.screenshot({
          path: `test-results/screenshots/404-${viewport.name}.png`,
          fullPage: true,
        });
      });
    });
  }
});
