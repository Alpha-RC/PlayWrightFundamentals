import {test , expect} from '@playwright/test';

test("Keyboard Clicks" , async ({page})=>{
    
    await page.goto("https://keycode.info/");

    // Press any key/button on keyboard:
    await page.keyboard.press('A');
    await page.screenshot({path: 'A.png'});     //--> To take screenshot and it accepts a object called options with keys

    // click arrow keys:
    await page.keyboard.press('ArrowLeft');
    await page.screenshot({path: 'ArrowLeft.png'});

    // press shortcuts
    await page.keyboard.press("Shift+O");

    // hold or release key:
    await page.keyboard.down("Shift");  //--> This will press and hold Shift key of keyboard
    await page.keyboard.up("Shift");    //--> This will release the above hold shift key of keyboard
    

});