import {test , expect} from '@playwright/test';

test("Finding element on web tables with xpath axes" , async ({page})=>{
    
    await page.goto("https://app.thetestingacademy.com/playwright/webtable");
    await page.locator("//td[@class='username' and text()='Aarav.Sharma']/preceding-sibling::td/input[@type='checkbox']").click();
});