import {test , expect} from '@playwright/test';

test("Advance Select Dropdowns" , async ({page})=>{
    
    await page.goto("https://app.thetestingacademy.com/playwright/tables/select-boxes");
    
    const singleDroppdown = page.getByTestId('rs-single-input');
    await singleDroppdown.click();
    await singleDroppdown.pressSequentially('Playwright', {delay:200});
    await page.getByRole('option', { name: 'Playwright' }).click();


    const multi_chip_dropdown =  page.getByTestId('rs-multi-input');
    await multi_chip_dropdown.click();
    await multi_chip_dropdown.fill('Playwright');
    await page.waitForTimeout(3000);
    await page.getByRole('option',{name: 'Playwright'}).click();
    await multi_chip_dropdown.click();
    await multi_chip_dropdown.fill('Cucumber');
    await page.waitForTimeout(3000);
    await page.getByRole('option',{name: 'Cucumber'}).click();
    await page.keyboard.press('Escape');

    
    const creatable_multi_dropdown = page.getByTestId('rs-creatable-input');
    await creatable_multi_dropdown.click();
    await page.waitForTimeout(3000);
    await creatable_multi_dropdown.fill('abcd');
    await page.waitForTimeout(3000);
    await page.keyboard.press('Enter');
    await page.keyboard.press('Escape');

    const categorised_options_dropdown = page.getByTestId('rs-grouped-input');
    await categorised_options_dropdown.click();
    await categorised_options_dropdown.pressSequentially('AWS');
    await page.getByRole('option', {name: 'AWS'} ).click();

    const fetched_on_type_dropdown = page.getByTestId('rs-async-input');
    await fetched_on_type_dropdown.click();
    await page.waitForTimeout(3000);
    await fetched_on_type_dropdown.pressSequentially('Pun');
    await page.waitForTimeout(3000);
    await page.getByRole('option', {name: 'Pune'}).click();
    await page.waitForTimeout(3000);
    
    await expect(page.locator('#select-output')).toBeVisible();
    console.log(await page.locator('#select-output').innerText());
    
});