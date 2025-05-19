import { expect, test } from "@playwright/test";
import { LeadsPage } from "../../pages/leads";
import { HomePage } from "../../pages/home";

test.describe(`Tests on Leads page`, () => {
  let homePage: HomePage;
  let leadsPage: LeadsPage;
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    leadsPage = new LeadsPage(page);
    await homePage.navigateToLoginPage();
    await homePage.Login();
    await leadsPage.navigateToLeadsPage();
  });

  test("TC01: Verify new lead creation", async ({ page }) => {
    await leadsPage.createNewLead();
    // Add assertions to verify the lead creation
  });

  test("TC02: Verify search for Lead ", async ({ page }) => {});

  test("TC03: Verify modify on selected Lead ", async ({ page }) => {});
});
