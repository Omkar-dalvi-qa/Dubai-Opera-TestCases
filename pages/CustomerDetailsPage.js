const { BasePage } = require('./BasePage');
const testData = require('../utils/testData.json');

class CustomerDetailsPage extends BasePage {
  constructor(page) {
    super(page);

    this.firstName            = page.getByRole('textbox', { name: 'First name', exact: true });
    this.lastName             = page.getByRole('textbox', { name: 'Last name', exact: true });
    this.dobInput             = page.getByRole('textbox', { name: 'dd/mm/yyyy' });
    this.email                = page.getByRole('textbox', { name: 'name@email.com' });
    this.mobileInput          = page.getByRole('textbox', { name: 'Mobile Number' });
    this.cityInput            = page.locator('form').getByRole('textbox', { name: 'City' });
    this.proceedBtn           = page.getByRole('button', { name: 'Proceed to Payment' });
    this.nationalityDropdown  = page.getByTestId('customer-nationality-dropdown');
    this.genderToggle         = page.getByTestId('gender-male-radio');
    this.countryCodeDropdown  = page.getByTestId('customer-country-dropdown');
    this.termsCheckbox        = page.getByTestId('terms-and-conditions-checkbox');

    // Validation error messages shown when a required field is empty and form is submitted.
    // Update the text values below if the app shows different messages.
    this.errors = {
      firstName:   page.getByText('First name is required.'),
      lastName:    page.getByText('Last name is required.'),
      nationality: page.getByText('Nationality is required.'),
      dob:         page.getByText('Date of birth is required.'),
      gender:      page.getByText('Required.'),
      email:       page.getByText('Email is required.'),
      mobile:      page.getByText('Mobile is required.'),
      countryCode: page.getByText('Required.'),
      city:        page.getByText('City is required.'),
      terms:       page.getByText('Accept terms.'),
    };
  }

  // Clicks proceed without waiting for navigation — used to trigger form validation.
  async submitForm() {
    await this.proceedBtn.click();
  }

  async selectDateOfBirth() {
    await this.dobInput.click();
    await this.page
      .getByRole('gridcell')
      .filter({ hasNot: this.page.locator('[disabled]') })
      .first()
      .click();
  }

  // Individual field actions — used by both fillCustomerDetails and fillAllExcept.
  async fillFirstName(value = testData.customer.firstName)   { await this.firstName.fill(value); }
  async fillLastName(value = testData.customer.lastName)     { await this.lastName.fill(value); }
  async fillEmail(value = testData.customer.email)           { await this.email.fill(value); }
  async fillMobile(value = testData.customer.mobile)         { await this.mobileInput.fill(value); }
  async fillCity(value = testData.customer.city)             { await this.cityInput.fill(value); }

  async selectNationality(value = testData.customer.nationality) {
    await this.nationalityDropdown.click();
    await this.page.getByRole('option', { name: value }).click();
  }

  async selectCountryCode(value = testData.customer.countryCode) {
    await this.countryCodeDropdown.click();
    await this.page.getByRole('option', { name: value }).click();
  }

  async selectGender()           { await this.genderToggle.click(); }
  async acceptTerms()            { await this.termsCheckbox.click(); }

  // Fills every field except `skipField`.
  // Use this for negative tests: pass the field name to leave empty/unselected.
  async fillAllExcept(skipField) {
    const steps = [
      { key: 'firstName',   action: () => this.fillFirstName() },
      { key: 'lastName',    action: () => this.fillLastName() },
      { key: 'nationality', action: () => this.selectNationality() },
      { key: 'dob',         action: () => this.selectDateOfBirth() },
      { key: 'gender',      action: () => this.selectGender() },
      { key: 'email',       action: () => this.fillEmail() },
      { key: 'mobile',      action: () => this.fillMobile() },
      { key: 'countryCode', action: () => this.selectCountryCode() },
      { key: 'city',        action: () => this.fillCity() },
      { key: 'terms',       action: () => this.acceptTerms() },
    ];

    for (const step of steps) {
      if (step.key !== skipField) await step.action();
    }
  }

  // Fills all fields and proceeds to payment.
  async fillCustomerDetails({
    firstName   = testData.customer.firstName,
    lastName    = testData.customer.lastName,
    nationality = testData.customer.nationality,
    email       = testData.customer.email,
    mobile      = testData.customer.mobile,
    countryCode = testData.customer.countryCode,
    city        = testData.customer.city,
  } = {}) {
    await this.fillFirstName(firstName);
    await this.fillLastName(lastName);
    await this.selectNationality(nationality);
    await this.selectDateOfBirth();
    await this.selectGender();
    await this.fillEmail(email);
    await this.fillMobile(mobile);
    await this.selectCountryCode(countryCode);
    await this.fillCity(city);
    await this.acceptTerms();
    await this.proceedBtn.click();
    await this.page.waitForLoadState('networkidle');
  }
}

module.exports = { CustomerDetailsPage };
