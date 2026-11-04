import {test , expect} from '@playwright/test';

test("Verfify our first case" , async ({page})=>{
    
    // page.goto() is a command in playwright, basically goto is a action which will tell page to navigate to thsi thsi url
    // this goto() function have url as a first mandatory parameter and it have second parameter called as options which is of type object(key-value pair one)
    // now this options is a optional parameter we can send this parameter depending on the requirement
    // this options parameter contains below keys:

    //  page.goto(url:string , options?:{
    //        referer?: string | undefined;
    //        signal?: AbortSignal | undefined;
    //        timeout?: number | undefined;
    //        waitUntil?: "load" | "domcontentloaded" | "networkidle" | "commit" | undefined;
    //      } | undefined ): Promise<Response | null>;
    
     page.goto( "https://app.vwo.com" , {timeout:5000 , referer: "https://app.google.com/vwo/app"} );

});