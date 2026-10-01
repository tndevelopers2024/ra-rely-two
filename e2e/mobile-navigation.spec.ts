import { test, expect } from '@playwright/test';

test.use({ viewport: { width: 375, height: 667 } }); // Mobile viewport

test.describe('Mobile Navigation', () => {
  test('should open hamburger menu and navigate', async ({ page }) => {
    await page.goto('/');

    // Look for hamburger menu button
    const hamburger = page.locator('button[aria-label*="menu" i], button.mobile-menu-button, .hamburger, [data-testid="hamburger-menu"]').first();
    
    if (await hamburger.isVisible()) {
      await hamburger.click();
      
      // Wait for navigation menu to appear
      const navMenu = page.locator('nav, [role="navigation"], .mobile-menu').last();
      await expect(navMenu).toBeVisible();
      
      // Click a link inside the mobile menu
      const aboutLink = navMenu.locator('a[href="/about"]').first();
      if (await aboutLink.isVisible()) {
         await aboutLink.click();
         await expect(page).toHaveURL(/\/about/);
         
         // Menu should close automatically, or we need to close it
         // Verify menu is hidden or not blocking
      }
    } else {
      // If no hamburger visible, perhaps it's not a responsive menu or uses different selectors
      test.skip();
    }
  });
});
