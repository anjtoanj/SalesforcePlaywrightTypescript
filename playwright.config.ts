import { defineConfig, devices } from "@playwright/test";
import * as path from "path";
import { authSessionStorage } from "./utils/authSessionStorage";

export default defineConfig({
  testDir: "./tests",
  timeout: 50000, // 50secs timeout per test
  workers: 1, // Run tests in parallel using 4 workers
  retries: 0, // NO retry
  reporter: [
    ["html", { outputFolder: "playwright-report", open: "always" }], // Generates and opens HTML report
  ],
  use: {
    trace: "on", // Enable tracing for debugging
    video: "on", // Record video for all tests
    screenshot: "only-on-failure", // Capture screenshots only when a test fails
    headless: false, // Run tests in non-headless mode for debugging
    storageState: authSessionStorage.getStoragePath(), // Load stored login session from Salesforce
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
