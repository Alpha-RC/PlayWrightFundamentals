import {test , expect} from '@playwright/test';

test("JS Alerts" , async ({page})=>{
    
    await page.goto("https://the-internet.herokuapp.com/javascript_alerts");

    // note in case of JS dialog box of type 'alert' , 'confirm', 'prompt' 
    // then we need to register a dialog box handler BEFORE triggering these type of dialog boxes

    // 1. JS Alert:

    // below once() method will capture the alert box and send accept response to the alert box so it can be removed/closed
    // page.once('dialog' , async dialog=>{
    //     console.log('Alert Type: ' , dialog.type());
    //     console.log('Alert message' , dialog.message());
    //     expect(dialog.message()).toBe('I am a JS Alert');
    //     await dialog.accept();
    // });

    // await page.getByRole('button' , {name: "Click for JS Alert" , exact: true}).click();  //--> This will trigger the JS Alert

    // 2. JS Confirm alert:

    // page.once('dialog' , async dialog=>{
    //     console.log('Alert type:' , dialog.type());
    //     expect(dialog.type()).toBe('confirm');
    //     console.log('Alert Message', dialog.message());
    //     expect(dialog.message()).toBe('I am a JS Confirm');
    //     await dialog.accept();  //--> this will accept and close the alert box
    //     // await dialog.dismiss(); //--> this will dismiss or reject the alert box
    // });

    // await page.getByRole('button', {name: 'Click for JS Confirm', exact: true}).click();    //--> this trigger the confirm type of alert

    // 3. JS Prompt alert:

    const inputText = "Rohit";
    page.once('dialog', async dialog=>{
        expect(dialog.type()).toBe('prompt');
        expect(dialog.defaultValue()).toBe('');
        await dialog.accept(inputText);
    });

    await page.getByRole('button', {name: 'Click for JS Prompt' , exact: true}).click();
});