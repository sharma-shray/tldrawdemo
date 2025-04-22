import { Page } from "@playwright/test";
import { APIRequestContext } from "@playwright/test";

// types.ts - Define a type for image response
export interface ImageResponse {
  id: string;
}

export interface TestImage {
  title: string;
  image: string;
  keywords: string[];
}

/**
 * Waits for the page to fully load and become idle.
 * @param page - Playwright Page instance
 */
export async function waitForPageLoad(page: Page) {
  await page.waitForLoadState("load"); // Waits for the page to load completely
  await page.waitForLoadState("networkidle"); // Ensures no network requests are pending
}

/**
 * Selects a specific date in the Material UI date picker.
 *
 * @param page - Playwright Page instance.
 * @param date - The date to select in MM/DD/YYYY format.
 */
export async function selectDate(page: Page, date: string) {
  const [month, day, year] = date.split("/");

  // Open the date picker
  await page.getByLabel("Choose date", { exact: true }).click();
  // Wait for the calendar to appear
  await page.waitForSelector(".MuiDateCalendar-root");

  // Get current displayed month/year
  let displayedMonthYear = await page
    .locator(".MuiPickersCalendarHeader-label")
    .textContent();

  // Define month mapping for navigation
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const targetMonthYear = `${monthNames[parseInt(month) - 1]} ${year}`;

  // Navigate to the correct month/year
  while (displayedMonthYear?.trim() !== targetMonthYear) {
    // Click next or previous month button as needed
    if (
      new Date(`${targetMonthYear}`) > new Date(`${displayedMonthYear?.trim()}`)
    ) {
      await page.locator("[aria-label='Next month']").click();
    } else {
      await page.locator("[aria-label='Previous month']").click();
    }

    // Update displayed month/year after navigation
    await page.waitForTimeout(500); // Give it time to update
    displayedMonthYear = await page
      .locator(".MuiPickersCalendarHeader-label")
      .textContent();
  }

  // Select the specific day
  await page.locator(`button[role="gridcell"]:has-text("${day}")`).click();

  // Ensure the date is selected (optional assertion)
  await page.waitForTimeout(500);
}

/**
 * Creates a new test image via a POST request to the API.
 *
 * This function:
 * - Sends a POST request to create an image.
 * - Returns the newly created image's ID if successful.
 * - Handles API errors gracefully and logs warnings if creation fails.
 *
 * @param {APIRequestContext} request - The Playwright APIRequestContext instance.
 * @param {string} BASE_URL - The base URL of the API.
 * @param {TestImage} testImage - The test image data to be sent in the request.
 * @throws {Error} Logs errors in case of API failure.
 */
export async function createTestImage(
  request: APIRequestContext,
  BASE_URL: string,
  testImage: TestImage
) {
  try {
    const createResponse = await request.post(`${BASE_URL}/api/images`, {
      data: testImage,
    });

    if (createResponse.status() !== 201) {
      console.warn(
        "Image creation failed with status:",
        createResponse.status()
      );
      return null;
    }

    const createdImage: ImageResponse = await createResponse.json();
    return createdImage.id; // Return the new image ID
  } catch (error) {
    console.error("Error creating image:", error);
    return null;
  }
}

/**
 * Returns a formatted date string in "MM/DD/YYYY" format asynchronously.
 *
 * @param {number} daysToAdd - The number of days to add to today's date.
 *                              Use 0 for today, 1 for tomorrow, etc.
 * @returns {Promise<string>} A promise that resolves to the formatted date as "MM/DD/YYYY".
 *
 * @example
 * getFormattedDate(1).then(console.log); // Logs tomorrow's date
 * getFormattedDate(0).then(console.log); // Logs today's date
 */
export async function getFormattedDate(daysToAdd: number): Promise<string> {
  const date = new Date();
  date.setDate(date.getDate() + daysToAdd); // Add specified days

  const mm = String(date.getMonth() + 1).padStart(2, "0"); // Month (01-12)
  const dd = String(date.getDate()).padStart(2, "0"); // Day (01-31)
  const yyyy = date.getFullYear(); // Year (YYYY)

  return `${mm}/${dd}/${yyyy}`;
}
