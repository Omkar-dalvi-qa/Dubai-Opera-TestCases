const { BasePage } = require('./BasePage');

class EventDetailPage extends BasePage {
  constructor(page) {
    super(page);
    this.datePickerSection = page.getByTestId('date-picker-section');
    this.timeSlotSection   = page.getByTestId('time-slot-section');
    this.bookBtn           = page.getByTestId('book-tickets-btn');
  }

  async selectFirstAvailableDate() {
    const visible = await this.datePickerSection.isVisible().catch(() => false);
    if (!visible) return false;

    await this.datePickerSection.locator('button').first().click();
    await this.page.waitForSelector('.react-datepicker', { timeout: 5000 });

    await this.page
      .locator('.react-datepicker__day:not(.react-datepicker__day--disabled):not(.react-datepicker__day--outside-month)')
      .first()
      .click();

    await this.page
      .waitForSelector('.react-datepicker', { state: 'hidden', timeout: 3000 })
      .catch(() => {});

    return true;
  }

  async selectFirstAvailableTimeSlot() {
    const visible = await this.timeSlotSection.isVisible().catch(() => false);
    if (!visible) return null;

    const slot = this.timeSlotSection
      .getByTestId('time-slot-btn')
      .filter({ hasNot: this.page.locator('[disabled]') })
      .first();

    await slot.waitFor({ state: 'visible', timeout: 5000 });
    await slot.click();
    return slot;
  }

  async isBookButtonEnabled() {
    const disabled = await this.bookBtn.getAttribute('disabled');
    return disabled === null;
  }

  async clickBook() {
    await this.bookBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  async signInBtn(){
    return this.page.getByTestId('login-modal-signin-btn');
  }
}

module.exports = { EventDetailPage };
