import { test, expect } from '@playwright/test';

test.use({ reducedMotion: 'reduce' });

for (const route of ['/contact', '/book-a-review']) {
  test(`${route} validates required fields and handles success and failure`, async ({ page }) => {
    let submissions = 0;
    let fail = false;
    await page.route('**/api/contact', async request => {
      submissions++;
      await request.fulfill({ status: fail ? 500 : 200, contentType: 'application/json', body: JSON.stringify(fail ? { success: false, error: 'Test delivery failure' } : { success: true }) });
    });
    await page.goto(route);
    await expect(page.locator('[aria-hidden="true"][class*="z-[100]"]')).toHaveCount(0);
    const form = page.locator('main form');
    const submit = form.getByRole('button', { name: /Send Enquiry|Book My Free Review/ });
    await submit.click();
    expect(submissions).toBe(0);
    const fill = async () => {
      await form.locator('[name="name"]').fill('Playwright Test');
      await form.locator('[name="business"]').fill('Test Pty Ltd');
      await form.locator('[name="email"]').fill('test@example.com');
      await form.locator('textarea').fill('Browser test with intercepted submission.');
      if (route === '/book-a-review') await form.locator('[name="consent"]').check();
    };
    await fill();
    await submit.click();
    await expect.poll(() => submissions).toBe(1);
    await expect(page.locator('main')).toContainText(/received|successfully/);
    await expect(form.locator('[name="email"]')).toHaveValue('');
    fail = true;
    await fill();
    await submit.click();
    await expect(page.getByText('Test delivery failure')).toBeVisible();
    await expect(submit).toBeEnabled();
  });
}
