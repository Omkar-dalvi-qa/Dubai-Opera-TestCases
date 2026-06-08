// const { test, expect } = require('../utils/fixtures');
// const { takeFullPageScreenshot } = require('../utils/Reuasble');

// // ═══════════════════════════════════════════════════════════
// // Event Detail Page — Negative Tests
// // ═══════════════════════════════════════════════════════════
// test.describe('Event Detail Page - Negative Tests', () => {

//   test.beforeEach(async ({ homepg, page }) => {
//     await homepg.goto();
//     await homepg.clickFirstEventCta();
//     await expect(page).toHaveURL(/\/events\/.+\/.+/);
//   });

//   test.afterEach(async ({ page }, testInfo) => {
//     if (testInfo.status === 'failed') {
//       await takeFullPageScreenshot(page, `event-detail-failure-${testInfo.title.replace(/\s+/g, '-')}`);
//     }
//   });

//   test('book button is disabled when no date is selected', async ({ eventpg }) => {
//     await expect(eventpg.bookBtn).toBeVisible();
//     await expect(eventpg.bookBtn).toHaveAttribute('disabled', '');
//   });

//   test('book button is disabled when date is selected but no timeslot chosen', async ({ eventpg }) => {
//     await eventpg.selectFirstAvailableDate();
//     await expect(eventpg.bookBtn).toBeVisible();
//     await expect(eventpg.bookBtn).toHaveAttribute('disabled', '');
//   });

//   test('force-clicking disabled book button does not navigate away', async ({ eventpg, page }) => {
//     const urlBefore = page.url();
//     await eventpg.bookBtn.click({ force: true });
//     expect(page.url()).toBe(urlBefore);
//   });

//   test('no timeslot is highlighted before the user makes a selection', async ({ eventpg, page }) => {
//     const timeSlotsVisible = await eventpg.timeSlotSection.isVisible().catch(() => false);
//     if (timeSlotsVisible) {
//       const activeSlots = eventpg.timeSlotSection
//         .getByTestId('time-slot-btn')
//         .filter({ has: page.locator('.bg-primary-light') });
//       await expect(activeSlots).toHaveCount(0);
//     }
//   });
// });


// // ═══════════════════════════════════════════════════════════
// // Venue Tour Detail Page — Negative Tests
// // ═══════════════════════════════════════════════════════════
// test.describe('Venue Tour Detail Page - Negative Tests', () => {

//   test.beforeEach(async ({ homepg }) => {
//     await homepg.goto();
//     await homepg.clickvenueTourBtn();
//   });

//   test.afterEach(async ({ page }, testInfo) => {
//     if (testInfo.status === 'failed') {
//       await takeFullPageScreenshot(page, `venue-tour-negative-failure-${testInfo.title.replace(/\s+/g, '-')}`);
//     }
//   });

//   test('book button is disabled when no date is selected', async ({ vistpg }) => {
//     await expect(vistpg.bookBtn).toBeVisible();
//     await expect(vistpg.bookBtn).toHaveAttribute('disabled', '');
//   });

//   test('book button is disabled when date is selected but no timeslot chosen', async ({ vistpg }) => {
//     await vistpg.selectFirstAvailableDate();
//     await expect(vistpg.bookBtn).toBeVisible();
//     await expect(vistpg.bookBtn).toHaveAttribute('disabled', '');
//   });

//   test('book button is disabled when date + timeslot selected but no tickets added', async ({ vistpg }) => {
//     await vistpg.selectFirstAvailableDate();
//     await vistpg.selectFirstAvailableTimeSlot();
//     await expect(vistpg.ticketRows).toBeVisible({ timeout: 5000 });
//     await expect(vistpg.bookBtn).toBeVisible();
//     await expect(vistpg.bookBtn).toHaveAttribute('disabled', '');
//   });

//   test('disabled time slot button cannot be selected', async ({ vistpg }) => {
//     await vistpg.selectFirstAvailableDate();
//     const count = await vistpg.disabledTimeSlots.count();
//     if (count === 0) test.skip();
//     const disabledSlot = vistpg.disabledTimeSlots.first();
//     await expect(disabledSlot).toBeDisabled();
//     await disabledSlot.click({ force: true });
//     await expect(disabledSlot).not.toHaveClass(/bg-primary-light/);
//   });

//   test('past dates in the calendar are disabled and cannot be selected', async ({ vistpg, page }) => {
//     await vistpg.openCalendar();
//     const pastDays = vistpg.disabledCalendarDays;
//     const count = await pastDays.count();
//     if (count === 0) test.skip();
//     await expect(pastDays.first()).toBeVisible();
//     await pastDays.first().click({ force: true });
//     await expect(page.locator('.react-datepicker')).toBeVisible();
//   });
// });
