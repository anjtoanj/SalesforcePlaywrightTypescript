import { expect, test } from "@playwright/test";
import dataArray from "../../test-data/loginPageCheck.json";
import { BaseClass } from "../../pages/base";
import { LoginClass } from "../../pages/login";

test.describe(`Tests on Login page`, () => {
  let baseClass: BaseClass;
  let loginClass: LoginClass;

  for (const data of dataArray) {
    test(data.testCase, async ({ page }, testInfo) => {
      baseClass = new BaseClass(page);
      loginClass = new LoginClass(page);

      await baseClass.navigateToLoginPage();
      await loginClass.LoginValidation(
        data.username ?? "",
        data.password ?? ""
      );

      // Verify the error message if it exists
      if (data.errorMessage) {
        const actualErrorMessage = await loginClass.VerifyTextMessage();
        console.log(`Error message: ${actualErrorMessage}`);
        expect(actualErrorMessage).toBe(data.errorMessage);
      } else {
        console.log(
          `No error message to verify for test case: ${data.testCase}`
        );
      }
    });
  }

  test("TC : Verify if Enter key moves focus from username -> password -> Login Button", async ({
    page,
  }) => {
    baseClass = new BaseClass(page);
    loginClass = new LoginClass(page);

    await baseClass.navigateToLoginPage();

    const usernameLocator = page.locator(loginClass.userNameField);
    const passwordLocator = page.locator(loginClass.passwordField);

    // Step 1: Focus on username field and press Enter
    await usernameLocator.focus();
    await usernameLocator.press("Enter");

    // Step 2: Get currently focused element (active element)
    const activeElementId1 = await page.evaluate(
      () => document.activeElement?.id
    );

    // Step 3: Assert that password field is now focused
    expect(activeElementId1).toBe("password");

    // Step 3: Type a sample password and press Enter
    await passwordLocator.focus();
    await passwordLocator.press("Enter");

    // Step 4: Get currently focused element (active element)
    const activeElementId2 = await page.evaluate(
      () => document.activeElement?.id
    );
    // Step 5: Assert that login button is now focused
    expect(activeElementId2).toBe(loginClass.loginButton);
  });
});
