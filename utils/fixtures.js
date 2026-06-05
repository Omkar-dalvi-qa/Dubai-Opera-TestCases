const { test: base, expect } = require('@playwright/test');
const { NavBarPage }      = require('../pages/NavBarPage');
const { HomePage }        = require('../pages/HomePage');
const { EventDetailPage } = require('../pages/EventDetailPage');
const { VisitDetailsPage } = require('../pages/VisitDetailsPage');
const { PayDetailPg } = require('../pages/PaymentDetailPg');
const { SelectSetPg } = require('../pages/SelectSetPg');

const { CustomerDetailsPage } = require('../pages/CustomerDetailsPage');

const test = base.extend({
  navpg: async ({ page }, use) => {
    await use(new NavBarPage(page));
  },
  homepg: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  eventpg: async ({ page }, use) => {
    await use(new EventDetailPage(page));
  },
  vistpg: async ({ page }, use) => {
    
    await use(new VisitDetailsPage(page));
  },
  custpg: async ({ page }, use) => {
    await use(new CustomerDetailsPage(page));
  },
  paypg: async ({ page }, use) => {
    await use(new PayDetailPg(page));
  },
  SelectSetPg: async ({ page }, use) => {
    await use(new SelectSetPg(page));
  }
});

module.exports = { test, expect };
