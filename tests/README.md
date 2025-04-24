Test Suite Documentation

Overview

This repository contains various test suites designed to ensure the quality, functionality,security and performance of the application. The tests are categorized into different sections for better organization.

Directory Structure

tests/
├── API-tests/
├── library/
├── non-functional-tests/
├── UI-tests/
├── bugs/
├── README.md

📌 Test Categories
🔹 API Tests
Contains test cases that:
✔ Validate API endpoints.
✔ Ensure correct request/response behavior.

🔹 Library
Includes reusable utility functions and test helpers, following the Page Object Model (POM) for maintainability.

🔹 Non-Functional Tests
Tests for evaluating:
✔ Performance (load handling, response times).
✔ Security (vulnerability checks).

🔹 UI Tests
End-to-end automation scripts to validate:
✔ User interactions.
✔ Front-end behavior.
✔ Currently covers Chrome , but has been tested also with mozilla. (Uncomment respective parts in playwright.config.js)

🔹 Bugs
Documents automation script failures, including:
✔ A list of known issues found during execution.
✔ Specific test scripts expected to fail when running the suite.

⚙️ Getting Started
Before running the tests, ensure you have the following installed:
✅ Node.js
✅ npm (Comes with Node.js)
✅ Playwright

To install dependencies, run:

```bash
npm install
npx playwright install
```

🚀 Running Playwright Tests
The application under test needs to be started separately.Please restrat before each run for clean state and test data.

🔹 Run API Tests

```bash
npm run test:api
```

🔹 Run UI Tests

```bash
npm run test:ui
```

🔹 Run tldraw Tests

```bash
npm run test:tldraw
```

🔹 Run VRT Tests

```bash
npm run test:vrt
```

Note for Kirsti: the tests for the demo application are failing because of bugs in the application, if you try to to run it.
🔹🔹🔹🔹🔹 Run Non-Functional Tests🔹🔹🔹🔹🔹🔹 ( Careful, read below for details)

```bash
npm run test:non-functional
```

📜 Running Non-Functional Tests Properly

To ensure test stability, follow these steps:

✅ Restart the application under test.

✅ Run non-functional tests.

✅ Restart the application under test again before running API/UI tests.

Why?
The application under test is unable to gaurentee a good response time after it has been loaded up with more images, as this is a practise excercise and i am not sure of the SLA's (if any) . the above steps gaurentee stable execution.
