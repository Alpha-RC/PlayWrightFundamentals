import {test , expect} from '@playwright/test';

test("Normal_Web_Table" , async ({page})=>{
    
    await page.goto("https://awesomeqa.com/webtable.html");

    // we will try to find the contact name 'Helen Bennett' on above opened webtable page and where she lives (country)

    // xpath to go to contact is: //table[@id='customers']/tbody/tr[5]/td[2]
    // problem with above xpath is its a combination of relative and absolute xpath and absolute xpath elements can be changed 
    // and this xpath will not work
    // so we need to prepare a dynamic xpath which can iterate through all the elements of webtable 

    // xpath = //table[@id='customers']/tbody/tr[5]/td[2]

    // in above xpath
    // 5 will be considered as i whose range is from 1-7 (1 is header) and value range is 2-7
    // 2 will be considered as j whose range is from 1-3

    // now in order to create a dynamic xpath we will divide the xpath like below

    const firstPart = "//table[@id='customers']/tbody/tr[";
    const secondPart = "]/td[";
    const thirdPart = "]";

    // now we need to create xpath using these above parts of xpath where 5 and 2 should be dynamic
    // so we will use for loop

    // so first we will find the number of rows and number of coloumns like below

    const rows = await page.locator("//table[@id='customers']/tbody/tr").count();
    const cols = await page.locator("//table[@id='customers']/tbody/tr[1]/th").count();

    for (let i = 2; i <= rows; i++) {
        for(let j = 1; j <= cols; j++){
            
            const dynamicXpath =   `${firstPart}${i}${secondPart}${j}${thirdPart}`;
            console.log(dynamicXpath);

            const data = await page.locator(dynamicXpath).innerText();
            console.log(data);

            if(data.includes('Helen Bennett')){
                
                const countrypath = `${dynamicXpath}/following-sibling::td`;
                const countryText = await page.locator(countrypath).innerText();
                console.log("---------");
                console.log(`${data} is in ${countryText}`);

            }
        }
    }

    //await page.pause(); //--> this will pause the executiona and will open the debugger window/playwright inspector


});