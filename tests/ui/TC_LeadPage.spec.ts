import { test, expect } from "../../pages/test-fixture";
import { LeadsPage } from "../../pages/leads";
import { HomePage } from "../../pages/home";

test.describe(`Tests on Leads page`, () => {
  let homePage: HomePage;
  let leadsPage: LeadsPage;

  test.beforeEach(async ({ loggedInPage }) => {
    homePage = new HomePage(loggedInPage);
    leadsPage = new LeadsPage(loggedInPage);
  });

  test.skip("TC01: Verify new lead creation functionality", async ({
    loggedInPage,
  }) => {
    await leadsPage.createNewLead();
    // Add assertions to verify the lead creation
  });

  test("TC02: Verify search for Lead functionality", async ({
    loggedInPage,
  }, testInfo) => {
    await leadsPage.searchLead("Anju");
    await leadsPage.click(
      leadsPage.firstRecordLeadName,
      "Click first Lead record from search result",
      "ListView"
    );
    // Add assertions to verify if the lead is found and navigated to the lead details page
    expect(
      await loggedInPage.locator(leadsPage.leadNameHeader).textContent()
    ).toContain("Anju");
    // await expect(page.locator(leadsPage.companyNameValue)).toContainText(
    //   "Playwright API test"
    // );

    await testInfo.attach("New Lead Header from UI", {
      body: `Searched Lead Header: ${leadsPage.leadNameHeader}`,
      contentType: "text/plain",
    });
  });
});
