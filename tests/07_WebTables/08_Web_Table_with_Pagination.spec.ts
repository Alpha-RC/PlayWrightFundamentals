import {test , expect} from '@playwright/test';

test("Web Table iterations with for loop" , async ({page})=>{
    
    await page.goto("https://app.thetestingacademy.com/playwright/tables/webtable");


    // lets consider below 2 parameter 
    let pageCount = 3;              //--> total number of pages present on above site
    let allEmails:string[] = [];    //--> declaring empty array of type string to store all emails

    // now we will loop for pages present on site i.e. till pageCount

    for (let p = 1; p < pageCount; p++) {
        
        // now locator of pagination for 1st page contains data-testid="page-1" where for page 2 it is data-testid="page-2" and so on 
        // so we can find each page number like below and we can click on it 

        await page.getByTestId(`page-${p}`).click();    //--> here we are clicking on each page 

        // now we need to find each email present on the table 
        const emails = await page.locator("//tbody[@id='employees-tbody']/tr/td[@data-col='email']").allInnerTexts();
        // above locator will get all the emails present on the table
        // and we can push these emails into our allEmails Array

        allEmails.push(...emails);
        
    }

    console.log(allEmails);
    
});