import { test, expect } from '@playwright/test';

for (const width of [1440, 390]) {
  test.describe(`Completed forms at ${width}px`, () => {
    test.use({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });

    test('health check requires all answers and returns the correct bands', async ({ page }) => {
      await page.goto('/finance-health-check');
      const submit = page.getByRole('button', { name: 'Receive My Result and Recommendations' });
      await submit.click();
      await expect(page.getByRole('heading', { name: 'Recommended next steps' })).toHaveCount(0);
      await expect(page.locator('input[name="q_0"]:invalid')).toHaveCount(5);
      for (const [answer, score, band] of [
        ['Always', 100, 'Strong foundation'],
        ['Usually', 75, 'Functional but vulnerable'],
        ['Rarely', 25, 'Immediate attention recommended'],
        ['Not sure', 0, 'Immediate attention recommended'],
      ] as const) {
        for (let i = 0; i < 10; i++) await page.locator(`input[name="q_${i}"][value="${answer}"]`).check();
        await submit.click();
        await expect(page.getByRole('heading', { name: band, exact: true })).toBeVisible();
        const result = page.locator('section[aria-labelledby="health-check-result"]');
        await expect(result).toBeFocused();
        await expect(result).toContainText(`${score} / 100`);
        await expect(result.locator('li')).toHaveCount(3);
        if (answer === 'Not sure') await expect(result).toContainText('Not sure for 10 questions');
        await expect(page.locator('body')).toHaveJSProperty('scrollWidth', await page.evaluate(() => document.body.clientWidth));
        await page.getByRole('button', { name: 'Start Again' }).click();
        await expect(page.locator('main input:checked')).toHaveCount(0);
        await expect(result).toHaveCount(0);
      }
    });

    test('health check prioritises weaknesses and clears stale results', async ({ page }) => {
      await page.goto('/finance-health-check');
      for (let i = 0; i < 10; i++) await page.locator(`input[name="q_${i}"][value="Always"]`).check();
      await page.locator('input[name="q_3"][value="Rarely"]').check();
      await page.getByRole('button', { name: 'Receive My Result and Recommendations' }).click();
      const result = page.locator('section[aria-labelledby="health-check-result"]');
      await expect(result).toContainText('93 / 100');
      await expect(result.locator('li').first()).toContainText('Review aged receivables regularly');
      await expect(result.getByRole('link', { name: 'Discuss My Result' })).toHaveAttribute('href', '/book-a-review');
      await page.locator('input[name="q_0"][value="Sometimes"]').check();
      await expect(result).toHaveCount(0);
    });

    test('newsletter validates, submits once, resets and announces success', async ({ page }) => {
      let submissions = 0;
      let payload: unknown;
      let complete: (() => void) | undefined;
      await page.route('**/api/newsletter', async route => {
        submissions++;
        payload = route.request().postDataJSON();
        await new Promise<void>(resolve => { complete = resolve; });
        await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ success: true }) });
      });
      await page.goto('/');
      const form = page.locator('footer form');
      const input = form.getByRole('textbox', { name: 'Finance Operations Notes' });
      const join = form.getByRole('button', { name: 'Join', exact: true });
      await join.click();
      expect(submissions).toBe(0);
      await input.fill('not-an-email');
      await join.click();
      expect(submissions).toBe(0);
      await input.fill('qa@example.com');
      await join.click();
      await expect(form.getByRole('button', { name: 'Sending...' })).toBeDisabled();
      await expect.poll(() => submissions).toBe(1);
      expect(payload).toEqual({ email: 'qa@example.com', website: '', consent: true });
      complete!();
      await expect(page.locator('footer').getByRole('status')).toContainText('signup request has been sent');
      await expect(input).toHaveValue('');
      await expect(join).toBeEnabled();
    });

    test('newsletter preserves input on SMTP and network errors and retries', async ({ page }) => {
      let mode = 'smtp';
      await page.route('**/api/newsletter', async route => {
        if (mode === 'network') return route.abort('failed');
        await route.fulfill({ status: mode === 'smtp' ? 502 : 200, contentType: 'application/json', body: JSON.stringify(mode === 'smtp' ? { success: false, error: 'Test newsletter delivery failure' } : { success: true }) });
      });
      await page.goto('/');
      const footer = page.locator('footer');
      const input = footer.getByRole('textbox', { name: 'Finance Operations Notes' });
      const join = footer.getByRole('button', { name: 'Join', exact: true });
      await input.fill('qa@example.com');
      await join.click();
      await expect(footer.getByRole('alert')).toHaveText('Test newsletter delivery failure');
      await expect(input).toHaveValue('qa@example.com');
      await expect(join).toBeEnabled();
      mode = 'network';
      await join.click();
      await expect(footer.getByRole('alert')).toContainText('network error');
      await expect(input).toHaveValue('qa@example.com');
      mode = 'success';
      await join.click();
      await expect(footer.getByRole('status')).toContainText('signup request has been sent');
      await expect(footer.getByRole('alert')).toHaveCount(0);
    });
  });
}
