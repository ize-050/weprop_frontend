# Implementation Plan

Paths used in this plan:

- Backend: `/Users/ize/Desktop/04_Projects/weareprop_backend` (jest and supertest are already in `devDependencies`; `npm test` runs `jest`; there are no test files yet)
- Frontend: `/Users/ize/Desktop/04_Projects/weprop_frontend` (no test runner, so frontend checks are manual)

Notes for the test tasks:

- Backend tests mock `@prisma/client` with `jest.mock`, so no database is needed. `PropertyRepository` and `searchService` both call `new PrismaClient()`, so the mock must return one shared object with `property.findMany` and `property.count` as `jest.fn()`. Tests read the `where` passed to those two functions.
- `propertyRepository.js` and `searchService.js` export one instance each (`module.exports = new ...`), so import them after the mock is set up.

- [ ] 1. Write bug condition exploration tests (backend, jest)
  - **Property 1: Bug Condition** - Quota filter returns only the matching ownership quota
  - **CRITICAL**: These tests MUST FAIL on unfixed code. A failure confirms the bug exists.
  - **DO NOT attempt to fix the tests or the code when they fail**
  - **NOTE**: These tests encode the expected behavior. They validate the fix when they pass after the implementation.
  - **GOAL**: Surface counterexamples that show the bug exists
  - **Scoped PBT Approach**: The bug is deterministic, so scope the property to the concrete failing inputs: `propertyQuota` in `FOREIGN`, `THAI`, `foreign`, `thai`, `Foreign Quota`, `Thai Quota`, and an array value
  - Create `src/repositories/__tests__/propertyRepository.quota.test.js` and `src/services/__tests__/searchService.quota.test.js` in the backend
  - Mock `@prisma/client` (`PrismaClient` returns a shared object with `property.findMany` and `property.count`; also export `Prisma` because `propertyRepository.js` imports it). Return empty results from the mocks.
  - Test 1.a, findAll ignores quota: call `findAll({ propertyQuota: 'FOREIGN' })`, then read `where` from the `findMany` and `count` calls. Assert `where.AND` contains a quota condition on `ownershipQuota`. (Unfixed code: no quota condition at all.)
  - Test 1.b, searchService exact match: call `searchProperties({ propertyQuota: 'FOREIGN' })` and read `where`. Assert it has no `ownershipQuota = 'FOREIGN'` exact match and that `where.AND` has a `contains` condition that can match the stored text `Foreign Quota`. (Unfixed code: `where.ownershipQuota === 'FOREIGN'`.)
  - Test 1.c, array value: call `searchProperties({ propertyQuota: ['a', 'b'] })` and assert it does not throw. (Unfixed code: `.toUpperCase()` on an array throws.)
  - Table-driven loop: repeat 1.a and 1.b for every value in `FOREIGN`, `foreign`, `Foreign Quota`, `THAI`, `thai`, `Thai Quota`. The Foreign condition must not contain `thai` and the Thai condition must not contain `foreign`.
  - Bug condition from design: `isBugCondition(input)` is true when `normalizeQuota(input.quotaValue)` is `THAI` or `FOREIGN` and the entry point is `PROPERTIES_PAGE` (`findAll`) or `SEARCH_API` (`searchService`)
  - Expected behavior from design: the `where` has an `OR` list of `contains` conditions on `ownershipQuota` inside `where.AND`, for the chosen quota only
  - The frontend entry points `LIST_PAGE_SSR` (1.2) and `HOME_PAGE_BOX` (1.4) cannot be tested with jest. They are covered by the manual checks in task 6.
  - Run on UNFIXED code: `npm test -- propertyRepository.quota searchService.quota` in the backend
  - **EXPECTED OUTCOME**: Tests FAIL (this is correct and proves the bug exists)
  - Document the counterexamples found, for example "`findAll({ propertyQuota: 'FOREIGN' })` builds a `where` with no quota condition" and "`searchProperties({ propertyQuota: 'FOREIGN' })` builds `ownershipQuota: 'FOREIGN'`"
  - Mark the task complete when the tests are written, run, and the failures are documented
  - _Requirements: 1.1, 1.3, 2.1, 2.2, 2.4_

