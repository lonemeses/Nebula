import { test, expect } from "@playwright/test";

test("Должен синхронизировать блоки между двумя окнами", async ({
  browser,
}) => {
  const userA = await browser.newPage();
  const userB = await browser.newPage();

  await userA.goto("http://localhost:3000");
  await userB.goto("http://localhost:3000");

  await userA.click('button:has-text("T")');

  const blockOnB = userB.locator(".absolute.bg-white");
  await expect(blockOnB).toBeVisible({ timeout: 10000 });
});
