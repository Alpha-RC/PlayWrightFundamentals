import { expect, test , Locator } from '@playwright/test';

const URL = 'https://simplemaps.com/svg/country/in';

test.describe('Advance SVG element' , ()=>{

    test.beforeEach(async ({page}) => {
        await page.goto(URL);
    });

    test('find all the state using svg element' , async ({page})=>{

        const allStates: Locator[] = await page.locator("//div[@id='admin1_map_inner']//*[name()='svg']//*[name()='path' and contains(@class,'sm_state')]").all();

        for (const state of allStates) {

            const classState = await state.getAttribute('class');
            console.log(classState);

            if(classState?.includes("INMH")){
                await state.scrollIntoViewIfNeeded();
                await state.click();
            }
        }
    });

});