const { test, expect } = require("@playwright/test");

const BASE_URL = "https://www.automationexercise.com/";

test.describe("Products Page", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    await page.getByRole("link", { name: "Products" }).click();
    await expect(page).toHaveURL(/products/);
  });

  test("validate 'All Products' heading is visible", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "All Products" })).toBeVisible();
  });

  test("validate product list is populated", async ({ page }) => {
    const products = page.locator(".product-image-wrapper");
    expect(await products.count()).toBeGreaterThan(0);
  });

  test("validate search product functionality returns results", async ({ page }) => {
    await page.locator("#search_product").fill("Dress");
    await page.locator("#submit_search").click();
    await expect(page.getByText("Searched Products")).toBeVisible();
    const results = page.locator(".product-image-wrapper");
    expect(await results.count()).toBeGreaterThan(0);
  });

  test("validate search with a non-existent product shows no results", async ({ page }) => {
    await page.locator("#search_product").fill("zzzzNoSuchProduct9999");
    await page.locator("#submit_search").click();
    await expect(page.getByText("Searched Products")).toBeVisible();
    const results = page.locator(".product-image-wrapper");
    expect(await results.count()).toBe(0);
  });

  test("validate clicking 'View Product' navigates to product detail page", async ({ page }) => {
    await page.locator(".product-image-wrapper a", { hasText: "View Product" }).first().click();
    await expect(page).toHaveURL(/product_details/);
    await expect(page.locator(".product-information h2")).toBeVisible();
  });

  test("validate product detail page shows price, availability, and category", async ({ page }) => {
    await page.locator(".product-image-wrapper a", { hasText: "View Product" }).first().click();
    await expect(page.locator(".product-information")).toContainText("Price");
    await expect(page.locator(".product-information")).toContainText("Availability");
    await expect(page.locator(".product-information")).toContainText("Category");
  });

  test("validate quantity can be updated on product detail page", async ({ page }) => {
    await page.locator(".product-image-wrapper a", { hasText: "View Product" }).first().click();
    const quantityInput = page.locator("#quantity");
    await quantityInput.fill("4");
    await expect(quantityInput).toHaveValue("4");
  });

  test("validate left sidebar category list is visible", async ({ page }) => {
    const categorySidebar = page.locator(".left-sidebar");
    await expect(categorySidebar).toBeVisible();
    await expect(categorySidebar.getByText("Category")).toBeVisible();
  });

});
