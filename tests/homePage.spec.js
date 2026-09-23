const { test, expect } = require("@playwright/test");

const BASE_URL = "https://www.automationexercise.com/";

test.describe("Home Page", () => {

  test("validate AutomationExercise website title", async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page).toHaveTitle(/Automation Exercise/);
  });

  test("validate page loads successfully (200 OK)", async ({ page }) => {
    const response = await page.goto(BASE_URL);
    expect(response.status()).toBeLessThan(400);
  });

  test("validate AutomationExercise logo is visible in header", async ({ page }) => {
    await page.goto(BASE_URL);
    const logo = page.locator("a.navbar-brand img");
    await expect(logo).toBeVisible();
  });

  test("validate main navigation menu is visible", async ({ page }) => {
    await page.goto(BASE_URL);
    const nav = page.locator(".navbar-nav").first();
    await expect(nav).toBeVisible();
  });

  test("validate key navigation links are present", async ({ page }) => {
    await page.goto(BASE_URL);
    const expectedLinks = ["Home", "Products", "Cart", "Signup / Login", "Test Cases", "Contact us"];
    for (const linkText of expectedLinks) {
      const link = page.locator(".navbar-nav").getByRole("link", { name: linkText, exact: false }).first();
      await expect(link).toBeVisible();
    }
  });

  test("validate carousel/slider is visible on homepage", async ({ page }) => {
    await page.goto(BASE_URL);
    const carousel = page.locator("#slider");
    await expect(carousel).toBeVisible();
  });

  test("validate 'Features Items' section is visible", async ({ page }) => {
    await page.goto(BASE_URL);
    const featuresHeading = page.getByText("Features Items", { exact: false });
    await expect(featuresHeading).toBeVisible();
  });

  test("validate at least one product card is visible on homepage", async ({ page }) => {
    await page.goto(BASE_URL);
    const productCards = page.locator(".product-image-wrapper");
    await expect(productCards.first()).toBeVisible();
    expect(await productCards.count()).toBeGreaterThan(0);
  });

  test("validate subscription section is visible in footer", async ({ page }) => {
    await page.goto(BASE_URL);
    await page.locator("#susbscribe_email").scrollIntoViewIfNeeded();
    const subscribeHeading = page.getByText("Subscription", { exact: false });
    await expect(subscribeHeading).toBeVisible();
    await expect(page.locator("#susbscribe_email")).toBeVisible();
  });

  test("validate scroll up arrow appears after scrolling down", async ({ page }) => {
    await page.goto(BASE_URL);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    const scrollUpBtn = page.locator("#scrollUp");
    await expect(scrollUpBtn).toBeVisible();
  });

});
