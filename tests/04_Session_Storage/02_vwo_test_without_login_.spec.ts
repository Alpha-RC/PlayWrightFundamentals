import {test , expect} from '@playwright/test';


test.use(
    {storageState: "./user-session.json"}
);

test("go directly to dashboard" , async ({page})=>{
    await page.goto("https://app.vwo.com/#/dashboard");
});