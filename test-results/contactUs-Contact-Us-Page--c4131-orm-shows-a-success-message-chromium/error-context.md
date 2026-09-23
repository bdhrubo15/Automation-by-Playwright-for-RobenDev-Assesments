# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: contactUs.spec.js >> Contact Us Page >> validate submitting the contact form shows a success message
- Location: tests\contactUs.spec.js:24:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('Success! Your details have been submitted successfully.')
Expected: visible
Error: strict mode violation: getByText('Success! Your details have been submitted successfully.') resolved to 2 elements:
    1) <div class="status alert alert-success">Success! Your details have been submitted success…</div> aka locator('#contact-page').getByText('Success! Your details have')
    2) <div class="alert-success alert">Success! Your details have been submitted success…</div> aka locator('#success-subscribe').getByText('Success! Your details have')

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText('Success! Your details have been submitted successfully.')

```

# Page snapshot

```yaml
- generic [active] [ref=f11e1]:
  - banner [ref=f11e2]:
    - generic [ref=f11e5]:
      - link [ref=f11e8] [cursor=pointer]:
        - /url: /
        - img "Website for automation practice" [ref=f11e9]
      - list [ref=f11e12]:
        - listitem [ref=f11e13]:
          - link " Home" [ref=f11e14] [cursor=pointer]:
            - /url: /
            - generic [ref=f11e15]: 
            - text: Home
        - listitem [ref=f11e16]:
          - link " Products" [ref=f11e17] [cursor=pointer]:
            - /url: /products
            - generic [ref=f11e18]: 
            - text: Products
        - listitem [ref=f11e19]:
          - link " Cart" [ref=f11e20] [cursor=pointer]:
            - /url: /view_cart
            - generic [ref=f11e21]: 
            - text: Cart
        - listitem [ref=f11e22]:
          - link " Signup / Login" [ref=f11e23] [cursor=pointer]:
            - /url: /login
            - generic [ref=f11e24]: 
            - text: Signup / Login
        - listitem [ref=f11e25]:
          - link " Test Cases" [ref=f11e26] [cursor=pointer]:
            - /url: /test_cases
            - generic [ref=f11e27]: 
            - text: Test Cases
        - listitem [ref=f11e28]:
          - link " API Testing" [ref=f11e29] [cursor=pointer]:
            - /url: /api_list
            - generic [ref=f11e30]: 
            - text: API Testing
        - listitem [ref=f11e31]:
          - link " Video Tutorials" [ref=f11e32] [cursor=pointer]:
            - /url: https://www.youtube.com/c/AutomationExercise
            - generic [ref=f11e33]: 
            - text: Video Tutorials
        - listitem [ref=f11e34]:
          - link " Contact us" [ref=f11e35] [cursor=pointer]:
            - /url: /contact_us
            - generic [ref=f11e36]: 
            - text: Contact us
  - generic [ref=f11e37]:
    - heading [level=2] [ref=f11e41]:
      - text: Contact
      - strong [ref=f11e42]: Us
    - generic [ref=f11e43]:
      - generic [ref=f11e45]:
        - generic [ref=f11e46]:
          - text: "Note: Below contact form is for testing purpose."
          - link "Compare Developer Tools" [ref=f11e47] [cursor=pointer]
        - heading "Get In Touch" [level=2] [ref=f11e51]
        - generic [ref=f11e52]: Success! Your details have been submitted successfully.
        - link " Home" [ref=f11e54] [cursor=pointer]:
          - /url: /
          - generic [ref=f11e55]:
            - generic [ref=f11e56]: 
            - text: Home
      - generic [ref=f11e58]:
        - heading "Feedback For Us" [level=2] [ref=f11e59]
        - generic [ref=f11e60]:
          - paragraph [ref=f11e61]: We really appreciate your response to our website.
          - paragraph [ref=f11e62]:
            - text: Kindly share your feedback with us at
            - link "feedback@automationexercise.com" [ref=f11e63] [cursor=pointer]:
              - /url: mailto:feedback@automationexercise.com
            - text: .
          - paragraph [ref=f11e64]: If you have any suggestion areas or improvements, do let us know. We will definitely work on it.
          - paragraph [ref=f11e65]: Thank you
  - insertion [ref=f11e67]:
    - generic [ref=f11e70]:
      - heading "These are topics related to the article that might interest you" [level=2] [ref=f11e72]: Discover more
      - link "API testing framework" [ref=f11e73] [cursor=pointer]
      - link "QA testing services" [ref=f11e78] [cursor=pointer]
      - link "Take Psychology Courses" [ref=f11e83] [cursor=pointer]
  - contentinfo [ref=f11e88]:
    - generic [ref=f11e93]:
      - heading "Subscription" [level=2] [ref=f11e94]
      - generic [ref=f11e95]:
        - textbox "Your email address" [ref=f11e96]
        - button "" [ref=f11e97] [cursor=pointer]
        - paragraph [ref=f11e99]: Get the most recent updates from our site and be updated your self...
    - paragraph [ref=f11e103]: Copyright © 2021 All rights reserved
  - text: 
