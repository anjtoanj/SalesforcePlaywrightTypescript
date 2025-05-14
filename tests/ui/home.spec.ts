import { test, expect } from "@playwright/test";

import { BaseClass } from "../../pages/base";
import { UrlConstants } from "../../constants/appConstants";

test(`Login to Salesforce`, async ({ page }) => {
  const baseClass = new BaseClass(page);

  //Navigate to the login page
  await baseClass.navigateToLoginPage();

  // Perform Login
  await baseClass.Login();

  // Wait for Home URL to load after successful login
  await page.waitForURL(UrlConstants.HOME_URL, { timeout: 50000 });

  // Verify user is redirected to the correct home/dashboard page
  await expect(page).toHaveURL(UrlConstants.HOME_URL);
});
