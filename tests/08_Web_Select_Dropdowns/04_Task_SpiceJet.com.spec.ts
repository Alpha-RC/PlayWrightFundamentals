import {test , expect} from '@playwright/test';

test("Spice Jet Task" , async ({page})=>{
    
    const context = page.context();
    const cdpSession = await context.newCDPSession(page);

    await cdpSession.send('Browser.setPermission', {
        permission: {
            name: 'geolocation'
        },
        setting: 'denied',
        origin: 'https://www.spicejet.com'
    });


    await page.goto('https://www.spicejet.com/');
    console.log('Actual URL:', page.url());
    const origin = page.getByTestId('to-testID-origin').getByRole('textbox');
    await origin.click();
    await origin.pressSequentially('de');
    await page.getByTestId('to-testID-origin').getByText('Delhi', {exact:true}).click();
    
    
    const destination = page.getByTestId('to-testID-destination').getByRole('textbox');
    await destination.click();
    await destination.fill('B');
    await page.getByTestId('to-testID-destination').getByText('Bengaluru' , {exact:true}).click();

    await page.waitForTimeout(3000);

});