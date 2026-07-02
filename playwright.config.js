
require('dotenv').config();
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['html'],
    ['allure-playwright'],
    ['json', { outputFile: 'test-results/results.json' }]
  ],

  use: {
    trace: 'on-first-retry',
    headless: true,
    viewport: { width: 1440, height: 900 },
    screenshot: 'on',
  },

  outputDir: 'test-results',

  projects: [
    // Only runs when targeted explicitly (--project=setup), never as part of a
    // plain `npx playwright test` run — keeps it from touching unrelated specs.
    {
      name: 'setup',
      testMatch: /.*\.setup\.js$/,
    },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});