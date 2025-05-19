import { Page, expect } from "@playwright/test";
import { PlaywrightWrapper } from "../utils/playwrightWrapper";
import { UrlConstants } from "../constants/appConstants";
import { BaseClass } from "./base";
import { HomePage } from "./home";

export class LeadsPage extends HomePage {
  constructor(page: Page) {
    super(page);
  }
  //Locators defined for the Leads page

  public async navigateToLeadsPage() {
    // Click on the App Launcher button
    await this.clickAppLauncher();
    await this.searchItemInAppLauncher("Leads");
  }

  public async searchLead() {}

  public async createNewLead() {}
}
