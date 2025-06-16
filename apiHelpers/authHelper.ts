import { chromium } from "@playwright/test";
import { ForAPI } from "../constants/apiKeys";
import { Users } from "../constants/users";
import { request } from "@playwright/test";

export async function getAccessToken() {
  // Create a new request context for API requests
  const apiRequestContext = await request.newContext();

  const clientID = ForAPI.CLIENT_ID;
  const clientSecret = ForAPI.CLIENT_SECRET;
  const username = Users.adminUserName;
  const password = Users.adminPassword;
  const loginUrl = ForAPI.API_TOKEN_URL;

  // Generate the access token using the OAuth 2.0 password grant type

  const response = await apiRequestContext.post(loginUrl, {
    form: {
      grant_type: "password",
      client_id: clientID,
      client_secret: clientSecret,
      username: username,
      password: password,
    },
  });

  const body = await response.json();
  const access_Token = body.access_token;
  console.log(body.access_token);
  return { access_Token };
}
