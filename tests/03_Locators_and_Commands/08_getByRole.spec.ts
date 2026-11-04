import {test , expect} from '@playwright/test';

test("getByRole options" , async ({page})=>{
    
    await page.goto("https://katalon-demo-cura.herokuapp.com/");

    await page.getByRole('link' , {name: "Make Appointment" , disabled:false }).click(); 
    // disabled:false will check if link is enabled and clickable


});