import {test , expect} from '@playwright/test';

test("xPath functions" , async ({page})=>{

    await page.goto("https://katalon-demo-cura.herokuapp.com/");
    await page.locator('xpath=//a[contains(@id , "btn-make-appointment")]').click();
    await page.waitForTimeout(1000);

});