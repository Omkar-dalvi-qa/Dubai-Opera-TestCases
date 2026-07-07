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
   
    this.venueTourBtn = page.getByRole('link', { name: 'Book A Tour' });

   
    this.internalEventCards = page.locator('div[data-analytics-item="true"] > a[href*="/en/events/"]');
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

  async clickSecondEventCard() {
    // Index 1 (the 2nd internal card) is currently the first event that
    // actually uses the reserved-seating flow — index 0 ("Taha Desouky")
    // uses a simpler ticket-quantity model with no seat map at all. This
    // list is content-managed and could reorder; if this starts failing,
    // re-check which card actually leads to /booking/seats.
    const card = this.internalEventCards.nth(1);

    for (let attempt = 1; attempt <= 3; attempt++) {
     
      await card.click({ timeout: 8000 }).catch(() => {});
      const arrived = await this.page
        .waitForURL(/\/events\/.+\/.+/, { timeout: 8000 })
        .then(() => true)
        .catch(() => false);
      if (arrived) return;
    }

    throw new Error('Clicking the 2nd event card did not navigate to an event detail page after 3 attempts');
  }

  async clickvenueTourBtn() {
  
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