- [ ] 2. Write preservation property tests (BEFORE implementing the fix)
  - **Property 2: Preservation** - Requests without a quota filter build the same `where` as before
  - **IMPORTANT**: Follow the observation-first method
  - Create `src/repositories/__tests__/propertyRepository.preservation.test.js` and `src/services/__tests__/searchService.preservation.test.js` in the backend, with the same `@prisma/client` mock as task 1
  - Observe on UNFIXED code: first run `findAll` and `searchProperties` with no quota and print the `where` passed to `findMany` and `count`. Write the observed objects into the tests as the expected values.
  - Observe: `findAll` with no filters, and with `propertyQuota` as `undefined`, `''`, `'Company Name'`, and random text. The `where` has no `AND` key and no `ownershipQuota` key.
  - Observe: `searchProperties` with no quota and with `propertyQuota: ''`. The `where` has no `AND` key and no `ownershipQuota` key.
  - Do NOT assert the old behavior for `searchProperties({ propertyQuota: 'Company Name' })`. The unfixed code builds `ownershipQuota: 'COMPANY NAME'` there, and the design intentionally changes unrecognized values to "no quota filter". That input is covered in task 4 instead.
  - Write table-driven property tests: loop over many combinations of the other filters (`propertyType`, `zoneId`, `minPrice`, `maxPrice`, `bedrooms`, `bathrooms`, `listingType` or `type`, `city`, text search `search` or `keyword`, `page`, `limit`). For every combination without a recognized quota, assert the `where` (and `findMany` `skip`, `take`, `orderBy`) deeply equals the value observed on the unfixed code.
  - Assert the published and not-deleted conditions are present in every `where`
  - Assert that with a text search, `where.OR` is present and unchanged
  - Run on UNFIXED code: `npm test -- propertyRepository.preservation searchService.preservation`
  - **EXPECTED OUTCOME**: Tests PASS (this confirms the baseline behavior to preserve)
  - Mark the task complete when the tests are written, run, and passing on unfixed code
  - _Requirements: 3.1, 3.2, 3.3, 3.4_

