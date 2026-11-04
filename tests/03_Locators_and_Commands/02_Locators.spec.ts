import {test , expect} from '@playwright/test';

test("VWO.com fail login case" , async ({page})=>{
    
    await page.goto("https://app.vwo.com/#.login");

    // Default Locator strategies:
    // id, name, className, tag, Custom Locator (CSS Selector) -> these are some default locators

    // <input 
    //  type="email" 
    //  class="text-input W(100%)" 
    //  name="username" 
    //  vwo-html-translate-attr="placeholder" 
    //  vwo-html-translate-placeholder="login:enterEmailID" 
    //  id="login-username" 
    //  data-qa="hocewoqisi" 
    //  placeholder="Enter email ID">
    //  >

    // above is one element on opened website

    // now we can store this element in a variable like below using locator() method like below
    let userNameField = page.locator('#login-username');    // now here we are string the element in a varibale so that we can use it later
    let passwordField = page.locator('#login-password');
    let loginButton   = page.locator('#js-login-btn');

    // now we can use these element to act on it like below
    await userNameField.fill('usertest');   //  this will fill usertest in the username element and fill will return a promise so we need to
                                            //  use await before calling this method
    await passwordField.fill('usertest');   //  here also it will fill usertest as password 
    await loginButton.click();              //  this will click on the login button element.

    console.log("All actions completed");

    // now to check if error message is present on the page after login we can use assertion like below
    let errorMessage = page.locator('#js-notification-box-msg');
    await expect(errorMessage).toContainText('Your email, password, IP address or location did not match');
    
});