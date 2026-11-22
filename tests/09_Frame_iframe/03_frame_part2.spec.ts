import { Expect , Frame, FrameLocator, test } from "@playwright/test";

test('frame part 2' , async ({page}) => {
    
    await page.goto("https://selectorshub.com/iframe-scenario/");

    let frame1:FrameLocator = page.frameLocator("#pact1").first();
    let frame2:FrameLocator = page.frameLocator("#pact2");
    let frame3:FrameLocator = page.frameLocator("#pact3");

    await frame1.locator("#inp_val").fill("N");
    await frame2.locator("#jex").fill("N");
    await frame3.locator("#glaf").fill("Playwright");


})