import {test , expect, Page, Locator} from '@playwright/test';

async function getRowbyName(page:Page, name: string): Promise<Locator> {
    while (true) {
        
        const row  = page.locator('tbody[data-testid="employees-tbody"] tr').filter({hasText: name});
        
        if(await row.count() > 0){
            return row;
        }
            
        const nextButton = page.getByTestId('next-page');

        if (await nextButton.isDisabled()) {
            throw new Error(`Row not found for requested name ${name}`);
        }
        await nextButton.click();
    }
}

test("Web Tabl with pagination example" , async ({page})=>{
    
    await page.goto("https://app.thetestingacademy.com/playwright/tables/webtable");

    let requestedName =  "Camila Lopez";
    let row = await getRowbyName(page , requestedName);

    const Role = await row.locator('td[data-col="role"]').innerText();
    console.log(`Role of ${requestedName} is : ${Role}`);

    const EmailId  = await row.locator('td[data-col="email"]').innerText();
    console.log(`Email Id of ${requestedName} is : ${EmailId}`);
    
    const Country  = await row.locator('td[data-col="country"]').innerText();
    console.log(`${requestedName} lives in ${Country}`);

    await page.waitForTimeout(5000);

});