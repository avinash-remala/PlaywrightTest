import { test, expect } from '@playwright/test';

test('Flipkart Test Navigate to Formal Shirts using following sibling', async ({ page }) => {
  await page.goto("https://www.flipkart.com/");
  await page.waitForTimeout(20000);
  await page.locator('//div[@aria-label="Fashion"]').hover();
  await page.locator("(//a[@class='_3490ry']/following-sibling::a)[3]").click();
  await expect(page.getByRole('heading', { name: 'Formal Shirts', exact: true })).toBeVisible();
  await page.close();
});

test('Flipkart Test Navigate to Formal Shirts using child', async ({ page }) => {
  await page.goto("https://www.flipkart.com/");
  await page.waitForTimeout(20000);
  await page.locator('//div[@aria-label="Fashion"]').hover();
  await page.locator('//div[@class="_1UgUYI _2eN8ye"]/div[2]/object/a[4]').click();
  await expect(page.getByRole('heading', { name: 'Formal Shirts', exact: true })).toBeVisible();
  await page.close();
});