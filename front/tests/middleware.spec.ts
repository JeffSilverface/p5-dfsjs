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
    await context.clearCookies();
    await setSessionCookie(context);
  });

  test("can access /feed", async ({ page }) => {
    await page.goto("/feed");
    await expect(page).toHaveURL("/feed");
  });

  test("can access /feed/new", async ({ page }) => {
    await page.goto("/feed/new");
    await expect(page).toHaveURL("/feed/new");
  });

  test("can access /feed/[id]", async ({ page }) => {
    await page.goto("/feed/123");
    await expect(page).toHaveURL("/feed/123");
  });

  test("can access /topics", async ({ page }) => {
    await page.goto("/topics");
    await expect(page).toHaveURL("/topics");
  });

  test("can access /profile", async ({ page }) => {
    await page.goto("/profile");
    await expect(page).toHaveURL("/profile");
  });

  test("can access /logout", async ({ page }) => {
    await page.goto("/logout");
    await expect(page).toHaveURL("/logout");
  });

  test("redirects / to /feed", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL("/feed");
  });

  test("redirects /login to /feed", async ({ page }) => {
    await page.goto("/login");
    await expect(page).toHaveURL("/feed");
  });

  test("redirects /register to /feed", async ({ page }) => {
    await page.goto("/register");
    await expect(page).toHaveURL("/feed");
  });
});

test.describe("unauthenticated user", () => {
  test.beforeEach(async ({ context }) => {
    await context.clearCookies();
  });

  test("redirects /feed to /", async ({ page }) => {
    await page.goto("/feed");
    await expect(page).toHaveURL("/");
  });

  test("redirects /feed/new to /", async ({ page }) => {
    await page.goto("/feed/new");
    await expect(page).toHaveURL("/");
  });

  test("redirects /feed/[id] to /", async ({ page }) => {
    await page.goto("/feed/123");
    await expect(page).toHaveURL("/");
  });

  test("redirects /topics to /", async ({ page }) => {
    await page.goto("/topics");
    await expect(page).toHaveURL("/");
  });

  test("redirects /profile to /", async ({ page }) => {
    await page.goto("/profile");
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
