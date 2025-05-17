import { chromium } from "@playwright/test";
import { ForAPI } from "../constants/apiKeys";
import { Users } from "../constants/users";

async function getAccessToken() {
  const browser = await chromium.launch();
  const browserContext = await browser.newContext();
  const apiRequestContext = await browserContext.request;

  const clientID = ForAPI.CLIENT_ID;
  const clientSecret = ForAPI.CLIENT_SECRET;
  const username = Users.adminUserName;
  const password = Users.adminPassword;
  const loginUrl = ForAPI.API_TOKEN_URL;

  // Generate the access token using the OAuth 2.0 password grant type

  const generateToken = await apiRequestContext.post(loginUrl, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Connection: "keep-alive",
    },
    form: {
      grant_type: "password",
      client_id: clientID,
      client_secret: clientSecret,
      username: username,
      password: password,
    },
  });

  const response = await generateToken.json();
  console.log(response);
  return {
    access_token: response.access_token,
    instance_url: response.instance_url,
  };
}
export { getAccessToken };
