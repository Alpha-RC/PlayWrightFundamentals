import { expect, test, Locator } from "@playwright/test";
import path from "node:path";
import * as fs from "node:fs/promises";


const URL = "https://app.thetestingacademy.com/playwright/widgets/upload-download";

test.describe("File Download", () => {

    test.beforeEach(async ({ page }) => {
        page.goto(URL);
    });

    test("Download file", async ({ page }) => {

        // Step 1: Wait for the download event and trigger the download simultaneously
        const [staticDownload] = await Promise.all([

            // Promise.all() accepts an array of promises.
            // It waits until ALL promises in this array fulfill (resolve).
            // If any promise rejects, Promise.all() rejects with that error.

            page.waitForEvent("download"),
            // This returns a Promise that waits for the page's "download" event.
            // It does not trigger a download by itself.
            // It keeps waiting until a download is initiated and Playwright detects it.

            page.getByTestId("download-text").click()
            // This locates the element using its test ID and clicks it.
            // Clicking this element triggers the download on the website.
            // Since we are already waiting for the download event above,
            // Playwright can capture the download without missing the event.

        ]);

        // Step 2: Extract the filename suggested by the browser/website
        const fileName = staticDownload.suggestedFilename();

        // suggestedFilename() returns a string containing the suggested filename.
        // For example: "sample.txt", "report.pdf", or "image.png".
        // staticDownload is the Download object returned by the download event.

        // Step 3: Define the folder where we want to save the downloaded file
        const downloadFolder = path.join(process.cwd(), "output");

        // process.cwd() returns the current working directory of the Node.js process.
        // Example: C:\Users\roch0222\Documents\LearnPlayWrightFundamentals

        // path.join() combines path segments in a way suitable for the operating system.
        // So this may result in:
        // C:\Users\roch0222\Documents\LearnPlayWrightFundamentals\output

        // Step 4: Create the output folder if it does not already exist
        await fs.mkdir(downloadFolder, { recursive: true });

        // fs.mkdir() is a Node.js file-system method used to create directories.
        // recursive: true means:
        //   - Create the folder if it doesn't exist.
        //   - Do not throw an error if it already exists.
        //   - Create missing parent folders if required.

        // Step 5: Create the complete destination path, including the filename
        const downloadPath = path.join(downloadFolder, fileName);

        // This combines the output folder and the suggested filename.
        // Example:
        // C:\Users\username\Documents\LearnPlayWrightFundamentals\output\sample.txt

        // Step 6: Save the downloaded file to the destination path
        await staticDownload.saveAs(downloadPath);

        // saveAs() copies the downloaded file from Playwright's temporary download storage
        // to the location specified by downloadPath.
        // It waits for the download to complete if necessary.
        // We must provide the complete path, including the file name.

        // Step 7: Print the final saved file path in the terminal
        console.log("Downloaded file saved at:", downloadPath);
    });
    
});