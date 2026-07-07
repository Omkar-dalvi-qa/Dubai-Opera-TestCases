const { BasePage } = require('./BasePage');


class SelectSetPg extends BasePage {
  constructor(page) {
    super(page);
    this.availableSeats = page.locator('[data-seat-kind]:not([style])');
    this.proceedBtn      = page.getByRole('button', { name: 'Proceed', exact: true });
  }


  async clickSeat(seat) {
    const box = await seat.boundingBox();
    if (!box) throw new Error('Seat has no bounding box — not rendered');
    await this.page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
  }

  async waitForSeatMapReady() {
 
    await this.availableSeats.first().waitFor({ state: 'visible', timeout: 30000 });
    await this.page.waitForTimeout(2000);
  }

 
  async selectOneSeatFromCategories(categories) {
    const seatsUrl = this.page.url();
    await this.waitForSeatMapReady();

    const colors = await this.availableSeats.evaluateAll(els => {
      const set = new Set();
      els.forEach(el => {
        const shape = el.querySelector('circle') || el.querySelector('rect');
        if (shape) set.add(shape.getAttribute('fill'));
      });
      return [...set];
    });

    for (let i = 0; i < colors.length; i++) {
      if (i > 0) {
        await this.page.goto(seatsUrl, { waitUntil: 'domcontentloaded' });
        await this.waitForSeatMapReady();
      }

      const seat = this.availableSeats
        .filter({ has: this.page.locator(`circle[fill="${colors[i]}"], rect[fill="${colors[i]}"]`) })
        .first();

      // dispatchEvent('click') doesn't work here — this widget apparently
      // listens for real pointer events at the stage level rather than a
      // per-element DOM click handler, so a synthetic event never registers
      // a selection at all.
      await this.clickSeat(seat);
      await this.page.waitForTimeout(800);

      const summaryText = await this.page.locator('body').innerText();
      const matched = categories.find(c => new RegExp(`\\b${c}\\b`).test(summaryText));
      if (matched) return matched;
    }

    throw new Error(`No available seat found in categories: ${categories.join(', ')}`);
  }

  async clickProceed() {
    await this.proceedBtn.click();
  }
}

module.exports = { SelectSetPg };
