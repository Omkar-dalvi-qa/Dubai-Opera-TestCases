const { BasePage } = require('./BasePage');
const testData = require('../utils/testData.json');

class PayDetailPg extends BasePage {
  constructor(page) {
    super(page);
    this.cardNumber     = page.getByTestId('payment-card-number');
    this.cvv            = page.getByTestId('payment-cvv');
    this.cardHolderName = page.getByRole('textbox', { name: 'Name on card' });
    this.expiryDate     = page.getByRole('textbox', { name: 'MM/YYYY' });
    this.payNowBtn      = page.getByRole('button', { name: 'Pay Now' });

    // Validation error messages — exact text confirmed from UI screenshot.
    this.errors = {
      cardNumber:  page.getByText('Enter a valid 16-digit card number.'),
      holderName:  page.getByText('Enter valid cardholder name.'),
      expiry:      page.getByText('Enter valid expiry (MM/YYYY).'),
      cvv:         page.getByText('Enter valid CVV.'),
    };
  }

  // Clicks Pay Now without waiting for navigation — triggers form validation.
  async submitForm() {
    await this.payNowBtn.click();
  }

  // Individual field actions — used by both fillPaymentDetails and fillAllExcept.
  async fillCardNumber(value = testData.payment.cardNumber) { await this.cardNumber.fill(value); }
  async fillHolderName(value = testData.payment.holderName) { await this.cardHolderName.fill(value); }
  async fillExpiry(value = testData.payment.expiry)         { await this.expiryDate.fill(value); }
  async fillCvv(value = testData.payment.cvv)               { await this.cvv.fill(value); }

  // Fills every field except `skipField`.
  // Use this for negative tests: pass the field key to leave empty.
  async fillAllExcept(skipField) {
    const steps = [
      { key: 'cardNumber',  action: () => this.fillCardNumber() },
      { key: 'holderName',  action: () => this.fillHolderName() },
      { key: 'expiry',      action: () => this.fillExpiry() },
      { key: 'cvv',         action: () => this.fillCvv() },
    ];
    for (const step of steps) {
      if (step.key !== skipField) await step.action();
    }
  }

  // Fills all fields and clicks Pay Now.
  async fillPaymentDetails({
    cardNumber = testData.payment.cardNumber,
    holderName = testData.payment.holderName,
    expiry     = testData.payment.expiry,
    cvv        = testData.payment.cvv,
  } = {}) {
    await this.fillCardNumber(cardNumber);
    await this.fillHolderName(holderName);
    await this.fillExpiry(expiry);
    await this.fillCvv(cvv);
    await this.payNowBtn.click();
    await this.page.waitForTimeout(5000);
  }
}

module.exports = { PayDetailPg };
