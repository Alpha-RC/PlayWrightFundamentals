import {chromium} from "playwright";

// declaring a async function which will launch a browser using chromium

async function sessionStorage() {

    let browser = await chromium.launch({headless: false});  // this will launch a browser

    let context = await browser.newContext({ignoreHTTPSErrors: true});

    let page    = await context.newPage();

    await page.goto("https://app.wingify.com/");
    await page.waitForTimeout(2000);

    await page.fill("#login-username", "opg73@singleuseemail.site");
    await page.fill("#login-password" , "Wingify@4321");

    await page.waitForTimeout(3000);

    await page.click("#js-login-btn");

    // await page.waitForURL(/\/warning\.jsp\?time_zone_offset=-330&redirectKey=netcracker_from_url_.*/);
    await page.waitForURL(/#\/(Dashboard|Home)/, {timeout: 15000});
    await page.waitForTimeout(3000);
    
    await context.storageState({path: "./user-session.json"});
    console.log("Session saved to user-session.hson");

    await page.waitForTimeout(2000);
    await browser.close();
    
}

sessionStorage();