import { Page, expect } from "@playwright/test";
import { PlaywrightWrapper } from "../utils/playwrightWrapper";
import { UrlConstants } from "../constants/appConstants";
import { Users } from "../constants/users";

export class BaseClass extends PlaywrightWrapper {
  static pageUrl = UrlConstants.SF_URL;

  //Locators
  public loginButton = "//input[@name='Login']";
  public userName = "//input[@name='username']";
  public password = "//input[@name='pw']";

  constructor(page: Page) {
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
    await this.type(this.userName, "UserName", Users.adminUserName);
    await this.type(this.password, "Password", Users.adminPassword);
    await this.click(this.loginButton, "Login", "Button");
  }
}
