import { Page } from "@playwright/test";
import { PlaywrightWrapper } from "../utils/playwrightWrapper";
import { UrlConstants } from "../constants/appConstants";
import { Users } from "../constants/users";

export class BaseClass extends PlaywrightWrapper {
  static pageUrl = UrlConstants.SF_URL;

  //Locators
  private loginButton;
  private userName;
  private password;

  constructor(page: Page) {
    super(page);
    this.userName = page.locator("input[name='username']");
    this.password = page.locator("input[name='pw']");
    this.loginButton = page.locator("input[name='Login']");
  }

  /*
    Navigates to the login page.
    */

  public async navigateToLoginPage() {
    await this.loadApp(BaseClass.pageUrl);
  }

  /*
    Performs login with predefined credentials. 
    */
  public async Login(): Promise<void> {
    if (!Users.adminUserName || !Users.adminPassword) {
      throw new Error("Admin credentials are missing in environment variables");
    }

    await this.userName.fill(Users.adminUserName);
    await this.password.fill(Users.adminPassword);
    await this.loginButton.click();
  }

  /*
    Waits for the next page (new tab or window) to load completely.
    Pass the Page object of the new page.
  */
  public async waitForPageLoadComplete(newPage: Page) {
    await newPage.waitForLoadState("load");
    await newPage.waitForLoadState("domcontentloaded");
    await newPage.waitForLoadState("networkidle");
  }
}
