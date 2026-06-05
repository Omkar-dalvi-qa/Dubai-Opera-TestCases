async function takeFullPageScreenshot(page, name) {
  await page.screenshot({
    path: `screenshots/${name}.png`,
    fullPage: true,
  });
}

module.exports = { takeFullPageScreenshot };