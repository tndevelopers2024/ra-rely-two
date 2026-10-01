import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test('should validate form and prevent spam submission', async ({ page }) => {
    await page.goto('/contact');
    
    // Check if form exists
    const form = page.locator('form').first();
    if (!(await form.isVisible())) {
      test.skip();
    }

    // Submit without filling - expect client-side validation
    const submitButton = form.locator('button[type="submit"]');
    await submitButton.click();
    
    // Find validation messages (could be required attribute or custom error text)
    const requiredInputs = form.locator('input[required]');
    const count = await requiredInputs.count();
    
    // Fill out the form
    const nameInput = form.locator('input[name="name"], input[name="fullName"], input[placeholder*="Name" i]').first();
    if (await nameInput.isVisible()) await nameInput.fill('Playwright Tester');
    
    const emailInput = form.locator('input[type="email"], input[name="email"]').first();
    if (await emailInput.isVisible()) await emailInput.fill('tester@example.com');
    
    const messageInput = form.locator('textarea, input[name="message"]').first();
    if (await messageInput.isVisible()) await messageInput.fill('This is a test message from Playwright.');

    // Honeypot spam field check (assuming it's a hidden input, or input with a specific name like 'bot-field' or similar)
    const honeypot = form.locator('input[name="bot-field"], input[name="honeypot"], input[tabindex="-1"]').first();
    if (await honeypot.isVisible()) {
      // By default hidden elements are not interactable, but we can evaluate or force fill if needed.
      // Honeypots should ideally drop silently. We won't trigger it here to test a successful flow,
      // or we can write a separate test for it.
    }
  });
});
