class BasePage {
  constructor(page) {
    this.page = page;
  }

  async navigate(url) {
    // 'load' (the default) intermittently exceeds the 30s timeout on this
    // site's media-heavy homepage; 'domcontentloaded' is enough since every
    // element we interact with is queried with its own auto-waiting locator.
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }
}

module.exports = { BasePage };
