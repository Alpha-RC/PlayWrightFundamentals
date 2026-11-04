import {test , expect} from '@playwright/test';

test("CURA Healthcare Service-make appointment" , async ({page})=>{
    
    await page.goto("https://katalon-demo-cura.herokuapp.com/")

    await page.locator('xpath=//a[@id="btn-make-appointment"]').click();
    await page.waitForTimeout(2000);
    await page.locator('xpath=//input[@id="txt-username"]').fill("John Doe");
    await page.waitForTimeout(2000);
    await page.locator('xpath=//*[@id="txt-password"]').fill("ThisIsNotAPassword");
    await page.waitForTimeout(2000);
    await page.locator('xpath=//button[@id="btn-login"]').click();
    await page.waitForTimeout(2000);
});