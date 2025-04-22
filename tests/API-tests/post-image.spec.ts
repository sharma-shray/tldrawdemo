import { test, expect } from "@playwright/test";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000/"; //technically we need to have this in env variable but maybe you dont have that so just to be sure

// Sample data for POST requests
const testImage = {
  title: "Test Image",
  image:
    "https://fastly.picsum.photos/id/63/5000/2813.jpg?hmac=HvaeSK6WT-G9bYF_CyB2m1ARQirL8UMnygdU9W6PDvM",
  keywords: ["nature", "test"],
  uploadDate: "1999-11-02T16:11:05.095Z",
};

test("POST /api/images - Add a new image and validate response structure and values", async ({
  request,
}) => {
  const response = await request.post(`${BASE_URL}/api/images`, {
    data: testImage,
  });

  // Validate response status
  expect(response.status()).toBe(201);

  if (response.status() === 201) {
    const createdImage = await response.json();
    console.log("Expected:", testImage);
    console.log("Received:", createdImage);

    // Validate response structure
    expect(createdImage).toHaveProperty("id");
    expect(createdImage).toHaveProperty("title");
    expect(createdImage).toHaveProperty("image");
    expect(createdImage).toHaveProperty("keywords");
    expect(createdImage).toHaveProperty("uploadDate");

    // Validate data types
    expect(typeof createdImage.id).toBe("string");
    expect(typeof createdImage.title).toBe("string");
    expect(typeof createdImage.image).toBe("string");
    expect(Array.isArray(createdImage.keywords)).toBeTruthy();
    expect(typeof createdImage.uploadDate).toBe("string");

    // Validate exact values
    expect(createdImage.title).toBe(testImage.title);
    expect(createdImage.image).toBe(testImage.image);
    expect(new Set(createdImage.keywords)).toEqual(new Set(testImage.keywords)); // Ensure order-independent match
    expect(createdImage.uploadDate).toBe(testImage.uploadDate);
  }
});

// Test to POST a duplicate image
test("POST /api/images - Add multiple images with the same details", async ({
  request,
}) => {
  let response = await request.post(`${BASE_URL}/api/images`, {
    data: testImage,
  });

  // Validate response status
  expect(response.status()).toBe(201);

  response = await request.post(`${BASE_URL}/api/images`, {
    data: testImage,
  });

  // Validate response status
  expect(response.status()).toBe(201);
});

// Test to POST a new image numeric title
test("POST /api/images - Add a new image with numeric title", async ({
  request,
}) => {
  const dummytestImage = { ...testImage };
  dummytestImage.title = "12345";
  const response = await request.post(`${BASE_URL}/api/images`, {
    data: dummytestImage,
  });

  // Validate response status
  expect(response.status()).toBe(201);
});

// Test to POST a new image special char title
test("POST /api/images - Add a new image with special char title", async ({
  request,
}) => {
  const dummytestImage = { ...testImage };
  dummytestImage.title = "!@#$";
  const response = await request.post(`${BASE_URL}/api/images`, {
    data: dummytestImage,
  });

  // Validate response status
  expect(response.status()).toBe(201);
});

// Test to POST a new image numeric keyword
test("POST /api/images - Add a new image with numeric keyword", async ({
  request,
}) => {
  const dummytestImage = { ...testImage };
  dummytestImage.keywords = ["1234"];
  const response = await request.post(`${BASE_URL}/api/images`, {
    data: dummytestImage,
  });

  // Validate response status
  expect(response.status()).toBe(201);
});

// Test to POST a new image special char keyword
test("POST /api/images - Add a new image with special char keyword", async ({
  request,
}) => {
  const dummytestImage = { ...testImage };
  dummytestImage.keywords = ["!@#$"];
  const response = await request.post(`${BASE_URL}/api/images`, {
    data: dummytestImage,
  });

  // Validate response status
  expect(response.status()).toBe(201);
});

// Test to POST a new image missing title
test("POST /api/images - Add a new image with missing title", async ({
  request,
}) => {
  // remove one field at a time
  const withoutTitle = {
    image:
      "https://fastly.picsum.photos/id/63/5000/2813.jpg?hmac=HvaeSK6WT-G9bYF_CyB2m1ARQirL8UMnygdU9W6PDvM",
    keywords: ["nature", "test"],
    uploadDate: "1999-11-02T16:11:05.095Z",
  };

  const response = await request.post(`${BASE_URL}/api/images`, {
    data: withoutTitle,
  });

  //  Check response status
  expect(response.status()).toBe(400);

  //  Check error message
  const responseBody = await response.json();
  expect(responseBody).toHaveProperty("error");
  expect(responseBody.error).toBe(
    "Missing title, image, keywords or upload date"
  );
});

