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

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - region "Notifications alt+T"
    - navigation [ref=e3]:
      - link "Logo" [ref=e4] [cursor=pointer]:
        - /url: /en
        - img "Logo" [ref=e6]
      - generic [ref=e7]:
        - link "Home" [ref=e8] [cursor=pointer]:
          - /url: /en
          - generic [ref=e9]: Home
        - link "Programs" [ref=e11] [cursor=pointer]:
          - /url: /en/events
          - generic [ref=e12]: Programs
          - img [ref=e13]
        - link "Visit" [ref=e16] [cursor=pointer]:
          - /url: /en/visit/tours
          - generic [ref=e17]: Visit
          - img [ref=e18]
        - link "About Us" [ref=e20] [cursor=pointer]:
          - /url: /en/about-us
          - generic [ref=e21]: About Us
        - link "News" [ref=e22] [cursor=pointer]:
          - /url: /en/news
          - generic [ref=e23]: News
      - generic [ref=e24]:
        - button "Search" [ref=e25] [cursor=pointer]:
          - img [ref=e26]
        - link "Cart" [ref=e30] [cursor=pointer]:
          - /url: /en/shop/cart
          - img [ref=e31]
        - button "Sign In" [ref=e35] [cursor=pointer]
    - main [ref=e36]:
      - generic [ref=e38]:
        - generic [ref=e40]:
          - button "Go back" [ref=e41]:
            - img [ref=e42]
          - generic [ref=e44]:
            - 'button "Steinway Series: Hay..." [ref=e46]'
            - generic [ref=e47]:
              - generic [ref=e48]: /
              - button "Add ons"
        - generic [ref=e49]:
          - generic [ref=e51]:
            - heading "Add Ons" [level=1] [ref=e53]
            - generic [ref=e56]:
              - article [ref=e57] [cursor=pointer]:
                - generic [ref=e58]:
                  - img "Dubai Opera Cup" [ref=e60]
                  - generic [ref=e61]:
                    - heading "Dubai Opera Cup" [level=3] [ref=e62]
                    - paragraph [ref=e64]: One House beverage from our specially selected menu (Alcoholic and Non-Alcoholic available)
                    - generic [ref=e65]:
                      - paragraph [ref=e66]: AED 200
                      - img [ref=e68]
              - article [ref=e69] [cursor=pointer]:
                - generic [ref=e70]:
                  - img "DO Premium Package (Pre-show Package)" [ref=e72]
                  - generic [ref=e73]:
                    - heading "DO Premium Package (Pre-show Package)" [level=3] [ref=e74]
                    - paragraph [ref=e76]: A selection of canapés presented by our Opera Cafe + One Premium beverage (includes Bubbles) from our premium menu (Alcoholic and Non-Alcoholic available)
                    - generic [ref=e77]:
                      - paragraph [ref=e78]: AED 135
                      - img [ref=e80]
              - article [ref=e81] [cursor=pointer]:
                - generic [ref=e82]:
                  - img "DO Belcanto Dine-in (Single Admit)" [ref=e84]
                  - generic [ref=e85]:
                    - heading "DO Belcanto Dine-in (Single Admit)" [level=3] [ref=e86]
                    - paragraph [ref=e88]: AED 299 redeemable food and beverage voucher, inclusive of 1 complimentary bubbly (alcoholic & non-alcoholic available) at Belcanto restaurant, located on the rooftop of Dubai Opera
                    - generic [ref=e89]:
                      - paragraph [ref=e90]: AED 299
                      - img [ref=e92]
          - generic [ref=e93]:
            - paragraph [ref=e96]: 09:50
            - complementary [ref=e97]:
              - heading "Summary" [level=2] [ref=e98]
              - generic [ref=e99]:
                - 'img "Steinway Series: Haydn. Théotime Gillots" [ref=e101]'
                - generic [ref=e102]:
                  - paragraph [ref=e103]: "Steinway Series: Haydn. Théotime Gillots"
                  - paragraph [ref=e104]: 10 Jun 2026, 5:00 PM
              - generic [ref=e106]:
                - generic [ref=e107]:
                  - paragraph [ref=e109]: STUDIO TICKET
                  - generic [ref=e110]:
                    - button "Decrease studio ticket quantity" [disabled] [ref=e111]:
                      - img [ref=e112]
                    - generic [ref=e113]: "1"
                    - button "Increase studio ticket quantity" [disabled] [ref=e114]:
                      - img [ref=e115]
                - paragraph [ref=e116]: AED 250.00
              - generic [ref=e117]:
                - generic [ref=e118]:
                  - paragraph [ref=e119]: Subtotal
                  - paragraph [ref=e120]: AED 250.00
                - generic [ref=e121]:
                  - paragraph [ref=e122]: Have a promo Code?
                  - generic [ref=e123]:
                    - textbox "Enter your Code" [ref=e124]
                    - button "Apply" [disabled] [ref=e125] [cursor=pointer]
                - generic [ref=e126]:
                  - generic [ref=e127]:
                    - paragraph [ref=e128]: Total Payment
                    - paragraph [ref=e129]: AED 262.50
                  - generic [ref=e130]:
                    - paragraph [ref=e131]: VAT (Included)
                    - paragraph [ref=e132]: AED 12.50
              - button "Proceed to Checkout" [ref=e133] [cursor=pointer]
              - generic [ref=e134]:
                - paragraph [ref=e135]: Tickets are non-refundable.
                - paragraph [ref=e136]: See our cancellation policy for details.
    - contentinfo [ref=e137]:
      - generic [ref=e138]:
        - generic [ref=e139]:
          - img "Footer Logo" [ref=e141]
          - paragraph [ref=e142]:
            - generic [ref=e143]: Dubai's premier destination for performing
            - generic [ref=e144]: arts, bringing world-class entertainment to the heart of the Middle East.
          - generic [ref=e145]:
            - link "Facebook" [ref=e146] [cursor=pointer]:
              - /url: https://www.facebook.com/dubaiopera
              - img [ref=e147]
            - link "Instagram" [ref=e149] [cursor=pointer]:
              - /url: https://www.instagram.com/dubaiopera/
              - img [ref=e150]
            - link "Twitter" [ref=e153] [cursor=pointer]:
              - /url: https://x.com/dubaiopera
              - img [ref=e154]
        - generic [ref=e156]:
          - generic [ref=e157]:
            - link "Contact US" [ref=e158] [cursor=pointer]:
              - /url: /en/contact-us
            - link "Terms and Conditions" [ref=e159] [cursor=pointer]:
              - /url: /en/terms-of-service
            - link "Privacy Policy" [ref=e160] [cursor=pointer]:
              - /url: /en/privacy-policy
          - generic [ref=e161]:
            - link "Accessibility" [ref=e162] [cursor=pointer]:
              - /url: /en/accessibility
            - link "Get Directions" [ref=e163] [cursor=pointer]:
              - /url: /en/direction
            - link "Dining" [ref=e164] [cursor=pointer]:
              - /url: /en/visit/dining
            - link "FAQs" [ref=e165] [cursor=pointer]:
              - /url: /en/faqs
      - generic [ref=e166]:
        - link "Footer Logo" [ref=e168] [cursor=pointer]:
          - /url: /en
          - img "Footer Logo" [ref=e169]
        - paragraph [ref=e170]: © 2026 Dubai Opera by Emaar
  - button "Open Next.js Dev Tools" [ref=e176] [cursor=pointer]:
    - img [ref=e177]
  - alert [ref=e180]: Dubai Opera | House of Cultures
