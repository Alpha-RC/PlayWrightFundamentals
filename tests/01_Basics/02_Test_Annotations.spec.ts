import {test , expect} from '@playwright/test';

//===========================================================test declaration===========================================================

// Normal test declaration example without condition inside callback:
test('has title', async ( {page} )=> {

    await page.goto("https://app.vwo.com");
    await expect(page).toHaveTitle("Login - Wingify");

});

// Normal test declaration example with condition using browserName inside callback:
test('conditional', async ({page , browserName}) => {
    
    if(browserName=== 'chromium'){
        await page.goto("https://example.com");
    }

});

//======================================================================================================================================

//    =======================
//   |   test annotations:   |
//    =======================

// In Playwright, test annotations are used to provide additional information or instructions to Playwright about how a test should be handled 
// during execution.
// They help Playwright understand things such as whether a test is expected to fail, whether it should be skipped, or whether it should run 
// only under certain conditions.


//======================================================================================================================================

// 1. test.skip(string, callback_function);

test.skip('skipped entire test' , async ({page}) => {
    //this test will be skipped entirely without even executing callback function.s
});

test('skipping test intentionally', async ({page}) => {
    test.skip();   // intentionally skipping this test after callback gets executes.
});

test('skipping test based on condition' , async ({page, browserName}) => {
   
    test.skip(browserName==='firefox' , 'this test is not supported in firefox');
    //this test will be skipped if the test is running in firefox and next code i.r.page.goto() will not execute:
    await page.goto("");
});

//======================================================================================================================================

// 2. test.only(title, callback_function);

// normal test:
test('Login test', async ({ page }) => {
    console.log('Login test executed');
});

// normal test:
test('Checkout test', async ({ page }) => {
    console.log('Checkout test executed');
});


// focused test:
test.only('focused test among all other tests' , async ({page}) => {
    // runs only this test,
    // means when we use test.only() anywhere in the code where multiple tests are declared such as at line number 3, 9 and 23 above this test
    // then those test will be ignored and will not be executed and if there is a test with test.skip() such as at line 15 above then that test
    // will be marked as skipped only as that test is skipped intentionally from the execution.
    // so final result is test as line 3 9 and 23 will be marked as ignored and test at 15 will be marked as skipped.
});

test.only('Login_test', async ({ page }) => {
    console.log('Login test executed');
});

test.only('Search test', async ({ page }) => {
    console.log('Search test executed');
});

// in above 5 tests only focused tests will execute and first 2 normal tests will not be execute/ will be ignored.

//======================================================================================================================================


// 3. test.fail(string, callback_function);  --> Declare a test expected to fail
test.fail('expected to fail' , async ({page}) => {
    // test.fail will tell playwright that this test is expected to fail at the end

    // test steps
});

// Declare a test expected to fail with additional details:
test.fail( 'this test is expected to fail', { annotation: { type:'issue',description:'JIRA-1234' } },  async ({page}) => {
    // this test will fail with additional details provided in second argument of this test.fail().

    // test steps
});

// test.fail() without arguments and under callback function:
test('test expected to fail', async ({page}) => {
    test.fail();    // this will tell playwright that this test is expected to fail

    // test steps
});

// test.fail() with a condition and under callback function:
test('expected to fail with condition' , async ({page , browserName}) => {
    test.fail(browserName==='firefox', 'firefox is not supported for this test');
    // if browserName==='firefox' this condition gets pass/true then it will tell playwright that this test is expected to fail
    // and after executing all the steps If the test/assertion fails, Playwright reports it as an expected failure, typically shown as XFAIL
    // and suppose if test/assertion got pass then Playwright reports an unexpected pass, typically shown as XPASS

    // and if this browserName==='firefox' condition itself gets fail/false then the the playwright will not mark this test as expected to fail
    // and if assertion gets pass test is passed and if assertion gets fail then test will be passed there will not be any marking for this test
    // at all like this test is expected to fail or something cause test.fail() condition to mark this test got failed
    
    // so the intention of test.fail(condition , description:string) is to mark the test to expected as failed or not
    // this will not fail the case intentionally
});

// test.fail() with a condition that is always true and under callback function:
test('expected to_fail', async ({ page }) => {
    test.fail(true, 'Known defect');

    // Test steps
});

// test.fail() with a condition that is always false and under callback function:
test('normal test', async ({ page }) => {
    test.fail(false, 'Not currently expected to fail');

    // Test steps
});

//======================================================================================================================================

// 4. test.slow();
test('slow test', async ({page}) => {
    test.slow();
});

// with condition like test.flow(condition,description);
test('Login_test_1', async ({ page, browserName }) => {

    test.slow(browserName === 'firefox', 'Firefox needs more time');
    await page.goto('https://example.com');

});

//======================================================================================================================================


// 5. test.fixme();

// test.fixme(title, callback)
test.fixme('Login functionality - Way 1', async ({ page }) => {

    await page.goto('https://example.com');
    // This step will NOT execute because the test is marked fixme.

    await expect(page).toHaveTitle('Example Domain');
});


// test.fixme() inside the test callback
test('Login functionality - Way 2', async ({ page }) => {

    test.fixme(); 
    // Marks the test as needing a fix.
    // Stops execution of the remaining test steps.

    await page.goto('https://example.com');
    // This step will NOT execute.

    await expect(page).toHaveTitle('Example Domain');
    // This assertion will NOT execute.
});


// test.fixme(condition, description) inside the test callback
test('Login functionality - Conditional fixme', async ({ page, browserName }) => {

    test.fixme(
        browserName === 'webkit',
        'Login functionality needs fixing in WebKit'
    );
    // If browserName is 'webkit' (condition is true):
    // The test is marked fixme; remaining steps do NOT execute.
    //
    // If browserName is not 'webkit' (condition is false):
    // The test continues normally.

    await page.goto('https://example.com');

    await expect(page).toHaveTitle('Example Domain');
});

//======================================================================================================================================
