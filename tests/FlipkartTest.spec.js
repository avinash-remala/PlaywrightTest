import { test, expect } from '@playwright/test';

test('Flipkart Test Navigate to Formal Shirts', async ({ page }) => {
  await page.goto("https://www.flipkart.com/");
  await page.waitForTimeout(20000);
  await page.locator('//div[@aria-label="Fashion"]').hover();
  await page.locator("(//a[@class='_3490ry']/following-sibling::a)[3]").click();
  await expect(page.getByRole('heading', { name: 'Formal Shirts', exact: true })).toBeVisible();
  await page.close();
});
