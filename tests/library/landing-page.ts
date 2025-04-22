import { Page } from "@playwright/test";
import { waitForPageLoad } from "./utils/helper";

/**
 * Helper function to perform a search action
 * @param page - Playwright Page instance
 * @param value - The value to search for
 */
export async function search(page: Page, value: string) {
  await page.getByPlaceholder("Search").click();
  await page.getByPlaceholder("Search").fill(value);
  await waitForPageLoad(page);
}

/**
 * Uploads an image by filling out the necessary form fields.
 *
 * @param page - Playwright Page instance to interact with the UI.
 * @param imageTitle - The title of the image.
 * @param keywords - An array of keywords associated with the image.
 * @param date - The date associated with the image in MM/DD/YYYY format.
 * @param url - The URL of the image.
 */
export async function uploadImage(
  page: Page,
  imageTitle: string,
  keywords: string[],
  date: string,
  url: string
) {
  // Click "Add Image" button
  await page.getByRole("button", { name: "Add Image" }).click();

  // Fill in the title
  await page.getByPlaceholder("Title").click();
  await page.getByPlaceholder("Title").fill(imageTitle);

  // Fill in the URL
  await page.getByPlaceholder("Url").click();
  await page.getByPlaceholder("Url").fill(url);

  // Fill in Keywords - Assuming it accepts a comma-separated string
  const keywordString = keywords.join(","); // Convert array to comma-separated string
  await page.getByLabel("Keywords").click();
  await page.getByLabel("Keywords").fill(keywordString);

  // Fill in the Date field
  await page.getByLabel("Date", { exact: true }).click();
  await page.getByLabel("Date", { exact: true }).fill(date);

  //Submit
  await page.getByRole("button", { name: "Submit" }).click();
  await waitForPageLoad(page);
}

/**
 * Sets the start date in the designated form field.
 *
 * @param page - Playwright Page instance to interact with the UI.
 * @param date - The start date to be set, formatted as MM/DD/YYYY.
 */
export async function setStartDate(page: Page, date: string) {
  await page.getByLabel("Start Date").fill(date);
  await waitForPageLoad(page);
}

/**
 * Sets the end date in the designated form field.
 *
 * @param page - Playwright Page instance to interact with the UI.
 * @param date - The end date to be set, formatted as MM/DD/YYYY.
 */
export async function setEndDate(page: Page, date: string) {
  await page.getByLabel("End Date").fill(date);
  await waitForPageLoad(page);
}

/**
 * Sets the filter value in the designated form field.
 *
 * @param page - Playwright Page instance to interact with the UI.
 * @param value - The filter value to be set, this is case sensitve.
 */
export async function setAndRemoveFilterValue(page: Page, value: string) {
  await page.getByRole("combobox").click();
  await page.getByRole("option", { name: value }).click();

  //Close combo box by clicking outside
  await page.locator("#menu- div").first().click();
  await waitForPageLoad(page);
}
