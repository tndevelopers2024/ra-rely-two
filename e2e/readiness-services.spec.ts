import { test, expect } from '@playwright/test';

const services = [
  { slug: 'bas-readiness', heading: 'BAS Readiness & Finance Support', title: 'BAS Readiness & Finance Support | Rely Advisory', cta: 'Improve your BAS readiness', points: 5, scope: 'client’s registered BAS or tax agent' },
  { slug: 'audit-ready-finance', heading: 'Audit-Ready Finance', title: 'Audit-Ready Finance Support | Rely Advisory', cta: 'Get your finance function audit-ready', points: 6, scope: 'does not perform an independent audit or provide an audit opinion' },
];

test.use({ reducedMotion: 'reduce' });

for (const width of [1440, 768, 390, 320]) {
  test.describe(`readiness services at ${width}px`, () => {
    test.use({ viewport: { width, height: 900 } });
    for (const service of services) {
      test(`${service.slug} shows approved scope, tracks enquiry intent and links to the form`, async ({ page }) => {
        const errors: string[] = [];
        page.on('pageerror', error => errors.push(error.message));
        await page.goto(`/solutions/${service.slug}`);
        await expect(page).toHaveTitle(service.title);
        await expect(page.locator('h1')).toHaveText(service.heading);
        await expect(page.locator('h1')).toHaveCount(1);
        await expect(page.getByText(service.scope, { exact: false })).toBeVisible();
        await expect(page.locator('main ul li')).toHaveCount(service.points);
        await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://relyadvisory.com.au/solutions/${service.slug}`);
        const cta = page.getByRole('link', { name: service.cta, exact: true });
        await cta.scrollIntoViewIfNeeded();
        const bounds = await cta.boundingBox();
        expect(bounds!.height).toBeGreaterThanOrEqual(44);
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
        await page.evaluate(() => {
          window.addEventListener('rely:contact-cta', () => {
            const win = window as Window & { dataLayer?: unknown[] };
            sessionStorage.setItem('test-cta-events', JSON.stringify(win.dataLayer));
          });
        });
        await cta.click();
        await expect(page).toHaveURL('/contact#enquiry-form');
        await expect(page.locator('#enquiry-form')).toBeVisible();
        const events = await page.evaluate(() => JSON.parse(sessionStorage.getItem('test-cta-events') || '[]'));
        expect(events).toEqual([{ event: 'contact_cta_click', service: service.slug, cta_location: 'service_page', destination: '/contact#enquiry-form' }]);
        expect(errors).toEqual([]);
      });
    }
    test('solutions show the full journey and consistently sized cards', async ({ page }) => {
      await page.goto('/solutions');
      const cards = page.locator('[data-solution-card]');
      await expect(cards).toHaveCount(6);
      await expect(cards.locator('h3')).toHaveText(['Accounts Payable', 'Accounts Receivable', 'BAS Readiness', 'Reporting & Insights', 'Audit-Ready Finance', 'Process Improvement']);
      const sizes = await cards.evaluateAll(items => items.map(item => item.getBoundingClientRect().height));
      expect(Math.max(...sizes) - Math.min(...sizes)).toBeLessThanOrEqual(1);
      await expect(page.locator('#finance-operations')).toBeAttached();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
    });
  });
}

test('both services are discoverable from the desktop menu and homepage', async ({ page }) => {
  await page.goto('/');
  const preloader = page.locator('[aria-hidden="true"][class*="z-[100]"]');
  await expect(preloader).toBeVisible();
  await expect(preloader).toHaveCount(0);
  await expect(page.getByText('From day-to-day finance operations and BAS readiness to management reporting and audit-ready records, we help businesses build a stronger finance function.')).toBeVisible();
  await page.getByRole('navigation', { name: 'Desktop Navigation' }).getByRole('link', { name: 'Solutions', exact: true }).hover();
  await page.getByRole('navigation', { name: 'Desktop Navigation' }).getByRole('link', { name: /^BAS Readiness/ }).click();
  await expect(page).toHaveURL('/solutions/bas-readiness');
  await page.getByRole('navigation', { name: 'Desktop Navigation' }).getByRole('link', { name: 'Solutions', exact: true }).hover();
  await page.getByRole('navigation', { name: 'Desktop Navigation' }).getByRole('link', { name: /^Audit-Ready Finance/ }).click();
  await expect(page).toHaveURL('/solutions/audit-ready-finance');
});

test('mobile menu scrolls to and opens both new services', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('/');
  for (const name of ['BAS Readiness', 'Audit-Ready Finance']) {
    await page.getByRole('button', { name: 'Open menu', exact: true }).click();
    const link = page.getByRole('navigation', { name: 'Mobile Navigation' }).getByRole('link', { name, exact: true });
    await link.click();
    await expect(page.locator('h1')).toContainText(name);
    await expect(page.getByRole('button', { name: 'Open menu', exact: true })).toBeVisible();
  }
});
