import { test, expect, Locator } from "@playwright/test";

const URL = "https://app.thetestingacademy.com/playwright/widgets/scroll";

test.describe("Scroll Demo", ()=>{

    test.beforeEach(async ({page}) => {
        await page.goto(URL);
    });

    test("Scroll to view element" , async ({page}) => {
        
        // scrollIntoViewIfNeeded() will scroll until the locator element gets into view on UI:
        await page.getByTestId("deep-anchor").scrollIntoViewIfNeeded();
        await page.getByTestId("deep-anchor").click();

        // page.evaluate()` – Scrolling the Webpage using JavaScript


        // We can use the evaluate() method on the page object to execute JavaScript directly inside the browser's page context.
        // Here, we use the browser's window.scrollBy() method to scroll the webpage along the X and Y axes.
        await page.evaluate(() => window.scrollBy(0, 1000));

        /*
        Understanding page.evaluate() here:

        - page.evaluate()` is a Playwright method that allows us to execute JavaScript code directly inside the browser's webpage (page context).
        - () =>` is an arrow function passed as an argument to `evaluate()`. 
            The code inside this function is executed in the browser, not in our Node.js test file's environment.
        - window` represents the browser window in which the webpage is currently loaded.
        - window.scrollBy(x, y)` is a native JavaScript browser method that scrolls the webpage relative to its current scroll position.
        - 0` (X-axis) means no horizontal scrolling.
        - 1000` (Y-axis) means scroll vertically down by 1000 pixels.
        - await` waits for the JavaScript execution to complete before moving to the next line of code.

        Syntax of window.scrollBy(x, y)
        --------------------------------------------------------------------
        |             Code               |            Action               |
        ---------------------------------|----------------------------------
        | window.scrollBy(0, 1000)`      |   Scroll down by 1000 pixels    |
        | window.scrollBy(0, -1000)`     |   Scroll up by 1000 pixels      |
        | window.scrollBy(1000, 0)`      |   Scroll right by 1000 pixels   |
        | window.scrollBy(-1000, 0)`     |   Scroll left by 1000 pixels    |
        --------------------------------------------------------------------

        Note: `page.evaluate()` is useful when we want to execute browser-side JavaScript directly 
               instead of using Playwright's usual locators and actions. 
        */

        // jump to bottom
        await page.evaluate(()=>window.scrollTo(0, document.body.scrollHeight));
        await expect(page.getByTestId("cta-button")).toBeEnabled();

        // jump back to top
        await page.evaluate(()=>window.scrollTo(0,0));
    });

});