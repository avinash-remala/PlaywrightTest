import { test, expect } from '@playwright/test';

import logindata from "../testdata/orangehrmlogindata.json";

test ('Login-ValidCredentials',async({page}) => {
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index");
    await page.locator("input[name='username']").fill(process.env.APP_USERNAME);
    await page.locator("input[type='password']").fill(process.env.APP_PASSWORD);
    await page.locator("button[type='submit']").click();
    await expect(page).toHaveURL ("https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index");
    await expect(page.locator("//p[text()='Time at Work']")).toBeVisible();
});

test ('Login-InvalidCredentials',async({page}) => {
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index");
    await page.locator("input[name='username']").fill(logindata.invalidusername);
    await page.locator("input[type='password']").fill(logindata.invalidpassword);
    await page.locator("button[type='submit']").click();
    await expect(page.locator("//p[text()='Invalid credentials']")).toBeVisible();
});

test ('Login-EmptyCredentials',async({page}) => {
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index");
    await page.locator("button[type='submit']").click();
    await expect(page.locator("(//span[contains(@class,'oxd-text oxd-text--span')])[1]")).toBeVisible();
    await expect(page.locator("(//span[contains(@class,'oxd-text oxd-text--span')])[2]")).toBeVisible();
});

test ('Post and Verify in Newsfeed',async({page}) => {
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index");
    await page.locator("input[name='username']").fill(logindata.username);
    await page.locator("input[type='password']").fill(logindata.password);
    await page.locator("button[type='submit']").click();
    await page.locator("//span[text()='Buzz']").click();
    await page.getByRole('button', { name: 'Share Photos' }).click();
    await page.locator('(//textarea[@placeholder="What\'s on your mind?"])[2]').fill(logindata.buzztext);
    //await page.locator("//input[@type='file']").setInputFiles("testdata/Attach.jpg");
    //await page.locator('(//input[@type="file" and contains(@class,"oxd-file-input")])').setInputFiles("testdata/Attach.jpg");
    await page.getByRole('button', { name: 'Choose File' }).setInputFiles('testdata/screenshot.png');
    await page.locator("(//button[@type='submit'])[2]").click();
    //await page.waitForTimeout(5000);
    await page.reload();
    await expect(page.locator('//p[@class="oxd-text oxd-text--p orangehrm-buzz-post-body-text"]').first()).toContainText(logindata.buzztext);
});

test('Adding a job title', async ({ page }) => {
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index");
    await page.locator("input[name='username']").fill(logindata.username);
    await page.locator("input[type='password']").fill(logindata.password);
    await page.locator("button[type='submit']").click();
    await page.locator("//span[text()='Admin']").click();
    await page.locator('(//span[@class="oxd-topbar-body-nav-tab-item"])[2]').click();
    await page.locator("//a[text()='Job Titles']").click();
    await page.locator("//button[contains(.,'Add')]").click();
    await page.locator("(//label[normalize-space(text())='Job Title']/following::input)[1]").fill("Test Job Title A4");
    await page.locator("//textarea[@placeholder='Type description here']").fill("This is a test job title description");
    await page.locator("//button[contains(.,'Save')]").click();
    await page.waitForTimeout(10000);
    await expect(page).toHaveURL("https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewJobTitleList");
    //await expect(page.locator("//div[contains(@class,'oxd-toast-content oxd-toast-content--success')]")).toBeVisible();
});
