import { test, expect, request } from "@playwright/test";
import { ForAPI } from "../../constants/apiKeys";
import { Users } from "../../constants/users";

test.describe("Tests on Bearer Token Generation - Response Displayed in Report", () => {
  test("TC01 : Verify generation of bearer token with valid credentials", async ({
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
    await testInfo.attach("response-status", {
      body: response.status().toString(),
      contentType: "text/plain",
    });
    await testInfo.attach("response-body", {
      body: JSON.stringify(body, null, 2),
      contentType: "application/json",
    });
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    expect(body).toHaveProperty("access_token");
    console.log("Access_token: " + body.access_token);
    expect(typeof body.access_token).toBe("string");
    expect(body.token_type).toBe("Bearer");
  });

  test("TC02 : Verify response with invalid credentials", async ({
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
    await testInfo.attach("response-status", {
      body: response.status().toString(),
      contentType: "text/plain",
    });
    await testInfo.attach("response-body", {
      body: JSON.stringify(body, null, 2),
      contentType: "application/json",
    });
    expect(response.status()).toBe(400);
    expect(body).toHaveProperty("error");
  });

  test("TC03 : Verify response with missing parameter", async ({
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
    await testInfo.attach("response-status", {
      body: response.status().toString(),
      contentType: "text/plain",
    });
    await testInfo.attach("response-body", {
      body: JSON.stringify(body, null, 2),
      contentType: "application/json",
    });
    expect(response.status()).toBe(400);
    expect(body).toHaveProperty("error");
  });

  test("TC04: Verify response with invalid grant_type", async ({
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
    await testInfo.attach("response-status", {
      body: response.status().toString(),
      contentType: "text/plain",
    });
    await testInfo.attach("response-body", {
      body: JSON.stringify(body, null, 2),
      contentType: "application/json",
    });
    expect(response.status()).toBe(400);
    expect(body).toHaveProperty("error");
  });
});
