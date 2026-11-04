import {test , expect} from '@playwright/test';

test("TTA Cart" , async ({browser})=>{
    
    let context1 = await browser.newContext();
    let page = await context1.newPage();

    page.goto("https://app.thetestingacademy.com/playwright/ttacart/");

    context1.close();

});


test("TTA Bank" , async ({browser})=>{
    
    let context2 = await browser.newContext();
    let page = await context2.newPage();

    page.goto("https://tta-bank-digital-973242068062.us-west1.run.app/");

    context2.close();
});