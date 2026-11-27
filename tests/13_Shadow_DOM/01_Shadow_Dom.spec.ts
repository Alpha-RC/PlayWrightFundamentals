import { test, expect, Locator } from '@playwright/test'


const URL = "https://app.thetestingacademy.com/playwright/widgets/shadow-dom";


test.describe('Shadow handling', () => {


    test.beforeEach(async ({ page }) => {
        await page.goto(URL);
    });


    test('Locate shadow dom and assert visible', async ({ page }) => {

        // first shadow element on opened site:
        const card = page.getByTestId("card-account");
        await card.getByTestId("card-account-email").fill("abc@gmail.com");
        await card.getByTestId("card-account-password").fill("password123");
        await card.getByTestId("card-account-submit").click();
        expect(card.getByTestId("card-account-status")).toContainText("abc@gmail.com");

        // second shadow element on opened site:
        const cart = page.getByTestId("counter-cart");
        await cart.getByRole('button', { name: 'Increment' }).dblclick();
        expect(cart.getByTestId("counter-value")).toHaveText("5");

        // third shadow element on opened site:
        await page.getByTestId("card-inside-email").fill("abcd@gmail.com");
        await page.getByTestId("card-inside-password").fill("password1234");
        await page.getByTestId("card-inside-submit").click();
        expect(page.getByTestId("card-inside-status")).toContainText("abcd@gmail.com");

    });
})