import { test, expect } from '@playwright/test';
import { articles } from '../lib/data/articles';

test.use({ reducedMotion: 'reduce' });

for (const width of [1440, 390]) {
  test.describe(`Blog navigation at ${width}px`, () => {
    test.use({ viewport: { width, height: 900 } });
    for (const article of articles) {
      test(`whole card opens ${article.slug} and contents links reach headings`, async ({ page }) => {
        await page.goto('/insights');
        await expect(page.locator('[aria-hidden="true"][class*="z-[100]"]')).toHaveCount(0);
        const card = page.locator(`a[href="/insights/${article.slug}"]`).first();
        await card.click({ position: { x: 12, y: 12 } });
        await expect(page).toHaveURL(`/insights/${article.slug}`);
        await expect(page.locator('h1')).toHaveText(article.title);
        const links = page.getByRole('navigation', { name: 'Article contents' }).locator('a');
        expect(await links.count()).toBeGreaterThan(0);
        for (let i = 0; i < await links.count(); i++) {
          const link = links.nth(i);
          const hash = await link.getAttribute('href');
          await link.click();
          await expect(page.locator(hash!)).toBeInViewport();
        }
        const related = page.locator('a').filter({ hasText: 'Read insight' }).first();
        const relatedHref = await related.getAttribute('href');
        await related.click();
        await expect(page).toHaveURL(relatedHref!);
        await page.getByRole('link', { name: 'Back to Insights' }).click();
        await expect(page).toHaveURL('/insights');
      });
    }
  });
}
