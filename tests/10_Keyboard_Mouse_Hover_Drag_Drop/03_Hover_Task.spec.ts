import {test , expect, Locator} from '@playwright/test';

test("Hover task" , async ({page})=>{
    
    await page.goto("https://app.thetestingacademy.com/playwright/widgets/hover-menu");

    await page.getByTestId("nav-add-ons").hover();


//========================== How to check/get accessible name of locator using ariaSnapshot() method ==========================

    console.log( await page.getByRole('menuitem', {name: 'Meal'}).ariaSnapshot() );     
    //--> here we used ariaSnapshot() method on a locator " page.getByRole('menuitem', {name: 'Meal'}) "  and this returns a 
    // promise of string so we need to use await so that it can just get the string from a promise returned

    // now ariaSnapshot return a accessname name for that locator in the form of ' -Rolename "accessibleName" '
    // now in this case the HTML structure is like:
    /*    
        <a class="submenu-item" role="menuitem" href="#" data-testid="test-id-Meal">
            <span class="glyph">🍽️</span>
            Meal
        </a> 

    */

    // so the accessible name should be like "🍽️Meal"

//==============================================================================================================================

    
    // directly click on Meal option:
    // await page.getByRole('menuitem', {name: '🍽️ Meal'}).click();
    // console.log( await page.getByTestId('hover-output').innerText() );

    // Find all the options first and then click on any option:
    let add_ons_options:Locator[]  = await page.locator("//div[@data-testid='nav-add-ons']/div[@class='submenu']/a").all();

    for (const option of add_ons_options) {
        if((await option.innerText()).includes("Meal")){
            await option.click();
            // break;
        }        
    }

    console.log( await page.getByTestId('hover-output').innerText() );
});