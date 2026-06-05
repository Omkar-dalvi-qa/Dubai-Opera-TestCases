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
    this.venueTourBtn = page.getByTestId('venue-tour-book-btn');
    
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
    await this.venueTourBtn.click();
    await  this.page.waitForLoadState('networkidle');
  }
}
module.exports = { HomePage };
