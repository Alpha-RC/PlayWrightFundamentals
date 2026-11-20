import {test , expect, Locator} from '@playwright/test';

test("Dynamic_Web_Tables" , async ({page})=>{
    
    await page.goto("https://awesomeqa.com/webtable1.html");

    const rows:Locator = page.locator("//table[@summary = 'Sample Table']/tbody/tr");   //--> here 'rows' will point to whole row element i.e. 'tr'
    const rowsCount:number = await rows.count();   //--> here rowsCount will store how many elements it is pointing to
    console.log("Total Rows:", rowsCount);  //--> printing total number of rows

    // now as we have total rows we can find all the elements in it using nth() method like below 

    for (let i = 0; i < rowsCount; i++) {
       
        // now here we will iterate through each child element of that particular row
        const rowData:string[] = await rows.nth(i).locator('td').allInnerTexts();
        console.log(`Row ${i+1}:`, rowData);
    
    }

    
});