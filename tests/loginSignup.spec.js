const { test, expect } = require("@playwright/test");

const BASE_URL = "https://www.automationexercise.com/";

test.describe("Login / Signup Page", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    await page.getByRole("link", { name: "Signup / Login" }).click();
    await expect(page).toHaveURL(/login/);
  });

  test("validate 'New User Signup!' section is visible", async ({ page }) => {
    await expect(page.getByText("New User Signup!")).toBeVisible();
    await expect(page.locator('input[data-qa="signup-name"]')).toBeVisible();
    await expect(page.locator('input[data-qa="signup-email"]')).toBeVisible();
  });

  test("validate 'Login to your account' section is visible", async ({ page }) => {
    await expect(page.getByText("Login to your account")).toBeVisible();
    await expect(page.locator('input[data-qa="login-email"]')).toBeVisible();
    await expect(page.locator('input[data-qa="login-password"]')).toBeVisible();
  });

  test("validate signup form requires name and email before proceeding", async ({ page }) => {
    const signupButton = page.locator('button[data-qa="signup-button"]');
    await expect(signupButton).toBeVisible();
    const nameField = page.locator('input[data-qa="signup-name"]');
    const emailField = page.locator('input[data-qa="signup-email"]');
    await expect(nameField).toHaveAttribute("required", "");
    await expect(emailField).toHaveAttribute("required", "");
  });

  test("validate error message on login with incorrect credentials", async ({ page }) => {
    await page.locator('input[data-qa="login-email"]').fill(`invalid_${Date.now()}@example.com`);
    await page.locator('input[data-qa="login-password"]').fill("WrongPassword123");
    await page.locator('button[data-qa="login-button"]').click();
    await expect(page.getByText("Your email or password is incorrect!")).toBeVisible();
  });

  test("validate signup redirects to account information page with a new email", async ({ page }) => {
    const uniqueEmail = `qa_test_${Date.now()}@example.com`;
    await page.locator('input[data-qa="signup-name"]').fill("QA Tester");
    await page.locator('input[data-qa="signup-email"]').fill(uniqueEmail);
    await page.locator('button[data-qa="signup-button"]').click();
    await expect(page.getByText("Enter Account Information")).toBeVisible();
  });

  test("validate signup with an already registered email shows error", async ({ page }) => {
    // Uses a placeholder email; replace with a known-registered test account email
    // in your environment for a deterministic assertion.
    await page.locator('input[data-qa="signup-name"]').fill("Existing User");
    await page.locator('input[data-qa="signup-email"]').fill("existing.user@example.com");
    await page.locator('button[data-qa="signup-button"]').click();
    await expect(page.getByText("Email Address already exist!")).toBeVisible();
  });

});
