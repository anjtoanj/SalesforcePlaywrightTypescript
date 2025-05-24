import { test, expect, request } from "@playwright/test";
import { API_URL } from "../../constants/apiKeys";
import { Users } from "../../constants/users";
import { getAccessToken } from "../../apiHelpers/authHelper";
import {
  createLeadAPI,
  deleteLeadAPI,
  getLeadAPI,
} from "../../apiHelpers/leadAPI";
import { HomePage } from "../../pages/home";
import { LeadsPage } from "../../pages/leads";

let leadId: any;

test.describe.serial("Tests on Leads page : API vs UI Integration", () => {
  let authData: any;
  let leadId: any;

  // test.beforeAll(async () => {
  //   authData = await getAccessToken();
  // });

  test.skip("TC01 : Verify New Lead Created through API Request is being displayed in the Leads listview page", async ({
    page,
  }, testInfo) => {
    let homePage: HomePage;
    let leadsPage: LeadsPage;

    // Create a new lead using API
    const newLead = await createLeadAPI(authData.access_token);

    // Log the creation response
    await testInfo.attach("New Lead creation response-status", {
      body: newLead.status.toString(),
      contentType: "text/plain",
    });
    expect(newLead.status).toBe(201); // Created

    console.log("Response from TC post request:", newLead);

    leadId = newLead.leadId;

    // Use the same access token to get the lead details
    const newLeadDetails = await getLeadAPI(authData.access_token, leadId);

    await testInfo.attach("New Lead details status", {
      body: `Status: ${newLeadDetails.status}`,
      contentType: "text/plain",
    });

    await testInfo.attach("New Lead details", {
      body: JSON.stringify(newLeadDetails, null, 2),
      contentType: "application/json",
    });

    //  console.log("Response from TC get request:", newLeadDetails);
    expect(newLeadDetails.status).toBe(200); // OK

    homePage = new HomePage(page);
    leadsPage = new LeadsPage(page);
    await homePage.navigateToLoginPage();
    await homePage.Login();
    await leadsPage.navigateToLeadsPage();

    await leadsPage.searchLead(newLeadDetails.firstName);
    await leadsPage.click(
      leadsPage.firstRecordLeadName,
      "Click first Lead record from search result",
      "ListView"
    );

    // Add assertions to verify if the new lead created through API is found and navigated to the lead details page
    const leaderName = await page
      .locator(leadsPage.leadNameHeader)
      .textContent();
    const companyName = await page
      .locator(leadsPage.companyNameValue)
      .textContent();

    expect(
      await page.locator(leadsPage.leadNameHeader).textContent()
    ).toContain(newLeadDetails.firstName + " " + newLeadDetails.lastName);
    expect(
      await page.locator(leadsPage.companyNameValue).textContent()
    ).toContain(newLeadDetails.company);

    await testInfo.attach("New Lead Header from UI", {
      body: `New Lead Header: ${leaderName}\nNew Lead company: ${companyName}`,
      contentType: "text/plain",
    });
    console.log("New Lead Header from UI:", leaderName);
    console.log("New Lead company from UI:", companyName);
  });

  test("TC02 : Verify New Lead Created in TC01 has been deleted through API and not present in UI ", async ({
    page,
  }, testInfo) => {
    let homePage: HomePage;
    let leadsPage: LeadsPage;

    // Delete the lead using API
    const deleteLead = await deleteLeadAPI(authData.access_token, leadId);

    // Log the creation response
    await testInfo.attach("Delete Lead response-status", {
      body: deleteLead.status.toString(),
      contentType: "text/plain",
    });
    expect(deleteLead.status).toBe(201); // Created

    console.log("Response from TC post request:", deleteLead);

    // Use the same access token to check if the deleted lead details are still available in UI
    const deletedLeadDetails = await getLeadAPI(authData.access_token, leadId);

    await testInfo.attach("Deleted Lead status", {
      body: `Delete Response: ${deletedLeadDetails}`,
      contentType: "application/json",
    });

    //  console.log("Response from TC get request:", newLeadDetails);
    expect(deletedLeadDetails.status).toBe(404); // OK

    homePage = new HomePage(page);
    leadsPage = new LeadsPage(page);
    await homePage.navigateToLoginPage();
    await homePage.Login();
    await leadsPage.navigateToLeadsPage();

    // await leadsPage.searchLead(deletedLeadDetails.firstName);
    await leadsPage.searchLead("APIUITestsSample2");

    // Get the record count of deleted lead search in the list view
    const leadCount = await leadsPage.getLeadRowCount();
    console.log("Lead count after deletion:", leadCount);

    await testInfo.attach("Lead count after deletion", {
      body: `List of Lead count after deletion: ${leadCount}`,
      contentType: "text/plain",
    });
  });
});
