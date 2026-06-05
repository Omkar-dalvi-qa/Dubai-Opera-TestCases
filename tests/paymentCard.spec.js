const { test, expect } = require('../utils/fixtures');
const { takeFullPageScreenshot } = require('../utils/Reuasble');

// ═══════════════════════════════════════════════════════════
// Payment Card Page — Negative Tests
// ═══════════════════════════════════════════════════════════
test.describe('Payment Card Page - Negative Tests', () => {

  test.beforeEach(async ({ homepg, vistpg, custpg, page }) => {
    await homepg.goto();
    await homepg.clickvenueTourBtn();
    await vistpg.selectFirstAvailableDate();
    await vistpg.selectFirstAvailableTimeSlot();
    await vistpg.addDefaultTickets(expect);
    await vistpg.clickBook();
    await custpg.fillCustomerDetails();
    await expect(page).toHaveURL(/\/payment/);
  });

  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status === 'failed') {
      await takeFullPageScreenshot(page, `payment-failure-${testInfo.title.replace(/\s+/g, '-')}`);
    }
  });

  // ── Missing field tests ──────────────────────────────────────────────

  test('Verify that user able to see validation error when Card Number is empty', async ({ paypg }) => {
    await paypg.fillAllExcept('cardNumber');
    await paypg.submitForm();
    await expect(paypg.errors.cardNumber).toBeVisible();
  });

  test('Verify that user able to see error when Cardholder Name is empty', async ({ paypg }) => {
    await paypg.fillAllExcept('holderName');
    await paypg.submitForm();
    await expect(paypg.errors.holderName).toBeVisible();
  });

  test('Verify that user able to see error when Expiry Date is empty', async ({ paypg }) => {
    await paypg.fillAllExcept('expiry');
    await paypg.submitForm();
    await expect(paypg.errors.expiry).toBeVisible();
  });

  test('Verify that user able to see error when CVV is empty', async ({ paypg }) => {
    await paypg.fillAllExcept('cvv');
    await paypg.submitForm();
    await expect(paypg.errors.cvv).toBeVisible();
  });

  // ── Invalid format tests ─────────────────────────────────────────────

  test('shows expiry error when year has only 2 digits (MM/YY)', async ({ paypg }) => {
    await paypg.fillCardNumber();
    await paypg.fillHolderName();
    await paypg.fillExpiry('12/25');   // wrong: needs MM/YYYY
    await paypg.fillCvv();
    await paypg.submitForm();
    await expect(paypg.errors.expiry).toBeVisible();
  });



  test('shows CVV error when CVV has only 2 digits', async ({ paypg }) => {
    await paypg.fillCardNumber();
    await paypg.fillHolderName();
    await paypg.fillExpiry();
    await paypg.fillCvv('12');         // wrong: needs 3 digits
    await paypg.submitForm();
    await expect(paypg.errors.cvv).toBeVisible();
  });

  test('shows card number error when card number is incomplete', async ({ paypg }) => {
    await paypg.fillCardNumber('4111 1111'); // only 8 of 16 digits
    await paypg.fillHolderName();
    await paypg.fillExpiry();
    await paypg.fillCvv();
    await paypg.submitForm();
    await expect(paypg.errors.cardNumber).toBeVisible();
  });
});
