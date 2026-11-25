import {test , expect} from '@playwright/test';

test("Hover action" , async ({page})=>{
    
    await page.goto("https://www.spicejet.com/");
    
    // xpath locator:
    await page.locator("//div[text()='Add-ons']").hover();

    // Playwright locator: getBytext()
    // await page.getByText("Add-ons").first().hover();     //--> as there are 2 Add-ons text present we need to use first() which will 
                                                            //    hover on first matching element
    
    
    await page.locator("//div[text()='FlyEarly']").click();
});