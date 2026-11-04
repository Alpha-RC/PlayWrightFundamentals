import {test , expect} from '@playwright/test';

test("error message validation with wrong email id input on free trail page VWO.com" , async ({page})=>{
    
    await page.goto("https://wingify.com/free-trial/");

    // await page.locator('#free-trial-step1-email').fill("abcd");

    // we can first store the element in a variable and then use it to fill later like below:

    let inputEmailField = page.locator("css=#free-trial-step1-email");  //--> used css selector here
    await inputEmailField.fill("abcd");

    let checkBox1 = page.locator("css=#free-trial-step1-gdpr-consent-checkboxcu-marketing-consent-checkbox");   //--> used css selector here
    await checkBox1.check();

    let checkBox2 = page.locator("#free-trial-step1-gdpr-consent-checkboxcu-gdpr-consent-checkbox");    //--> used css selector here
    await checkBox2.check();

    let createFreeTrialButton = page.locator("button[data-qa='page-su-submit']").first();   //--> used css selector here
    await createFreeTrialButton.click();

    let errorMsg = await page.locator('xpath=//div[contains(text(), "The email address you entered is incorrect.")]').textContent();    //--> used xpath locator here
    expect(errorMsg).toContain("The email address you entered is incorrect.");
    


});