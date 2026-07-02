const BASE_URL = 'https://uat-opera.enpointe.io/en';

// Shared Emaar PASS QA login used by tests/auth.setup.js. Committed on
// test account, not a real customer credential. Rotate it if that changes.
const EMAAR_EMAIL = 'enpointeqa@gmail.com';
const EMAAR_PASSWORD = 'Test@123';

module.exports = { BASE_URL, EMAAR_EMAIL, EMAAR_PASSWORD };