- [ ] 3. Fix for the Foreign Quota filter showing Thai ownership properties

  - [ ] 3.1 (a) Create the backend helper `src/utils/ownershipQuota.js`
    - New CommonJS file in `/Users/ize/Desktop/04_Projects/weareprop_backend/src/utils/ownershipQuota.js`
    - Add `QUOTA_WORDS = { THAI: ['thai', 'Thai', 'THAI'], FOREIGN: ['foreign', 'Foreign', 'FOREIGN'] }`
    - Add `normalizeQuotaFilter(value)`: if the value is an array, use the first element; if it is not a string, return `null`; trim and lowercase; return `null` when empty; return `'THAI'` when the text has `thai` and not `foreign`; return `'FOREIGN'` when it has `foreign` and not `thai`; otherwise return `null`. It must never throw.
    - Add `buildOwnershipQuotaCondition(value)`: return `null` when the key is `null`; otherwise return `{ OR: QUOTA_WORDS[key].map(word => ({ ownershipQuota: { contains: word } })) }`
    - Do not use `mode: 'insensitive'` (Prisma with MySQL does not support it)
    - Export `{ normalizeQuotaFilter, buildOwnershipQuotaCondition }`
    - _Bug_Condition: isBugCondition(input) where normalizeQuota(input.quotaValue) is THAI or FOREIGN_
    - _Expected_Behavior: expectedBehavior(result) from design, helper returns a quota key or null and never throws_
    - _Preservation: unrecognized, empty, or non-string values return null, so no quota condition is added_
    - _Requirements: 2.1, 2.2, 2.4, 3.1_

  - [ ] 3.2 (b) Use the helper in `PropertyRepository.findAll()` (`src/repositories/propertyRepository.js`)
    - Add at the top: `const { buildOwnershipQuotaCondition } = require('../utils/ownershipQuota');`
    - Add `propertyQuota` to the destructured `options` in `findAll()`
    - After the `zoneId` filter and before the listings filter, add: `const condition = buildOwnershipQuotaCondition(propertyQuota); if (condition) where.AND = [...(where.AND || []), condition];`
    - Do not change any other line. `count` uses the same `where`, so totals and paging stay correct.
    - _Bug_Condition: isBugCondition(input) where input.entryPoint = PROPERTIES_PAGE (GET /api/properties)_
    - _Expected_Behavior: expectedBehavior(result) from design, only the chosen quota is returned_
    - _Preservation: no `AND` key is added when there is no recognized quota; the other filters, paging, and sorting stay the same_
    - _Requirements: 1.1, 2.1, 2.2, 3.1, 3.2, 3.3, 3.4_

  - [ ] 3.3 (c) Use the helper in `searchService.searchProperties()` (`src/services/searchService.js`)
    - Add the same `require` for `buildOwnershipQuotaCondition` at the top
    - Replace the block `if (propertyQuota) { where.ownershipQuota = propertyQuota.toUpperCase(); }` with: `const condition = buildOwnershipQuotaCondition(propertyQuota); if (condition) where.AND = [...(where.AND || []), condition];`
    - Keep the existing `where.OR` for the text search as it is. `where.AND` keeps both conditions active together.
    - _Bug_Condition: isBugCondition(input) where input.entryPoint = SEARCH_API (GET /api/search/properties)_
    - _Expected_Behavior: expectedBehavior(result) from design, the Foreign filter matches `Foreign Quota` and the Thai filter matches `Thai Quota`; an array value does not throw_
    - _Preservation: text search `where.OR` and all other filters are unchanged_
    - _Requirements: 1.3, 2.4, 3.2, 3.3, 3.4_

  - [ ] 3.4 (d) Forward `propertyQuota` in the frontend `src/app/[locale]/properties/list/page.jsx`
    - In `searchProperties()`, next to the other filters, add: `const quota = searchParams.propertyQuota || searchParams.quota; if (quota) queryParams.append('propertyQuota', quota);`
    - The `|| searchParams.quota` part keeps old bookmarked links working
    - Do not change `suspenseKey` or `dynamic = 'force-dynamic'` (they already react to the quota)
    - _Bug_Condition: isBugCondition(input) where input.entryPoint = LIST_PAGE_SSR_
    - _Expected_Behavior: expectedBehavior(result) from design, the quota reaches `/api/search/properties`_
    - _Preservation: the other query parameters are forwarded exactly as before_
    - _Requirements: 1.2, 2.3, 3.2_

  - [ ] 3.5 (e) Send `propertyQuota` from `src/components/homes/home-three/search/FilterSearch.jsx`
    - In `handleSearch()`, change `params.append('quota', quota)` to `params.append('propertyQuota', quota)`
    - Keep the values `thai` and `foreign` as they are (the backend helper accepts them)
    - _Bug_Condition: isBugCondition(input) where input.entryPoint = HOME_PAGE_BOX_
    - _Expected_Behavior: expectedBehavior(result) from design, the home page choice reaches the search page_
    - _Preservation: the other home page parameters (for example `type`) are unchanged_
    - _Requirements: 1.4, 2.5, 3.2_

  - [ ] 3.6 (f) Read `propertyQuota` or `quota` in `src/components/properties/PropertiesList.jsx` (both places)
    - In the initial `useState` filters, use: `propertyQuota: urlSearchParams.get('propertyQuota') || urlSearchParams.get('quota') || ''`
    - In the `useEffect` that rebuilds the filters from the URL, use the same expression
    - Do not change anything else in the file. Do not touch the "All Quota" handling in `handleSearch` (out of scope).
    - _Bug_Condition: isBugCondition(input) where input.entryPoint = HOME_PAGE_BOX or PROPERTIES_PAGE_
    - _Expected_Behavior: expectedBehavior(result) from design, both URL names give the same filter_
    - _Preservation: `fetchProperties()` and all other filters are unchanged_
    - _Requirements: 1.4, 2.1, 2.2, 2.5, 3.2_

  - [ ] 3.7 Verify the bug condition exploration tests now pass
    - **Property 1: Expected Behavior** - Quota filter returns only the matching ownership quota
    - **IMPORTANT**: Re-run the SAME tests from task 1. Do NOT write new tests.
    - The tests from task 1 encode the expected behavior. When they pass, the expected behavior is met.
    - Run in the backend: `npm test -- propertyRepository.quota searchService.quota`
    - **EXPECTED OUTCOME**: Tests PASS (this confirms the bug is fixed on the backend)
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

  - [ ] 3.8 Verify the preservation tests still pass
    - **Property 2: Preservation** - Requests without a quota filter build the same `where` as before
    - **IMPORTANT**: Re-run the SAME tests from task 2. Do NOT write new tests.
    - Run in the backend: `npm test -- propertyRepository.preservation searchService.preservation`
    - **EXPECTED OUTCOME**: Tests PASS (this confirms there are no regressions)
    - Confirm all tests still pass after the fix
    - _Requirements: 3.1, 3.2, 3.3, 3.4_

