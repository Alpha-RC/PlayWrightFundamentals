import {test , expect} from '@playwright/test';

test("Custom Dropdowns" , async ({page})=>{
    
    await page.goto("https://app.thetestingacademy.com/playwright/tables/dropdowns");

    // open the dropdown
    await page.getByTestId('lang-trigger').click();
    await page.getByRole('option', { name: 'JavaScript' }).click();

    await page.getByTestId('framework-trigger').click();
    await page.getByRole('option' , {name: 'Next.js'}).click();

    await page.getByTestId('experience-trigger').click();
    await page.getByRole('option' , {name: 'Mid-level (4-6 years)'}).click();

    await page.getByTestId('dropdown-save').click();
    console.log(await page.locator('#dropdown-output').innerText());
    await expect(page.locator('#dropdown-output')).toBeVisible();

});