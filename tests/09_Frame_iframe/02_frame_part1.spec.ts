import {test , expect, FrameLocator, Frame, Locator} from '@playwright/test';

test("frames" , async ({page})=>{
    
    await page.goto("https://app.thetestingacademy.com/playwright/frames/multi-frames");
    
    // find all the frames present:
    const allFrames:Locator[] = await page.locator("//frame").all();
    console.log('total number of frames: ', allFrames.length);

    for (const frame of allFrames) {
        console.log(await frame.getAttribute('name'), ': ', await frame.getAttribute('src'));
    }

    // Find main frame:
    let mainFrame:FrameLocator = page.frameLocator("//frame[@name='main']");
    const headerText = await mainFrame.locator("h2").innerText();
    console.log(headerText);
    
    // Find footer frame:
    let footerFrame = page.frameLocator("//frame[@name='footer']");
    expect(footerFrame.locator('//div[@class = "row"]//strong[text()="The Testing Academy"]')).toBeVisible();

    // Find side frame:
    let sideFrame:FrameLocator = page.frameLocator('//frame[@name="side"]');
    await sideFrame.getByTestId('side-link-registration').click(); 

});