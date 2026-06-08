# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: bookingFlow.spec.js >> Event Booking - End-to-End Flow >> Verify that user should show sign-in prompt after selecting event date and timeslot
- Location: tests/bookingFlow.spec.js:21:3

# Error details

```
TimeoutError: locator.waitFor: Timeout 10000ms exceeded.
Call log:
  - waiting for locator('[data-seat-element="true"][data-seat-type="PLATINUM"][data-seat-status="available"]').first() to be visible

```

```
Error: page.screenshot: Target page, context or browser has been closed
```

# Test source

```ts
  1 | async function takeFullPageScreenshot(page, name) {
> 2 |   await page.screenshot({
    |              ^ Error: page.screenshot: Target page, context or browser has been closed
  3 |     path: `screenshots/${name}.png`,
  4 |     fullPage: true,
  5 |   });
  6 | }
  7 | 
  8 | module.exports = { takeFullPageScreenshot };
```