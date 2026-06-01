import { test, expect } from "@playwright/test";

test.describe.configure({ mode: "serial" });

test.describe("subscriptions", () => {
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
  });

  test("subscribed topic appears in profile", async ({ page }) => {
    await page.goto("/topics");
    const subscribeButton = page.locator('[data-testid^="subscribe-"]').last();
    const testId = await subscribeButton.getAttribute("data-testid");
    const topicId = testId!.replace("subscribe-", "");
    await subscribeButton.click();
    await expect(page.getByTestId(testId!)).toHaveText("Déjà abonné");

    await page.goto("/profile");
    await expect(page.getByTestId("subscriptions-section")).toBeVisible();
    await expect(
      page.getByTestId(`unsubscribe-${topicId}`),
    ).toBeVisible();
  });

  test("unsubscribe removes topic from profile", async ({ page }) => {
    await page.goto("/profile");
    const unsubscribeButton = page
      .locator('[data-testid^="unsubscribe-"]')
      .first();
    await expect(unsubscribeButton).toBeVisible();
    const testId = await unsubscribeButton.getAttribute("data-testid");
    const [response] = await Promise.all([
      page.waitForResponse((res) => res.url().includes("/subscribe") && res.request().method() === "DELETE"),
      unsubscribeButton.click(),
    ]);
    expect(response.ok()).toBeTruthy();
    await expect(page.getByTestId(testId!)).not.toBeVisible({ timeout: 5000 });
  });
});
