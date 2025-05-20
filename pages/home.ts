import { Page, expect } from "@playwright/test";
import { PlaywrightWrapper } from "../utils/playwrightWrapper";
import { BaseClass } from "./base";

export class HomePage extends BaseClass {
  constructor(page: Page) {
    super(page);
  }

  // Locators defined for the Home page
  public appLauncherButton = 'button[title="App Launcher"]';
  public searchItem = "//input[@placeholder='Search apps and items...']";

  /*
    Navigates to the App Launcher button.
    */
  async clickAppLauncher() {
    await this.click(this.appLauncherButton, "App Launcher", "Button");
  }

  async searchItemInAppLauncher(item: string) {
    await this.type(this.searchItem, "Search Item in App Launcher", item);
    await this.page.keyboard.press("Enter");
    await this.page.waitForTimeout(1000); // Wait for 1 second to allow the search results to load
    await this.page.keyboard.press("Enter");
  }

  async clickCreate() {
    await this.click(
      "//a[@title='Create Menu']",
      "Create Users, Email template, Flow etc ",
      "Button"
    );
  }

  async createSingleUser() {
    await this.click(
      'a[title="Users"]',
      "Create Single User",
      "Dropdown option"
    );
  }

  async createMultipleUsers() {
    await this.click(
      'a[title="Multiple Users"]',
      "Create Multiple Users",
      "Dropdown option"
    );
  }
  async createCustomObjectr() {
    await this.click(
      'a[title="Custom Object"]',
      "Create Custom Object",
      "Dropdown option"
    );
  }

  async createEmailTemplate() {
    await this.click(
      'a[title="Email Template"]',
      "Create Email Template",
      "Dropdown option"
    );
  }

  async createFlow() {
    await this.click('a[title="Flow"]', "Create Flow", "Dropdown option");
  }
}
