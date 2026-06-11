import { test, expect } from '@playwright/test';

test('locked_out_user sees error message', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.getByPlaceholder('Username').fill('locked_out_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: /login/i }).click();

  await expect(page.locator('[data-test="error"]'))
    .toContainText('Sorry, this user has been locked out');
});

test('sort products by price low to high', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: /login/i }).click();

  // Change the sort dropdown
  await page.locator('[data-test="product-sort-container"]').selectOption('lohi');

  // Grab all price elements
  const prices = await page.locator('.inventory_item_price').allTextContents();

  // Convert "$7.99" → 7.99 and check first is lowest
  const numbers = prices.map(p => parseFloat(p.replace('$', '')));
  expect(numbers[0]).toBe(Math.min(...numbers));
});

test('user can log out', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: /login/i }).click();

  // Open the burger menu
  await page.locator('#react-burger-menu-btn').click();

  // Click logout
  await page.getByRole('link', { name: /logout/i }).click();

  // Should be back on login page
  await expect(page).toHaveURL('https://www.saucedemo.com/');
  await expect(page.getByPlaceholder('Username')).toBeVisible();
});