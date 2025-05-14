import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 240000, // 4-minute timeout per test
  workers: 4, // Run tests in parallel using 4 workers
  retries: 1, // Retries once if a test fails
  reporter: [
    ["html", { outputFolder: "playwright-report", open: "on" }], // Generates and opens HTML report
  ],
  use: {
    trace: "on", // Enable tracing for debugging
    video: "on", // Record video for all tests
    screenshot: "only-on-failure", // Capture screenshots only when a test fails
    headless: false, // Run tests in non-headless mode for debugging
    // storageState: "salesforce/auth.json", // Load stored login session from Salesforce
    //  baseURL: 'https://login.salesforce.com',  // Base URL for all tests
  },
  projects: [
    {
      name: "chrome",
      use: {
        channel: "chrome",
        viewport: { width: 1720, height: 1280 }, // Set viewport sizeclear
      },
    },
    // {
    //   name: "firefox",
    //   use: {
    //     browserName: "firefox",
    //     viewport: { width: 1720, height: 1280 },
    //   },
    // },
  ],
});
