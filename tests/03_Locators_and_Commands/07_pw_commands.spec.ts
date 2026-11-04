import {test , expect} from '@playwright/test';

test("goto with different waituntill options" , async ({page})=>{
    
// ============================================================
//  1. COMMIT
// ============================================================

    // Navigates to the URL and waits until the server response is received and the browser commits the navigation.
    // Does not wait for HTML parsing or page resources to load.
    await page.goto("https://app.vwo.com/page1", { waitUntil: "commit" });
    console.log("Commit: Server response received");

// ============================================================
// 2. DOMCONTENTLOADED
// ============================================================

    // Navigates to the URL and waits until the HTML document is completely parsed and the DOMContentLoaded event is fired.
    // Does not wait for images and other dependent resources to load.
    await page.goto("https://app.vwo.com/page2", { waitUntil: "domcontentloaded" });
    console.log("DOMContentLoaded: HTML parsed and DOM constructed");

// ============================================================
// 3. LOAD (DEFAULT)
// ============================================================

    // Navigates to the URL and waits until the load event is fired. 
    // Waits for the document and its dependent resources, such as images, stylesheets and scripts, to finish loading.
    // This is the default waitUntil option.
    await page.goto("https://app.vwo.com/page3", { waitUntil: "load" });
    console.log("Load: Page load event fired");


// ============================================================
// 4. NETWORKIDLE
// ============================================================

    // Navigates to the URL and waits until there are no network connections for at least 500 milliseconds.
    // Useful when waiting for network activity to settle.
    // May not be suitable for applications with continuous API calls.
    await page.goto("https://app.vwo.com/page4", { waitUntil: "networkidle" });
    console.log("Networkidle: Network remained idle for 500 ms");

});