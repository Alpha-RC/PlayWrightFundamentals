import { expect, test, Locator } from "@playwright/test";
import path from "node:path";

const URL = "https://www.patternfly.org/components/file-upload/multiple-file-upload/";


test.describe("Upload multiple files", () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(URL);
    });

    test("Upload 2 files", async ({ page }) => {

        const file1 = path.join(__dirname, 'ironman.jpg');
        const file2 = path.join(__dirname, 'messi.jpg');

        const fileUploadInputElement = page.locator("//div[@class = 'pf-v6-c-multiple-file-upload']//input[@type='file']");
        await fileUploadInputElement.setInputFiles([file1, file2]);

        // await page.pause();
    })

})