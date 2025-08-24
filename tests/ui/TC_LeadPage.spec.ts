import { test, expect } from "../../pages/test-fixture";
import { LeadsPage } from "../../pages/leads";
import { HomePage } from "../../pages/home";

test.describe(`Tests on Leads page`, () => {
  let homePage: HomePage;
  let leadsPage: LeadsPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    leadsPage = new LeadsPage(page);
  });

  test("TC01: Verify search for Lead functionality", async ({
    loggedInPage,
  }, testInfo) => {
    await leadsPage.navigateToLeadsPage();
    const rowCount = await leadsPage.searchLead("Grayson Heaney");
    expect(rowCount).toBeGreaterThan(0);
  });

  test("TC02: Verify search for Lead functionality", async ({
    loggedInPage,
  }, testInfo) => {
    await leadsPage.navigateToLeadsPage();
    const rowCount = await leadsPage.searchLead("Grayson Heaney");
    expect(rowCount).toBeGreaterThan(0);
  });
});
