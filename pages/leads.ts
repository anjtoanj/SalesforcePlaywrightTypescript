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

  /* To handle records in the table*/
  public leadlistTable = "//table[@aria-label='Recently Viewed']";
  public leadListTableRecord =
    "//table[@aria-label='Recently Viewed']/tbody/tr";
  //Convert XPath string to a Locator for table
  public leadlistTableBodyRecordLocator(): Locator {
    return this.page.locator(this.leadListTableRecord);
  }

  /*****************  METHODS TO INTERACT WITH THE LEADS PAGE ******************/
  /*
    Navigates to the Leads page.
    */
  public async navigateToLeadsPage() {
    // Click on the App Launcher button
    await this.clickAppLauncher();
    await this.searchItemInAppLauncher("Leads");
  }

  public async searchLead(leadName: string) {
    await this.click(this.searchLeadInputText, "Search Item", "TextBox");
    await this.type(this.searchLeadInputText, "Search Item", leadName);
    await this.page.keyboard.press("Enter");
    // Wait for the lead list table to be visible after search
    await this.page.waitForSelector(this.leadlistTable, {
      state: "visible",
      timeout: 50000,
    });
  }

  public async getLeadRowCount(timeout: number = 10000): Promise<number> {
    // Wait for the rows in teh table to be visible before counting rows
    await this.page.waitForSelector(this.leadListTableRecord, {
      state: "visible",
      timeout,
    });
    // Count the number of rows in the table body
    const rows = this.leadlistTableBodyRecordLocator();
    await this.page.waitForTimeout(2000); // Wait for 5 seconds for all rows to be counted -without this wait the row count is wrongly counted

    let rowCount = await rows.count();
    console.log(`Number of lead rows found: ${rowCount}`);
    return rowCount;
  }

  public async createNewLead() {}
}
