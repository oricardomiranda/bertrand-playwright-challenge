import { test, expect } from '@playwright/test';

test('Search for a book, add to cart, increase, decrease quantity and delete from cart', async ({ page }) => {
  //Go to website and reject cookies
  await page.goto('https://www.bertrand.pt/', { waitUntil: 'domcontentloaded' });
  const rejectCookies = page.locator('.gpe-cookies-reject');

  if (await rejectCookies.isVisible().catch(() => false)) {
    await rejectCookies.click();
  }

  //Search for Principezinho
  const search = page.getByTestId('form-searchform-palavra');
  await expect(search).toBeVisible();
  await expect(search).toBeEnabled();
  await search.click();

  await search.fill('Principezinho');

  //Select O Principezinho
  const firstSuggestion = page.getByTestId('item-auto-complete-0');
  await expect(firstSuggestion).toBeVisible({ timeout: 5000 });

  await Promise.all([
    page.waitForLoadState('domcontentloaded'),
    firstSuggestion.getByRole('link').filter({ hasText: 'O Principezinho' }).click()
  ]);

  //Add to cart
  const addToCart = page.getByTestId('productPageRightSectionTop-actions-addCart-btn');
  await expect(addToCart).toBeVisible();
  await addToCart.click();

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