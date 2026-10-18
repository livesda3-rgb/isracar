# IsraCar

Buildless PWA: deploy `docs/` to any HTTPS static host (including GitHub Pages). English by default, Russian and Hebrew/RTL. No API keys or dependencies. Serve the folder over HTTP for local testing; opening index.html via file:// is unsupported.

## Verified API results — 18 October 2026

Four independent GET requests, no Cookie header or cookie jar, exact numeric `filters={"mispar_rechev":NUMBER}`. All returned HTTP 200, CKAN success=true, one record matching the requested plate and Access-Control-Allow-Origin: *. Server sets cookies but client does not store or resend them. Raw responses and request URLs are in tests/*.json.

| Plate | Registry chassis value | Normalized 17-character VIN |
| --- | --- | --- |
| 6798573 | WVWZZZ3CZBP347976 | WVWZZZ3CZBP347976 |
| 4378437 | KMHCT41BEGU025160 | KMHCT41BEGU025160 |
| 8594437 | MDH*FBUK13*U0323822 | MDHFBUK13U0323822 |
| 27137802 | KMHK3815GLU529812 | KMHK3815GLU529812 |

First three match the user-provided references after removing Nissan's asterisks. Fourth comes from the registry only; no independent document comparison. VIN format validation checks length and allowed characters, not manufacturer authenticity or check digit. No invented characters or model-specific VIN decoding.

## Behavior and limits

Requests use credentials: omit. Exact filter first, q fallback on an unsupported filter or empty result; all results must match mispar_rechev exactly. Text fallback follows up to 1,000 hits and reports an error rather than falsely asserting absence when the search is too broad. Live tests established that filters work; q fallback is covered by controlled automated tests, not needed in the four live lookups.

20-second timeout; invalid input, missing records, offline, malformed CKAN responses and request errors handled. Source values are shown unaltered in their original language. All returned registration fields are displayed with translated labels. No claim that the dataset covers every Israeli vehicle category. No fluids or service specifications are inferred.

Service worker caches app shell only, never API responses. The interface can open offline; new lookups need internet. Installation depends on browser/OS PWA support. On iOS use Share > Add to Home Screen. HTTPS is required except localhost. No analytics or stored vehicle history. Language preference is stored locally.

## Validation

`node --test tests/registry.test.mjs` — six tests passed: input, four live fixtures, VIN normalization, missing/nonmatching records, fallback exact-match selection, network/malformed responses.

`node --check docs/app.js` passed. No build is needed.

Browser QA: live Nissan lookup succeeded directly from the local app; English, Russian and Hebrew/RTL rendering checked, including a 390px viewport. Local server returned HTTP 200. PWA installation and a fully offline browser session were not manually exercised.


## GitHub Pages

Publish the `main` branch, `/docs` folder from Settings → Pages. No build step or dependencies. Subsequent commits to docs automatically update the public app.

Application: https://livesda3-rgb.github.io/isracar/
