import {test , expect} from '@playwright/test';

test("Context menu - Right click" , async ({page})=>{
    
    await page.goto("https://app.thetestingacademy.com/playwright/widgets/context-menu");

    await page.getByTestId("ctx-target").click({button: 'right'});

    const allOptions: string[] = await page.locator("//ul[@id = 'ctx-menu']/li/button/span[1]").allInnerTexts();
    console.log(allOptions); 
    await page.pause();
});