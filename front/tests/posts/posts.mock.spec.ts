import { expect, test } from "@playwright/test";
import { MOCK_TOPIC_REACT_ID, mockAuthenticatedApi } from "../helpers/mocks";

test.describe("posts mockés", () => {
  test.beforeEach(async ({ page, context }) => {
    await context.clearCookies();
    await mockAuthenticatedApi(page, context);
  });

  test("affiche les posts mockés dans le feed", async ({ page }) => {
    await page.goto("/feed");

    await expect(
      page.getByRole("heading", { name: "Article mocké récent" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Article mocké ancien" }),
    ).toBeVisible();
    await expect(page.getByText("mockuser").first()).toBeVisible();
  });

  test("inverse l'ordre des posts avec le bouton de tri", async ({ page }) => {
    await page.goto("/feed");

    await expect(page.locator("h2").first()).toHaveText("Article mocké récent");
    await page.getByRole("button", { name: /Trier par/ }).click();
    await expect(page.locator("h2").first()).toHaveText("Article mocké ancien");
  });

  test("crée un post avec l'API mockée et revient au feed", async ({ page }) => {
    await page.goto("/post/new");

    await page.locator("#topicId").selectOption(MOCK_TOPIC_REACT_ID);
    await page.locator("#title").fill("Nouveau post mocké");
    await page
      .locator("#content")
      .fill("Contenu mocké suffisamment long pour passer la validation.");

    await page.getByTestId("post-submit").click();

    await expect(page).toHaveURL("/feed");
    await expect(
      page.getByRole("heading", { name: "Nouveau post mocké" }),
    ).toBeVisible();
  });
});
