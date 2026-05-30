import { test, expect } from "@playwright/test";

test.describe("register page", () => {
  test.beforeEach(async ({ page, context }) => {
    await context.clearCookies();
    await page.goto("/register");
  });

  test("shows validation errors on empty submit", async ({ page }) => {
    await page.getByTestId("register-submit").click();
    await expect(page.getByTestId("name-error")).toBeVisible();
    await expect(page.getByTestId("email-error")).toBeVisible();
    await expect(page.getByTestId("password-error")).toBeVisible();
  });

  test("shows error on invalid email format", async ({ page }) => {
    await page.locator("#email").fill("notanemail");
    await page.getByTestId("register-submit").click();
    await expect(page.getByTestId("email-error")).toBeVisible();
  });

  test("shows error when password is too weak", async ({ page }) => {
    await page.locator("#password").fill("weakpassword");
    await page.getByTestId("register-submit").click();
    await expect(page.getByTestId("password-error")).toBeVisible();
  });

  test("shows error when username is too short", async ({ page }) => {
    await page.locator("#name").fill("ab");
    await page.getByTestId("register-submit").click();
    await expect(page.getByTestId("name-error")).toBeVisible();
  });
});
