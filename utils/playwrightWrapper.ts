import{Page, Locator, test, expect,Browser, BrowserContext} from "@playwright/test";
import { loadEnvFile } from "process";


export abstract class PlaywrightWrapper {

    protected static browser: Browser;
    protected static context: BrowserContext;
    protected page: Page;
    constructor(page:Page) {
        this.page = page;
    }

     /*
    This function loads the application
    @url: The url of the application to be loaded
    */

    async loadApp(url: string){
        try {
                await test.step(`The url: ${url} is loaded `, async()=>{
                    await this.page.goto(url,{timeout:6000});
                });
        } catch (error) {

                console.error(`Error loading the page:`, error);
        }
    }

    /*
    This function returns the current URL of the page
    */
    async getUrl(): Promise<string> {
        return await test.step(`Fetching the current URL`, async () => {
            const currentUrl = this.page.url();
            console.log(`Current URL: ${currentUrl}`);
            return currentUrl;
        });
    }
    /*
    This method waits for a URL with a custom error message if it's not detected within the timeout.
    @param url - The URL to wait for.
    @param timeout - The timeout in milliseconds.
    */
   
    async waitForURLtoLoad(url: string, timeout: number) {
        await this.page.waitForURL(url, { timeout: timeout });
      }
    

     /*
    This function types on the given element textbox after clearing the existing text
    @page: The page object to be passed
    @locator: The element locator
    @name: Name of the element
    @data: Data to be typed
    */

    async type(locator:string, name:string, data:string){
        await test.step(`Entered ${name} in the textbox : ${data} `, async()=>{
            await this.page.locator(locator).clear;
            await this.page.locator(locator).fill(data);
        })
    }

     /*
    This function types on the given element textbox and press <ENTER> after clearing the existing text
    @page: The page object to be passed
    @locator: The element locator
    @name: Name of the element
    @data: Data to be typed
    */

    async typeandEnter(locator:string, name:string, data:string){
        await test.step(`Entered ${name} in the textbox : ${data}`,async()=>{
            await this.page.locator(locator).clear;
            await this.page.locator(locator).fill(data);
            await this.page.keyboard.press("Enter");
        })
    }

      /*
    This function clicks on the given element textbox
    @page: The page object to be passed
    @locator: The element locator
    @name: Name of the element
    */
    async click(locator: string, name: string, type: string) {
        await test.step(`The ${type} ${name} clicked`, async () => {
            await this.page.locator(locator).click();
        }) 
    }


     /*
    Hook to capture a screenshot if the test fails
    */
    static afterEachHook() {
        test.afterEach(async ({ page }, testInfo) => {
            if (testInfo.status !== 'passed') {
                const screenshotPath = `test-results/${testInfo.title.replace(/[^a-zA-Z0-9]/g, '_')}.png`;
                await page.screenshot({ path: screenshotPath, fullPage: true });
                console.log(`Screenshot captured: ${screenshotPath}`);
            }
        });
    }


}