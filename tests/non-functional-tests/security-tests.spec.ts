import { test, expect } from "@playwright/test";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000/"; //technically we need to have this in env variable but maybe you dont have that so just to be sure

//SQL injection
const maliciousInputs = ["' OR 1=1 --", "<script>alert('Hacked!')</script>"];

for (const input of maliciousInputs) {
  test(`POST /api/images - Prevent SQL/XSS Injection (${input})`, async ({
    request,
  }) => {
    const response = await request.post(`${BASE_URL}/api/images`, {
      data: {
        title: input,
        image: "https://example.com/valid.jpg",
        keywords: ["test"],
        uploadDate: "1999-11-02T16:11:05.095Z",
      },
    });

    expect(response.status()).toBe(400);
  });
}

//Rate limiting
test("POST /api/images - Check rate limiting", async ({ request }) => {
  for (let i = 0; i < 20; i++) {
    // Sends multiple rapid requests
    const response = await request.post(`/api/images`, {
      data: {
        title: `Spam Image ${i}`,
        image: "https://example.com/spam.jpg",
        keywords: ["spam"],
        uploadDate: "1999-11-02T16:11:05.095Z",
      },
    });

    if (i > 10) {
      // APi should start blocking rapid requests, 10 is a random number as this has not been exposed in the question
      expect(response.status()).toBe(429);
      break;
    }
  }
});

//  invalid images
const invalidImages = [
  "invalid-image",
  "ftp://malicious.com/image.jpg",
  "data:image/png;base64,INVALID",
];

for (const image of invalidImages) {
  test(`POST /api/images - Reject invalid image URL (${image})`, async ({
    request,
  }) => {
    const response = await request.post(`/api/images`, {
      data: {
        title: "Bad Image",
        image: image,
        keywords: ["invalid"],
        uploadDate: "1999-11-02T16:11:05.095Z",
      },
    });

    // Ensure invalid images are blocked
    expect(response.status()).toBe(400);
  });
}

// API should reject adding fields
test("POST /api/images - Prevent mass assignment (e.g., changing roles)", async ({
  request,
}) => {
  const response = await request.post(`/api/images`, {
    data: {
      title: "Exploit Test",
      image: "https://example.com/exploit.jpg",
      keywords: ["exploit"],
      role: "admin",
      uploadDate: "1999-11-02T16:11:05.095Z",
    },
  });

  // Ensure unauthorized fields are ignored or rejected
  expect(response.status()).toBe(400);
});
