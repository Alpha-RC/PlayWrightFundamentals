import {test , expect} from '@playwright/test';

test("Advance Drag and Drop test" , async ({page})=>{
    
    await page.goto("https://app.thetestingacademy.com/playwright/widgets/dnd");

    const todo_container = page.getByTestId('col-todo');
    const toDo1 = page.locator('#card-write-spec');

    const sourceCardDimension = await toDo1.boundingBox();  //--> this provides the position of the element 
                                                            //    it returns an option object which contains below values
                                                            //    {
                                                            //        x: number;
                                                            //        y: number;
                                                            //        width: number;
                                                            //        height: number;
                                                            //     }
    console.log('Source: ',sourceCardDimension);
    
    const in_progress_container = page.getByTestId('col-in-progress');
    
    const destinationBoxDimensions = await in_progress_container.boundingBox();
    console.log('Destination: ',destinationBoxDimensions);
    
    //--> scrollIntoViewIfNeeded() scrolls page so that he element is visible within viewport
    await toDo1.scrollIntoViewIfNeeded();
    await in_progress_container.scrollIntoViewIfNeeded();

    // dragTo() action
    await toDo1.dragTo(in_progress_container, 
        {
            // sourcePosition: {
            //     x: sourceCardDimension!.width/2 , 
            //     y: sourceCardDimension!.height/2 
            // }, 
            // targetPosition: {
            //     x: destinationBoxDimensions!.width/2,
            //     y: destinationBoxDimensions!.height/2
            // },
            // steps:10,
            scroll: 'none'
        });

    // await page.pause();
    /*
    console.log(
        "To Do:",
        await todo_container.innerHTML()    //--> It returns the current HTML Structure of that element
    );

    console.log(
        "In Progress:",
        await in_progress_container.innerHTML()
    );

    console.log(
        "Card parent:",
        await toDo1.evaluate(element => element.parentElement?.getAttribute('data-testid'))     //--> evaluate() method on a locator is used
                                                                                                //    to get info about the element 
                                                                                                //    like its parentelement 
    );
    */
    
    await page.waitForTimeout(5000);
    await expect(in_progress_container.locator('#card-write-spec')).toBeVisible();
    
});