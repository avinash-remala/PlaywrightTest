import { test, expect } from '@playwright/test';


test('open site based on browser', async ({ page, browserName }) => {
  const browser = String(browserName || '').toLowerCase();
  console.log('Detected browser:', browser || '(none)');

  if (browser.includes('chromium')) {
    await page.goto('https://www.flipkart.com');
    await expect(page).toHaveURL(/flipkart\.com/);
  } else if (browser.includes('firefox')) {
    await page.goto('https://www.amazon.com');
    await expect(page).toHaveURL(/amazon\.com/);
  } else if (browser.includes('webkit')) {
    await page.goto('https://www.myntra.com');
    await expect(page).toHaveURL(/myntra\.com/);
  } else {
    // Fallback when the browser can't be detected: open a generic page and log a message.
    console.warn('Browser not recognized. Opened about:blank as fallback. To run specific branches use Playwright projects or --browser.');
    await page.goto('about:blank');
    await expect(page).toHaveURL('about:blank');
  }
});
