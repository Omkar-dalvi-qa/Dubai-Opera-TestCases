const { test, expect } = require('../utils/fixtures');
const { BASE_URL } = require('../utils/constants');

test.describe('Navigation Bar', () => {

  test.beforeEach(async ({ navpg }) => {
    await navpg.navigate(BASE_URL);
  });

  test('navbar is visible on page load', async ({ navpg }) => {
    await expect(navpg.navbar).toBeVisible();
  });

  test('logo is visible and links to home', async ({ navpg }) => {
    await expect(navpg.logo).toBeVisible();
    await expect(navpg.logo).toHaveAttribute('href', /\/en/);
  });

  test('Programs dropdown appears on hover', async ({ navpg }) => {
    await navpg.hoverPrograms();
    await expect(navpg.programsDropdownItems.first()).toBeVisible({ timeout: 3000 });
  });

  test('Visit dropdown appears on hover', async ({ navpg }) => {
    await navpg.hoverVisit();
    await expect(navpg.visitDropdownItems.first()).toBeVisible({ timeout: 3000 });
  });

  test('About Us nav link is visible', async ({ navpg }) => {
    await expect(navpg.aboutUsLink).toBeVisible();
  });

  test('News nav link is visible', async ({ navpg }) => {
    await expect(navpg.newsLink).toBeVisible();
  });

  test('clicking News link navigates to /news', async ({ navpg, page }) => {
    await navpg.clickNews();
    await expect(page).toHaveURL(/\/news/);
  });

  test('clicking About Us link navigates to /about-us', async ({ navpg, page }) => {
    await navpg.clickAboutUs();
    await expect(page).toHaveURL(/\/about-us/);
  });

  test('search icon is visible and opens search input on click', async ({ navpg }) => {
    await expect(navpg.searchBtn).toBeVisible();
    await navpg.clickSearch();
    await expect(navpg.searchInput).toBeVisible();
  });

  test('cart icon is visible and navigates to /cart on click', async ({ navpg, page }) => {
    await expect(navpg.cartLink).toBeVisible();
    await navpg.clickCart();
    await expect(page).toHaveURL(/\/cart/);
  });
});
