import {test , expect} from '@playwright/test';

test("Login Test" , async ({page})=>{

    await page.goto("https://app.vwo.com/#login");
    expect(page).toHaveTitle("Login - Wingify")
});

// so here we are calling test function which requires 2 parameters: test(string, callback function)

// structure of this test function in Playwright test interface is something like:

/*

function test(title, callback) {

    // Playwright internally prepares the fixtures
    let fixtures = {
        page: pageObject,
        browser: browserObject,
        context: contextObject,
        browserName: "chromium"
    };

    // Playwright invokes the callback and passes the fixtures object
    callback(fixtures);
}

*/

test("sign up test" , async ({page})=>{
    page.goto("https://app.vwo.com/#signup");
    await expect(page).toHaveTitle("Wingify - Application");
});
