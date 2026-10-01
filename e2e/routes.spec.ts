import { test, expect } from '@playwright/test';
import { articles } from '../lib/data/articles';

const routes = [
  '/', '/about', '/solutions', '/solutions/accounts-payable',
  '/solutions/accounts-receivable', '/solutions/process-improvement',
  '/solutions/reporting-insights', '/how-we-work', '/industries',
  '/for-accountants', '/insights', '/contact', '/book-a-review',
  '/finance-health-check', '/faq', '/privacy', '/terms',
  ...articles.map(article => `/insights/${article.slug}`),
];

test.use({ reducedMotion: 'reduce' });

for (const width of [1440, 768, 390, 320]) {
  test.describe(`${width}px route and responsive checks`, () => {
    test.use({ viewport: { width, height: 900 } });
    for (const route of routes) {
      test(`${route} renders without errors, broken links or horizontal overflow`, async ({ page, request }) => {
        const errors: string[] = [];
        page.on('pageerror', error => errors.push(error.message));
        const response = await page.goto(route);
        expect(response?.status()).toBe(200);
        await expect(page.locator('h1')).toHaveCount(1);
        await expect(page.locator('h1')).toBeVisible();
        await expect(page.locator('[aria-hidden="true"][class*="z-[100]"]')).toHaveCount(0);
        expect(await page.title()).not.toBe('');
        const issues = await page.evaluate(() => ({
          overflow: document.documentElement.scrollWidth > innerWidth + 1,
          brokenImages: Array.from(document.images).filter(img => img.complete && img.naturalWidth === 0).map(img => img.src),
          dummyLinks: Array.from(document.querySelectorAll('a')).filter(a => !a.getAttribute('href') || a.getAttribute('href') === '#' || a.protocol === 'javascript:').map(a => a.textContent),
          missingAnchors: Array.from(document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')).filter(a => !document.getElementById(a.hash.slice(1))).map(a => a.hash),
        }));
        expect(issues).toEqual({ overflow: false, brokenImages: [], dummyLinks: [], missingAnchors: [] });
        expect(errors).toEqual([]);
        // Validate every distinct internal destination on desktop; narrow layouts
        // use the same destinations and are checked separately for overflow.
        if (width === 1440) {
          const links = await page.locator('a[href^="/"]').evaluateAll(elements => Array.from(new Set(elements.map(a => a.getAttribute('href')!))));
          for (const href of links) {
            const target = await request.get(href);
            expect(target.status(), `${route} -> ${href}`).toBe(200);
          }
        }
      });
    }
  });
}

test('unknown article returns 404', async ({ request }) => {
  expect((await request.get('/insights/not-a-real-article')).status()).toBe(404);
});

test('old dashboard article URL redirects to its replacement', async ({ request }) => {
  const response = await request.get('/insights/five-power-bi-dashboards-sme-financial-visibility', { maxRedirects: 0 });
  expect(response.status()).toBe(308);
  expect(response.headers().location).toBe('/insights/five-financial-dashboards-sme-financial-visibility');
});
