import {test , expect} from '@playwright/test';

test("context with properties" , async ({browser})=>{
    
    let context1 =  await browser.newContext( { httpCredentials:{username:'admin',password:'admin'} }  );
    // in above context creation we have given a parameter of type object(key value pair) while calling newContext() method 
    // in this object we can sent multiple properites such as httpCredentials which will be another object and it holds username and password
    // keys

    // now from above context we can create a page
    let page = await context1.newPage();

    // and using above page we can go to any url we want
    await page.goto("");
});