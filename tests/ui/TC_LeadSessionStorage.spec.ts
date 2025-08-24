import { test, expect } from "@playwright/test";
import { LeadsPage } from "../../pages/leads";

// Parameterized test data
const leadSearchTests = [
  { name: "Grayson Heaney", description: "full name" },
  { name: "Grayson", description: "partial name" },
];

test.describe("Tests on Leads page", () => {
  let leadsPage: LeadsPage;

  // Initialize LeadsPage before each test
  test.beforeEach(async ({ page }) => {
    leadsPage = new LeadsPage(page);
    // Navigate to Leads page once per test
    await leadsPage.navigateToLeadsPage();
  });

  // Parameterized search tests
  for (const testData of leadSearchTests) {
    test(`Verify search for Lead with ${testData.description}`, async () => {
      const rowCount = await leadsPage.searchLead(testData.name);
      expect(rowCount).toBeGreaterThan(0);
    });
  }
});
