import { test, expect } from "../../pages/test-fixture";
import { LeadsPage } from "../../pages/leads";
import { HomePage } from "../../pages/home";

test.describe.configure({ mode: "serial" });

test.describe(`Tests on Leads page`, () => {
  let homePage: HomePage;
  let leadsPage: LeadsPage;

  // Setup before each test
  test.beforeEach(async ({ loggedInPage }) => {
    homePage = new HomePage(loggedInPage);
    leadsPage = new LeadsPage(loggedInPage);
  });

  test("TC01: Verify search for Lead functionality", async () => {
    await leadsPage.navigateToLeadsPage();
    //24/08/2025 - SearchLead not working here with loggedinfixture. fix it later
    const rowCount = await leadsPage.searchLead("Grayson");
    expect(rowCount).toBeGreaterThan(0);
  });

  test("TC02: Verify search for Lead functionality", async () => {
    await leadsPage.navigateToLeadsPage();
    const rowCount = await leadsPage.searchLead("Hello Stamm");
    expect(rowCount).toBeGreaterThan(0);
  });
});
