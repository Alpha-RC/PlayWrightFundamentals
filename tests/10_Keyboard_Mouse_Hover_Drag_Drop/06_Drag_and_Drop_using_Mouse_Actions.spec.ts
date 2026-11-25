import {test , expect, Locator} from '@playwright/test';

test("Darg and Drop using mouse" , async ({page})=>{
    
    await page.goto("https://app.thetestingacademy.com/playwright/widgets/dnd");

    let source:Locator = page.locator('#card-write-spec');
    const sBoxDimension = (await source.boundingBox())!;

    let target:Locator = page.locator('[data-status="review"]');
    const tBoxDimesion   = (await target.boundingBox())!;


    await page.mouse.move( sBoxDimension.x + sBoxDimension.width/2 , sBoxDimension.y + sBoxDimension.height/2);
    await page.mouse.down();
    await page.mouse.move( tBoxDimesion.x + tBoxDimesion.width/2 , tBoxDimesion.y+ tBoxDimesion.height/2, {steps:10});
    await page.mouse.up();
    

/*    

    <---------------------------------------------Browser window----------------------------------------------->
    ____________________________________________________________________________________________________________
    |                                                      |                                                    |
    |                                                      | Y                                                  |
    |                                                      |                                                    |
    |                                            __________|_____________                                       |
    |                      X                    |                        | |                                    |
    |<----------------------------------------->|     HTML Element       | | height of element                  |
    |                                           |________________________| |                                    |
    |                                           <------------------------>                                      |
    |                                                Width of element                                           |
    |                                                                                                           |
    |___________________________________________________________________________________________________________|

*/
});