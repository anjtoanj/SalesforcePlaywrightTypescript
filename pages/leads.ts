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
  public newButton = "//a[@title='New']";
  public searchLeadInputText = "//input[@aria-label='Search this list...']";
  public firstItemCheckBoxListView =
    "(//div[contains(@class,'slds-grid slds-grid--align-spread')]//span)[1]";
  public firstItemLinkListView =
    "(//a[@data-aura-class='forceOutputLookup'])[1]";
  public leadNameHeader = "//slot[@name='primaryField'];";
  public companyName = "//p[@title='Company']";

  public async navigateToLeadsPage() {
    // Click on the App Launcher button
    await this.clickAppLauncher();
    await this.searchItemInAppLauncher("Leads");
  }

  public async searchLead(leadName: string) {
    await this.click(this.searchLeadInputText, "Search Item", "TextBox");
    await this.type(this.searchLeadInputText, "Search Item", leadName);
    await this.page.keyboard.press("Enter");
    // Wait for the search results to load
    await this.page.waitForTimeout(2000);
  }

  public async createNewLead() {}
}
