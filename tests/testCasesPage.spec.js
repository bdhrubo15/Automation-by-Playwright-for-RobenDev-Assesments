const { test, expect } = require("@playwright/test");

const BASE_URL = "https://www.automationexercise.com/";

test.describe("Test Cases Page", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    await page.getByRole("link", { name: "Test Cases" }).click();
    await expect(page).toHaveURL(/test_cases/);
  });

  test("validate 'Test Cases' heading is visible", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Test Cases" })).toBeVisible();
  });

  test("validate the test case list is populated", async ({ page }) => {
    const testCaseItems = page.locator(".panel-group .panel-default");
    expect(await testCaseItems.count()).toBeGreaterThan(0);
  });

  test("validate each listed test case has a visible title", async ({ page }) => {
    const firstCaseTitle = page.locator(".panel-title").first();
    await expect(firstCaseTitle).toBeVisible();
    await expect(firstCaseTitle).not.toBeEmpty();
  });

});
