import { test, expect } from "@playwright/test";
import { createTestImage } from "../library/utils/helper";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000/"; //technically we need to have this in env variable but maybe you dont have that so just to be sure

// Sample data for POST requests
const testImage = {
  title: "Test Image",
  image:
    "https://fastly.picsum.photos/id/63/5000/2813.jpg?hmac=HvaeSK6WT-G9bYF_CyB2m1ARQirL8UMnygdU9W6PDvM",
  keywords: ["nature", "test"],
  uploadDate: "1999-11-02T16:11:05.095Z",
};

// Test to DELETE an image (only if a POST request was successful dont want to delete old data)
test("DELETE /api/images- Delete an image", async ({ request }) => {
  // create required test data
  const imageId: string | null = await createTestImage(
    request,
    BASE_URL,
    testImage
  );

  //skip the test if image was not created
  if (!imageId) test.skip();

  const response = await request.delete(`${BASE_URL}/api/images?id=${imageId}`);
  // Validate response status
  expect(response.status()).toBe(200);
});

// Test to DELETE an image with incorrect ID
test("DELETE /api/images- Delete an image with incorrect id", async ({
  request,
}) => {
  const response = await request.delete(`${BASE_URL}/api/images?id=123`);
  // Validate response status
  expect(response.status()).toBe(404);
});
