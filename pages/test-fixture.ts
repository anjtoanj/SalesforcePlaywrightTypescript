import { test as base, Page } from "@playwright/test";
import { BaseClass } from "./base";

// Define custom test type with a loggedInPage fixture
type Fixtures = {
  loggedInPage: Page;
};

export const test = base.extend<Fixtures>({
  loggedInPage: async ({ page }, use) => {
    // Create an instance of BaseClass
    const baseClass = new BaseClass(page);

    // Navigate to the login page
    await baseClass.navigateToLoginPage();

    // Perform login with predefined credentials
    await baseClass.Login();

    // Wait for the home page to load
    await page.waitForURL(BaseClass.pageUrl, { timeout: 50000 });

    // Use the logged-in page in tests
    await use(page);

    // Teardown: Playwright handles closing page/context automatically
  },
});
export { expect } from "@playwright/test";
