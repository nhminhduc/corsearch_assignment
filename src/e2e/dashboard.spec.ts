import { test, expect } from "@playwright/test";

test.describe("User Dashboard Sorting and Filtering", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173");
  });

  test("should filter users by name", async ({ page }) => {
    // Type into the filter input
    await page.fill('input[data-testid="user-filter-input"]', "Chelsey");

    // Check if the filtered user is displayed
    await expect(
      page.locator('[data-testid="user-name"]:has-text("Chelsey Dietrich")')
    ).toBeVisible();
    await expect(
      page.locator('[data-testid="user-name"]:has-text("Mary Sue")')
    ).not.toBeVisible();
  });

  test("should sort users by name", async ({ page }) => {
    // Click on sort by name
    await page.click('[data-testid="sort-by-name"]');

    // Check the ascending order of the users
    const userListItems = page.locator('[data-testid="user-list-item"]');
    await expect(userListItems.first()).toHaveText(/Chelsey Dietrich/);
    await expect(userListItems.last()).toHaveText(/Patricia Lebsack/);

    // Click again to sort to descending order
    await page.click('[data-testid="sort-by-name"]');

    // Check the descending order
    await expect(userListItems.first()).toHaveText(/Patricia Lebsack/);
    await expect(userListItems.last()).toHaveText(/Chelsey Dietrich/);
  });
  test("should sort users by email", async ({ page }) => {
    // Click the sort by email button
    await page.click('[data-testid="sort-by-email"]');

    // Check the order of the users
    const userListItems = page.locator('[data-testid="user-email"]');
    await expect(userListItems.first()).toHaveText(/Chaim_McDermott@dana.io/);
    await expect(userListItems.last()).toHaveText(/Telly.Hoeger@billy.biz/);

    // Click again to reverse the order
    await page.click('[data-testid="sort-by-email"]');

    // Check the reversed order
    await expect(userListItems.first()).toHaveText(/Telly.Hoeger@billy.biz/);
    await expect(userListItems.last()).toHaveText(/Chaim_McDermott@dana.io/);
  });
});
