import { Page, expect } from "@playwright/test";
import { PlaywrightWrapper } from "../utils/playwrightWrapper";
import { UrlConstants } from "../constants/appConstants";
import { BaseClass } from "./base";

export class LoginClass extends BaseClass {
  constructor(page: Page) {
    super(page);
  }

  // Locators defined for the login page
  public error = "#error";
  public userNameField = "//input[@name='username']";
  public passwordField = "//input[@name='pw']";
  public loginButton = "//input[@name='Login']";

  // Performs login validations with predefined credentials.

  public async LoginValidation(username: string, password: string) {
    await this.type(this.userNameField, "UserName", username);
    await this.type(this.passwordField, "Password", password);
    await this.click(this.loginButton, "Login", "Button");
  }

  // Returns the error message on the login page
  public async VerifyTextMessage(): Promise<string> {
    // Get the error message
    const errorMessage = await this.getText(this.error);
    console.log(`Error message: ${errorMessage}`);
    return errorMessage;
  }
}
