import { expect, test } from "@playwright/test";
import {
  MOCK_TOPIC_NEST_ID,
  MOCK_TOPIC_REACT_ID,
  mockAuthenticatedApi,
} from "../helpers/mocks";

test.describe("subscriptions mockées", () => {
  test.beforeEach(async ({ page, context }) => {
    await context.clearCookies();
    await mockAuthenticatedApi(page, context);
  });

  test("s'abonne à un thème sans utiliser la base", async ({ page }) => {
    await page.goto("/topics");

    await expect(page.getByTestId(`subscribe-${MOCK_TOPIC_REACT_ID}`)).toHaveText(
      "S'abonner",
    );
    await page.getByTestId(`subscribe-${MOCK_TOPIC_REACT_ID}`).click();
    await expect(page.getByTestId(`subscribe-${MOCK_TOPIC_REACT_ID}`)).toHaveText(
      "Déjà abonné",
    );

    await page.goto("/profile");
    await expect(page.getByTestId("subscriptions-section")).toBeVisible();
    await expect(page.getByTestId(`unsubscribe-${MOCK_TOPIC_REACT_ID}`)).toBeVisible();
  });

  test("se désabonne depuis le profil sans utiliser la base", async ({ page }) => {
    await page.goto("/profile");

    await expect(page.getByTestId(`unsubscribe-${MOCK_TOPIC_NEST_ID}`)).toBeVisible();
    await page.getByTestId(`unsubscribe-${MOCK_TOPIC_NEST_ID}`).click();
    await expect(page.getByTestId(`unsubscribe-${MOCK_TOPIC_NEST_ID}`)).not.toBeVisible();
  });
});
