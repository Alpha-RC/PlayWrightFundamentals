import { test, expect } from '@playwright/test';

// ============================================================================
// 1. NORMAL TEST DECLARATION
// ============================================================================

// Basic test declaration:
// test(title, callback_function)

test('has title', async ({ page }) => {
    await page.goto('https://app.vwo.com');

    await expect(page).toHaveTitle('Login - Wingify');
});

// A normal test can also contain conditional logic.

test('conditional test', async ({ page, browserName }) => {

    if (browserName === 'chromium') {
        await page.goto('https://example.com');
    }

    // The test is still declared normally.
    // The browserName condition controls which steps execute.
});

// ============================================================================
// 2. WHAT ARE TEST ANNOTATIONS?
// ============================================================================

// Test annotations provide additional instructions to Playwright
// about how a test should be handled during execution.
//
// Examples:
// test.skip()  -> Skip a test.
// test.only()  -> Run only focused tests.
// test.fail()  -> Mark a test as expected to fail.
// test.slow()  -> Allow a test more execution time.
// test.fixme() -> Skip a test because it needs fixing.


// ============================================================================
// 3. test.skip() — SKIP A TEST
// ============================================================================

// WAY 1: Skip the entire test before execution.
//
// Syntax:
// test.skip(title, callback_function)
//
// The test is declared but its callback does not execute.

test.skip('skip the entire test', async ({ page }) => {

    await page.goto('https://example.com');

    // This step will NOT execute because the test is skipped.
});


// WAY 2: Skip the current test from inside its callback.
//
// Syntax:
// test.skip()

test('skip from inside the callback', async ({ page }) => {

    test.skip();

    // The test is skipped.
    // The remaining steps will NOT execute.

    await page.goto('https://example.com');
});


// WAY 3: Skip the test based on a condition.
//
// Syntax:
// test.skip(condition, description)
//
// If the condition is TRUE:
//     The test is skipped.
//
// If the condition is FALSE:
//     The test continues normally.

test('skip conditionally', async ({ page, browserName }) => {

    test.skip(
        browserName === 'firefox',
        'This test is not supported in Firefox'
    );

    // This step executes only if the test has not been skipped.
    await page.goto('https://example.com');
});


// ============================================================================
// 4. test.only() — FOCUS ON SPECIFIC TESTS
// ============================================================================

// Syntax:
// test.only(title, callback_function)
//
// When test.only() is used, Playwright runs the focused tests
// and does not execute ordinary tests in the selected test suite.
//
// IMPORTANT:
// If multiple test.only() declarations exist, ALL focused tests
// are eligible to run. It does not mean only one test will run.

test('Login test', async ({ page }) => {
    console.log('Normal Login test');
});

test('Checkout test', async ({ page }) => {
    console.log('Normal Checkout test');
});


// Focused test 1
test.only('Focused Login test', async ({ page }) => {
    console.log('Focused Login test executed');
});


// Focused test 2
test.only('Focused Search test', async ({ page }) => {
    console.log('Focused Search test executed');
});

// Expected behavior:
// - Normal Login test: NOT executed.
// - Normal Checkout test: NOT executed.
// - Focused Login test: executed.
// - Focused Search test: executed.
//
// Note:
// test.only() is useful while debugging.
// Remove it before committing or running the full test suite.


// ============================================================================
// 5. test.fail() — DECLARE A TEST AS EXPECTED TO FAIL
// ============================================================================

// test.fail() tells Playwright that a test is expected to fail.
//
// It does NOT intentionally make the test fail.
// The test steps and assertions still execute.
//
// Expected behavior:
// - Test fails: Expected failure (XFAIL).
// - Test passes: Unexpected pass (XPASS), reported as a failure.


// WAY 1: Declare a test as expected to fail.
//
// Syntax:
// test.fail(title, callback_function)

test.fail('Known defect - login validation', async ({ page }) => {

    // Test steps execute normally.
    // If the test fails, Playwright treats the failure as expected.

    await page.goto('https://example.com');
});


// WAY 2: Declare a test as expected to fail with details.
//
// Syntax:
// test.fail(title, details, callback_function)
//
// The details object can contain additional information,
// such as an issue annotation.

test.fail(
    'Known defect - checkout validation',
    {
        annotation: {
            type: 'issue',
            description: 'JIRA-1234'
        }
    },
    async ({ page }) => {

        // Test steps execute normally.
        await page.goto('https://example.com');
    }
);


// WAY 3: Mark the current test as expected to fail.
//
// Syntax:
// test.fail()

