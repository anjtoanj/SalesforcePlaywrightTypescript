import { Page, Locator, Browser, BrowserContext } from "@playwright/test";
import { time } from "console";
import { loadEnvFile } from "process";

export class PlaywrightWrapper {
  protected static browser: Browser;
  protected static context: BrowserContext;
  protected page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  /*
    This function loads the application
    @url: The url of the application to be loaded
    */

  async loadApp(url: string) {
    try {
      console.log(`Loading URL: ${url}`);
      await this.page.goto(url, { timeout: 6000 });
      console.log(`URL loaded successfully: ${url}`);
    } catch (error) {
      console.error(`Error loading the page:`, error);
      throw error; // re-throw if you want the test to fail
    }
  }

  /*
    This function returns the current URL of the page
    */
  async getUrl(): Promise<string> {
    const currentUrl = this.page.url();
    console.log(`Current URL: ${currentUrl}`);
    return currentUrl;
  }

  /*
    This method waits for a URL with a custom error message if it's not detected within the timeout.
    @param url - The URL to wait for.
    @param timeout - The timeout in milliseconds.
    */

  async waitForURLtoLoad(url: string, timeout: number) {
    await this.page.waitForURL(url, { timeout: timeout });
  }

  // Add this to your PlaywrightWrapper or relevant base class
  public getPage() {
    return this.page;
  }
  /*
    This method waits for a element to be visible, if it's not detected wtihin specific time then will timeout.
    @param element - The element to wait for.
    @param timeout - The timeout in milliseconds.
    */

  async waitForelement(locator: string, timeout: number) {
    await this.page.waitForSelector(locator, {
      state: "visible",
      timeout: timeout,
    });
  }

  /*
    This function types on the given element textbox after clearing the existing text
    @page: The page object to be passed
    @locator: The element locator
    @name: Name of the element
    @data: Data to be typed
    */

  async type(locator: string, name: string, data: string) {
    await this.page.locator(locator).clear();
    await this.page.locator(locator).fill(data, { timeout: 5000 });
  }

  /**
   * Gets the text content of an element specified by the selector.
   * @param errorMessage - The selector for the error message element.
   * @returns The text content of the element.
   */
  public async getText(locator: string): Promise<string> {
    await this.page.waitForSelector(locator, { state: "visible" });
    const element = await this.page.$(locator);
    const text = await element?.textContent();
    return text?.trim() || "";
  }

  /*
    This function types on the given element textbox and press <ENTER> after clearing the existing text
    @page: The page object to be passed
    @locator: The element locator
    @name: Name of the element
    @data: Data to be typed
    */

  async typeandEnter(locator: string, name: string, data: string) {
    console.log(`Entering ${name} in the textbox: ${data}`);
    const element = this.page.locator(locator);
    await element.clear(); // fixed: added parentheses
    await element.fill(data);
    await this.page.keyboard.press("Enter");
  }

  /*
    This function clicks on the given element textbox
    @page: The page object to be passed
    @locator: The element locator
    @name: Name of the element
    */
  async click(locator: string, name: string, type: string) {
    console.log(`Clicking the ${type} ${name}`);
    await this.page.locator(locator).click({ timeout: 10000 });
  }

  /*
    This function checks a checkbox if it is not already checked
    @selector: The selector for the checkbox element
    */
  public async checkCheckbox(locator: string) {
    const checkbox = await this.page.locator(locator);
    if (!(await checkbox.isChecked())) {
      await checkbox.check();
    }
  }

  /*
    Hook to capture a screenshot if the test fails- TO implement
    */

  // Remove it from PlaywrightWrapper.
  // Move it to a spec file or a separate global setup file, e.g., global-hooks.ts:

  // static afterEachHook() {
  //   test.afterEach(async ({ page }, testInfo) => {
  //     if (testInfo.status !== "passed") {
  //       const screenshotPath = `test-results/${testInfo.title.replace(
  //         /[^a-zA-Z0-9]/g,
  //         "_",
  //       )}.png`;
  //       await page.screenshot({ path: screenshotPath, fullPage: true });
  //       console.log(`Screenshot captured: ${screenshotPath}`);
  //     }
  //   });
  // }
}
