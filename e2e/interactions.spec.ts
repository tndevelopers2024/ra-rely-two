import { test, expect } from '@playwright/test';

test.describe('Shared controls', () => {
  test.use({ reducedMotion: 'reduce' });

  test('desktop solution dropdown navigates', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('[aria-hidden="true"][class*="z-[100]"]')).toHaveCount(0);
    await page.locator('nav a[href="/solutions"]').first().hover();
    await page.locator('a[href="/solutions/accounts-payable"]:visible').first().click();
    await expect(page).toHaveURL('/solutions/accounts-payable');
  });

  for (const route of ['/solutions', '/solutions/accounts-payable', '/solutions/accounts-receivable', '/solutions/process-improvement', '/solutions/reporting-insights']) {
    test(`all accordions expand and collapse on ${route}`, async ({ page }) => {
      await page.goto(route);
      await expect(page.locator('[aria-hidden="true"][class*="z-[100]"]')).toHaveCount(0);
      const buttons = page.locator('main button[aria-expanded]');
      expect(await buttons.count()).toBeGreaterThan(0);
      for (let i = 0; i < await buttons.count(); i++) {
        const button = buttons.nth(i);
        if (await button.getAttribute('aria-expanded') === 'true') await button.click();
        await button.click();
        await expect(button).toHaveAttribute('aria-expanded', 'true');
        await expect(button.locator('xpath=../..').locator('p')).toBeVisible();
        await button.click();
        await expect(button).toHaveAttribute('aria-expanded', 'false');
      }
    });
  }

  test('footer and floating back-to-top controls return to the top', async ({ page }) => {
    await page.goto('/about');
    await expect(page.locator('[aria-hidden="true"][class*="z-[100]"]')).toHaveCount(0);
    await page.locator('footer').getByRole('button', { name: 'Back to top' }).click();
    await expect.poll(() => page.evaluate(() => scrollY)).toBeLessThan(20);
    await page.evaluate(() => window.scrollTo(0, innerHeight + 300));
    await page.getByRole('button', { name: 'Back to top', exact: true }).first().click();
    await expect.poll(() => page.evaluate(() => scrollY)).toBeLessThan(20);
  });

  test('skip link reaches main content', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('[aria-hidden="true"][class*="z-[100]"]')).toHaveCount(0);
    await page.keyboard.press('Tab');
    await expect(page.getByRole('link', { name: 'Skip to main content' })).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL('/#main-content');
  });
});

for (const width of [1440, 390]) {
  test.describe(`Normal motion at ${width}px`, () => {
    test.use({ viewport: { width, height: 844 }, reducedMotion: 'no-preference' });
    test('loads without hydration errors and navigates into an article', async ({ page }) => {
      const errors: string[] = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto('/');
      await expect(page.locator('[aria-hidden="true"][class*="z-[100]"]')).toHaveCount(0);
      await expect(page.locator('h1')).toBeVisible();
      await page.goto('/insights');
      await expect(page.locator('[aria-hidden="true"][class*="z-[100]"]')).toHaveCount(0);
      const card = page.locator('a[aria-labelledby^="insight-title-"]').first();
      const href = await card.getAttribute('href');
      await card.click({ position: { x: 12, y: 12 } });
      await expect(page).toHaveURL(href!);
      const toc = page.getByRole('navigation', { name: 'Article contents' }).locator('a').nth(1);
      const hash = await toc.getAttribute('href');
      await toc.click();
      await expect(page.locator(hash!)).toBeFocused();
      await expect(page.locator(hash!)).toBeInViewport();
      expect(errors).toEqual([]);
    });
  });
}
