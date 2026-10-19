# Extension release — 19 October 2026

Public application: https://livesda3-rgb.github.io/isracar/

## Implemented

- Preserved exact-filter/q registry lookup, raw chassis/normalized VIN, vehicle characteristics, latest inspection and registration expiry.
- Device-language detection with regional forms, explicit saved-choice priority and English fallback. Automatic selection does not save a manual preference. RU/EN/HE labels and RTL; VIN/codes/sizes/numbers retain LTR.
- Copy buttons for populated registry/history/tyre values, raw chassis, VIN and plate. Translated notifications; Clipboard API with legacy fallback. Copy all includes confirmed values and closed-section history; excludes missing service data.
- Collapsible additional registration metadata. Section order: vehicle → history → valuation → maintenance → OEM catalogs. Desktop search beside results, mobile vertical flow.
- Independent history requests: latest odometer, engine number, change flags and ownership months/types. Exact match, pagination, partial failure, cancellation, 12-second timeout and 15-minute session cache; retrieval time and refresh.
- Valuation: no-data state, expandable manual source links; tested min/max range and single-quote UI. No live valuation providers enabled. Different bases, adjustment scopes, methods or source-edition dates remain separate; each quote retained.
- Maintenance: registered tyres moved here. Unknown fluids/wipers/wheels explicitly unavailable. Exact gearbox identification required; no oil recommendation from make/model/year alone.
- 7zap public VIN-search link and VIN copy; brand-aware PartSouq fallback. Access/payment/coverage limitations disclosed; no undocumented VIN URL or automated extraction.
- PWA shell v2 caches all new modules; no API responses persisted. No dependencies, secrets or server added.

## Integration status and gaps

Connected: data.gov.il vehicle registry and two vehicle-history resources. Registered tyres come from the registry.

Manual external links only: government price guide, Yad2, Levi Yitzhak, 7zap, PartSouq.

Not connected: automatic prices; OEM fluids/approvals/volumes/intervals; exact gearbox; wipers/mounting; alternative tyres/wheel dimensions/PCD/DIA/ET/pressures. A source license and verified variant mapping are still required. Empty UI or a link is not presented as completed data integration. HaynesPro is a licensed integration candidate only. Details and primary references: SOURCES.md.

## Validation

- **17 automated tests passed**: original registry cases plus language/translation coverage; min/max and single quotes; different valuation bases; stale/invalid/mismatched/unverified/duplicate quotes; synthetic history mapping cases; partial failure; exact matching; cache/cancellation; tyre provenance; catalog URLs and clipboard errors.
- Updated app performed live browser lookups for 6798573, 4378437 and 8594437: VINs match provided references. Nissan raw separators retained separately.
- Live history verification observed both populated and empty results. Empty datasets do not establish an absence of real-world history. Raw history responses remain local; public tests use synthetic history inputs.
- Browser: RU persistence after reload; Hebrew RTL with VIN LTR; tyre-value copying; Copy all includes VIN/history/tyres and excludes unknown service specs.
- Isolated tests/valuation-ui.html: synthetic 3-source range ₪28,000–₪34,000, expansion/collapse, single ₪29,500, absent prices, history failure, range and individual-quote copying. Synthetic values exist only under tests, outside the Pages /docs folder; production provider list is empty.
- Responsive harness: actual iframe widths 390px RTL and 1100px LTR, document scroll widths equal viewport widths (no horizontal overflow). This is browser layout QA, not physical phone testing.
- Syntax checks passed, no build needed.

## Verification limits

Physical iOS Safari/Android Chrome, native installation and a fully offline OS session were not manually exercised. Auto-language logic tested with preference arrays; manual persistence checked in-browser. No source claims complete historical mileage/inspection chronology. No claim that exact control VINs resolve in external parts catalogs; links lead to manual VIN search.

## Changed files

Existing: docs/app.js, docs/index.html, docs/style.css, docs/sw.js, package.json, README.md, .gitignore.

Added: docs/localization.js, docs/clipboard.js, docs/history.js, docs/valuation.js, docs/service.js, docs/catalog.js, docs/sections.js; tests/extensions.test.mjs, tests/valuation-ui.html, tests/responsive.html; SOURCES.md and RELEASE.md.

## Publication / rollback

Existing GitHub Pages source: main /docs. Previous working commit: 47ce29e9b7efbcc9ba084b32c92797326e439265. Roll back by reverting the extension commit in a new commit and letting Pages republish; do not force-reset shared history. Bump the service-worker shell cache version if reverting cached code.
