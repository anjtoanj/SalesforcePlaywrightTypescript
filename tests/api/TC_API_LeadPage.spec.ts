import { test, expect, request } from "@playwright/test";
import { API_URL } from "../../constants/apiKeys";
import { Users } from "../../constants/users";
import { getAccessToken } from "../../apiHelpers/authHelper";
import { createLeadAPI } from "../../apiHelpers/leadAPI";

let authData: any;
//let instanceUrl: any;
let lead: any;
let response: any;

test.describe.serial("Tests on Lead Page", () => {
  test(`Use access token in the test from the function getAccessToken`, async () => {
    authData = await getAccessToken();

    console.log("Access Token in before.all test:", authData.access_Token);
  });

  test("TC01 : Verify New Lead Creation through API Request", async ({
    request,
  }, testInfo) => {
    console.log(
      "Access Token in New Lead creation test:",
      authData.access_Token
    );
    let response = await createLeadAPI(authData.access_Token);
    // Store newly created Lead ID
    lead = response.leadId; // The newly created id should be the first entry in the list
    await testInfo.attach("NewLeadID", {
      body: `New Lead ID: ${lead}`,
      contentType: "text/plain",
    });

    await testInfo.attach("response-status", {
      body: response.status.toString(),
      contentType: "text/plain",
    });
    await testInfo.attach("response-body", {
      body: JSON.stringify(response, null, 2),
      contentType: "application/json",
    });

    // Assertions for the expected response body
    expect(response.status).toBe(201); // Salesforce returns 201 for successful creation
    expect(response.leadId).toMatch(/^00Q/); // Salesforce Lead Ids start with 00Q
  });

  test.skip("TC02 : Verify Get Lead list through API Request", async ({
    request,
  }, testInfo) => {
    const response = await request.get(API_URL.LEAD_URL, {
      headers: {
        Authorization: `Bearer ${authData.access_Token}`,
        Connection: `keep-alive`,
      },
    });
    const body = await response.json();
    await testInfo.attach("response-status", {
      body: response.status().toString(),
      contentType: "text/plain",
    });
    await testInfo.attach("response-body", {
      body: JSON.stringify(body, null, 2),
      contentType: "application/json",
    });

    // Assertions for the expected response body
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    // Check if the new leadId exists in the response
    const leadExists = body.recentItems?.some(
      (lead: any) => lead.Id === leadId
    );

    // Attach the first recent item
    await testInfo.attach("first-recent-item", {
      body: JSON.stringify(body.recentItems?.[0], null, 2),
      contentType: "application/json",
    });

    await testInfo.attach("lead-exists", {
      body: `leadExists: ${leadExists}`,
      contentType: "text/plain",
    });
    expect(leadExists).toBeTruthy();
  });

  test.skip("TC03 : Verify Get the details of the new Lead created in TC01", async ({
    request,
  }, testInfo) => {
    const response = await request.get(`${API_URL.LEAD_URL}/${leadId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Connection: `keep-alive`,
      },
    });
    const body = await response.json();
    await testInfo.attach("response-status", {
      body: response.status().toString(),
      contentType: "text/plain",
    });
    await testInfo.attach("response-body", {
      body: JSON.stringify(body, null, 2),
      contentType: "application/json",
    });

    // Assertions for the expected response body
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
  });

  test.skip("TC04 : Verify update details of the new Lead created in TC01", async ({
    request,
  }, testInfo) => {
    const response = await request.patch(`${API_URL.LEAD_URL}/${leadId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Connection: `keep-alive`,
      },
      data: {
        Salutation: "Ms",
        Company: "Playwright API test",
      },
    });

    await testInfo.attach("response-status", {
      body: response.status().toString(),
      contentType: "text/plain",
    });
    // Assertions for the expected response body
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(204);
  });

  test.skip("TC05 : Verify Delete lead functionality", async ({
    request,
  }, testInfo) => {
    const response = await request.delete(`${API_URL.LEAD_URL}/${leadId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Connection: `keep-alive`,
      },
    });

    await testInfo.attach("response-status", {
      body: response.status().toString(),
      contentType: "text/plain",
    });

    await testInfo.attach("response-status-text", {
      body: response.statusText().toString(),
      contentType: "text/plain",
    });

    // Assertions for the expected response body
    expect(response.status()).toBe(204);
  });

  test.skip("TC06 : Verify if the new lead created in TC01 is being deleted in TC05", async ({
    request,
  }, testInfo) => {
    const response = await request.get(`${API_URL.LEAD_URL}/${leadId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Connection: `keep-alive`,
      },
    });

    await testInfo.attach("response-status", {
      body: response.status().toString(),
      contentType: "text/plain",
    });

    await testInfo.attach("response-status-text", {
      body: response.statusText().toString(),
      contentType: "text/plain",
    });

    // Assertions for the expected response body
    expect(response.statusText()).toBe("Not Found");
    expect(response.status()).toBe(404);
  });
});