- [ ] 4. Write unit and table-driven tests for the helper
  - **Property 3: Helper Robustness** - Mapping is case-insensitive and never throws
  - Create `src/utils/__tests__/ownershipQuota.test.js` in the backend
  - `normalizeQuotaFilter` casings: `THAI`, `thai`, `Thai`, `Thai Quota`, `tHaI`, `THAI QUOTA` all give `'THAI'`. `FOREIGN`, `foreign`, `Foreign`, `Foreign Quota`, `fOrEiGn`, `FOREIGN QUOTA` all give `'FOREIGN'`.
  - Spaces: `'  thai quota  '` gives `'THAI'`, `'  foreign  '` gives `'FOREIGN'`
  - Arrays: `['foreign', 'thai']` gives `'FOREIGN'` (first element used), `['thai']` gives `'THAI'`, `[]` gives `null`
  - Non-strings give `null`: `null`, `undefined`, `123`, `true`, `{}`, `() => {}`, `Symbol('x')`
  - Other strings give `null`: `''`, `'   '`, `'Company Name'`, `'all'`, `'random text'`
  - A string that has both words (for example `'thai foreign'`) gives `null`
  - Table-driven loop: generate every upper and lower case combination of `thai` and `foreign`, with random spaces around them, with and without the word `quota`. Assert one key per word.
  - Table-driven loop: generate random non-string values and arrays of mixed values. Assert the function never throws and the result is `'THAI'`, `'FOREIGN'`, or `null`.
  - `buildOwnershipQuotaCondition`: returns `null` when the key is `null` (including `'Company Name'`, empty, and non-string). Otherwise returns `{ OR: [...] }` with `{ ownershipQuota: { contains: word } }` for `thai`, `Thai`, `THAI` (or the `foreign` versions). The Thai result has no `foreign` word and the Foreign result has no `thai` word. The function never throws.
  - Stored-text check: apply the `contains` rules in plain JavaScript to `Thai Quota`, `Foreign Quota`, `Company Name`, `thai quota`, `FOREIGN QUOTA`, and `null`. Assert Thai matches only the Thai strings and Foreign matches only the Foreign strings, and neither matches `Company Name` or `null`.
  - Add a search service check for the intentional change: `searchProperties({ propertyQuota: 'Company Name' })` builds no quota condition
  - Add a combined filter check in both test files from task 1: quota plus `propertyType`, `zoneId`, price range, and a text search gives a `where` that has the quota condition in `where.AND` and the text search in `where.OR`, and neither overwrites the other
  - Run: `npm test -- ownershipQuota`
  - **EXPECTED OUTCOME**: Tests PASS
  - _Requirements: 2.4, 3.1, 3.3_

