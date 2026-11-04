// Import Chromium browser engine and the required TypeScript types from Playwright
import {chromium , Browser, BrowserContext, Page} from "playwright";

// Define an asynchronous function to execute the browser automation steps
async function run() {
   
    // B = BROWSER
    // Launch a new Chromium browser instance in headed mode (browser UI will be visible)
    let browser:Browser = await chromium.launch({headless: false});
    console.log("Browser Launched:" , browser); // Print the browser object in the console

    // C = CONTEXT 1
    // Create the first isolated browser context inside the launched browser
    // It has its own cookies, local storage, and session data
    let context1:BrowserContext =await browser.newContext();
    console.log("Context Created:" , context1); // Print the first context object

    // C = CONTEXT 2
    // Create the second isolated browser context inside the same browser
    // It is separate from context1 and does not share its cookies or session by default
    let context2:BrowserContext = await browser.newContext();
    console.log("Context Created:" , context2); // Print the second context object

    // P = PAGE
    // Create a new page (tab) inside context1
    // This page belongs to context1, NOT context2
    let page:Page = await context1.newPage();
    console.log("page opened:" , page); // Print the page object in the console

    // Navigate the page to the VWO application URL
    // Note: The URL should normally include https://
    await page.goto("https://app.vwo.com");

    // Get the current page title and print it in the console
    console.log("Title:" ,  await page.title());

    // Close the page that was created inside context1
    await page.close();

    // Close context1 and its associated pages/resources
    await context1.close();

    // Close context2 and its associated pages/resources
    // No page was created inside context2 in this example
    await context2.close();

    // Close the Chromium browser instance after finishing the automation
    await browser.close();
}

// Call the function to start executing the automation code
run();