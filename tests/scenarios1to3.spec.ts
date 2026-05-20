import {test, expect} from "@playwright/test"

test.describe("Scenario 1", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.bertrand.pt/', { waitUntil: 'domcontentloaded' });
        const rejectCookies = page.locator('.gpe-cookies-reject');

        if (await rejectCookies.isVisible().catch(() => false)) {
            await rejectCookies.click();
}
    });

    test("Scenario 1", async ({page}) => {
        //Using the searchbox and clicking the first result
        await page.getByRole("textbox", { name: 'texto para pesquisa' }).fill('1984');
        await expect(page.getByTestId("item-auto-complete-0")).toBeVisible();
        await page.getByTestId("item-auto-complete-0").click();
        //Asserting the book's details
        await test.step("book author", async () => {
            await expect(page.getByTestId("productPageSectionAboutAuthor-content-title")).toHaveText("George Orwell");
            });
        //Asserting for ISBN
        await test.step("ISBN", async () => {
        await expect(page.getByText("9789722071550").first()).toBeVisible();
        });
        //Asserting pages
        await test.step("pages", async () => {
            await expect(page.locator("#productPageSectionDetails-collapseDetalhes-content-nrPages")).toContainText("344");
        });
        //Asserting dimensions
        await test.step("dimensions", async () => {
            const dimensions = page.locator("#productPageSectionDetails-collapseDetalhes-content-dimensions");     
            await expect(dimensions).toContainText(/156\s*x\s*238\s*x\s*22\s*mm/i);   
        });
    });

    test("Scenario 2", async ({page}) => {
        //Using the searchbox and clicking the first result
        await page.getByRole("textbox", { name: 'texto para pesquisa' }).fill('1984');
        await expect(page.getByTestId("item-auto-complete-0")).toBeVisible();
        await page.getByTestId("item-auto-complete-0").click();
        //Asserting the book's author
        let author1 = "";
        await test.step("book author", async () => {
            author1 = await page.getByTestId("productPageSectionAboutAuthor-content-title").innerText();
            console.log(author1);
            });
        //Searching the second book "A Quinta dos Animais"
        await test.step("matching authors", async () => {
            await page.getByRole("textbox", {name: 'texto para pesquisa'}).fill("A Quinta dos Animais");
            await expect(page.getByText("TÍTULOS SUGERIDOS")).toBeVisible();
            await page.getByTestId("item-auto-complete-0").click();
            //Matching the authors
            await expect(page.getByTestId("productPageSectionAboutAuthor-content-title")).toContainText(author1);
        });
    });

    test("Scenario 3", async ({page}) => {
        //Using the searchbox and clicking the first result
        await page.getByRole("textbox", { name: 'texto para pesquisa' }).fill('Do Not Disturb');
        await expect(page.getByTestId("item-auto-complete-0")).toBeVisible();
        await page.getByTestId("item-auto-complete-0").click();
        //Asserting the book's author
        await test.step("book author", async () => {
            await expect(page.getByTestId("productPageSectionAboutAuthor-content-title")).toHaveText("Freida McFadden");
            });
        //Searching the idiom
        await test.step("book idiom and flag", async () => {
            await expect(page.getByTestId("productPageRightSectionTop-language")).toHaveText("idioma: Inglês");
            await expect(page.getByTestId("productPageRightSectionTop-languageFlag")).toHaveClass("icon language-flag Inglês");
            await page.screenshot({ path: 'tests/screenshots/flag.png' });
        });
    });
});