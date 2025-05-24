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
│ ├── base.ts # Base class for common methods
│ ├── login.ts # Login page actions
│ ├── home.ts # home page actions
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
│ ├── loginPageCheck.json # Sample login dataset for various test cases
│
|── playwright.config.ts # Playwright configuration
│── reports/ # Test reports (auto-generated)
│── .gitignore # Ignore files for Git
│── package.json # Project dependencies
│── package-lock.json # Dependency lock file
│── README.md # Documentation

---

---

---

TASK STATUS
24/05/2025 1.TC01_Validate_CreateLead_APIUI_Integration.spec.ts - DONE - Create a new lead through API and verify in UI 2. TC02 : Verify New Lead Created in TC01 has been deleted through API and not present in UI - TO DO
21/05/2025 1.Lead UI tests -> TC02: Verify search for Lead functionality - DONE
19/05/2025 1.Lead UI tests -> TC_LeadPage.spec.ts - IN PROGRESS
16/05/2025 1.API testing on leads page -> TC_API_LeadsPage.spec.ts -DONE
15/05/2025 1.Setting up OAuth 2.0 - token generation and related tests - -> TC_TokenGeneration.spec.ts - DONE

---

---

---

TO DO / MODIFY NOTES

Login.spec.ts

1.  "TC : Verify if Enter key moves focus from username -> password -> Login Button"
    //REWRITE THIS TEST > THIS IS NOT THE RIGHT WAY TO DO IT -- TO DO LATER

2.  //write tests to handle blank username / pssword - TO DO LATER

playwrightWrapper.ts 3. Hook to capture a screenshot if the test fails- TO DO LATER
