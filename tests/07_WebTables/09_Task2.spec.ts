import {test , expect} from '@playwright/test';

test("static_table" , async ({page})=>{
    
    await page.goto("https://app.thetestingacademy.com/playwright/tables/webtable");

    const rows = page.locator("//table[@id ='companies-table']/tbody/tr");

    const totalRows = await rows.count();

    console.log(`Total rows present in table: ${totalRows}`);

    for(let i=1; i<=totalRows; i++){
        
        const rowData:string[] = await rows.nth(i).locator('td').allInnerTexts();
        
        if(rowData.includes('Yoshi Tannamuri')){
            
            const name = await rows.nth(i).locator('td[data-col="contact"]').innerText();
            const country = await rows.nth(i).locator('td[data-col="country"]').innerText();
            console.log(`${name} lives in ${country}`);
        }
    }

});