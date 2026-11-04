import {test , expect} from '@playwright/test';

// if we want to create our own page then we can take browser fixture from playwright in callback function of test like below
test("two user interact" , async ({browser})=>{

    // now here we can crate contexts and pages using browser fixture

    let adminContext = await browser.newContext();  // creates new context in browser
    let adminPage = await adminContext.newPage();   // creates new page under above context


    let guestContext = await browser.newContext();
    let guestPage = await guestContext.newPage();

    await adminPage.goto("https://app.vwo.com/#login");
    await guestPage.goto("https://app.vwo.com/#dashboard/home");

    console.log("Admin URL", await adminPage.url());
    console.log("Guest URL:", await guestPage.url());

    await adminPage.close();
    await guestPage.close();

});