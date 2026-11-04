import { chromium , Browser , BrowserContext , Page } from "playwright";

async function run() {
    
    // launch browser and store its returned object in a variable of type Browser
    let browser:Browser = await chromium.launch({headless: false});  // await chromium.launch() will launch the browser and it will return a object and
                                                    // it will be stored in browser variable whose type is Browser 
    

    // from above browser we can create multiple BrowserContext
    let context1:BrowserContext = await browser.newContext();
    let context2:BrowserContext = await browser.newContext();
    let context3:BrowserContext = await browser.newContext();


    // each above contexts can have single or multiple pages cretaed under it like below
    let page1:Page = await context1.newPage();
    let page2:Page = await context1.newPage();

    let page3:Page = await context2.newPage();
    let page4:Page = await context2.newPage();
    let page5:Page = await context2.newPage();

    let page6:Page = await context3.newPage();


    // and now we can use above pages to navigate to any url we want 

    await page1.goto("https://app.vwo.com/login");
    const title1:string = await page1.title();

    await page2.goto("https://app.vwo.com/admin");
    const title2:string = await page2.title();

    // and now once out test case is done we can close each page each browsercontext and then browser

    page1.close();
    page2.close();
    page3.close();
    page4.close();
    page5.close();
    page6.close();

    context1.close();
    context2.close();
    context3.close();

    browser.close();

}


run();

// now instead of launching browser, creating context under it and then creatoing page of test, playwright have given us a interface
// called "test" 
// with the help of this interface we can have a readymade page and we can use it for tetsing