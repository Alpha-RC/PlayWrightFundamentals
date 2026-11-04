import {test , expect} from '@playwright/test';

test("verify logo and title of vwo.com" , async ({page})=>{
    
    await page.goto("https://app.vwo.com");

    await expect(page).toHaveTitle("Login - Wingify");
    
    const logo_img = page.locator('#vow-login-logo');

    await expect(logo_img).toBeVisible();

});