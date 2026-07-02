const { test, expect } = require('../utils/fixtures');
const { takeFullPageScreenshot } = require('../utils/Reuasble');

// ═══════════════════════════════════════════════════════════
// Event Booking — Full E2E Flow
// ═══════════════════════════════════════════════════════════
// test.describe('Event Booking - End-to-End Flow', () => {

//   test.beforeEach(async ({ homepg, page }) => {
//     await homepg.goto();
//     await homepg.clickFirstEventCta();
//     await expect(page).toHaveURL(/\/events\/.+\/.+/);
//   });

//   test.afterEach(async ({ page }, testInfo) => {
//     if (testInfo.status === 'failed') {
//       await takeFullPageScreenshot(page, `event-booking-failure-${testInfo.title.replace(/\s+/g, '-')}`);
//     }
//   });

//   test('Verify that user should show sign-in prompt after selecting event date and timeslot', async ({ eventpg, SelectSetPg }) => {
//     await eventpg.selectFirstAvailableDate();

//     const slot = await eventpg.selectFirstAvailableTimeSlot();
//     if (slot) {
//       await expect(slot).toHaveClass(/bg-primary-light/);
//     }

//     await expect(eventpg.bookBtn).toBeVisible();
//     await expect(eventpg.bookBtn).not.toHaveAttribute('disabled');
//     await eventpg.clickBook();
//     await SelectSetPg.selectevent();
//     await expect(await eventpg.signInBtn()).toBeVisible({ timeout: 10000 });
//   });
// });


// ═══════════════════════════════════════════════════════════
// Venue Tour — Full E2E Flow
// ═══════════════════════════════════════════════════════════
test.describe('Venue Tour Booking - End-to-End Flow', () => {
  // Signed in via the session saved by tests/auth.setup.js (run
  // `npx playwright test --project=setup` first, or whenever it expires).
  // With an authenticated session, "Book Tickets" skips the sign-in prompt
  // entirely and goes straight to checkout.
  test.use({ storageState: 'playwright/.auth/user.json' });

  test.beforeEach(async ({ homepg }) => {
    await homepg.goto();
    await homepg.clickvenueTourBtn();
  });

  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status === 'failed') {
      await takeFullPageScreenshot(page, `venue-tour-failure-${testInfo.title.replace(/\s+/g, '-')}`);
    }
  });

  test('Verify that user can complete venue tour checkout details and Proceed to Payment is enabled', async ({ vistpg, custpg }) => {

    await vistpg.selectFirstAvailableDate();

    const slot = await vistpg.selectFirstAvailableTimeSlot();
    await expect(slot).toHaveClass(/bg-primary-light/);

    await vistpg.addDefaultTickets(expect);

    await expect(vistpg.bookBtn).toBeVisible();
    await expect(vistpg.bookBtn).not.toHaveAttribute('disabled');
    //await vistpg.clickBook();

    await custpg.fillCustomerDetails();

    await expect(custpg.proceedBtn).toBeVisible();
    await expect(custpg.proceedBtn).toBeEnabled();
  });
});
