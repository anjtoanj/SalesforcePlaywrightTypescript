import { request } from "@playwright/test";
import { API_URL } from "../constants/apiKeys";

export async function createLeadAPI(access_token: string) {
  console.log("Inside createLead Method");
  const apiContext = await request.newContext();
  const response = await apiContext.post(API_URL.LEAD_URL, {
    headers: {
      Authorization: `Bearer ${access_token}`,
      Connection: "keep-alive",
      "Content-Type": "application/json",
    },
    data: {
      // Sample data for creating a lead
      FirstName: "Integration Playwright testing",
      LastName: "DEMO",
      Company: "Playwright API vs UI test",
    },
  });
  const body = await response.json();
  console.log("Response from post request:", body);
  return {
    status: response.status(),
    leadId: body.id,
  };
}
export async function getLeadAPI(access_token: string, leadId: string) {
  const apiContext = await request.newContext();
  const response = await apiContext.get(`${API_URL.LEAD_URL}/${leadId}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
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

export async function deleteLeadAPI(access_token: string, leadId: string) {
  const apiContext = await request.newContext();
  const response = await apiContext.delete(`${API_URL.LEAD_URL}/${leadId}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
      Connection: `keep-alive`,
    },
  });
  const body = await response.json();
  console.log("Response from delete request:", body);
  return {
    status: body.status(),
    errorCode: body.errorCode,
    message: body.message,
  };
}
