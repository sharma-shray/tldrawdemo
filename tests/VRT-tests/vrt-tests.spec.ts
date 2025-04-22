import { test, expect } from "@playwright/test";

//Example VRT test cases for tldraw
test("Visual test for Google homepage", async ({ page }) => {
  await page.goto("https://www.google.com");

  //FUll page page screenshot
  await expect(await page.screenshot({ fullPage: true })).toMatchSnapshot(
    "google-logo.png",
    {
      maxDiffPixelRatio: 0.2, // Allows up to 20% of pixels to differ
    }
  );
});

test("VRT for Book and Mountains images in gallery", async ({ page }) => {
  await page.goto("http://localhost:3000");

  // Wait for images to load
  await page.waitForSelector('img[alt*="book"]');
  await page.waitForSelector('img[alt*="mountains"]');

  const bookImage = await page.locator('img[alt*="book"]').first();
  const mountainsImage = await page.locator('img[alt*="mountains"]').first();

  // Screenshot for the "Book" image
  await expect(bookImage).toHaveScreenshot("book-image.png", {
    maxDiffPixelRatio: 0.2, // Allows up to 20% of pixels to differ
  });

  // Screenshot for the "Mountains" image
  await expect(mountainsImage).toHaveScreenshot("mountains-image.png", {
    maxDiffPixelRatio: 0.2, // Allows up to 20% of pixels to differ
  });
});
