import { chromium, Browser, BrowserContext, Page } from "@playwright/test";
import * as path from "path";
import { BaseClass } from "../pages/base";

export class authSessionStorage {
  static STORAGE_STATE_PATH = path.resolve(__dirname, "../storageState.json");

  /**
   * Generates authentication storage state for re-use in tests.
   */
  static async generateAuthState(): Promise<void> {
    let browser: Browser | null = null;
    let context: BrowserContext | null = null;

    try {
      browser = await chromium.launch({ headless: true });
      context = await browser.newContext();
      const page: Page = await context.newPage();

      // Instantiate BaseClass and login
      const base = new BaseClass(page);
      await base.navigateToLoginPage();
      await base.Login();

      // Ensure login completes
      await page.waitForLoadState("networkidle");

      // Save storage state
      await context.storageState({
        path: authSessionStorage.STORAGE_STATE_PATH,
      });
      console.log(
        `Storage state saved at: ${authSessionStorage.STORAGE_STATE_PATH}`
      );
    } catch (error) {
      console.error("Error during authentication:", error);
    } finally {
      if (browser) {
        await browser.close();
      }
    }
  }
  /** Returns the path to the storage state file */
  static getStoragePath(): string {
    return authSessionStorage.STORAGE_STATE_PATH;
  }
}
