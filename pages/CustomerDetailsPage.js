const { BasePage } = require('./BasePage');

// No data-testid on the live checkout page. When signed in (see auth.setup.js),
// First/Last Name, Email, Mobile, Nationality, Date of Birth, Country, and City
// all arrive pre-filled from the Emaar PASS profile — Email and Mobile are
// locked (disabled). Gender, Resident Status, and the Terms checkbox are the
// only fields that actually need interaction to enable "Proceed to Payment".
// The radio/checkbox inputs themselves are visually hidden (sr-only) and
// styled via their wrapping <label>, so clicks are targeted at that label.
class CustomerDetailsPage extends BasePage {
  constructor(page) {
    super(page);

    this.proceedBtn      = page.getByRole('button', { name: 'Proceed to Payment' }).first();
    this.genderMaleRadio = page.getByRole('radio', { name: 'Male', exact: true });
    this.residentRadio   = page.getByRole('radio', { name: 'Resident', exact: true });
    this.termsCheckbox   = page.getByRole('checkbox', { name: /Terms.*Conditions/i });
  }

  async clickLabelFor(inputLocator) {
    await inputLocator.first().locator('xpath=ancestor::label[1]').click();
  }

  async selectGender()         { await this.clickLabelFor(this.genderMaleRadio); }
  async selectResidentStatus() { await this.clickLabelFor(this.residentRadio); }
  async acceptTerms()          { await this.clickLabelFor(this.termsCheckbox); }

  // Fills only the fields that aren't already pre-populated from the signed-in profile.
  async fillCustomerDetails() {
    await this.selectGender();
    await this.selectResidentStatus();
    await this.acceptTerms();
  }
}

module.exports = { CustomerDetailsPage };
