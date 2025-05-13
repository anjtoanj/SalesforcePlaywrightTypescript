# SalesforcePlaywrightTypescript

- This is a Salesforce test automation framework in Playwright + Typescript
- This is an experimental framework with following features: - UI automation in playwright+ typescript - IN PROGRESS - API automation - REST API - IN PROGRESS - Tests to integrate API -> UI and vice versa - IN PROGRESS - Integrate Generative AI to create test scripts - TO DO

## -FOLDER STRUCTURE

API TO WEBPORTAL TESTING Framework structure

SalesforcePlaywrightTypescript/
│── node_modules/ # Dependencies (auto-generated)
│── tests/ # Test cases directory
│ ├── api/ # API test cases
│ │ ├── users.test.ts # User API tests
│ │ ├── auth.test.ts # Authentication tests
│ │ ├── orders.test.ts # Orders API tests
│ ├── ui/ # UI test cases (Page Object Model)
│ │ ├── login.test.ts # Login tests
│ │ ├── dashboard.test.ts # Dashboard tests
│── pages/ # Page Object Model (POM) for UI
│ ├── basePage.ts # Base class for common methods
│ ├── loginPage.ts # Login page actions
│ ├── dashboardPage.ts # Dashboard page actions
│── api/ # API service layer (API POM)
│ ├── baseApi.ts # Base API class
│ ├── userApi.ts # User API actions
│ ├── authApi.ts # Authentication API actions
│ ├── ordersApi.ts # Orders API actions
│── utils/ # Utility functions/helpers
│ ├── apiUtils.ts # API request helpers
│ ├── dataGenerator.ts # Test data generator
| ├── playwrightWrapper.ts # Wrapper class
│── test-data/ # Test data storage
│ ├── users.json # Sample user data
│
|── playwright.config.ts # Playwright configuration
│── reports/ # Test reports (auto-generated)
│── .gitignore # Ignore files for Git
│── package.json # Project dependencies
│── package-lock.json # Dependency lock file
│── README.md # Documentation