test('expected failure without condition', async ({ page }) => {

    test.fail();

    // Test steps still execute.
    await page.goto('https://example.com');

    // Add the relevant assertions here.
});


// WAY 4: Mark the test as expected to fail based on a condition.
//
// Syntax:
// test.fail(condition, description)
//
// If the condition is TRUE:
//     The test is expected to fail.
//
// If the condition is FALSE:
//     The test is treated as a normal test.

test('expected failure in Firefox', async ({ page, browserName }) => {

    test.fail(
        browserName === 'firefox',
        'Known issue in Firefox'
    );

    // Test steps execute normally.
    await page.goto('https://example.com');

    // Add the relevant assertions here.
});


// WAY 5: Condition is always TRUE.
//
// The test is always marked as expected to fail.

test('always expected to fail', async ({ page }) => {

    test.fail(true, 'Known defect');

    // Test steps execute normally.
    await page.goto('https://example.com');
});


// WAY 6: Condition is always FALSE.
//
// The test is treated as a normal test.

test('normal test', async ({ page }) => {

    test.fail(false, 'This test is not expected to fail');

    // Test steps execute normally.
    await page.goto('https://example.com');
});

// IMPORTANT:
// test.fail() does not skip the test.
// test.skip() skips the test.
// test.fixme() skips the test because it needs fixing.


// ============================================================================
// 6. test.slow() — ALLOW MORE TIME FOR A TEST
// ============================================================================

// test.slow() marks a test as slow.
//
// It increases the test timeout to THREE TIMES the default timeout.
//
// For example:
// Default timeout = 30 seconds
// Slow test timeout = 90 seconds
//
// The actual timeout depends on the configured test timeout.


// WAY 1: Mark the test as slow.
//
// Syntax:
// test.slow()

test('slow test', async ({ page }) => {

    test.slow();

    // The test has more time to complete.
    await page.goto('https://example.com');
});


// WAY 2: Mark the test as slow based on a condition.
//
// Syntax:
// test.slow(condition, description)
//
// If the condition is TRUE:
//     The timeout is increased.
//
// If the condition is FALSE:
//     The normal timeout applies.

test('slow test in Firefox', async ({ page, browserName }) => {

    test.slow(
        browserName === 'firefox',
        'Firefox needs more time'
    );

    await page.goto('https://example.com');
});

// IMPORTANT:
// test.slow() does not skip the test.
// It does not make the test expected to fail.
// It simply allows more time for execution.


// ============================================================================
// 7. test.fixme() — SKIP A TEST THAT NEEDS FIXING
// ============================================================================

// test.fixme() marks a test as needing a fix.
//
// The test is skipped instead of being executed.
//
// Use it when a test or feature is currently broken
// and you want to revisit it later.


// WAY 1: Mark the entire test as fixme.
//
// Syntax:
// test.fixme(title, callback_function)

test.fixme('Login functionality - Way 1', async ({ page }) => {

    // None of these steps execute because the test is fixme.

    await page.goto('https://example.com');

    await expect(page).toHaveTitle('Example Domain');
});


// WAY 2: Mark the current test as fixme.
//
// Syntax:
// test.fixme()

test('Login functionality - Way 2', async ({ page }) => {

    test.fixme();

    // The test is marked as needing a fix.
    // Remaining steps do NOT execute.

    await page.goto('https://example.com');

    await expect(page).toHaveTitle('Example Domain');
});


// WAY 3: Mark the test as fixme based on a condition.
//
// Syntax:
// test.fixme(condition, description)
//
// If the condition is TRUE:
//     The test is skipped because it needs fixing.
//
// If the condition is FALSE:
//     The test continues normally.

test('Conditional fixme', async ({ page, browserName }) => {

    test.fixme(
        browserName === 'webkit',
        'Login functionality needs fixing in WebKit'
    );

    // Executes only if the test has not been marked fixme.
    await page.goto('https://example.com');

    await expect(page).toHaveTitle('Example Domain');
});


// ============================================================================
// 8. QUICK REVISION — DIFFERENCES BETWEEN ANNOTATIONS
// ============================================================================

// test.skip()
//     -> Skip the test intentionally.
//
// test.only()
//     -> Focus execution on tests marked with test.only().
//
// test.fail()
//     -> Expect the test to fail, but execute its steps.
//
// test.slow()
//     -> Increase the test timeout to three times the default.
//
// test.fixme()
//     -> Skip the test because it needs fixing.


// ============================================================================
// END OF NOTES
// ============================================================================