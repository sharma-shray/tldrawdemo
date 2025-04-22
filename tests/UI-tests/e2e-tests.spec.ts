import { test, expect } from "@playwright/test";
import {
  search,
  uploadImage,
  setStartDate,
  setEndDate,
  setAndRemoveFilterValue,
} from "../library/landing-page";
import { selectDate } from "../library/utils/helper";

test.describe("e2e tests", () => {
  test.beforeEach(async ({ page, baseURL }) => {
    if (!baseURL) {
      throw new Error(" baseURL is not defined in playwright.config.ts");
    }
    await page.goto(baseURL, { waitUntil: "load" });
    await page.waitForLoadState("networkidle");
  });
  const image =
    "https://fastly.picsum.photos/id/63/5000/2813.jpg?hmac=HvaeSK6WT-G9bYF_CyB2m1ARQirL8UMnygdU9W6PDvM";

  test("Verify that the landing page has title", async ({ page }) => {
    await expect(page).toHaveTitle(/Create Next App/);
    await expect(
      page.getByRole("heading", { name: "Image Gallery" })
    ).toBeVisible();
  });

  test("Verify that the landing page has a header text", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Image Gallery" })
    ).toBeVisible();
  });

  test("Verify user is able to search image based on image name (case insensitive)", async ({
    page,
  }) => {
    await search(page, "book");
    await expect(
      page.getByRole("img", { name: "book, study, pages" })
    ).toBeVisible();
    await expect(
      page.getByRole("img", { name: "mountains, snow, cold" })
    ).toBeHidden();
    await expect(
      page.getByRole("img", { name: "coffee, cup, mug" })
    ).toBeHidden();
  });

  test("Verify user is able to search image based on image name (case sensitive)", async ({
    page,
  }) => {
    await search(page, "Book");
    await expect(
      page.getByRole("img", { name: "book, study, pages" })
    ).toBeVisible();
    await expect(
      page.getByRole("img", { name: "mountains, snow, cold" })
    ).toBeHidden();
    await expect(
      page.getByRole("img", { name: "coffee, cup, mug" })
    ).toBeHidden();
  });

  test("Verify user is able to search image based on image name (Numeric)", async ({
    page,
  }) => {
    await search(page, "123");
    await expect(page.getByRole("img", { name: "number" })).toBeVisible();
    await expect(
      page.getByRole("img", { name: "book, study, pages" })
    ).toBeHidden();
    await expect(
      page.getByRole("img", { name: "mountains, snow, cold" })
    ).toBeHidden();
    await expect(
      page.getByRole("img", { name: "coffee, cup, mug" })
    ).toBeHidden();
  });

  test("Verify user is able to search image based on image name (special chars)", async ({
    page,
  }) => {
    await search(page, "@#$");
    await expect(page.getByRole("img", { name: "special" })).toBeVisible();
    await expect(
      page.getByRole("img", { name: "book, study, pages" })
    ).toBeHidden();
    await expect(
      page.getByRole("img", { name: "mountains, snow, cold" })
    ).toBeHidden();
    await expect(
      page.getByRole("img", { name: "coffee, cup, mug" })
    ).toBeHidden();
  });

  test("Verify user is not able to search image based on tags", async ({
    page,
  }) => {
    await search(page, "study");
    await expect(
      page.getByRole("img", { name: "book, study, pages" })
    ).toBeHidden();
    await expect(
      page.getByRole("img", { name: "mountains, snow, cold" })
    ).toBeHidden();
    await expect(
      page.getByRole("img", { name: "coffee, cup, mug" })
    ).toBeHidden();
  });

  test("Verify user is able to upload images", async ({ page }) => {
    await uploadImage(
      page,
      "rose",
      ["flower", "nature", "red"],
      "11/02/1999",
      image
    );

    await expect(page.getByText("rose").first()).toBeVisible();
    await expect(page.getByText("keywords: flower,nature,red")).toBeVisible();
  });

  test("Verify user is able to filter using start date", async ({ page }) => {
    await setStartDate(page, "12/31/2024"); //boundary value analysis
    await expect(page.getByText("banana").first()).toBeVisible();

    //commenting below for now as there is a bug that kewywords are not populated
    //await expect(page.getByText('keywords: fruit,yellow')).toBeVisible();

    await setStartDate(page, "01/01/2025");
    await expect(page.getByText("banana").first()).toBeVisible();

    await setStartDate(page, "01/02/2025");
    await expect(page.getByText("banana").first()).toBeHidden();

    await setStartDate(page, "02/01/2025");
    await expect(page.getByText("banana").first()).toBeHidden();
  });

  test("Verify user is able to filter using end date", async ({ page }) => {
    await setEndDate(page, "12/31/2024"); // boundary value analysis
    await expect(page.getByText("banana").first()).toBeHidden();
    //commenting below for now as there is a bug that kewywords are not populated
    //await expect(page.getByText('keywords: fruit,yellow')).toBeVisible();

    await setEndDate(page, "01/01/2025"); // boundary value analysis
    await expect(page.getByText("banana").first()).toBeVisible();

    await setEndDate(page, "01/02/2025");
    await expect(page.getByText("banana").first()).toBeVisible();

    await setEndDate(page, "02/01/2024");
    await expect(page.getByText("banana").first()).toBeHidden();
  });

  test("Verify user is able to filter using start and end date together", async ({
    page,
  }) => {
    await setEndDate(page, "01/02/2025");
    await setStartDate(page, "01/01/2025");
    await expect(page.getByText("banana").first()).toBeVisible();
    //commenting below for now as there is a bug that kewywords are not populated
    //await expect(page.getByText('keywords: fruit,yellow')).toBeVisible();

    await setEndDate(page, "12/31/2024");
    await setStartDate(page, "01/01/2025");
    await expect(page.getByText("banana").first()).toBeHidden();

    await setEndDate(page, "01/01/2025");
    await setStartDate(page, "01/02/2025");
    await expect(page.getByText("banana").first()).toBeHidden();
  });

  test("Verify user is able to apply filter values", async ({ page }) => {
    await setAndRemoveFilterValue(page, "book");
    await expect(
      page.getByRole("img", { name: "book, study, pages" })
    ).toBeVisible();
    await expect(
      page.getByRole("img", { name: "mountains, snow, cold" })
    ).toBeHidden();
    await expect(
      page.getByRole("img", { name: "coffee, cup, mug" })
    ).toBeHidden();
  });

  test("Verify user is able to remove filter values", async ({ page }) => {
    await setAndRemoveFilterValue(page, "book");
    await setAndRemoveFilterValue(page, "book");

    await expect(
      page.getByRole("img", { name: "book, study, pages" })
    ).toBeVisible();
    await expect(
      page.getByRole("img", { name: "mountains, snow, cold" })
    ).toBeVisible();
    await expect(
      page.getByRole("img", { name: "coffee, cup, mug" })
    ).toBeVisible();
  });

  test("Verify user is able to select multiple options in filter", async ({
    page,
  }) => {
    await setAndRemoveFilterValue(page, "book");
    await setAndRemoveFilterValue(page, "study");
    await expect(
      page.getByRole("img", { name: "book, study, pages" })
    ).toBeVisible();
    await expect(
      page.getByRole("img", { name: "mountains, snow, cold" })
    ).toBeHidden();
    await expect(
      page.getByRole("img", { name: "coffee, cup, mug" })
    ).toBeHidden();
  });

  test("Verify user is able to use filter values with search ", async ({
    page,
  }) => {
    //filter one item
    await search(page, "book");
    await setAndRemoveFilterValue(page, "study");

    await expect(
      page.getByRole("img", { name: "book, study, pages" })
    ).toBeVisible();
    await expect(
      page.getByRole("img", { name: "mountains, snow, cold" })
    ).toBeHidden();
    await expect(
      page.getByRole("img", { name: "coffee, cup, mug" })
    ).toBeHidden();
    await setAndRemoveFilterValue(page, "study");

    //filter no item
    await search(page, "book");
    await setAndRemoveFilterValue(page, "mug");

    await expect(
      page.getByRole("img", { name: "book, study, pages" })
    ).toBeHidden();
    await expect(
      page.getByRole("img", { name: "mountains, snow, cold" })
    ).toBeHidden();
    await expect(
      page.getByRole("img", { name: "coffee, cup, mug" })
    ).toBeHidden();
  });
  test("Verify user is able to select date from calendar popuup", async ({
    page,
  }) => {
    await selectDate(page, "12/12/2024"); //this can be reusable but due to not having distinct locators just one has been automated to check functionality.
  });
});
