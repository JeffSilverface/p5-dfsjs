import { test, expect } from "@playwright/test";

test.describe("login page", () => {
  test.beforeEach(async ({ page, context }) => {
    await context.clearCookies();
    await page.goto("/login");
  });

  test("shows validation errors on empty submit", async ({ page }) => {
    await page.getByTestId("login-submit").click();
    await expect(page.getByTestId("email-error")).toBeVisible();
    await expect(page.getByTestId("password-error")).toBeVisible();
  });

  test("shows validation error on invalid email format", async ({ page }) => {
    await page.getByTestId("login-email").fill("notanemail");
    await page.getByTestId("login-submit").click();
    await expect(page.getByTestId("email-error")).toBeVisible();
  });

  test("shows error on invalid credentials", async ({ page }) => {
    await page.getByTestId("login-email").fill("wrong@test.com");
    await page.getByTestId("login-password").fill("WrongPassword1!");
    await page.getByTestId("login-submit").click();
    await expect(page.getByTestId("login-error")).toBeVisible();
  });

  test("redirects to /articles on successful login", async ({ page }) => {
    await page
      .getByTestId("login-email")
      .fill(process.env.TEST_USER_EMAIL ?? "test@test.com");
    await page
      .getByTestId("login-password")
      .fill(process.env.TEST_USER_PASSWORD ?? "Password1!");
    await page.getByTestId("login-submit").click();
    await expect(page).toHaveURL("/articles");
  });
});
