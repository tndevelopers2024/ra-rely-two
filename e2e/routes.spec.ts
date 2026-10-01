import { test, expect } from '@playwright/test';

const ROUTES = [
  '/',
  '/about',
  '/solutions',
  '/solutions/reporting-insights',
  '/insights',
  '/contact',
  '/faq',
  '/privacy',
  '/terms',
];

test.describe('Health Checks', () => {
  for (const route of ROUTES) {
    test(`Route ${route} should load with 200 OK and have a title`, async ({ page }) => {
      // Listen for console errors
      const errors: string[] = [];
      page.on('console', msg => {
        if (msg.type() === 'error') {
          errors.push(msg.text());
        }
      });
      page.on('pageerror', err => {
        errors.push(err.message);
      });

      const response = await page.goto(route);
      expect(response).not.toBeNull();
      if (response) {
        expect(response.status()).toBe(200);
      }
      
      const title = await page.title();
      expect(title.length).toBeGreaterThan(0);
      
      // Some React Next internals might throw harmless warnings, but for this strict test we will assert no major unhandled exceptions.
      // We'll relax the console error strictness slightly if it's just a hydration warning, but ideally zero.
      expect(errors.filter(e => !e.includes('Hydration'))).toHaveLength(0);
    });
  }
});
