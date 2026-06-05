// const { test, expect } = require('../utils/fixtures');
// const { takeFullPageScreenshot } = require('../utils/Reuasble');

// // ═══════════════════════════════════════════════════════════
// // Customer Details Page — Negative Tests
// // ═══════════════════════════════════════════════════════════
// test.describe('Customer Details Page - Field Validation', () => {

//   test.beforeEach(async ({ homepg, vistpg, page }) => {
//     // Venue Tour flow: Homepage → Book A Tour → date → timeslot → tickets → Book
//     await homepg.goto();
//     await homepg.clickvenueTourBtn();
//     await vistpg.selectFirstAvailableDate();
//     await vistpg.selectFirstAvailableTimeSlot();
//     await vistpg.addDefaultTickets(expect);
//     await vistpg.clickBook();
//   });

//   test.afterEach(async ({ page }, testInfo) => {
//     if (testInfo.status === 'failed') {
//       await takeFullPageScreenshot(page, `customer-details-failure-${testInfo.title.replace(/\s+/g, '-')}`);
//     }
//   });

//   test('Verify that user able to see validation error when first name is empty', async ({ custpg }) => {
//     await custpg.fillAllExcept('firstName');
//     await custpg.submitForm();
//     await expect(custpg.errors.firstName).toBeVisible();
//   });

//   test('Verify that user able to see validation error when last name is empty', async ({ custpg }) => {
//     await custpg.fillAllExcept('lastName');
//     await custpg.submitForm();
//     await expect(custpg.errors.lastName).toBeVisible();
//   });

//   test('Verify that user able to see validation error when nationality is not selected', async ({ custpg }) => {
//     await custpg.fillAllExcept('nationality');
//     await custpg.submitForm();
//     await expect(custpg.errors.nationality).toBeVisible();
//   });

//   test('Verify that user able to see validation error when date of birth is not selected', async ({ custpg }) => {
//     await custpg.fillAllExcept('dob');
//     await custpg.submitForm();
//     await expect(custpg.errors.dob).toBeVisible();
//   });

//   test('Verify that user able to see validation error when Gender is not selected', async ({ custpg }) => {
//     await custpg.fillAllExcept('gender');
//     await custpg.submitForm();
//     await expect(custpg.errors.gender).toBeVisible();
//   });

//   test('Verify that user able to see validation error when Email Address is empty', async ({ custpg }) => {
//     await custpg.fillAllExcept('email');
//     await custpg.submitForm();
//     await expect(custpg.errors.email).toBeVisible();
//   });

//   test('Verify that user able to see validation error when Mobile Number is empty', async ({ custpg }) => {
//     await custpg.fillAllExcept('mobile');
//     await custpg.submitForm();
//     await expect(custpg.errors.mobile).toBeVisible();
//   });

//   test('Verify that user able to see validation error when Country Code is not selected', async ({ custpg }) => {
//     await custpg.fillAllExcept('countryCode');
//     await custpg.submitForm();
//     await expect(custpg.errors.countryCode).toBeVisible();
//   });

//   test('Verify that user able to see validation error when City is empty', async ({ custpg }) => {
//     await custpg.fillAllExcept('city');
//     await custpg.submitForm();
//     await expect(custpg.errors.city).toBeVisible();
//   });

//   test('Verify that user able to see validation error when Terms & Conditions is not accepted', async ({ custpg }) => {
//     await custpg.fillAllExcept('terms');
//     await custpg.submitForm();
//     await expect(custpg.errors.terms).toBeVisible();
//   });
// });
