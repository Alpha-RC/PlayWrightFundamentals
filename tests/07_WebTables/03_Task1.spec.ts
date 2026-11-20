import {test , expect, Locator} from '@playwright/test';

test("OrangeHRM__Terminate_Employee_Test" , async ({page})=>{
    
    await page.goto("https://awesomeqa.com/hr/web/index.php/auth/login");
    
    await page.locator("//input[@name= 'username' and @placeholder = 'Username']").fill('admin');
    await page.locator("//input[@name= 'password' and @placeholder = 'Password']").fill('Awesomeqa@4321');

    await page.getByRole('button', {name: 'Login' , exact:true}).click();

    const rows:Locator = page.locator("//div[@class ='oxd-table-body']/div[@class='oxd-table-card']/div[contains(@class,'oxd-table-row')]");
    const rowsCount = await rows.count();

    for(let i = 0 ; i< rowsCount; i++){
        
        const data = await rows.nth(i).locator(".oxd-table-cell").allInnerTexts();
        if(data.includes('Terminated')){
           const deleteIcon =  rows.nth(i).locator("//div[normalize-space()='Terminated']/following-sibling::div//i[contains(@class , 'bi-trash')]");
           await deleteIcon.click();
           console.log(`First Terminated Employee Found in Row ${i + 1}: ${data}`);
           break;
        }
    }
    
});