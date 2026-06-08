const { BasePage } = require('./BasePage');

class NavBarPage extends BasePage {
  constructor(page) {
    super(page);
    this.navbar       = page.getByTestId('navbar');
    this.logo         = page.getByTestId('nav-logo');
    this.programsMenu = page.getByTestId('nav-dropdown-programs');
    this.visitMenu    = page.getByTestId('nav-dropdown-visit');
    this.aboutUsLink  = page.getByTestId('nav-link-about-us');
    this.newsLink     = page.getByTestId('nav-link-news');
    this.searchBtn    = page.getByTestId('nav-search-btn');
    this.cartLink     = page.getByTestId('nav-cart-link');
  }

  get programsDropdownItems() {
    return this.page.getByTestId('nav-programs-dropdown-panel').locator('a');
  }

  get visitDropdownItems() {
    return this.page.getByTestId('nav-visit-dropdown-panel').locator('a');
  }

  get searchInput() {
    return this.page.getByPlaceholder(/Search/i).nth(1);
  }

  async hoverPrograms() {
    await this.programsMenu.hover();
  }

  async hoverVisit() {
    await this.visitMenu.hover();
  }

  async clickSearch() {
    await this.searchBtn.click();
  }

  async clickCart() {
    await this.cartLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async clickNews() {
    await this.newsLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async clickAboutUs() {
    await this.aboutUsLink.click();
    await this.page.waitForLoadState('networkidle');
  }
}

module.exports = { NavBarPage };
