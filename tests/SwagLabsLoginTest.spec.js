import { test, expect } from '@playwright/test';

import logindata from "../testdata/swaglabstestdata.json";
import apitestdata from "../testdata/apitestdata.json";

test ('Login-ValidCredentials',async({page}) => {
    await page.goto("https://www.saucedemo.com/v1/");
    await page.locator("input[data-test='username']").fill(logindata.username);
    await page.locator("input[type='password']").fill(logindata.password);
    await page.locator("input[type='submit']").click();
    await expect(page).toHaveURL("https://www.saucedemo.com/v1/inventory.html");
    await expect(page.locator("div.product_label")).toBeVisible();
})

test ('Login-LockedOutCredentials',async({page}) => {
    await page.goto("https://www.saucedemo.com/v1/");
    await page.locator("input[data-test='username']").fill(logindata.lockedusername);
    await page.locator("input[type='password']").fill(logindata.password);
    await page.locator("input[type='submit']").click();
    //await expect(page).toHaveURL("https://www.saucedemo.com/v1/inventory.html");
    await expect(page.locator("//h3[contains(.,'Epic sadface: Sorry, this user has been locked out.')]")).toBeVisible();
})

test ('Login-ProblemCredentials',async({page}) => {
    await page.goto("https://www.saucedemo.com/v1/");
    await page.locator("input[data-test='username']").fill(logindata.problemusername);
    await page.locator("input[type='password']").fill(logindata.password);
    await page.locator("input[type='submit']").click();
    await expect(page).toHaveURL("https://www.saucedemo.com/v1/inventory.html");
    await expect(page.locator("div.product_label")).toBeVisible();
})

test ('Login-PerformanceCredentials',async({page}) => {
    await page.goto("https://www.saucedemo.com/v1/");
    await page.locator("input[data-test='username']").fill(logindata.performanceusername);
    await page.locator("input[type='password']").fill(logindata.password);
    await page.locator("input[type='submit']").click();
    await expect(page).toHaveURL("https://www.saucedemo.com/v1/inventory.html");
    await expect(page.locator("div.product_label")).toBeVisible();
})

test ('Login-NoUsernamePassword',async({page}) => {
    await page.goto("https://www.saucedemo.com/v1/");
    await page.locator("input[data-test='username']").fill("");
    await page.locator("input[type='password']").fill("");
    await page.locator("input[type='submit']").click();
    // await expect(page).toHaveURL("https://www.saucedemo.com/v1/inventory.html");
    await expect(page.locator("//h3[contains(.,'Epic sadface: Username is required')]")).toBeVisible();
})

test ('Logout',async({page}) => {
    await page.goto("https://www.saucedemo.com/v1/");
    await page.locator("input[data-test='username']").fill(logindata.username);
    await page.locator("input[type='password']").fill(logindata.password);
    await page.locator("input[type='submit']").click();
    await expect(page).toHaveURL("https://www.saucedemo.com/v1/inventory.html");
    
    await page.locator("//button[normalize-space(text())='Open Menu']").click();
    await page.locator("//a[normalize-space(text())='Logout']").click();
    await expect(page).toHaveURL("https://www.saucedemo.com/v1/index.html");
})

test('should fetch a list of users', async ({ request }) => {
  const response = await request.get(apitestdata.baseurl);
  expect(response.ok()).toBeTruthy() ; // Check for a successful status code (2xx)
  const users = await response.json(); // Parse the JSON response
  expect(Array.isArray(users)).toBeTruthy(); // Assert that the response is an array
  expect(users.length).toBeGreaterThan(0); // Assert that there are users in the response
  expect(users[0]).toHaveProperty('id');
})
