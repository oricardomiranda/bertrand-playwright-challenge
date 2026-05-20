import { test, expect } from '@playwright/test';

test('Search for a book and validate the author page', async ({ page }) => {
  //Go to website and reject cookies
  await page.goto('https://www.bertrand.pt/');
  await page.getByRole('button', { name: 'Rejeitar' }).click();
  //Search for Principezinho
  await page.getByTestId('form-searchform-palavra').click();
  await page.getByTestId('form-searchform-palavra').fill('Principezinho');
  //Select O Principezinho
  await expect(page.getByText('TÍTULOS SUGERIDOS')).toBeVisible();
  await page.getByTestId('item-auto-complete-0').getByRole('link').filter({ hasText: 'O Principezinho' }).click();
  //Assert author name
  await expect(page.getByTestId('productPageSectionAboutAuthor-content-title')).toHaveText('Antoine de Saint-Exupéry');
  //Enter the author's page
  await page.getByTestId('productPageSectionAboutAuthor-content-title').getByRole('link', { name: 'Antoine de Saint-Exupéry' }).click();
  //Check the page's title
  await expect(page.getByTestId('page-content-wrapper')).toContainText('Antoine de Saint-Exupéry');

});