import { test, expect, Locator } from "@playwright/test";

const URL = "https://app.thetestingacademy.com/playwright/widgets/scroll";

test.describe("Lazy load", () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(URL);  // Open the webpage before every test
    });

    test("Scroll until lazy load elements are loaded", async ({ page }) => {

        const ulElement: Locator = page.getByTestId("lazy-list"); 
        // Locate the parent UL element containing the dynamically loaded list items

        await ulElement.scrollIntoViewIfNeeded();
        // Scroll the UL into the viewport if it is not already visible

        const listItems: Locator = ulElement.locator("//li[contains(@data-testid, 'lazy-item-')]");
        // Locate all LI elements whose data-testid contains 'lazy-item-'
        // Locator is dynamic, so it will match newly loaded LI elements as well

        await listItems.first().waitFor({ state: "visible" });
        // Wait until the first list item becomes visible before continuing

        let currentCount = await listItems.count();
        // Get the current number of loaded LI elements (initially 10)

        console.log("Initial loaded list count:", currentCount);

        let previousCount = 0;
        // Stores the item count from the previous iteration
        // Initially 0, so the while loop can start

        while (currentCount > previousCount) {
            // Continue looping as long as the current item count is greater
            // than the previous count (meaning items were loaded)

            previousCount = currentCount;
            // Store the current count before triggering the next lazy load
            // Example: previousCount = 10

            await listItems.last().scrollIntoViewIfNeeded();
            // Scroll to the last currently loaded LI element
            // This scrolling may trigger the webpage to load more items

            await expect.poll(
                async () => await listItems.count(),
                { timeout: 10000 }
            ).toBeGreaterThan(previousCount).catch(() => {
                // expect.poll repeatedly checks the current LI count
                // until it becomes greater than previousCount or times out

                console.log("No more items loaded. Reached the end.");
                // If the count does not increase within 10 seconds,
                // consider that we have reached the end of the list
            });

            currentCount = await listItems.count();
            // Get the latest item count after polling finishes
            // Example: 10 -> 20 -> 30

            console.log("Current list count:", currentCount);
        }

        console.log("Final count of list:", currentCount);
        // Print the total number of LI elements loaded at the end

    });

});