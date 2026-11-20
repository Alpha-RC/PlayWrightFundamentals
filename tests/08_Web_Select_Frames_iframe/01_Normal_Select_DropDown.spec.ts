import {test , expect} from '@playwright/test';

test("Normal Select Dropdown" , async ({page})=>{
    
    await page.goto("https://the-internet.herokuapp.com/dropdown");

    await page.locator('#dropdown').click();    //--> clicked on dropdown select element
    await page.selectOption('#dropdown' , 'Option 2');  //--> selectOption method takes 2 paramters
                                                        //    first one is a locator of select element and second one is innertest of option tag
                                                        //    Note: It takes both the parameter as a string 
    // await page.waitForTimeout(5000);
});