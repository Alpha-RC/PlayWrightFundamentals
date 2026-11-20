import {test , expect} from '@playwright/test';

test("Web Tabl with pagination example" , async ({page})=>{
    
    await page.goto("https://app.thetestingacademy.com/playwright/tables/webtable");

//======================================================================================================================================== 
    
    /*
    // finding the specific rown in a table:
    const PriyaKapoorRow = page.locator('tbody[data-testid="employees-tbody"] tr').filter({hasText: 'Priya Kapoor'});
    
    // finding the td values using above row
    const PriyasEmailId  = await PriyaKapoorRow.locator('td[data-col="email"]').innerText();
    console.log(PriyasEmailId);
    
    const priyasCountry  = await PriyaKapoorRow.locator('td[data-col="country"]').innerText();
    console.log(priyasCountry);

    // above approach will work when there is no pagination but in this case as we have pagination and if we want to find the 
    // names which are on second or third or on next pages then we need to go through a loop and try to find the names and other details

    */

//========================================================================================================================================

    let requestedName =  "Camila Lopez";    //--> this name is present on 3rd page so we need below approach to find the details we want:
    let row;
    while (true) {
        // now as condition is true for this loop it will loop for infinite times so we need to decide from which point we need to
        // exit from the loop

        // now we need to find the row for the requested name
        row  = page.locator('tbody[data-testid="employees-tbody"] tr').filter({hasText: requestedName});
        // so this abve locator will be the row of requestd name but due to pagination requestedName can be present at any page
        
        // so at first we need to check if we found the row on 1st page only then we dont need to click on next button and then we need
        // to exit from the loop like below:
        
        if(await row.count() > 0){

            // as requetsed name row is found then we can exit from loop
            break;
        }
        
        // but if row is not present at 1st page then we need to find it on next available pages
        // and as it is present at 3rd page on opened site we need to click on next button untill we found the row 
        // also we need to check the state of next button if its disabled or enabled while clicking on next button 
        // still not find then again need to click on next button,
        // we need to click on this next button until we get the row or it gets disable
        else{
            // so we need to write code in else block condition here as row is not present on 1st page condition
            //  so we will find the next button locator first like below and click on it
            
            const nextButton = page.getByTestId('next-page');

            if (await nextButton.isDisabled()) {
                throw new Error("Row not found for requested name");
            }
            await nextButton.click();

        }

    }


        // finding the td values using above row

        const Role = await row.locator('td[data-col="role"]').innerText();
        console.log(`Role of ${requestedName} is : ${Role}`);

        const EmailId  = await row.locator('td[data-col="email"]').innerText();
        console.log(`Email Id of ${requestedName} is : ${EmailId}`);
    
        const Country  = await row.locator('td[data-col="country"]').innerText();
        console.log(`${requestedName} lives in ${Country}`);

        await page.waitForTimeout(5000);



        // another way using for loop:

        let requestedName2 = "";
        let reqrow

});