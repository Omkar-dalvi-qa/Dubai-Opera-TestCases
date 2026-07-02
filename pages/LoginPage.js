const { BasePage } = require('./BasePage');

// "Sign In" on the main site is a full OAuth redirect to the Emaar PASS SSO
// domain (dev-accounts-emaar-com.azurewebsites.net) — this form lives there,
// not on uat-opera.enpointe.io. Unlike the main site, it has real stable ids.
class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.emailInput    = page.locator('#email_address');
    this.passwordInput = page.locator('#password');
    this.loginBtn      = page.getByRole('button', { name: 'Login' });
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginBtn.click();
  }
}

module.exports = { LoginPage };
