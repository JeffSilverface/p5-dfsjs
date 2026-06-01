import { test, expect } from "@playwright/test";

test.describe("profile", () => {
  test.beforeEach(async ({ page, context }) => {
    await context.clearCookies();
    await page.goto("/login");
    await page
      .getByTestId("login-email")
      .fill(process.env.TEST_USER_EMAIL ?? "test@test.com");
    await page
      .getByTestId("login-password")
      .fill(process.env.TEST_USER_PASSWORD ?? "Password1!");
    await page.getByTestId("login-submit").click();
    await page.waitForURL("/feed");
    await page.goto("/profile");
  });

  test("email field is disabled", async ({ page }) => {
    const emailInput = page.locator("#email");
    await expect(emailInput).toBeDisabled();
  });

  test("shows validation error when username is too short", async ({ page }) => {
    await page.locator("#username").fill("ab");
    await page.getByTestId("profile-submit").click();
    await expect(page.getByTestId("username-error")).toBeVisible();
  });

  test("shows validation error when password is too weak", async ({ page }) => {
    await page.locator("#password").fill("weakpassword");
    await page.getByTestId("profile-submit").click();
    await expect(page.getByTestId("password-error")).toBeVisible();
  });

  test("can update username", async ({ page }) => {
    await page.locator("#username").fill("updateduser");
    const [response] = await Promise.all([
      page.waitForResponse((res) => res.url().includes("/auth/profile") && res.request().method() === "PATCH"),
      page.getByTestId("profile-submit").click(),
    ]);
    expect(response.ok()).toBeTruthy();
    await expect(page.getByTestId("profile-error")).not.toBeVisible();
  });
});
