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

  test.skip("TC01: Verify new lead creation functionality", async ({
    page,
  }) => {
    await leadsPage.createNewLead();
    // Add assertions to verify the lead creation
  });

  test("TC02: Verify search for Lead functionality", async ({ page }) => {
    await leadsPage.searchLead("Anju");

    // Add assertions to verify if the lead is found and navigated to the lead details page
    expect(
      await page.locator(leadsPage.leadNameHeader).textContent()
    ).toContain("Anju");
    expect(await page.locator(leadsPage.companyName).textContent()).toContain(
      "Playwright API test"
    );
  });

  test.skip("TC03: Verify modify on selected Lead functionality", async ({
    page,
  }) => {});
});
