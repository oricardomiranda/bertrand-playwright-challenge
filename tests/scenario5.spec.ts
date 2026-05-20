import { test, expect } from '@playwright/test';

test('Search for a book and validate the author page', async ({ page }) => {
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
  
  await page.getByTestId('form-searchform-palavra').fill('Principezinho');
  await page.waitForTimeout(300);
  //Select O Principezinho
  await expect(page.getByTestId("item-auto-complete-0")).toBeVisible();
  await page.getByTestId('item-auto-complete-0').getByRole('link').filter({ hasText: 'O Principezinho' }).click();
  //Assert author name
  await expect(page.getByTestId('productPageSectionAboutAuthor-content-title')).toHaveText('Antoine de Saint-Exupéry');
  //Enter the author's page
  await page.getByTestId('productPageSectionAboutAuthor-content-title').getByRole('link', { name: 'Antoine de Saint-Exupéry' }).click();
  //Check the page's title
  await expect(page.getByTestId('page-content-wrapper')).toContainText('Antoine de Saint-Exupéry');

});