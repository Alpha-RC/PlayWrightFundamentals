import {test , expect} from '@playwright/test';

test("error_message_validation_with_wrong_email_id_input_on_free_trail_page_VWO.com" , async ({page})=>{

    await page.goto("https://wingify.com/free-trial/");

    let emailField = page.getByRole('textbox', { name: 'Business Email*' });
    await emailField.fill("ytcfgchjk");
        
    await page.getByRole('checkbox', {name: 'Yes, I agree to receive communications from Wingify. I can opt-out at any time.'}).check();

    await page.getByRole('checkbox', {name: "I agree to Wingify's Privacy Policy & Terms *"}).check();

    await page.getByRole('button', {name: 'Create a Free Trial Account'}).click();

    let errorMsg = page.locator('//input[@type="email"]/parent::div[contains(@class, "invalid-input-group")]/div[contains(@class,"invalid-reason")]');
    await expect(errorMsg).toHaveText('The email address you entered is incorrect.');

});