- [ ] 5. Checkpoint - Ensure all tests pass
  - Run `npm test` in `/Users/ize/Desktop/04_Projects/weareprop_backend`
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 6. Manual verification (frontend and API)
  The frontend has no test runner, so these checks are done by hand against a development database that has one Thai Quota, one Foreign Quota, and one Company Name property (all published).

  - [ ] 6.1 Check the home page search box
    - Choose Foreign Quota and click search. The URL has `propertyQuota=foreign` (not `quota=`) and only Foreign Quota properties show.
    - Repeat with Thai Quota (only Thai properties show) and with "All Quota" (all three properties show, including Company Name).
    - _Requirements: 2.5, 3.1_

  - [ ] 6.2 Check the `/properties` page
    - Use the hero search bar with Thai, then Foreign. The results change each time and the Thai property never appears under Foreign.
    - Combine a quota with property type, zone, and price range. Only properties that match all filters show.
    - _Requirements: 2.1, 2.2, 3.2, 3.3_

  - [ ] 6.3 Check the `/properties/list` page
    - Open `/properties/list?propertyQuota=FOREIGN` and `?propertyQuota=THAI`. Only the matching quota shows, and the backend request has `propertyQuota` in the query.
    - Go to page 2 and confirm the filter stays.
    - _Requirements: 2.3, 3.4_

  - [ ] 6.4 Check old `?quota=` links
    - Open `/properties?quota=foreign` and `/properties/list?quota=foreign`. Only Foreign properties show on both pages.
    - _Requirements: 2.3, 2.5_

  - [ ] 6.5 Check the customer scenario
    - In the back office, save a property as "Thai Quota" and publish it.
    - On the Search page, filter by Foreign Quota. The Thai property must not appear. Filter by Thai Quota. The property must appear.
    - _Requirements: 2.1, 2.2_

  - [ ] 6.6 Check the API directly (curl with the `x-api-key` header)
    - `GET /api/properties?propertyQuota=FOREIGN`, `=foreign`, `=Foreign Quota`: only Foreign Quota rows. Same for THAI.
    - `GET /api/search/properties?propertyQuota=FOREIGN` and `=thai`: only the matching quota.
    - No `propertyQuota`, and `propertyQuota=`: all quotas, same count as before the fix.
    - Repeated `propertyQuota` parameter: no 500 error.
    - `pagination.total` and `meta.total` match the number of rows.
    - _Requirements: 2.1, 2.2, 2.4, 3.1, 3.4_

  - [ ] 6.7 Check that saving and detail pages are unchanged
    - Add, edit, and duplicate one property of each quota (`Thai Quota`, `Foreign Quota`, `Company Name`). Open each detail page and confirm the saved quota text is the same.
    - _Requirements: 3.5, 3.6_

- [ ] 7. Release check on the real database
  - Run the data check and review the values:
    ```sql
    SELECT ownership_quota, COUNT(*) AS total
    FROM properties
    WHERE deleted_at IS NULL
    GROUP BY ownership_quota
    ORDER BY total DESC;
    ```
    (If the soft-delete column has another name, drop the `WHERE` line.)
  - Run the collation check: `SHOW FULL COLUMNS FROM properties LIKE 'ownership_quota';`
  - If only `Thai Quota`, `Foreign Quota`, `Company Name`, and `NULL` appear, no change is needed (the helper could later be tightened to an exact match by editing only `ownershipQuota.js`)
  - If other text appears (for example a company name with the word "Thai" in it, or other wording or languages), decide per value which filter it belongs to and report it to the user before release
  - Do not change any data or schema as part of this task
  - _Requirements: 2.1, 2.2, 2.4, 3.1_
