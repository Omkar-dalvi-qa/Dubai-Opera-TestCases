# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: bookingFlow.spec.js >> Venue Tour Booking - End-to-End Flow >> Verify that user should complete venue tour booking flow from homepage to payment page
- Location: tests/bookingFlow.spec.js:54:3

# Error details

```
TypeError: CustomerDetailsPage is not a constructor
```

# Page snapshot

```yaml
- generic [ref=e1]:
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
      - heading "Dubai Opera" [level=1] [ref=e37]
      - generic [ref=e41]:
        - link "xcvbnbvb" [ref=e43] [cursor=pointer]:
          - /url: https://uat-opera.enpointe.io/en/events/the-musical-art/season-finale-rhythms-without-borders-by-uae-national-orchestra
          - 'img "Season Finale: Rhythms Without Borders by UAE National Orchestra" [ref=e46]'
        - generic:
          - link "RE:SET":
            - /url: https://uat-opera.enpointe.io/en/events/comedy-shows/reset
            - generic:
              - generic:
                - img "RE:SET"
        - generic:
          - link "Taha Desouky - Stand Up Comedy":
            - /url: https://uat-opera.enpointe.io/en/events/comedy-shows/taha-desouky-stand-up-comedy
            - generic:
              - generic:
                - img "Taha Desouky - Stand Up Comedy"
        - generic:
          - link "Marilyne Naaman":
            - /url: https://uat-opera.enpointe.io/en/events/live-performance/marilyne-naaman
            - generic:
              - generic:
                - img "Marilyne Naaman"
        - generic:
          - 'link "Steinway Series: Haydn. Théotime Gillots"':
            - /url: https://uat-opera.enpointe.io/en/events/the-musical-art/steinway-series-haydn-theotime-gillot-copy
            - generic:
              - generic:
                - 'img "Steinway Series: Haydn. Théotime Gillots"'
      - generic [ref=e54]:
        - generic [ref=e55]:
          - heading "What’s On" [level=2] [ref=e56]
          - link "View All" [ref=e57] [cursor=pointer]:
            - /url: /events
            - text: View All
            - img [ref=e58]
        - generic [ref=e61]:
          - generic [ref=e63]:
            - generic [ref=e64]:
              - 'img "Steinway Series: Haydn. Théotime Gillots" [ref=e65]'
              - button "Add to favorites" [ref=e66] [cursor=pointer]:
                - img [ref=e67]
            - generic [ref=e69]:
              - generic [ref=e72]: Musical & Arts
              - 'heading "Steinway Series: Haydn. Théotime Gillots" [level=3] [ref=e73]'
              - generic [ref=e74]:
                - paragraph
                - paragraph [ref=e75]: 10 Jun 2026 to 06 Jul 2026
                - generic [ref=e76]:
                  - generic [ref=e77]: From 250 AED
                  - link "Book Now" [ref=e78] [cursor=pointer]:
                    - /url: /events/the-musical-art/steinway-series-haydn-theotime-gillot-copy
          - generic [ref=e80]:
            - generic [ref=e81]:
              - 'img "Season Finale: Rhythms Without Borders by UAE National Orchestra" [ref=e82]'
              - button "Add to favorites" [ref=e83] [cursor=pointer]:
                - img [ref=e84]
            - generic [ref=e86]:
              - generic [ref=e89]: Musical & Arts
              - 'heading "Season Finale: Rhythms Without Borders by UAE National Orchestra" [level=3] [ref=e90]'
              - generic [ref=e91]:
                - paragraph
                - paragraph [ref=e92]: 24 Jun 2026 to 10 Jul 2026
                - generic [ref=e93]:
                  - generic [ref=e94]: From 1500 AED
                  - link "Book Now" [ref=e95] [cursor=pointer]:
                    - /url: /events/the-musical-art/season-finale-rhythms-without-borders-by-uae-national-orchestra
          - generic [ref=e97]:
            - generic [ref=e98]:
              - img "RE:SET" [ref=e99]
              - button "Add to favorites" [ref=e100] [cursor=pointer]:
                - img [ref=e101]
            - generic [ref=e103]:
              - generic [ref=e106]: Comedy
              - heading "RE:SET" [level=3] [ref=e107]
              - generic [ref=e108]:
                - paragraph
                - paragraph [ref=e109]: 10 Jul 2026
                - generic [ref=e110]:
                  - generic [ref=e111]: From 1000 AED
                  - link "Book Now" [ref=e112] [cursor=pointer]:
                    - /url: /events/comedy-shows/reset
          - generic [ref=e114]:
            - generic [ref=e115]:
              - img "Marilyne Naaman" [ref=e116]
              - button "Add to favorites" [ref=e117] [cursor=pointer]:
                - img [ref=e118]
            - generic [ref=e120]:
              - generic [ref=e123]: Live Performance
              - heading "Marilyne Naaman" [level=3] [ref=e124]
              - generic [ref=e125]:
                - paragraph
                - paragraph [ref=e126]: 26 Aug 2026 to 31 Oct 2026
                - generic [ref=e127]:
                  - generic [ref=e128]: From 395 AED
                  - link "Book Now" [ref=e129] [cursor=pointer]:
                    - /url: /events/live-performance/marilyne-naaman
      - generic [ref=e131]:
        - generic [ref=e133]:
          - heading "News & Updates" [level=2] [ref=e134]
          - link "View All" [ref=e135] [cursor=pointer]:
            - /url: /news
            - text: View All
            - img [ref=e136]
        - generic [ref=e138]:
          - link "Singin’ in the Rain — Read More" [ref=e139] [cursor=pointer]:
            - /url: /en/news/singin-in-the-rain-middle-eastern-debut-294196
            - generic [ref=e141]:
              - heading "Singin’ in the Rain" [level=3] [ref=e142]
              - paragraph [ref=e143]: Dubai Opera proudly presents the Middle Eastern debut of the Olivier Award-nominated musical Singin’ in the Rain. This acclaimed West End musical is based on the famous MGM Film and will dazzle audiences from November 30 to December 14, 2024.
              - generic [ref=e145]: Read More
          - link "Record Breaking Season — Read More" [ref=e146] [cursor=pointer]:
            - /url: /en/news/record-breaking-season-270872
            - generic [ref=e148]:
              - heading "Record Breaking Season" [level=3] [ref=e149]
              - paragraph [ref=e150]: As the curtain falls on another magnificent season, Dubai Opera celebrates an exceptional year, marked by unprecedented achievements and stellar performances. The 2023-2024 season witnessed a record-breaking attendance of over 250,000 guests, surpassing all previous years since the venue's inception in 2016. This milestone cements Dubai Opera's status as a premier cultural institution in the Middle East.
              - generic [ref=e152]: Read More
          - link "100 Most Admired Companies — Read More" [ref=e153] [cursor=pointer]:
            - /url: /en/news/most-admired-companies-294887
            - generic [ref=e155]:
              - heading "100 Most Admired Companies" [level=3] [ref=e156]
              - paragraph [ref=e157]: Dubai Opera has been named one of the 100 Most Admired Companies in the Middle East for 2024 by Arabian Business. This prestigious recognition celebrates organizations that lead with innovation, vision, and impact, highlighting their contributions to shaping the region's future.
              - generic [ref=e159]: Read More
          - link "Teatro alla Scala — Read More" [ref=e160] [cursor=pointer]:
            - /url: /en/news/la-scala-theatre-orchestra-270878
            - generic [ref=e162]:
              - heading "Teatro alla Scala" [level=3] [ref=e163]
              - paragraph [ref=e164]: Dubai Opera is set to make history on December 1st, 2023, as it welcomes the prestigious Teatro alla Scala Orchestra from Milan for an extraordinary Gala Concert. This cultural extravaganza, titled "Concert for Tomorrow," is not only a first in the United Arab Emirates but also aligns with the UN Climate Change Conference (COP28) in Dubai.
              - generic [ref=e166]: Read More
      - generic [ref=e171]:
        - heading "Venue Tour" [level=2] [ref=e172]:
          - generic [ref=e173]: Venue
          - generic [ref=e174]: Tour
        - paragraph [ref=e175]: Discover and explore one of Dubai's most iconic cultural destinations, blending visionary architecture with moments of magic.
        - link "Book A Tour" [active] [ref=e176] [cursor=pointer]:
          - /url: /en/visit/tours
      - generic [ref=e178]:
        - heading "Subscribe to get Our Newsletter" [level=2] [ref=e179]:
          - generic [ref=e180]: Subscribe to get
          - text: Our Newsletter
        - generic [ref=e181]:
          - textbox "Enter a valid email" [ref=e182]
          - button "Submit" [ref=e183] [cursor=pointer]
      - generic [ref=e185]:
        - heading "Our Partners" [level=2] [ref=e186]
        - list [ref=e187]:
          - listitem [ref=e188]:
            - heading "Official Partners" [level=3] [ref=e189]
            - img "American Express" [ref=e193]
          - listitem [ref=e194]:
            - heading "Strategic Partners" [level=3] [ref=e195]
            - img "Dubai Calendar" [ref=e199]
          - listitem [ref=e200]:
            - heading "Fragrance Partners" [level=3] [ref=e201]
            - img "Amouage" [ref=e205]
          - listitem [ref=e206]:
            - heading "Community Partners" [level=3] [ref=e207]
            - img "American Hospital" [ref=e211]
          - listitem [ref=e212]:
            - heading "Ballet & Dance Sponsor" [level=3] [ref=e213]
            - img "Van Cleef & Arpels" [ref=e217]
          - listitem [ref=e218]:
            - heading "Technology Partner" [level=3] [ref=e219]
            - img "Preevue" [ref=e223]
          - listitem [ref=e224]:
            - heading "Piano Partner" [level=3] [ref=e225]
            - img "Steinway & Sons" [ref=e229]
          - listitem [ref=e230]:
            - heading "Hospitality Partner" [level=3] [ref=e231]
            - img "Armani Hotels & Resorts" [ref=e235]
          - listitem [ref=e236]:
            - heading "Educational Partner" [level=3] [ref=e237]
            - img "Carnegie Hall Weil Music Institute" [ref=e241]
          - listitem [ref=e242]:
            - heading "Member Of" [level=3] [ref=e243]
            - img "Opera Europa" [ref=e247]
    - contentinfo [ref=e248]:
      - generic [ref=e249]:
        - generic [ref=e250]:
          - img "Footer Logo" [ref=e252]
          - paragraph [ref=e253]:
            - generic [ref=e254]: Dubai's premier destination for performing
            - generic [ref=e255]: arts, bringing world-class entertainment to the heart of the Middle East.
          - generic [ref=e256]:
            - link "Facebook" [ref=e257] [cursor=pointer]:
              - /url: https://www.facebook.com/dubaiopera
              - img [ref=e258]
            - link "Instagram" [ref=e260] [cursor=pointer]:
              - /url: https://www.instagram.com/dubaiopera/
              - img [ref=e261]
            - link "Twitter" [ref=e264] [cursor=pointer]:
              - /url: https://x.com/dubaiopera
              - img [ref=e265]
        - generic [ref=e267]:
          - generic [ref=e268]:
            - link "Contact US" [ref=e269] [cursor=pointer]:
              - /url: /en/contact-us
            - link "Terms and Conditions" [ref=e270] [cursor=pointer]:
              - /url: /en/terms-of-service
            - link "Privacy Policy" [ref=e271] [cursor=pointer]:
              - /url: /en/privacy-policy
          - generic [ref=e272]:
            - link "Accessibility" [ref=e273] [cursor=pointer]:
              - /url: /en/accessibility
            - link "Get Directions" [ref=e274] [cursor=pointer]:
              - /url: /en/direction
            - link "Dining" [ref=e275] [cursor=pointer]:
              - /url: /en/visit/dining
            - link "FAQs" [ref=e276] [cursor=pointer]:
              - /url: /en/faqs
      - generic [ref=e277]:
        - link "Footer Logo" [ref=e279] [cursor=pointer]:
          - /url: /en
          - img "Footer Logo" [ref=e280]
        - paragraph [ref=e281]: © 2026 Dubai Opera by Emaar
  - button "Open Next.js Dev Tools" [ref=e287] [cursor=pointer]:
    - generic [ref=e290]:
      - text: Compiling
      - generic [ref=e291]:
        - generic [ref=e292]: .
        - generic [ref=e293]: .
        - generic [ref=e294]: .
  - alert [ref=e295]
```