// Test to POST a new image long title
test("POST /api/images - Add a new image with long title", async ({
  request,
}) => {
  // remove one field at a time
  const withoutTitle = {
    title: "Longgggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    image:
      "https://fastly.picsum.photos/id/63/5000/2813.jpg?hmac=HvaeSK6WT-G9bYF_CyB2m1ARQirL8UMnygdU9W6PDvM",
    keywords: ["nature", "test"],
    uploadDate: "1999-11-02T16:11:05.095Z",
  };

  const response = await request.post(`${BASE_URL}/api/images`, {
    data: withoutTitle,
  });

  //  Check response status
  expect(response.status()).toBe(201);
});

test("POST /api/images - Add a new image with missing image", async ({
  request,
}) => {
  // object without image
  const withoutImage = {
    title: "Test Image",
    keywords: ["nature", "test"],
    uploadDate: "1999-11-02T16:11:05.095Z",
  };
  const response = await request.post(`${BASE_URL}/api/images`, {
    data: withoutImage,
  });

  //  Check response status
  expect(response.status()).toBe(400);

  //  Check error message
  const responseBody = await response.json();
  expect(responseBody).toHaveProperty("error");
  expect(responseBody.error).toBe(
    "Missing title, image, keywords or upload date"
  );
});

test("POST /api/images - Add a new image with missing keywords", async ({
  request,
}) => {
  // object without keywords
  const withoutKeywords = {
    title: "Test Image",
    image:
      "https://fastly.picsum.photos/id/63/5000/2813.jpg?hmac=HvaeSK6WT-G9bYF_CyB2m1ARQirL8UMnygdU9W6PDvM",
    uploadDate: "1999-11-02T16:11:05.095Z",
  };
  const response = await request.post(`${BASE_URL}/api/images`, {
    data: withoutKeywords,
  });

  //  Check response status
  expect(response.status()).toBe(400);

  //  Check error message
  const responseBody = await response.json();
  expect(responseBody).toHaveProperty("error");
  expect(responseBody.error).toBe(
    "Missing title, image, keywords or upload date"
  );
});

test("POST /api/images - Add a new image with missing date", async ({
  request,
}) => {
  // object without date
  const withoutDate = {
    title: "Test Image",
    image:
      "https://fastly.picsum.photos/id/63/5000/2813.jpg?hmac=HvaeSK6WT-G9bYF_CyB2m1ARQirL8UMnygdU9W6PDvM",
    keywords: ["nature", "test"],
  };
  const response = await request.post(`${BASE_URL}/api/images`, {
    data: withoutDate,
  });

  //  Check response status
  expect(response.status()).toBe(400);

  //  Check error message
  const responseBody = await response.json();
  expect(responseBody).toHaveProperty("error");
  expect(responseBody.error).toBe(
    "Missing title, image, keywords or upload date"
  );
});

// Test to POST a new image with future date
test("POST /api/images - Add a new image with future date", async ({
  request,
}) => {
  const dummytestImage = { ...testImage };
  dummytestImage.uploadDate = "2525-11-02T16:11:05.095Z";
  const response = await request.post(`${BASE_URL}/api/images`, {
    data: dummytestImage,
  });

  // Validate response status
  expect(response.status()).toBe(201);
});

// Test to POST a new image with current date
test("POST /api/images - Add a new image with current date", async ({
  request,
}) => {
  const dummytestImage = { ...testImage };
  dummytestImage.uploadDate = new Date().toISOString();
  const response = await request.post(`${BASE_URL}/api/images`, {
    data: dummytestImage,
  });

  // Validate response status
  expect(response.status()).toBe(201);
});

// Test to POST a new image with current date
test("POST /api/images - Add a new image with invalid date", async ({
  request,
}) => {
  const dummytestImage = { ...testImage };
  dummytestImage.uploadDate = "2525-12-41T16:11:05.095Z";
  const response = await request.post(`${BASE_URL}/api/images`, {
    data: dummytestImage,
  });

  // Validate response status
  expect(response.status()).toBe(201);
});
