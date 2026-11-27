import { expect, test, Locator } from "@playwright/test";
import { log } from "console";
import path from 'path';

const URL = "https://the-internet.herokuapp.com/upload";

test.describe("File upload", () => {


    test.beforeEach(async ({ page }) => {
        await page.goto(URL);
    });

    test("Upload normal file", async ({ page }) => {

        const filePath = path.join(__dirname, 'test1.txt');
        log(filePath);

        await page.setInputFiles("#file-upload", filePath);
        await page.locator("#file-submit").click();

        expect(page.locator("h3")).toHaveText("File Uploaded!");
        expect(page.locator("#uploaded-files")).toHaveText("test1.txt");
    });


});