```

# Test source

```ts
  1  | const { test, expect } = require("@playwright/test");
  2  | 
  3  | const BASE_URL = "https://www.automationexercise.com/";
  4  | 
  5  | test.describe("Contact Us Page", () => {
  6  | 
  7  |   test.beforeEach(async ({ page }) => {
  8  |     await page.goto(BASE_URL);
  9  |     await page.getByRole("link", { name: "Contact us" }).click();
  10 |     await expect(page).toHaveURL(/contact_us/);
  11 |   });
  12 | 
  13 |   test("validate 'Get In Touch' heading is visible", async ({ page }) => {
  14 |     await expect(page.getByText("Get In Touch")).toBeVisible();
  15 |   });
  16 | 
  17 |   test("validate contact form fields are visible", async ({ page }) => {
  18 |     await expect(page.locator('input[data-qa="name"]')).toBeVisible();
  19 |     await expect(page.locator('input[data-qa="email"]')).toBeVisible();
  20 |     await expect(page.locator('input[data-qa="subject"]')).toBeVisible();
  21 |     await expect(page.locator('textarea[data-qa="message"]')).toBeVisible();
  22 |   });
  23 | 
  24 |   test("validate submitting the contact form shows a success message", async ({ page }) => {
  25 |     await page.locator('input[data-qa="name"]').fill("QA Tester");
  26 |     await page.locator('input[data-qa="email"]').fill(`qa_test_${Date.now()}@example.com`);
  27 |     await page.locator('input[data-qa="subject"]').fill("Automated Test Subject");
  28 |     await page.locator('textarea[data-qa="message"]').fill("This is an automated Playwright test message.");
  29 | 
  30 |     page.once("dialog", (dialog) => dialog.accept());
  31 |     await page.locator('input[name="submit"]').click();
  32 | 
> 33 |     await expect(page.getByText("Success! Your details have been submitted successfully.")).toBeVisible();
     |                                                                                             ^ Error: expect(locator).toBeVisible() failed
  34 |   });
  35 | 
  36 |   test("validate 'Home' button on success page navigates back to homepage", async ({ page }) => {
  37 |     await page.locator('input[data-qa="name"]').fill("QA Tester");
  38 |     await page.locator('input[data-qa="email"]').fill(`qa_test_${Date.now()}@example.com`);
  39 |     await page.locator('input[data-qa="subject"]').fill("Automated Test Subject");
  40 |     await page.locator('textarea[data-qa="message"]').fill("This is an automated Playwright test message.");
  41 | 
  42 |     page.once("dialog", (dialog) => dialog.accept());
  43 |     await page.locator('input[name="submit"]').click();
  44 | 
  45 |     await page.locator("#form-section a.btn-success").click();
  46 |     await expect(page).toHaveURL(BASE_URL);
  47 |   });
  48 | 
  49 | });
  50 | 
```