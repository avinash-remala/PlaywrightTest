import { test, expect } from '@playwright/test';

test('Verfy Text Box', async ({ page }) => {
  await page.goto('https://demoqa.com/');
  await page.getByRole('heading', { name: 'Elements' }).click();
  await page.getByRole('listitem').filter({ hasText: 'Text Box' }).click();
  await page.getByRole('listitem').filter({ hasText: 'Text Box' }).click();
  await page.getByRole('textbox', { name: 'Full Name' }).fill('ARE');
  await page.getByRole('textbox', { name: 'name@example.com' }).fill('are@are.com');
  await page.getByRole('textbox', { name: 'Current Address' }).fill('are');
  await page.locator('#permanentAddress').fill('are.com');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('Name:AREEmail:are@are.')).toBeVisible();
  await expect(page.getByText('Email:are@are.com')).toBeVisible();
  await expect(page.getByText('Current Address :are')).toBeVisible();
  await expect(page.getByText('Permananet Address :are.com')).toBeVisible();
});