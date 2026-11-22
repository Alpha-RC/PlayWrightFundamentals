import {test , expect, FrameLocator} from '@playwright/test';

test("iframe" , async ({page})=>{
    
    await page.goto("https://app.thetestingacademy.com/playwright/frames/");

    const vehicalFrame:FrameLocator  = page.frameLocator("#frame-one");
    
    await vehicalFrame.locator("#RESULT_TextField-1").fill("Honda CB 350RS");
    await vehicalFrame.locator("#RESULT_TextField-2").fill("Rohit Chillal");
    await vehicalFrame.locator("#RESULT_TextField-3").fill("MH-12-AB-1234");
    await vehicalFrame.locator("#RESULT_RadioButton-1").selectOption("Two-wheeler");
    await vehicalFrame.locator("#RESULT_TextField-4").fill("2025");

    await vehicalFrame.getByRole('button', {name: 'Submit registration', exact: true}).click();
    // await page.getByTestId('vehicle-submit').click();

    let output = await vehicalFrame.locator("#vehicle-output").innerText();
    console.log(output);
    
});