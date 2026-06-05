const { test, expect } = require('../utils/fixtures');

test.describe("What's On Section", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test.beforeEach(async ({ homepg }) => {
    await homepg.goto();
  });

  test("What's On section is visible on homepage", async ({ homepg }) => {
    await expect(homepg.whatsOnSection).toBeVisible();
  });

  test('section title is visible', async ({ homepg }) => {
    await expect(homepg.sectionTitle.first()).toBeVisible();
  });

  test('View All link is visible and points to /events', async ({ homepg }) => {
    await expect(homepg.viewAllLink.first()).toBeVisible();
    await expect(homepg.viewAllLink.first()).toHaveAttribute('href', /\/events/);
  });

  test('event cards grid is visible', async ({ homepg }) => {
    await expect(homepg.whatsOnGrid).toBeVisible();
  });

  test('at least one event card is rendered', async ({ homepg }) => {
    await expect(homepg.eventCards.first()).toBeVisible();
  });

  test('first event card has a non-empty title', async ({ homepg }) => {
    const title = homepg.eventCard(0).getByTestId('event-card-title');
    await expect(title).toBeVisible();
    await expect(title).not.toBeEmpty();
  });

  test('first event card has a favorite button', async ({ homepg }) => {
    await expect(homepg.eventCard(0).getByTestId('event-card-fav-btn')).toBeVisible();
  });

  test('first event card CTA link points to /events/', async ({ homepg }) => {
    const cta = homepg.eventCard(0).getByTestId('event-card-cta-link');
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute('href', /\/events\//);
  });

  test('clicking CTA navigates to the event detail page', async ({ homepg, page }) => {
    const cta = homepg.eventCard(0).getByTestId('event-card-cta-link');
    const href = await cta.getAttribute('href');
    await homepg.clickFirstEventCta();
    if (href) {
      await expect(page).toHaveURL(new RegExp(href.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
    }
  });

  test('clicking View All header link navigates to /events', async ({ homepg, page }) => {
    await homepg.clickViewAll();
    await expect(page).toHaveURL(/\/events/);
  });

  test('View All card is present only when more than 8 events exist', async ({ homepg }) => {
    const count = await homepg.eventCards.count();
    if (count >= 8) {
      await expect(homepg.viewAllCard).toBeVisible();
    } else {
      await expect(homepg.viewAllCard).not.toBeAttached();
    }
  });

  test('View All card navigates to /events', async ({ homepg, page }) => {
    const isVisible = await homepg.viewAllCard.isVisible().catch(() => false);
    if (!isVisible) test.skip();
    await homepg.viewAllCard.click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/\/events/);
  });
});
