const { test, expect } = require("@playwright/test");

const BASE_URL = "https://www.automationexercise.com/";

test.describe("Contact Us Page", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    await page.getByRole("link", { name: "Contact us" }).click();
    await expect(page).toHaveURL(/contact_us/);
  });

  test("validate 'Get In Touch' heading is visible", async ({ page }) => {
    await expect(page.getByText("Get In Touch")).toBeVisible();
  });

  test("validate contact form fields are visible", async ({ page }) => {
    await expect(page.locator('input[data-qa="name"]')).toBeVisible();
    await expect(page.locator('input[data-qa="email"]')).toBeVisible();
    await expect(page.locator('input[data-qa="subject"]')).toBeVisible();
    await expect(page.locator('textarea[data-qa="message"]')).toBeVisible();
  });

  test("validate submitting the contact form shows a success message", async ({ page }) => {
    await page.locator('input[data-qa="name"]').fill("QA Tester");
    await page.locator('input[data-qa="email"]').fill(`qa_test_${Date.now()}@example.com`);
    await page.locator('input[data-qa="subject"]').fill("Automated Test Subject");
    await page.locator('textarea[data-qa="message"]').fill("This is an automated Playwright test message.");

    page.once("dialog", (dialog) => dialog.accept());
    await page.locator('input[name="submit"]').click();

    await expect(page.getByText("Success! Your details have been submitted successfully.")).toBeVisible();
  });

  test("validate 'Home' button on success page navigates back to homepage", async ({ page }) => {
    await page.locator('input[data-qa="name"]').fill("QA Tester");
    await page.locator('input[data-qa="email"]').fill(`qa_test_${Date.now()}@example.com`);
    await page.locator('input[data-qa="subject"]').fill("Automated Test Subject");
    await page.locator('textarea[data-qa="message"]').fill("This is an automated Playwright test message.");

    page.once("dialog", (dialog) => dialog.accept());
    await page.locator('input[name="submit"]').click();

    await page.locator("#form-section a.btn-success").click();
    await expect(page).toHaveURL(BASE_URL);
  });

});
