import { expect, test, Locator } from "@playwright/test";

const URL =  "https://www.flipkart.com/search";


test.describe("Find cheapest macmini" , ()=>{

    test.beforeEach(async ({page}) => {
        await page.goto(URL);
    });

    test("find cheapest price" , async ({page})=>{
        
        // fill macmini in search box:
        await page.locator("//input[@name = 'q']").fill("macmini");
        
        // finding the SVG elements:
        const svgElement: Locator = page.locator("svg");

        // click on first svg element:
        await svgElement.first().click();

        await page.waitForTimeout(5000);

        const titles  = page.locator("//div[contains(@data-id,'MP') or contains(@data-id,'CPU') or contains(@data-id,'COM')]/div/a[2]");
        const totalProducts = await titles.count();
        console.log(`Total products: ${totalProducts}`);

        const prices = page.locator("//div[contains(@data-id,'MP') or contains(@data-id,'CPU') or contains(@data-id,'COM')]/div/a[3]/div/div[1]");
        const totalPricesCount = await prices.count();
        console.log(`Total prices counts are: ${totalPricesCount}`);

        if(totalProducts === totalPricesCount){

            let count = totalPricesCount;
            let cheapestPrice = Infinity;

            for (let i = 0; i < count; i++) {
                
                let price = await prices.nth(i).textContent();
                let numericPrice = Number(price?.replace(/[₹,]/g, ''));

                if(numericPrice < cheapestPrice){
                    cheapestPrice = numericPrice;
                }
            }

            console.log(`Chpeast price availabel is: ${cheapestPrice}`);
        }

    });
});