import { test, expect } from '@playwright/test';

test('Flipkart Test', async ({ page }) => {
  await page.goto("https://www.flipkart.com/");
  await page.locator("(//a[@class='_3490ry']/following-sibling::a)[3]").click();
  await expect(page.getByRole('heading', { name: 'Formal Shirts', exact: true })).toBeVisible();
});

test('test', async ({ page }) => {
  await page.goto('https://www.flipkart.com/');
  await page.getByRole('link', { name: 'Men\'s Formal Shirts' }).click();
  await expect(page.getByRole('heading', { name: 'Formal Shirts', exact: true })).toBeVisible();
});