import { test, expect } from '@playwright/test';

test.use({ viewport: { width: 375, height: 667 }, reducedMotion: 'reduce' });

test('mobile menu opens, navigates and closes', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('[aria-hidden="true"][class*="z-[100]"]')).toHaveCount(0);
  await page.getByRole('button', { name: 'Open menu', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Close menu', exact: true })).toHaveAttribute('aria-expanded', 'true');
  await page.locator('a[href="/about"]:visible').first().click();
  await expect(page).toHaveURL('/about');
  await expect(page.getByRole('button', { name: 'Open menu', exact: true })).toHaveAttribute('aria-expanded', 'false');
  await page.getByRole('button', { name: 'Open menu', exact: true }).click();
  await page.locator('a[href="/solutions/accounts-payable"]:visible').first().click();
  await expect(page).toHaveURL('/solutions/accounts-payable');
  await expect(page.getByRole('button', { name: 'Open menu', exact: true })).toBeVisible();
});
