import { Page, expect } from "@playwright/test";
import { PlaywrightWrapper } from "../utils/playwrightWrapper";
import { UrlConstants } from "../constants/appConstants";
import { Users } from "../constants/users";

export class BaseClass extends PlaywrightWrapper {
  static pageUrl = UrlConstants.SF_URL;

  constructor(page: Page) {
    // Replace PlaywrightWrapper with a concrete subclass, e.g., ConcretePlaywrightWrapper
    super(page);
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
  public async Login() {
    await this.type(
      "//input[@name='username']",
      "UserName",
      Users.adminUserName
    );
    await this.type("//input[@name='pw']", "Password", Users.adminPassword);
    await this.click("//input[@name='Login']", "Login", "Button");
  }
}
