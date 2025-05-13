import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login";
import { UrlConstants } from "../constants/appConstants";

test(`Login to Salesforce`, async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigateToLoginPage();

  // Perform Login
  await loginPage.Login();

  // Wait for Home URL to load after successful login
  await page.waitForURL(UrlConstants.HOME_URL, { timeout: 50000 });

  // Verify user is redirected to the correct home/dashboard page
  await expect(page).toHaveURL(UrlConstants.HOME_URL);
});
