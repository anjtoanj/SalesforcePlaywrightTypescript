import { test, expect } from "@playwright/test";
import { BaseClass } from "../../pages/base";
import { clear } from "console";

test("Navigate from Home -> Learn More -> Confirm -> Back to Home", async ({
  page,
}) => {
  // Go to Home Page
  const baseClass = new BaseClass(page);

  // Go to Home Page
  await baseClass.navigateToLoginPage();

  // Perform login with predefined credentials
  await baseClass.Login();

  //const [image] => Destructures the array returned by Promise.all() and assigns the new page object to newPage.
  const [newPage] = await Promise.all([
    page.context().waitForEvent("page"),
    page.getByRole("button", { name: "Learn More" }).click(),
  ]);

  await newPage.waitForLoadState("domcontentloaded");
  clear;

  // Click "Confirm" button on new page
  await newPage.locator('button:has-text("Confirm")').click();
  // replace with actual selector

  // Close new page and return to home page
  await newPage.close();
  await page.bringToFront();

  // Verify we are still on home page
  expect(await page.title()).toContain("Home");
});
