# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: productsPage.spec.js >> Products Page >> validate product detail page shows price, availability, and category
- Location: tests\productsPage.spec.js:44:3

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: locator('.product-information')
Timeout: 5000ms
- Expected substring  -  1
+ Received string     + 19

- Price
+
+ 								
+ 								Blue Top
+ 								Category: Women > Tops
+ 								
+ 								
+ 									Rs. 500
+ 									Quantity:
+ 									
+ 									
+ 									
+ 										
+ 										Add to cart
+ 									
+ 								
+ 								Availability: In Stock
+ 								Condition: New
+ 								Brand:  Polo
+ 							

Call log:
  - Expect "toContainText" with timeout 5000ms
  - waiting for locator('.product-information')
    5 × locator resolved to <div class="product-information">…</div>
      - unexpected value "
								
								Blue Top
								Category: Women > Tops
								
								
									Rs. 500
									Quantity:
									
									
									
										
										Add to cart
									
								
								Availability: In Stock
								Condition: New
								Brand: Polo
							"
    9 × locator resolved to <div class="product-information">…</div>
      - unexpected value "
								
								Blue Top
								Category: Women > Tops
								
								
									Rs. 500
									Quantity:
									
									
									
										
										Add to cart
									
								
								Availability: In Stock
								Condition: New
								Brand:  Polo
							"

```

```yaml
- img "ecommerce website products"
- heading "Blue Top" [level=2]
- paragraph: "Category: Women > Tops"
- img "ecommerce website products"
- text: "Rs. 500 Quantity:"
- spinbutton: "1"
- button " Add to cart"
- paragraph: "Availability: In Stock"
- paragraph: "Condition: New"
- paragraph:
  - text: "Brand:"
  - link "Polo":
    - /url: "#"
    - img
    - text: Polo
```

# Test source

```ts
  1  | const { test, expect } = require("@playwright/test");
  2  | 
  3  | const BASE_URL = "https://www.automationexercise.com/";
  4  | 
  5  | test.describe("Products Page", () => {
  6  | 
  7  |   test.beforeEach(async ({ page }) => {
  8  |     await page.goto(BASE_URL);
  9  |     await page.getByRole("link", { name: "Products" }).click();
  10 |     await expect(page).toHaveURL(/products/);
  11 |   });
  12 | 
  13 |   test("validate 'All Products' heading is visible", async ({ page }) => {
  14 |     await expect(page.getByRole("heading", { name: "All Products" })).toBeVisible();
  15 |   });
  16 | 
  17 |   test("validate product list is populated", async ({ page }) => {
  18 |     const products = page.locator(".product-image-wrapper");
  19 |     expect(await products.count()).toBeGreaterThan(0);
  20 |   });
  21 | 
  22 |   test("validate search product functionality returns results", async ({ page }) => {
  23 |     await page.locator("#search_product").fill("Dress");
  24 |     await page.locator("#submit_search").click();
  25 |     await expect(page.getByText("Searched Products")).toBeVisible();
  26 |     const results = page.locator(".product-image-wrapper");
  27 |     expect(await results.count()).toBeGreaterThan(0);
  28 |   });
  29 | 
  30 |   test("validate search with a non-existent product shows no results", async ({ page }) => {
  31 |     await page.locator("#search_product").fill("zzzzNoSuchProduct9999");
  32 |     await page.locator("#submit_search").click();
  33 |     await expect(page.getByText("Searched Products")).toBeVisible();
  34 |     const results = page.locator(".product-image-wrapper");
  35 |     expect(await results.count()).toBe(0);
  36 |   });
  37 | 
  38 |   test("validate clicking 'View Product' navigates to product detail page", async ({ page }) => {
  39 |     await page.locator(".product-image-wrapper a", { hasText: "View Product" }).first().click();
  40 |     await expect(page).toHaveURL(/product_details/);
  41 |     await expect(page.locator(".product-information h2")).toBeVisible();
  42 |   });
  43 | 
  44 |   test("validate product detail page shows price, availability, and category", async ({ page }) => {
  45 |     await page.locator(".product-image-wrapper a", { hasText: "View Product" }).first().click();
> 46 |     await expect(page.locator(".product-information")).toContainText("Price");
     |                                                        ^ Error: expect(locator).toContainText(expected) failed
  47 |     await expect(page.locator(".product-information")).toContainText("Availability");
  48 |     await expect(page.locator(".product-information")).toContainText("Category");
  49 |   });
  50 | 
  51 |   test("validate quantity can be updated on product detail page", async ({ page }) => {
  52 |     await page.locator(".product-image-wrapper a", { hasText: "View Product" }).first().click();
  53 |     const quantityInput = page.locator("#quantity");
  54 |     await quantityInput.fill("4");
  55 |     await expect(quantityInput).toHaveValue("4");
  56 |   });
  57 | 
  58 |   test("validate left sidebar category list is visible", async ({ page }) => {
  59 |     const categorySidebar = page.locator(".left-sidebar");
  60 |     await expect(categorySidebar).toBeVisible();
  61 |     await expect(categorySidebar.getByText("Category")).toBeVisible();
  62 |   });
  63 | 
  64 | });
  65 | 
```