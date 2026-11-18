import {test , expect} from '@playwright/test';

test("Student_login_Task" , async ({page})=>{
    
    await page.goto("https://app.thetestingacademy.com/playwright/multiple_element_filter");

    await page.getByRole('textbox' , {name: 'Email Address'}).fill('abcd@gmail.com');
    await page.getByRole('textbox' , {name: 'Password'}).fill('password123');
    await page.getByRole('checkbox' , {name: 'Remember me'}).check();

    await page.getByRole('button' , {name: 'Login to Practice Account'}).click();

    console.log(page.url());

    await expect(page).toHaveURL(/login-success/);
});