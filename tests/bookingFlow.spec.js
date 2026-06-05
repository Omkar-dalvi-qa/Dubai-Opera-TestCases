const { test, expect } = require('../utils/fixtures');
const { takeFullPageScreenshot } = require('../utils/Reuasble');

// ═══════════════════════════════════════════════════════════
// Event Booking — Full E2E Flow
// ═══════════════════════════════════════════════════════════
test.describe('Event Booking - End-to-End Flow', () => {

  test.beforeEach(async ({ homepg, page }) => {
    await homepg.goto();
    await homepg.clickFirstEventCta();
    await expect(page).toHaveURL(/\/events\/.+\/.+/);
  });

  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status === 'failed') {
      await takeFullPageScreenshot(page, `event-booking-failure-${testInfo.title.replace(/\s+/g, '-')}`);
    }
  });

  test('Verify that user should show sign-in prompt after selecting event date and timeslot', async ({ eventpg, SelectSetPg }) => {
    await eventpg.selectFirstAvailableDate();

    const slot = await eventpg.selectFirstAvailableTimeSlot();
    if (slot) {
      await expect(slot).toHaveClass(/bg-primary-light/);
    }

    await expect(eventpg.bookBtn).toBeVisible();
    await expect(eventpg.bookBtn).not.toHaveAttribute('disabled');
    await eventpg.clickBook();
    await SelectSetPg.selectevent();
    await expect(await eventpg.signInBtn()).toBeVisible({ timeout: 10000 });
  });
});


// ═══════════════════════════════════════════════════════════
// Venue Tour — Full E2E Flow
// ═══════════════════════════════════════════════════════════
test.describe('Venue Tour Booking - End-to-End Flow', () => {

  test.beforeEach(async ({ homepg }) => {
    await homepg.goto();
    await homepg.clickvenueTourBtn();
  });

  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status === 'failed') {
      await takeFullPageScreenshot(page, `venue-tour-failure-${testInfo.title.replace(/\s+/g, '-')}`);
    }
  });

  test('Verify that user should complete venue tour booking flow from homepage to payment page', async ({ vistpg, custpg, paypg }) => {
    
    await vistpg.selectFirstAvailableDate();

    const slot = await vistpg.selectFirstAvailableTimeSlot();
    await expect(slot).toHaveClass(/bg-primary-light/);

    await vistpg.addDefaultTickets(expect);

    await expect(vistpg.bookBtn).toBeVisible();
    await expect(vistpg.bookBtn).not.toHaveAttribute('disabled');
    await vistpg.clickBook();

    await custpg.fillCustomerDetails();
    
    await paypg.fillPaymentDetails();
  });
});
