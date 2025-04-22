import { test, expect } from "@playwright/test";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000/"; //technically we need to have this in env variable but maybe you dont have that so just to be sure

// Test to GET images with optional keyword filtering
test("GET /api/images - Retrieve all images and validate response structure", async ({
  request,
}) => {
  const response = await request.get(`${BASE_URL}/api/images`);

  // Validate response status
  expect(response.status()).toBe(200);
  const images = await response.json();

  // Ensure response is an array
  expect(Array.isArray(images)).toBeTruthy();

  //  Check each image in the array
  for (const image of images) {
    // Ensure all required properties exist
    expect(image).toHaveProperty("id");
    expect(image).toHaveProperty("title");
    expect(image).toHaveProperty("image");
    expect(image).toHaveProperty("keywords");
    expect(image).toHaveProperty("uploadDate");

    // Validate data types
    expect(typeof image.id).toBe("string");
    expect(typeof image.title).toBe("string");
    expect(typeof image.image).toBe("string");
    expect(Array.isArray(image.keywords)).toBeTruthy();
    expect(typeof image.uploadDate).toBe("string");

    // Ensure uploadDate is not empty
    expect(image.uploadDate.trim()).not.toBe("");
  }
});

// Test GET images with keyword filtering
test("GET /api/images - Retrieve keyword filtered images", async ({
  request,
}) => {
  const response = await request.get(`${BASE_URL}/api/images?keyword=study`);
  expect(response.status()).toBe(200);

  if (response.status() === 200) {
    const images = await response.json();
    // Validate response status
    expect(Array.isArray(images)).toBeTruthy();

    for (const image of images) {
      // Ensure all required properties exist
      expect(image).toHaveProperty("id");
      expect(image).toHaveProperty("title");
      expect(image).toHaveProperty("image");
      expect(image).toHaveProperty("keywords");
      expect(image).toHaveProperty("uploadDate");

      // Validate data types
      expect(typeof image.id).toBe("string");
      expect(typeof image.title).toBe("string");
      expect(typeof image.image).toBe("string");
      expect(Array.isArray(image.keywords)).toBeTruthy();
      expect(typeof image.uploadDate).toBe("string");

      // Validate filteration
      expect(image.keywords).toContain("study");
    }
  }
});

// Test GET images with multiple matching keywords
test("GET /api/images - Retrieve multiple images with multiple keywords ", async ({
  request,
}) => {
  const response = await request.get(
    `${BASE_URL}/api/images?keyword=[book,study]`
  );
  expect(response.status()).toBe(200);

  if (response.status() === 200) {
    const images = await response.json();
    expect(images.length).toBeGreaterThan(0);

    for (const image of images) {
      // Ensure both keywords are present in the image's keywords
      expect(image.keywords).toContain("book");
      expect(image.keywords).toContain("study");
    }
  }
});

// Test GET images with matching title but not keyword filtering
test("GET /api/images - Retrieve image with matching title but not keyword ", async ({
  request,
}) => {
  const response = await request.get(`${BASE_URL}/api/images?keyword=123`);
  expect(response.status()).toBe(200);

  if (response.status() === 200) {
    const images = await response.json();
    expect(images).toBeTruthy();

    for (const image of images) {
      expect(image.keywords).toContain("123");
    }
    console.log(images);
  }
});

// Test GET images with special char keyword filtering
test("GET /api/images - Retrieve keyword special char filtered images", async ({
  request,
}) => {
  const response = await request.get(`${BASE_URL}/api/images?keyword=!@#$`);
  expect(response.status()).toBe(200);

  if (response.status() === 200) {
    const images = await response.json();
    expect(Array.isArray(images)).toBeTruthy();
    console.log(images);
  }
});

// Test GET images with numeric keyword filtering
test("GET /api/images - Retrieve keyword with numeric filtered images", async ({
  request,
}) => {
  const response = await request.get(`${BASE_URL}/api/images?keyword=123`);
  expect(response.status()).toBe(200);

  if (response.status() === 200) {
    const images = await response.json();
    expect(images).toBeTruthy();
    console.log(images);
  }
});

// Test GET images with huge and no matching keyword size
test("GET /api/images - Retrieve keyword with huge and no matching keyword ", async ({
  request,
}) => {
  const response = await request.get(
    `${BASE_URL}/api/images?keyword=asdasdasdasdsadasdsadasdsdas`
  );
  expect(response.status()).toBe(200);

  if (response.status() === 200) {
    const images = await response.json();
    expect(images).toBeTruthy();
    console.log(images);
  }
});

// Test GET images with incorrect keyword filtering
test("GET /api/images incorrect keyword", async ({ request }) => {
  const response = await request.get(`${BASE_URL}/api/images?keyword=`);
  expect(response.status()).toBe(400); // 400
});
