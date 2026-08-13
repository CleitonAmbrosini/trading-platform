import { expect, test } from "@playwright/test";

test.only("Should have create an account", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  const account = {
    name: "Jhon doe",
    email: "jhon.doe@gmail.com",
    document: "991.488.910-70",
    password: "qweasDDASD123",
  };

  await page.locator(".input-name").fill(account.name);
  await page.locator(".input-email").fill(account.email);
  await page.locator(".input-document").fill(account.document);
  await page.locator(".input-password").fill(account.password);

  await page.locator(".button-signup").click();

  await expect(page.locator(".span-message")).toHaveText("success");
});

