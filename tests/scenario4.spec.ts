import { test, expect } from '@playwright/test';

test('Search for a book, add to cart, increase, decrease quantity and delete from cart', async ({ page }) => {
  //Go to website and reject cookies
  await page.goto('https://www.bertrand.pt/', { waitUntil: 'domcontentloaded' });
  const rejectCookies = page.locator('.gpe-cookies-reject');

  if (await rejectCookies.isVisible().catch(() => false)) {
    await rejectCookies.click();
}
  //Search for Principezinho
  await page.getByTestId('form-searchform-palavra').click();
  await page.getByTestId('form-searchform-palavra').fill('Principezinho');
  //Select O Principezinho
  await expect(page.getByText('TÍTULOS SUGERIDOS')).toBeVisible();
  await page.getByTestId('item-auto-complete-0').getByRole('link').filter({ hasText: 'O Principezinho' }).click();
  //Add to cart
  await page.getByTestId('productPageRightSectionTop-actions-addCart-btn').click();
  //Check the cart
  await page.getByTestId('cart-button').click();
  const product = page.getByTestId('product-line-0').getByText('O Principezinho'); 
  await expect(product).toBeVisible({ timeout: 10000 });
  //Add and subtract
  await page.getByRole('button', { name: '+' }).click();
  await expect(page.getByTitle('quantidade')).toHaveValue('2');
  await page.getByRole('button', { name: '–' }).click();
  await expect(page.getByTitle('quantidade')).toHaveValue('1');
  //Remove from cart
  await page.locator(".icon-trash").click();
  await expect(page.getByText('O cesto de compras está vazio.')).toBeVisible();

});