```

# Test source

```ts
  1  | const { BasePage } = require('./BasePage');
  2  | 
  3  | class SelectSetPg extends BasePage {
  4  |   constructor(page) {
  5  |     super(page);
  6  |   }
  7  | 
  8  |   seatLocator(type) {
  9  |     return this.page.locator(
  10 |       `[data-seat-element="true"][data-seat-type="${type}"][data-seat-status="available"]`
  11 |     ).first();
  12 |   }
  13 | 
  14 |   async selectSeat(type) {
  15 |     const seat = this.seatLocator(type);
> 16 |     await seat.waitFor({ state: 'visible', timeout: 10000 });
     |                ^ TimeoutError: locator.waitFor: Timeout 10000ms exceeded.
  17 |     await seat.dispatchEvent('click');
  18 |   }
  19 | 
  20 |   async selectevent() {
  21 |     await this.selectSeat('PLATINUM');
  22 |     await this.selectSeat('GOLD');
  23 |     //await this.selectSeat('Standard');
  24 | 
  25 |     await this.page.getByRole('button', { name: 'Proceed' }).click();
  26 |     //await this.page.locator('.lucide.lucide-plus').first().click();
  27 |     await this.page.getByRole('button', { name: 'Proceed to Checkout' }).click();
  28 |   }
  29 | }
  30 | 
  31 | module.exports = { SelectSetPg };
  32 | 
```