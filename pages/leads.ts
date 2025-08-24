import { Locator, Page, expect } from "@playwright/test";
import { PlaywrightWrapper } from "../utils/playwrightWrapper";
import { UrlConstants } from "../constants/appConstants";
import { BaseClass } from "./base";
import { HomePage } from "./home";

export class LeadsPage extends HomePage {
  constructor(page: Page) {
    super(page);
  }

  /*****************  LOCATORS TO INTERACT WITH THE LEADS PAGE ******************/

  public newButton = "//a[@title='New']";
  public searchLeadInputText = "//input[@aria-label='Search this list...']";
  public firstItemCheckBoxListView =
    "(//div[contains(@class,'slds-grid slds-grid--align-spread')]//span)[1]";
  public firstItemLinkListView =
    "(//a[@data-aura-class='forceOutputLookup'])[1]";
  public leadNameHeader = "//slot[@name='primaryField']";
  public companyNameValue =
    "//p[@title='Company']/parent::div//lightning-formatted-text";
  public firstRecordLeadName = "(//a[@data-aura-class='forceOutputLookup'])[1]";

  /* To confirm the leads page  view is list view or  */
  public intelligenceView = this.page.locator("span", {
    hasText: "Intelligence",
  });
  public listViewButton = this.page.getByRole("button", {
    name: "pipelineInspectionToListView",
  });

  /* To handle records in the table*/
  public leadlistTable = this.page.locator("tbody[data-rowgroup-body]");
  // Get all rows in the lead list table
  public leadRows = this.page.locator("tbody[data-rowgroup-body] > tr");

  /*****************  METHODS TO INTERACT WITH THE LEADS PAGE ******************/
  /*
    Navigates to the Leads page.
    */
  public async navigateToLeadsPage() {
    // Click on the App Launcher button
    await this.clickAppLauncher();
    await this.searchItemInAppLauncher("Leads");
  }

  public async searchLead(leadName: string): Promise<number> {
    if (await this.intelligenceView.isVisible()) {
      await this.listViewButton.click();
    }
    await this.click(this.searchLeadInputText, "Search Item", "TextBox");
    await this.type(this.searchLeadInputText, "Search Item", leadName);
    await this.page.keyboard.press("Enter");
    // Wait for the lead list table to be visible after search
    await this.leadlistTable.waitFor({ state: "visible" });
    // Verify that at least one row is present
    const rowCount = await this.leadRows.count();

    if (rowCount === 0) {
      throw new Error(`No records found for lead: ${leadName}`);
    }

    console.log(`Found ${rowCount} record(s) for lead: ${leadName}`);
    return rowCount;
  }
}
