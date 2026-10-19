# Full-specification update — 19 October 2026

App: https://livesda3-rgb.github.io/isracar/

## Implemented in this update

- Primary card keeps make/model/year/trim, fuel and confirmed engine code, full VIN, last recorded mileage, registration expiry/status, owners and Levi Yitzhak price in fixed visible positions.
- Last odometer loads independently. The registry history source supplies no odometer observation date; first registration and fetch timestamps are never presented as that date. Ambiguous conflicting readings remain unconfirmed.
- Registration expiry uses tokef_dt, separate from the last inspection. Calendar-day status is Valid, Expiring within 30 days, or Expired; it refreshes on visibility changes and while the page remains open.
- The source does not establish a unique-owner count. Main card shows No data; clicking opens numbered ownership-type/month records and an explanation. Records are never counted as unique owners. No personal names or identity numbers are displayed.
- Levi Yitzhak is the only eligible primary valuation source. No licensed provider is configured, so Price unavailable is displayed. Yad2 and the government price guide never substitute for Levi. Only a range supplied by the authorized source can appear as its range; multiple candidate quotes require variant confirmation.
- Secondary vehicle fields are collapsed; no main tyre duplication. Service & Maintenance is open with visible fluid, wiper and tyre groups. Unknown specifications are marked, gearbox identification is required, detailed missing fields can be inspected separately.
- Parts links are optional and collapsed. No account, installation or external visit is needed to see available registry data. Mobile search scrolls directly to the result without animation.
- Existing automatic language detection/saved preference, EN/RU/HE and RTL, field/report copying, exact registry lookup, independent history, timeout/cache behavior and PWA are retained. Added light/dark system-theme styles. No dependencies or server added.

## Sources and unresolved functions

Connected: data.gov.il main vehicle registry plus both history resources. Registered tyres come from the main registry. Additional engine displacement or power is not inferred from model/engine-code text.

Not connected: licensed Levi Yitzhak valuation; exact VIN-to-engine/gearbox-to-OEM-fluid specifications; wiper sizes and additional wheel fitment. Unique-owner total and full inspection/mileage chronology are not established by the connected datasets. They remain unknown, rather than being approximated.

Official TecRMI and Autodata API documentation was found. Authentication, license, prices, quotas, Israeli variant coverage and public-site redistribution rights still need provider confirmation. MOTUL and LIQUI MOLY interactive guides are supplementary recommendations; their existence is not permission to use an API or claim an OEM match. No authenticated control-VIN specifications were obtained. Provider findings and three control-VIN applicability results are in SOURCES.md. No subscription purchase, login bypass or hidden-API extraction.

To complete commercial integrations: obtain a suitable license, documented endpoint/credentials, confirmed Israeli coverage and redistribution rights. Secrets would remain in a minimal server-side proxy, not GitHub Pages. No service has been provisioned or charged.

## Validation

- **22 automated tests passed**: original registry cases, language/translation coverage, history matching/errors/cache, tyre provenance, copying errors, calendar-day expiry boundaries, malformed/conflicting odometer values, ownership-count non-inference and strict Levi-only/licensed-source filtering.
- Live browser regression: all three supplied control VINs matched; Nissan raw chassis separators remain separately visible. Available additional history was confirmed in the primary mileage area; ownership count stayed unknown while rows could be expanded.
- Browser test fixtures are synthetic and outside the Pages /docs directory. Point/range UI, wrong-source rejection and history failure were exercised separately. No synthetic prices or ownership records are enabled in the production loaders.
- RU persistence and Hebrew RTL/LTR-code behavior checked; responsive harness uses 390px/1100px viewports. No horizontal document overflow observed. Phone hardware, native PWA installation and a fully offline OS session were not manually exercised. System dark styles are provided; complete device/theme matrix is not certified.
- Copy actions displayed success notifications and clipboard success/error paths passed unit tests. The browser automation clipboard reader did not expose the newly copied text, so clipboard contents were not independently verified in this final browser session.
- No build or dependencies required. Previous live registry checks from this same date were reused rather than repeating source research.

## Changed files

Existing: docs/app.js, docs/sections.js, docs/service.js, docs/valuation.js, docs/localization.js, docs/style.css, docs/index.html, docs/sw.js, tests/valuation-ui.html, README.md, SOURCES.md, RELEASE.md.

Added: docs/summary.js and tests/summary.test.mjs. Raw plate-linked history verification files remain local and excluded by .gitignore, as in the previous release.

## Publish and rollback

Existing GitHub Pages source remains main /docs. Previous working commit: ec662d8ed67c84214e60f4b52137b2a9aa98ad9a. Revert the new commit through a normal commit to roll back, then let Pages republish; bump the service-worker cache identifier if cached code is rolled back. No force push is needed.
