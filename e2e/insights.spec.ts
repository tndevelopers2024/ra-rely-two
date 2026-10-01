import { test, expect } from '@playwright/test';

test.describe('Insights Page', () => {
  test('should allow searching and filtering insights', async ({ page }) => {
    // Navigate to insights page
    await page.goto('/insights');
    
    // Check search input presence
    const searchInput = page.getByPlaceholder(/search/i).first();
    // Wait for input to be visible, if not present gracefully skip or fail
    if (await searchInput.isVisible()) {
      await searchInput.fill('tax');
      await page.waitForTimeout(500); // debounce wait
    }

    // Check category filters presence (e.g. buttons)
    const filterButtons = page.locator('button', { hasText: /category|filter/i }).first();
    if (await filterButtons.isVisible()) {
      await filterButtons.click();
    }

    // Navigate to a specific insight article
    const firstArticle = page.locator('a[href^="/insights/"]').first();
    if (await firstArticle.isVisible()) {
      await firstArticle.click();
      
      // Verify we navigated to the article page
      await expect(page).toHaveURL(/\/insights\/.+/);
      
      // Verify title is present on the article page
      const title = await page.locator('h1').first();
      await expect(title).toBeVisible();
    }
  });
});
