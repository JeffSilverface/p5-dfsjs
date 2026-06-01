import { test, expect } from "@playwright/test";

test.describe("topics", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
    await page
      .getByTestId("login-email")
      .fill(process.env.TEST_USER_EMAIL ?? "test@test.com");
    await page
      .getByTestId("login-password")
      .fill(process.env.TEST_USER_PASSWORD ?? "Password1!");
    await page.getByTestId("login-submit").click();
    await page.waitForURL("/articles");
    await page.goto("/topics");
  });

  test("topics page loads", async ({ page }) => {
    await expect(page).toHaveURL("/topics");
  });

  test("topics are displayed", async ({ page }) => {
    const subscribeButtons = page.locator('[data-testid^="subscribe-"]');
    await expect(subscribeButtons.first()).toBeVisible();
  });

  test("subscribe changes button to déjà abonné", async ({ page }) => {
    const subscribeButton = page.locator('[data-testid^="subscribe-"]').first();
    const testId = await subscribeButton.getAttribute("data-testid");
    await subscribeButton.click();
    await expect(page.getByTestId(testId!)).toHaveText("Déjà abonné");
  });
});
