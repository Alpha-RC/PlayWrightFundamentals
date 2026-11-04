import {test , expect} from '@playwright/test';

test("context with options" , async ({browser})=>{

    // we can create context i.e a separate env under browser with its special parameters such as viewport, timeone and etc:
    const context = await browser.newContext({
        viewport:{width:1920, height:1080},
        locale:'fr-FR',
        timezoneId: 'Europe/Paris',
        geolocation:{latitude:48.8566, longitude:2.3522},
        permissions:['geolocation'],
    });

    const page = await context.newPage();

    await page.goto("https://app.vwo.com/#login");
    await context.close();

});

test("mobile context" , async ({browser})=>{

    // creating a object variable which will hold the context Properties for iphone
    const contextProperties_iphone = {
        viewport:{ width:375, height:667},
        userAgent:'Mozilla/5.0 (iPhone: CPU iPhone OS 14_0 like Mac OS X)',
        deviceScaleFactor:2,
        isMobile:true,
        hasTouch: true,
    }

    const context = await browser.newContext(contextProperties_iphone);
    const page = await context.newPage();
    
    await page.goto("https://app.vwo.com/#login");
    await context.close();

});