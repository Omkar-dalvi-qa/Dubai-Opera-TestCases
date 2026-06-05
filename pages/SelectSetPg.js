const { BasePage } = require('./BasePage');

class SelectSetPg extends BasePage {
  constructor(page) {
    super(page);
  }

  seatLocator(type) {
    return this.page.locator(
      `[data-seat-element="true"][data-seat-type="${type}"][data-seat-status="available"]`
    ).first();
  }

  async selectSeat(type) {
    const seat = this.seatLocator(type);
    await seat.waitFor({ state: 'visible', timeout: 10000 });
    await seat.dispatchEvent('click');
  }

  async selectevent() {
    await this.selectSeat('PLATINUM');
    await this.selectSeat('GOLD');
    //await this.selectSeat('Standard');

    await this.page.getByRole('button', { name: 'Proceed' }).click();
    //await this.page.locator('.lucide.lucide-plus').first().click();
    await this.page.getByRole('button', { name: 'Proceed to Checkout' }).click();
  }
}

module.exports = { SelectSetPg };
