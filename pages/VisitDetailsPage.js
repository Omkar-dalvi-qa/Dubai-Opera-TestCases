const { BasePage } = require('./BasePage');

class VisitDetailsPage extends BasePage {
  constructor(page) {
    super(page);
    this.datePickerSection   = page.getByTestId('date-picker-section');
    this.timeSlotSection     = page.getByTestId('tour-time-slot-section');
    this.ticketRows          = page.getByTestId('tour-ticket-rows');
    this.bookBtn             = page.getByTestId('tour-book-btn');
    this.loginModal          = page.getByTestId('login-modal');
    this.loginModalSignInBtn = page.getByTestId('login-modal-signin-btn');
  }

  async openCalendar() {
    await this.page.locator('.react-datepicker-wrapper').first().click();
    await this.page.waitForSelector('.react-datepicker', { timeout: 5000 });
  }

  get disabledCalendarDays() {
    return this.page.locator('.react-datepicker__day--disabled:not(.react-datepicker__day--outside-month)');
  }

  get disabledTimeSlots() {
    // Use a CSS attribute selector so we match the button that IS disabled,
    // not a button that contains a disabled child (which filter+has would do).
    return this.timeSlotSection.locator('[data-testid="tour-time-slot-btn"][disabled]');
  }

  async selectFirstAvailableDate() {
    await this.openCalendar();
    await this.page
      .locator('.react-datepicker__day:not(.react-datepicker__day--disabled):not(.react-datepicker__day--outside-month)')
      .first()
      .click();
  }

  async selectFirstAvailableTimeSlot() {
  const slots = this.timeSlotSection.getByTestId('tour-time-slot-btn');

  //await expect(slots.first()).toBeVisible({ timeout: 5000 });

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

  // Clicks increment for the ticket row matching `label` (regex or string).
  // Returns the quantity locator so the test can assert the new count.
  async addTicket(label) {
    const row = this.ticketRows
      .getByTestId('tour-ticket-row')
      .filter({ has: this.page.getByTestId('tour-ticket-label').filter({ hasText: label }) })
      .first();
    await row.getByTestId('tour-ticket-increment').click();
    return row.getByTestId('tour-ticket-quantity');
  }

  // Waits for ticket rows, adds one of each type, and verifies each quantity shows "1".
  async addDefaultTickets(expect) {
    await expect(this.ticketRows).toBeVisible({ timeout: 5000 });
    const adultQty = await this.addTicket(/adult/i);
    await expect(adultQty).toHaveText('1');
    const childQty = await this.addTicket(/child/i);
    await expect(childQty).toHaveText('1');
    const bisouQty = await this.addTicket(/bisou/i);
    await expect(bisouQty).toHaveText('1');
  }

  async clickBook() {
    await this.bookBtn.click();
  }
}

module.exports = { VisitDetailsPage };
