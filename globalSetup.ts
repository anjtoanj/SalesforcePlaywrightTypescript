import { FullConfig, chromium } from '@playwright/test';
import { ConcretePlaywrightWrapper } from './utils/ConcretePlaywrightWrapper';  // Import the concrete class

async function globalSetup(config: FullConfig) {
    console.log("Running global setup...");

    // Extract baseURL from the Playwright config
    const baseURL = config.projects[0].use?.baseURL;
    if (!baseURL) {
        throw new Error("Base URL is not defined in playwright.config.ts");
    }

    console.log(`Base URL: ${baseURL}`);

    // Launch browser
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    // Use ConcretePlaywrightWrapper
    const playwrightWrapper = new ConcretePlaywrightWrapper(page);

    // console.log("Logging into Salesforce...");

    // // Load login page using the dynamic baseURL
    // await playwrightWrapper.loadApp(`${baseURL}/login`);

    // // Perform login using wrapper functions
    // await playwrightWrapper.type("//input[@name='username']", "Username Field", 'Thanmayi321@gmail.com');
    // await playwrightWrapper.type("//input[@name='pw']","Password", 'GenAI@2025');
    // await playwrightWrapper.click("//input[@name='Login']","Login","Button");

    // // Wait for home page to load
    // await playwrightWrapper.waitForURLtoLoad(`${baseURL}/home`, 10000);

    // Save authentication session for reuse in tests
    await context.storageState({ path: 'salesforce/auth.json' });

    // Close browser
    await browser.close();

    console.log("Global setup completed successfully.");
}

export default globalSetup;
