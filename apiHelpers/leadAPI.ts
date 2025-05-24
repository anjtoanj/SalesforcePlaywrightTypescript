import { test, expect, request } from "@playwright/test";
import { API_URL } from "../constants/apiKeys";
import { Users } from "../constants/users";
import { getAccessToken } from "../utils/authHelper";

let accessToken: any;
//let leadId: any;

export async function createLeadAPI(accessToken: string) {
  const apiContext = await request.newContext();
  const response = await apiContext.post(API_URL.LEAD_URL, {
    headers: {
      Authorization: "Bearer " + accessToken,
      Connection: "keep-alive",
    },
    data: {
      FirstName: "APIUITestsSample2",
      LastName: "Testing1",
      Company: "Playwright APIvsUI test",
    },
  });
  const body = await response.json();
  return {
    status: response.status(),
    leadId: body.id,
  };
}

export async function getLeadAPI(accessToken: string, leadId: string) {
  const apiContext = await request.newContext();
  const response = await apiContext.get(`${API_URL.LEAD_URL}/${leadId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Connection: `keep-alive`,
    },
  });
  const body = await response.json();
  console.log("Response from get request:", body);
  return {
    status: response.status(),
    firstName: body.FirstName,
    lastName: body.LastName,
    company: body.Company,
  };
}

export async function deleteLeadAPI(accessToken: string, leadId: string) {
  const apiContext = await request.newContext();
  const response = await apiContext.delete(`${API_URL.LEAD_URL}/${leadId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Connection: `keep-alive`,
    },
  });
  const body = await response.json();
  console.log("Response from delete request:", body);
  return {
    status: response.status(),
  };
}