# Test source

```ts
  1  | const { test: base, expect } = require('@playwright/test');
  2  | const { NavBarPage }      = require('../pages/NavBarPage');
  3  | const { HomePage }        = require('../pages/HomePage');
  4  | const { EventDetailPage } = require('../pages/EventDetailPage');
  5  | const { VisitDetailsPage } = require('../pages/VisitDetailsPage');
  6  | const { PayDetailPg } = require('../pages/PaymentDetailPg');
  7  | const { SelectSetPg } = require('../pages/SelectSetPg');
  8  | 
  9  | const { CustomerDetailsPage } = require('../pages/CustomerDetailsPage');
  10 | 
  11 | const test = base.extend({
  12 |   navpg: async ({ page }, use) => {
  13 |     await use(new NavBarPage(page));
  14 |   },
  15 |   homepg: async ({ page }, use) => {
  16 |     await use(new HomePage(page));
  17 |   },
  18 |   eventpg: async ({ page }, use) => {
  19 |     await use(new EventDetailPage(page));
  20 |   },
  21 |   vistpg: async ({ page }, use) => {
  22 |     
  23 |     await use(new VisitDetailsPage(page));
  24 |   },
  25 |   custpg: async ({ page }, use) => {
> 26 |     await use(new CustomerDetailsPage(page));
     |               ^ TypeError: CustomerDetailsPage is not a constructor
  27 |   },
  28 |   paypg: async ({ page }, use) => {
  29 |     await use(new PayDetailPg(page));
  30 |   },
  31 |   SelectSetPg: async ({ page }, use) => {
  32 |     await use(new SelectSetPg(page));
  33 |   }
  34 | });
  35 | 
  36 | module.exports = { test, expect };
  37 | 
```