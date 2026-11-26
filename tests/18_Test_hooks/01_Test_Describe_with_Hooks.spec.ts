import { expect, test , Locator } from "@playwright/test";

const URL = "https://www.flipkart.com/search";  //--> Declaring global variable to store URL

// test.describe can contain multiple test, in testing term it is called as test suite which will run multiple test
test.describe("Flipkart Search via SVG" , ()=>{

    // beforeEach hook: this test will run before every test run
    test.beforeEach(async ({page})=> {
        console.log("Before running each test");
        await page.goto(URL); 
    });


    //                tags: -----> we can run particular tests with the help of tags, like if we just want to run only smoke test 
    //          _______|_______    then we can run only those cases with the help of @smoke tag which need to be mention in the title of test
    //         |               |
    test("TC#1 @smoke @regression" , async ({page})=>{
        console.log("TC#1");
    });

    test("TC#2 @regression" , async ({page})=>{
        console.log("TC#2");
    });

    // afterEach() hook: this will run after each test run
    test.afterEach(async ({page}) => {
        console.log("After running each test");
    });

});