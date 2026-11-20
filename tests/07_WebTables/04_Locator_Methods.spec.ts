import {test , expect, Locator} from '@playwright/test';

test("Verify element by filter" , async ({page})=>{
    
    await page.goto("https://app.thetestingacademy.com/playwright/multiple_element_filter");


    // filter() method:
    const forgottenPasswordLink = page.locator("a.list-group-item").filter({hasText:'Forgotten Password'});
    // page.locator("a.list-group-item") will return a locator object which may contain multiple elements
    // then using filter method on the locator we can click on a single element 
    // (note: it can still point to multiple element as it just filtering out the elements so developer should know if its a signle element only or not)
    await forgottenPasswordLink.click();


    // toHaveCount() method;

    const accountLink = page.locator("a.list-group-item");
    await expect(accountLink).toHaveCount(13);    //--> as accountLink is pointin to multiple elements here we can verfiy if it is pointing to 
                                            //    exact number of elements or not using toHaveCount() method.

    // toHaveAttribute() method:
    const privacyLink = page.locator("footer a").filter({hasText: 'Privacy Policy'});
    await expect(privacyLink).toHaveAttribute('href','#privacy-policy');    //--> this will check if the locator element have this attribute value

});