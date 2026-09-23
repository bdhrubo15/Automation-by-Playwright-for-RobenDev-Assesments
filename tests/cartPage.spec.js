const { test, expect } = require("@playwright/test");

const BASE_URL = "https://www.automationexercise.com/";

test.describe("Cart Page", () => {

  test("validate adding a product from Products page updates the cart", async ({ page }) => {
    await page.goto(`${BASE_URL}products`);
    await page.locator(".product-image-wrapper .product-overlay .add-to-cart").first().click();
    await expect(page.getByText("Your product has been added to cart!")).toBeVisible();
  });

  test("validate 'Continue Shopping' closes the add-to-cart modal", async ({ page }) => {
    await page.goto(`${BASE_URL}products`);
    await page.locator(".product-image-wrapper .product-overlay .add-to-cart").first().click();
    await page.getByRole("button", { name: "Continue Shopping" }).click();
    await expect(page.locator(".modal-content")).not.toBeVisible();
  });

  test("validate navigating to cart shows the added product", async ({ page }) => {
    await page.goto(`${BASE_URL}products`);
    const firstProductName = await page.locator(".product-image-wrapper .productinfo p").first().innerText();
    await page.locator(".product-image-wrapper .product-overlay .add-to-cart").first().click();
    await page.getByRole("link", { name: "View Cart" }).click();
    await expect(page).toHaveURL(/view_cart/);
    await expect(page.locator("#cart_info")).toContainText(firstProductName);
  });

  test("validate cart displays correct quantity for added product", async ({ page }) => {
    await page.goto(`${BASE_URL}product_details/1`);
    await page.locator("#quantity").fill("3");
    await page.locator("button", { hasText: "Add to cart" }).click();
    await page.getByRole("link", { name: "View Cart" }).click();
    const quantityCell = page.locator(".cart_quantity button").first();
    await expect(quantityCell).toHaveText("3");
  });

  test("validate removing a product from the cart", async ({ page }) => {
    await page.goto(`${BASE_URL}products`);
    await page.locator(".product-image-wrapper .product-overlay .add-to-cart").first().click();
    await page.getByRole("link", { name: "View Cart" }).click();
    await expect(page.locator("#cart_info_table tbody tr")).toHaveCount(1);
    await page.locator(".cart_quantity_delete").first().click();
    await expect(page.locator("#cart_info_table tbody tr")).toHaveCount(0);
  });

  test("validate empty cart shows an appropriate message", async ({ page }) => {
    await page.goto(`${BASE_URL}view_cart`);
    const rows = page.locator("#cart_info_table tbody tr");
    if (await rows.count() === 0) {
      await expect(page.getByText("Cart is empty!")).toBeVisible();
    }
  });

  test("validate 'Proceed To Checkout' is visible when cart has items", async ({ page }) => {
    await page.goto(`${BASE_URL}products`);
    await page.locator(".product-image-wrapper .product-overlay .add-to-cart").first().click();
    await page.getByRole("link", { name: "View Cart" }).click();
    await expect(page.getByText("Proceed To Checkout")).toBeVisible();
  });

});
