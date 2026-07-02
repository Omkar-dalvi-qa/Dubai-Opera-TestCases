const { test } = require('../utils/fixtures');
const { LoginPage } = require('../pages/LoginPage');
const { EMAAR_EMAIL, EMAAR_PASSWORD } = require('../utils/constants');

const authFile = 'playwright/.auth/user.json';

// Not part of the default test run (doesn't match *.spec.js), so it only runs
// when targeted directly. Re-run this whenever the saved session expires:
//   npx playwright test tests/auth.setup.js
test('authenticate via Emaar PASS', async ({ page, homepg }) => {
  const loginpg = new LoginPage(page);

  await homepg.goto();
  await page.getByRole('button', { name: 'Sign In', exact: true }).click();
  await page.getByRole('button', { name: 'Sign In', exact: true }).nth(1).click();
  await page.waitForURL(/emaar/, { timeout: 15000 });

  await loginpg.login(EMAAR_EMAIL, EMAAR_PASSWORD);

  await page.waitForURL(/uat-opera\.enpointe\.io/, { timeout: 20000 });
  await page.context().storageState({ path: authFile });
});
