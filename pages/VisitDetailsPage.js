const { BasePage } = require('./BasePage');

// No data-testid on the live tours page (dev team declined to add one), so every
// locator here is built from role/text/DOM structure instead. Verified against
// https://uat-opera.enpointe.io/en/visit/tours.
class VisitDetailsPage extends BasePage {
  constructor(page) {
    super(page);
    // The page renders a duplicate booking widget for mobile, inside a
    // collapsible panel that can enter the accessibility tree even at a
    // desktop viewport once expanded — .first() pins these to the real
    // (desktop) widget so they don't strict-mode-violate intermittently.
    this.calendarBtn = page.getByRole('button', { name: 'Open calendar' }).first();
    this.bookBtn      = page.getByRole('button', { name: 'Book Tickets' }).first();

    // Scope ticket-row lookups to that same widget so labels like "ADULT"
    // can't accidentally match unrelated marketing copy elsewhere on the page.
    this.ticketWidget = this.bookBtn.locator('xpath=ancestor::div[contains(@class,"hidden lg:block")][1]');
    this.timeSlotButtons = this.ticketWidget.getByRole('button', { name: /^\d{1,2}:\d{2}\s?(AM|PM)$/i });

    this.loginModal          = page.getByRole('dialog');
    this.loginModalSignInBtn = this.loginModal.getByRole('button', { name: 'Sign In' });
  }

  async openCalendar() {
    // Same hydration race as clickvenueTourBtn: the button is visible and
    // stable (passes actionability) before React has attached its onClick,
    // so a fast, non-debug run can click it and have nothing happen. Retry
    // instead of trusting one click.
    for (let attempt = 1; attempt <= 3; attempt++) {
      await this.calendarBtn.click();
      const opened = await this.page
        .waitForSelector('.react-datepicker', { timeout: 4000 })
        .then(() => true)
        .catch(() => false);
      if (opened) return;
    }

    throw new Error('Clicking "Open calendar" did not open the datepicker after 3 attempts');
  }

  async selectFirstAvailableDate() {
    await this.openCalendar();
    await this.page
      .locator('.react-datepicker__day:not(.react-datepicker__day--disabled):not(.react-datepicker__day--outside-month)')
      .first()
      .click();
  }

  async selectFirstAvailableTimeSlot() {
    const slots = this.timeSlotButtons;
    const count = await slots.count();

    for (let i = 0; i < count; i++) {
      const slot = slots.nth(i);

      if (await slot.isVisible() && !(await slot.isDisabled())) {
        await slot.click();
        return slot;
      }
    }

    throw new Error('No enabled time slot available');
  }

  // Clicks the "+" for the ticket row whose label matches `label` (string or regex).
  // Returns the quantity locator so the test can assert the new count.
  async addTicket(label) {
    const row = this.ticketWidget.getByText(label).first();
    await row.locator('xpath=following::button[normalize-space(text())="+"][1]').click();
    return row.locator('xpath=following::span[1]');
  }

  // Waits for the ticket widget, adds one of each type, and verifies each quantity shows "1".
  async addDefaultTickets(expect) {
    await expect(this.bookBtn).toBeVisible({ timeout: 5000 });
    const adultQty = await this.addTicket('ADULT');
    await expect(adultQty).toHaveText('1');
    const childQty = await this.addTicket(/CHILD/i);
    await expect(childQty).toHaveText('1');
    const bisouQty = await this.addTicket(/BISOU/i);
    await expect(bisouQty).toHaveText('1');
  }

  async clickBook() {
    await this.bookBtn.click();
  }
}

module.exports = { VisitDetailsPage };
