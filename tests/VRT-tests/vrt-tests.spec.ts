import { test, expect } from "@playwright/test";

test("Visual test for Google homepage", async ({ page }) => {
  await page.goto("https://www.google.com");

  // Accept cookies
  const acceptBtn = page.locator(
    'button:has-text("I agree"), button:has-text("Accept all")'
  );
  if (await acceptBtn.isVisible()) {
    await acceptBtn.click();
  }

  // Take and compare a screenshot of the whole page
  expect(await page.screenshot({ fullPage: true })).toMatchSnapshot(
    "google-homepage.png"
  );
});
