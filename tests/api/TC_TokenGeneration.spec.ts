import { test, expect, request } from "@playwright/test";
import { ForAPI } from "../../constants/apiKeys";
import { Users } from "../../constants/users";
import reportAttachment from "../../utils/reportHelper";

test.describe("Tests on Bearer Token Generation - Response Displayed in Report", () => {
  test.only("TC01 : Verify generation of bearer token with valid credentials", async ({
    request,
  }, testInfo) => {
    const response = await request.post(ForAPI.API_TOKEN_URL, {
      form: {
        grant_type: "password",
        client_id: ForAPI.CLIENT_ID,
        client_secret: ForAPI.CLIENT_SECRET,
        username: Users.adminUserName,
        password: Users.adminPassword,
      },
    });
    const body = await response.json();

    // Add responseBody information to the test report
    const responseBody = JSON.stringify(body, null, 2);

    await reportAttachment(
      testInfo,
      "TC01 : Verify generation of bearer token with valid credentials - Response Status",
      response.status().toString(),
      "text/plain"
    );

    await reportAttachment(
      testInfo,
      "TC01 : Verify generation of bearer token with valid credentials - Response Body",
      responseBody,
      "application/json"
    );

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    expect(body).toHaveProperty("access_token");
    console.log("Access_token: " + body.access_token);
    expect(typeof body.access_token).toBe("string");
    expect(body.token_type).toBe("Bearer");
  });

  test.skip("TC02 : Verify response with invalid credentials", async ({
    request,
  }, testInfo) => {
    const response = await request.post(ForAPI.API_TOKEN_URL, {
      form: {
        grant_type: "password",
        client_id: ForAPI.CLIENT_ID,
        client_secret: ForAPI.CLIENT_SECRET,
        username: "wrong-user",
        password: "wrong-pass",
      },
    });
    const body = await response.json();
    // Add responseBody information to the test report
    const responseBody = JSON.stringify(body, null, 2);

    await reportAttachment(
      testInfo,
      "TC02 : Verify response with invalid credentials - Response Status",
      response.status().toString(),
      "text/plain"
    );

    await reportAttachment(
      testInfo,
      "TC02 : Verify response with invalid credentials - Response Body",
      responseBody,
      "application/json"
    );
    expect(response.status()).toBe(400);
    expect(body).toHaveProperty("error");
  });

  test.skip("TC03 : Verify response with missing parameter", async ({
    request,
  }, testInfo) => {
    const response = await request.post(ForAPI.API_TOKEN_URL, {
      form: {
        grant_type: "password",
        client_id: ForAPI.CLIENT_ID,
        // missing client_secret
        username: Users.adminUserName,
        password: Users.adminPassword,
      },
    });
    const body = await response.json();
    // Add responseBody information to the test report
    const responseBody = JSON.stringify(body, null, 2);

    await reportAttachment(
      testInfo,
      "TC03 : Verify response with missing parameter - Response Status",
      response.status().toString(),
      "text/plain"
    );

    await reportAttachment(
      testInfo,
      "TC03 : Verify response with missing parameter - Response Body",
      responseBody,
      "application/json"
    );
    expect(response.status()).toBe(400);
    expect(body).toHaveProperty("error");
  });

  test.skip("TC04: Verify response with invalid grant_type", async ({
    request,
  }, testInfo) => {
    const response = await request.post(ForAPI.API_TOKEN_URL, {
      form: {
        grant_type: "invalid_grant",
        client_id: ForAPI.CLIENT_ID,
        client_secret: ForAPI.CLIENT_SECRET,
        username: Users.adminUserName,
        password: Users.adminPassword,
      },
    });
    const body = await response.json();
    // Add responseBody information to the test report
    const responseBody = JSON.stringify(body, null, 2);

    await reportAttachment(
      testInfo,
      "TC04: Verify response with invalid grant_type - Response Status",
      response.status().toString(),
      "text/plain"
    );

    await reportAttachment(
      testInfo,
      "TC04: Verify response with invalid grant_type - Response Body",
      responseBody,
      "application/json"
    );
    expect(response.status()).toBe(400);
    expect(body).toHaveProperty("error");
  });
});
