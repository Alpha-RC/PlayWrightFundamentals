import { expect, test , Locator } from '@playwright/test';

const URL = 'https://app.thetestingacademy.com/playwright/widgets/svg';

test.describe('SVG Handling' , ()=>{

    test.beforeEach(async ({page}) => {
        await page.goto(URL);
    });

    test('locate svg root and assert visible' , async ({page})=>{
        
        const red_circle = page.locator("#circle-red");
        await red_circle.click();

        const output = await page.locator("#shapes-output").innerText();
        expect(output).toContain("Red circle");

        await page.getByRole('button' , {name: /Q3 bar/}).click();
        await page.getByRole('radio' , {name: '4 stars'}).click();

        // find all the bars and print their data value:
        const allRectBars = await page.locator("rect.bar").all();
        for (const bar of allRectBars) {
            let data = await bar.getAttribute('data-value');
            console.log(data);
        }
    });

});