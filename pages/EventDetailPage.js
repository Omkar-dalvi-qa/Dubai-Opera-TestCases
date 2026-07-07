const { BasePage } = require('./BasePage');

// No data-testid on the live event pages either — locators built from
// role/text, verified against a real event (concerts/marilyne-naaman).
class EventDetailPage extends BasePage {
  constructor(page) {
    super(page);
    this.calendarBtn = page.getByRole('button', { name: 'Open calendar' }).first();
    this.bookBtn      = page.getByRole('button', { name: 'Book tickets' }).first();
  }

  // Some events only have a single date/time — the calendar button is
  // disabled and that one date is already selected, so there's nothing to
  // click. Returns false in that case rather than treating it as a failure.
  async selectFirstAvailableDate() {
    if (!(await this.calendarBtn.isEnabled().catch(() => false))) return false;

    await this.calendarBtn.click();
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

  // Same idea as the date: a single-timeslot event has nothing enabled to
  // click (it's already selected), so this returns null instead of throwing.
  async selectFirstAvailableTimeSlot() {
    const slots = this.page.getByRole('button', { name: /^\d{1,2}:\d{2}\s?(AM|PM)$/i });
    const count = await slots.count();

    for (let i = 0; i < count; i++) {
      const slot = slots.nth(i);
      if (await slot.isVisible() && !(await slot.isDisabled())) {
        await slot.click();
        return slot;
      }
    }

    return null;
  }

  async clickBook() {
    await this.bookBtn.click();
    await this.page.waitForURL(/\/booking\/(seats|checkout)/, { timeout: 15000 });
  }
}

module.exports = { EventDetailPage };
