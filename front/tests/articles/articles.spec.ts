import { test, expect } from "@playwright/test";

test.describe("articles", () => {
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
  });

  test("articles list page loads", async ({ page }) => {
    await expect(page).toHaveURL("/articles");
    await expect(
      page.getByRole("link", { name: "Créer un article" }),
    ).toBeVisible();
  });

  test("navigates to new article page", async ({ page }) => {
    await page.getByRole("link", { name: "Créer un article" }).click();
    await expect(page).toHaveURL("/articles/new");
  });
});

test.describe("new article form", () => {
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
    await page.goto("/articles/new");
  });

  test("shows validation errors on empty submit", async ({ page }) => {
    await page.getByTestId("article-submit").click();
    await expect(page.getByTestId("topicId-error")).toBeVisible();
    await expect(page.getByTestId("title-error")).toBeVisible();
    await expect(page.getByTestId("content-error")).toBeVisible();
  });

  test("shows error when title is too short", async ({ page }) => {
    await page.locator("#title").fill("ab");
    await page.getByTestId("article-submit").click();
    await expect(page.getByTestId("title-error")).toBeVisible();
  });

  test("shows error when content is too short", async ({ page }) => {
    await page.locator("#content").fill("court");
    await page.getByTestId("article-submit").click();
    await expect(page.getByTestId("content-error")).toBeVisible();
  });

  test("creates article and redirects to /articles", async ({ page }) => {
    await page.locator("#topicId").selectOption({ index: 1 });
    await page.locator("#title").fill("Article de test Playwright");
    await page.locator("#content").fill("Contenu de test suffisamment long pour passer la validation.");
    await page.getByTestId("article-submit").click();
    await expect(page).toHaveURL("/articles");
  });
});
