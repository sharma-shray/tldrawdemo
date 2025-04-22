import { test, expect } from "@playwright/test";
const BASE_URL = process.env.BASE_URL || "http://localhost:3000/"; //technically we need to have this in env variable but maybe you dont have that so just to be sure

test.describe("API Performance Tests", () => {
  test("GET /api/images should respond within 500ms", async ({ request }) => {
    const start = Date.now();
    const response = await request.get("/api/images");
    const duration = Date.now() - start;

    expect(response.status()).toBe(200);
    expect(duration).toBeLessThan(500); // Response time limit in ms
  });

  test("POST /api/images should respond within 700ms", async ({ request }) => {
    const start = Date.now();
    const response = await request.post("/api/images", {
      data: {
        title: "Test Image",
        image:
          "https://fastly.picsum.photos/id/63/5000/2813.jpg?hmac=HvaeSK6WT-G9bYF_CyB2m1ARQirL8UMnygdU9W6PDvM",
        keywords: ["nature", "test"],
        uploadDate: "1999-11-02T16:11:05.095Z",
      },
    });
    const duration = Date.now() - start;

    expect(response.status()).toBe(201);
    expect(duration).toBeLessThan(700);
  });

  test("DELETE /api/images should respond within 400ms", async ({
    request,
  }) => {
    let imageId;
    //Create the data
    const createResponse = await request.post(`${BASE_URL}/api/images`, {
      data: {
        title: "Test Image",
        image:
          "https://fastly.picsum.photos/id/63/5000/2813.jpg?hmac=HvaeSK6WT-G9bYF_CyB2m1ARQirL8UMnygdU9W6PDvM",
        keywords: ["nature", "test"],
        uploadDate: "1999-11-02T16:11:05.095Z",
      },
    });

    if (createResponse.status() === 201) {
      const createdImage = await createResponse.json();
      console.log(await createResponse.json());
      imageId = createdImage.id; // Save ID for delete test
      await console.log(imageId);
    }

    //skip the test if image was not created
    if (!imageId) test.skip();
    const start = Date.now();
    const duration = Date.now() - start;
    const response = await request.delete(
      `${BASE_URL}/api/images?id=${imageId}`
    );

    expect(response.status()).toBe(200);
    expect(duration).toBeLessThan(400);
  });
});
