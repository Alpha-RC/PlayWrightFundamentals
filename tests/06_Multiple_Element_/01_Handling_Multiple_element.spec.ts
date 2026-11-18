import {test , expect, Locator} from '@playwright/test';

test("handling_multiple_element" , async ({page})=>{
    
    await page.goto("https://app.thetestingacademy.com/playwright/multiple_element_filter");

    const rightPanelLinkTexts:string[] = await page.locator("a.list-group-item").allInnerTexts();   //--> here locator will return multiple
                                                                                                    //    elements and allInnerText will fetch
                                                                                                    //    all the text present under those locators elements

    console.log(rightPanelLinkTexts.length);    //--> printing the total number of elements in above array of strings
    
    for (const linkText of rightPanelLinkTexts) {   //--> for of will point to the value of each element in array here and we can print it

        console.log(linkText);

        if(linkText === "Forgotten Password"){                  //--> here we are chekcing if string equal to Forgotten Password
            await page.getByRole('link' , {name: linkText}).first().click();     // --> then click on this element using getByText locator
        }
    }

    const rightPanelLinks:Locator[] = await page.locator("a.list-group-item").all();    //--> this will return all the locators so we need to
                                                                                        //    store it under a varibale of type Locator[] array
    // here we are looping through each element and getting one of the attribute value fo that element/tag
    for (const eachLink of rightPanelLinks) {
        console.log(await eachLink.getAttribute("href"));
    }

    await page.waitForTimeout(5000);

});