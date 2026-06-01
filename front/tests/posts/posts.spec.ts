import { test, expect } from "@playwright/test";

test.describe("posts", () => {
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

  test("posts list page loads", async ({ page }) => {
    await expect(page).toHaveURL("/feed");
    await expect(
      page.getByRole("link", { name: "Créer un post" }),
    ).toBeVisible();
  });

  test("navigates to new post page", async ({ page }) => {
    await page.getByRole("link", { name: "Créer un post" }).click();
    await expect(page).toHaveURL("/post/new");
  });
});

test.describe("new post form", () => {
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
    await page.goto("/post/new");
  });

  test("shows validation errors on empty submit", async ({ page }) => {
    await page.getByTestId("post-submit").click();
    await expect(page.getByTestId("topicId-error")).toBeVisible();
    await expect(page.getByTestId("title-error")).toBeVisible();
    await expect(page.getByTestId("content-error")).toBeVisible();
  });

  test("shows error when title is too short", async ({ page }) => {
    await page.locator("#title").fill("ab");
    await page.getByTestId("post-submit").click();
    await expect(page.getByTestId("title-error")).toBeVisible();
  });

  test("shows error when content is too short", async ({ page }) => {
    await page.locator("#content").fill("court");
    await page.getByTestId("post-submit").click();
    await expect(page.getByTestId("content-error")).toBeVisible();
  });

  test("creates post and redirects to /feed", async ({ page }) => {
    await page.locator("#topicId option:nth-child(2)").waitFor();
    await page.locator("#topicId").selectOption({ index: 1 });
    await page.locator("#title").fill("Post de test Playwright");
    await page
      .locator("#content")
      .fill("Contenu de test suffisamment long pour passer la validation.");
    await page.getByTestId("post-submit").click();
    await expect(page).toHaveURL("/feed");
  });
});
