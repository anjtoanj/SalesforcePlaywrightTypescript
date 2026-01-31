# SalesforcePlaywrightTypescript

-Edited Readme file in Markdown language-
-This is a Salesforce test automation framework using **Playwright** + **TypeScript**.

> ⚠️ This is an experimental framework with the following features:

- ✅ UI automation in Playwright + TypeScript
- ✅ API automation (REST API)
- ✅ Integrated API → UI and vice versa testing
- 💡 Generative AI-powered script creation — **TO DO**

---

## 📂 FOLDER STRUCTURE

```bash
SalesforcePlaywrightTypescript/
│── node_modules/               # Dependencies (auto-generated)
│── tests/                      # Test cases directory
│   ├── api/                    # API test cases
│   │   ├── users.test.ts       # User API tests
│   │   ├── auth.test.ts        # Authentication tests
│   │   ├── orders.test.ts      # Orders API tests
│   ├── ui/                     # UI test cases (Page Object Model)
│       ├── login.test.ts       # Login tests
│       ├── dashboard.test.ts   # Dashboard tests
│── pages/                      # Page Object Model (POM) for UI
│   ├── base.ts                 # Base class for common methods
│   ├── login.ts                # Login page actions
│   ├── home.ts                 # Home page actions
│   ├── dashboardPage.ts        # Dashboard page actions
│── api/                        # API service layer (API POM)
│   ├── baseApi.ts              # Base API class
│   ├── userApi.ts              # User API actions
│   ├── authApi.ts              # Authentication API actions
│   ├── ordersApi.ts            # Orders API actions
│── utils/                      # Utility functions/helpers
│   ├── apiUtils.ts             # API request helpers
│   ├── dataGenerator.ts        # Test data generator
│   ├── playwrightWrapper.ts    # Wrapper class
│── test-data/                  # Test data storage
│   ├── loginPageCheck.json     # Sample login dataset
│
├── playwright.config.ts        # Playwright configuration
├── reports/                    # Test reports (auto-generated)
├── .gitignore                  # Git ignore rules
├── package.json                # Project dependencies
├── package-lock.json           # Dependency lock file
├── .env                        # Manage credentials locally mapped to GitHub environment secrets
├── README.md                   # Documentation


TASK STATUS
🗓️ 01/02/2026
FIX URGENTLY : Manage handling email verification page
    -once logged into Salesforce app, verification code is being send to my gmail
    -Login to gmail -> find the salesforcemail -> get the verification code -> enter to the verification page

🗓️ 31/01/2026
Added a .env file to manage login credentials-specific configurations locally mapped to GitHub environment secrets
Configured GitHub Actions to use environment secrets[login credentials], keeping sensitive credentials secure.

🗓️ 24/05/2025
TC01_Validate_CreateLead_APIUI_Integration.spec.ts — ✅ DONE
Create a new lead through API and verify it in UI.

TC02 — ✅ PARTIALLY DONE
Delete the lead created in TC01 via API, verify not visible in UI (count check).
➤ Remaining: Run full delete flow and verify properly — TO DO

🗓️ 21/05/2025
Lead UI tests → TC02_VerifySearchForLeadFunctionality.spec.ts — ✅ DONE

🗓️ 19/05/2025
Lead UI tests → TC_LeadPage.spec.ts — 🛠️ IN PROGRESS

🗓️ 16/05/2025
API testing on Leads page → TC_API_LeadsPage.spec.ts — ✅ DONE

🗓️ 15/05/2025
OAuth 2.0 Token generation setup → TC_TokenGeneration.spec.ts — ✅ DONE

🛠️ AREAS TO IMPROVE / MODIFY
🔸 Login.spec.ts
TC: Verify if Enter key moves focus from Username → Password → Login Button
⛔ Rewrite this test — Current implementation is incorrect — TO DO

Add tests for:
Blank username & Blank password — TO DO

🔸 playwrightWrapper.ts
Add hook to capture a screenshot if a test fails — TO DO

🔸 Method: public async getLeadRowCount()
❗ This returns incorrect count for larger tables (e.g., 56 rows) — likely due to async/timing issues
➤ Fix logic and timing — TO DO

💡 TIPS
🧪 Playwright Report Not Updating?
Run with HTML reporter:
npx playwright test --reporter=html
npx playwright show-report
--Check if playwright-report/index.html has a recent timestamp.
--Confirm test results in npx playwright test output.

🐞 Debug Mode
Run with debug logging:
npx playwright test --reporter=html --debug
```
