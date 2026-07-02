const { BasePage } = require('./BasePage');
const { BASE_URL } = require('../utils/constants');

class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.whatsOnSection = page.getByTestId('whats-on-section');
    this.sectionTitle   = page.getByTestId('section-title');
    this.viewAllLink    = page.getByTestId('section-view-all-link');
    this.whatsOnGrid    = page.getByTestId('whats-on-grid');
    this.eventCards     = page.getByTestId('event-card');
    this.viewAllCard    = page.getByTestId('whats-on-view-all-card');
    // No data-testid on the live site — dev team declined to add one, so this
    // is matched on the link's visible text/target instead.
    this.venueTourBtn = page.getByRole('link', { name: 'Book A Tour' });

  }

  async goto() {
    await this.navigate(BASE_URL);
  }

  eventCard(index = 0) {
    return this.eventCards.nth(index);
  }

  async clickFirstEventCta() {
    const cta = this.eventCards.first().getByTestId('event-card-cta-link');
    const href = await cta.getAttribute('href');
    await cta.click();
    await this.page.waitForLoadState('networkidle');
    return href;
  }

  async clickViewAll() {
    await this.viewAllLink.first().click();
    await this.page.waitForLoadState('networkidle');
  }

  async clickvenueTourBtn() {
    // The homepage hero is an auto-rotating carousel; the first click after
    // load occasionally lands right as it reflows and doesn't register as
    // navigation (no Playwright error, it just silently stays on the
    // homepage). Bounded retry against the destination page's own widget
    // rather than a blind wait.
    const calendarBtn = this.page.getByRole('button', { name: 'Open calendar' }).first();

    for (let attempt = 1; attempt <= 3; attempt++) {
      await this.venueTourBtn.click();
      const arrived = await calendarBtn
        .waitFor({ state: 'visible', timeout: 8000 })
        .then(() => true)
        .catch(() => false);
      if (arrived) return;
    }

    throw new Error('Clicking "Book A Tour" did not land on the tours booking widget after 3 attempts');
  }
}
module.exports = { HomePage };
