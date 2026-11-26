import {test ,expect, Locator} from '@playwright/test'

const URL = "https://www.flipkart.com/search";

test.describe("Flipkart search with SVG elements", ()=>{

    test.beforeEach(async ({page}) => {
        await page.goto(URL);
    });


    test("TC#1: Search product" , async ({page})=>{
        
        // await page.getByRole('textbox', { name: 'Search for products, brands and more' }).fill('macmini');
        await page.locator("//input[@name = 'q']").fill("macmini");
        
        // finding the SVG elements:
        const svgElement: Locator = page.locator("svg");
        await svgElement.first().click();

        // to find all the SVG elements
        // const allSvgElements: Locator[] = await page.locator("svg").all();
        // for (const svgElement of allSvgElements) {
        //     console.log(await svgElement.getAttribute('xmlns'));
        // }


        // Wait for search page activity to settle
        // await page.waitForLoadState("load");

        // await page.waitForLoadState('domcontentloaded');

        await page.waitForTimeout(5000);

        // finding title of all the product that are listed on first page:
        const titleResults = page.locator("//div[contains(@data-id,'MP') or contains(@data-id,'CPU') or contains(@data-id,'COM')]/div/a[2]");
        
        // Get total count
        const count = await titleResults.count();
        console.log("Total titles:", count);

        // Print all product titles
        
        // for (let i = 0; i < count; i++) {
        //     const title: string | null = await titleResults.nth(i).textContent();
        //     console.log(title);
        // }

        for (let i = 0; i < count; i++) {
            const title: string | null = await titleResults.nth(i).getAttribute('title');
            console.log(title);
        }

    });


});