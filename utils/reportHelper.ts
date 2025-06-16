import { TestInfo } from "@playwright/test";
/**
 * Attaches a report to the test results.
 *
 * @param testInfo - The Playwright testInfo object
 * @param title - The name/title of the attachment
 * @param data - The content/body to attach
 * @param contentType - MIME type (default is 'text/plain')
 */

export default async function reportAttachment(
  testInfo: TestInfo,
  title: string,
  data: string,
  contentType: string = "text/plain"
): Promise<void> {
  await testInfo.attach(title, {
    body: data,
    contentType,
  });
}
