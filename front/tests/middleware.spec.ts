import { test, expect, type BrowserContext } from "@playwright/test";

async function setSessionCookie(context: BrowserContext) {
  await context.addCookies([
    {
      name: "connect.sid",
      value: "fake-session",
      domain: "localhost",
      path: "/",
    },
  ]);
}

test.describe("authenticated user", () => {
  test.beforeEach(async ({ context }) => {
    await setSessionCookie(context);
  });

  test("can access /articles", async ({ page }) => {
    await page.goto("/articles");
    await expect(page).toHaveURL("/articles");
  });

  test("can access /articles/new", async ({ page }) => {
    await page.goto("/articles/new");
    await expect(page).toHaveURL("/articles/new");
  });

  test("can access /articles/[id]", async ({ page }) => {
    await page.goto("/articles/123");
    await expect(page).toHaveURL("/articles/123");
  });

  test("can access /topics", async ({ page }) => {
    await page.goto("/topics");
    await expect(page).toHaveURL("/topics");
  });

  test("can access /logout", async ({ page }) => {
    await page.goto("/logout");
    await expect(page).toHaveURL("/logout");
  });

  test("redirects / to /articles", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL("/articles");
  });

  test("redirects /login to /articles", async ({ page }) => {
    await page.goto("/login");
    await expect(page).toHaveURL("/articles");
  });

  test("redirects /register to /articles", async ({ page }) => {
    await page.goto("/register");
    await expect(page).toHaveURL("/articles");
  });
});

test.describe("unauthenticated user", () => {
  test.beforeEach(async ({ context }) => {
    await context.clearCookies();
  });

  test("redirects /articles to /", async ({ page }) => {
    await page.goto("/articles");
    await expect(page).toHaveURL("/");
  });

  test("redirects /articles/new to /", async ({ page }) => {
    await page.goto("/articles/new");
    await expect(page).toHaveURL("/");
  });

  test("redirects /articles/[id] to /", async ({ page }) => {
    await page.goto("/articles/123");
    await expect(page).toHaveURL("/");
  });

  test("redirects /topics to /", async ({ page }) => {
    await page.goto("/topics");
    await expect(page).toHaveURL("/");
  });

  test("redirects /logout to /", async ({ page }) => {
    await page.goto("/logout");
    await expect(page).toHaveURL("/");
  });

  test("can access /login", async ({ page }) => {
    await page.goto("/login");
    await expect(page).toHaveURL("/login");
  });

  test("can access /register", async ({ page }) => {
    await page.goto("/register");
    await expect(page).toHaveURL("/register");
  });

  test("can access /", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL("/");
  });
});
