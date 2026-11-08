# Foreign Quota Filter Shows Thai Ownership Bugfix Design

## Overview

On the public search pages, the "Property Quota" filter does not work. A customer saved a property as "Thai Quota", then chose "Foreign Quota" in the filter and still saw the Thai property.

The ownership is stored as free text in `Property.ownershipQuota` (database column `ownership_quota`, type `String?`). The form saves one of `Thai Quota`, `Foreign Quota`, or `Company Name`. The filter is broken in four places:

1. Backend `GET /api/properties` (`PropertyRepository.findAll`) ignores `propertyQuota`.
2. Frontend `/properties/list` page does not forward `propertyQuota` to `/api/search/properties`.
3. Backend `GET /api/search/properties` (`searchService.js`) compares `propertyQuota.toUpperCase()` (for example `FOREIGN`) with the stored text `Foreign Quota` using an exact match, so it never matches.
4. The home page search sends `quota=thai|foreign`, but the `/properties` page reads only `propertyQuota`.

**Fix approach (small and safe):**

- Add one small backend helper that turns any filter value (`THAI`, `thai`, `Thai Quota`, `FOREIGN`, `foreign`, `Foreign Quota`) into a database condition. Both `findAll()` and `searchService.js` use this helper. This is the only place that knows how filter values map to stored values.
- Use a tolerant, case-insensitive "contains" match (`thai` or `foreign`) so older rows with slightly different text still work.
- Make three small frontend changes so the quota value reaches the backend.
- Do not change how the quota is saved, and do not change the database schema.

## Glossary

- **Bug_Condition (C)**: A visitor selects "Thai" or "Foreign" quota in a search filter, and the system does not narrow the results to that quota.
- **Property (P)**: The desired behavior. Only published, not-deleted properties with the matching ownership quota are returned.
- **Preservation**: Behavior that must not change. This includes "All Quota", all other filters, paging, sorting, response shape, and how the form saves the quota.
- **Stored quota values**: The text in `properties.ownership_quota`: `Thai Quota`, `Foreign Quota`, `Company Name`. Older rows may hold other text (see the legacy data risk below).
- **Filter quota values**: The text sent by the website: `THAI`/`FOREIGN` (listing page search bar), `thai`/`foreign` (home page search box and `DropdownData.js`).
- **Quota key**: The normalized result of the helper: `'THAI'`, `'FOREIGN'`, or `null` (no quota filter).
- **`PropertyRepository.findAll`**: In `weareprop_backend/src/repositories/propertyRepository.js`. Handles `GET /api/properties`. Used by the `/properties` page (`PropertiesList.jsx`).
- **`searchService.searchProperties`**: In `weareprop_backend/src/services/searchService.js`. Handles `GET /api/search/properties`. Used by the `/properties/list` page (server side).
- **`ownershipQuotaFilter` (new helper)**: A new file `weareprop_backend/src/utils/ownershipQuota.js` that holds the mapping.

## Bug Details

### Bug Condition

The bug happens when a visitor picks a quota (Thai or Foreign) in any of the three search entry points. The quota is lost before it reaches the database query (frontend drops it, or backend ignores it), or it reaches the query in a form that cannot match the stored text.

**Formal Specification:**

```
FUNCTION isBugCondition(input)
  INPUT: input of type SearchRequest
         (entryPoint, quotaValue, otherFilters)
  OUTPUT: boolean

  quotaKey := normalizeQuota(input.quotaValue)   // THAI, FOREIGN, or null

  RETURN quotaKey IS NOT null
         AND (
              // 1.1  /properties -> GET /api/properties ignores the value
              input.entryPoint = "PROPERTIES_PAGE"

              // 1.2  /properties/list does not forward the value
              OR input.entryPoint = "LIST_PAGE_SSR"

              // 1.3  value reaches /api/search/properties but uses exact match
              OR input.entryPoint = "SEARCH_API"

              // 1.4  home page sends "quota", search page reads "propertyQuota"
              OR input.entryPoint = "HOME_PAGE_BOX"
             )
         AND resultContainsPropertiesWithOtherQuota(input)   // wrong rows, or no rows at all
END FUNCTION
```

### Examples

- `/properties?propertyQuota=FOREIGN` with one "Thai Quota" property: backend ignores the value and returns the Thai property. Expected: it is not returned.
- `/properties/list?propertyQuota=THAI`: the page does not add `propertyQuota` to the request, so Thai, Foreign, and Company properties all come back. Expected: only Thai.
- `GET /api/search/properties?propertyQuota=FOREIGN` (sent directly): the query becomes `ownershipQuota = 'FOREIGN'`, which matches nothing because the stored text is `Foreign Quota`. Expected: all Foreign Quota properties.
- Home page, choose "Foreign Quota", click search: the URL is `/properties?type=sale&quota=foreign`. The page ignores `quota` and shows every property. Expected: only Foreign Quota properties.
- Edge case: `propertyQuota=` (empty, "All Quota"). Expected and unchanged: every quota is returned, including "Company Name".
- Edge case: `?propertyQuota=a&propertyQuota=b` (repeated parameter). Express gives an array. Today `.toUpperCase()` on an array throws and the request fails with an error. Expected after fix: no crash.

## Expected Behavior

### Preservation Requirements

**Unchanged Behaviors:**

- "All Quota" (no quota value) returns every ownership quota, including "Company Name" (3.1).
- Filters for property type, zone, price range, bedrooms, bathrooms, listing type, and keyword work exactly as before when no quota is chosen (3.2).
- A quota combined with other filters applies all of them together (3.3).
- Only published, not-deleted properties are returned, with the same paging, sorting, images, labels, zone, and property type data and the same response shape (3.4).
- The add, edit, and duplicate forms keep saving `Thai Quota`, `Foreign Quota`, or `Company Name` unchanged (3.5).
- The property detail page keeps showing the saved ownership quota (3.6).

**Scope:**

All requests that do NOT contain a recognized Thai or Foreign quota value are unaffected. This includes:

- Requests with no quota value or an empty one.
- Requests with a value the helper does not recognize (for example `Company Name` or random text). The helper returns `null`, so no quota condition is added, which is the same as today's result for `/api/properties`.
- All mouse, tab, paging, and other filter interactions in the UI.

**Decision on unrecognized values:** ignore them (treat as "no quota filter"). This matches how the other filters behave and avoids showing an empty page because of a typo. The UI only offers All, Thai, and Foreign, so this case comes only from hand-made URLs.

## Hypothesized Root Cause

All four causes below were confirmed by reading the code in the requirements phase and again for this design.

1. **Backend ignores the parameter (`GET /api/properties`)**: `findAll()` reads `propertyType`, `listingType`, `minPrice`, `maxPrice`, `bedrooms`, `bathrooms`, `city`, `zoneId`, `search`, `userId` from the options. It never reads `propertyQuota`. The controller passes `req.query` straight through, so the value arrives but is not used.

2. **Frontend drops the parameter (`/properties/list`)**: `searchProperties()` in `src/app/[locale]/properties/list/page.jsx` copies `propertyType`, `minPrice`, `maxPrice`, `zoneId`, `listingType`, `bedrooms`, `bathrooms`, `searchQuery`, `page`, `type`, `limit`. It has no `propertyQuota`. The browser URL already contains it (set by `ListingPropertiesPage.handleSearch`), so only the server-side request is missing it.

3. **Exact match against the wrong text**: `searchService.js` sets `where.ownershipQuota = propertyQuota.toUpperCase()`. The value `FOREIGN` is never equal to `Foreign Quota`. The comment in the code says it filters `ownership_quota`, but the stored values are readable text, not enum-like codes.

4. **Parameter name mismatch from the home page**: `FilterSearch.jsx` appends `quota` with lowercase values. `PropertiesList.jsx` reads only `propertyQuota` (in the initial state and in the `useEffect` on URL changes).

**Extra findings from this design review:**

- `PropertiesList.jsx` calls the backend directly (`${NEXT_PUBLIC_API_URL}/properties?...`). It does NOT go through the Next.js proxy `src/app/api/properties/route.js`. A search of `src/` found no code that calls `/api/properties` on the Next.js side.
- Both `findAll()` and `searchService.js` already use `where.OR` for text search. A quota condition that also needs an `OR` must therefore be added through `where.AND`, or it would overwrite or be overwritten by the text search.
- Prisma 6 with MySQL does not support `mode: 'insensitive'` (it is for PostgreSQL and MongoDB). Case-insensitivity must come from the database collation, or from matching a few casings, not from `mode`.
- Today `propertyQuota.toUpperCase()` throws if the value is an array (repeated query parameter), which ends as a 500 error.

## Correctness Properties

Property 1: Bug Condition - Quota filter returns only the matching ownership quota

_For any_ search request where the bug condition holds (isBugCondition returns true), that is, a Thai or Foreign quota value (any letter case, short form `thai`/`foreign` or full stored text) sent from the `/properties` page, the `/properties/list` page, the `/api/search/properties` endpoint, or the home page search box, the fixed system SHALL return only published, not-deleted properties whose saved ownership quota matches the chosen quota (Thai filter returns Thai Quota, Foreign filter returns Foreign Quota), and SHALL NOT return properties of the other quota.

**Validates: Requirements 2.1, 2.2, 2.3, 2.4, 2.5**

Property 2: Preservation - Requests without a quota filter behave as before

_For any_ search request where the bug condition does NOT hold (no quota value, empty value, or an unrecognized value), the fixed system SHALL produce the same results as the original system, preserving "All Quota" results (including "Company Name"), all other filters, combined filters, published and not-deleted rules, paging, sorting, response shape, the quota values saved by the forms, and the quota shown on the detail page.

**Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5, 3.6**

Property 3: Helper robustness - Mapping is case-insensitive and never throws

_For any_ input value to the mapping helper (any letter case, extra spaces, full stored text, empty value, array, number, `undefined`, `null`), the helper SHALL return `'THAI'`, `'FOREIGN'`, or `null` without throwing, and SHALL return the same key for all casing variants of the same word.

**Validates: Requirements 2.4, 3.1**

## Fix Implementation

### Changes Required

#### Backend (`/Users/ize/Desktop/04_Projects/weareprop_backend`)

**1. NEW file: `src/utils/ownershipQuota.js`** (the single place for the mapping)

Two small functions, CommonJS like the rest of the backend.

```
CONST QUOTA_WORDS = {
  THAI:    ['thai',    'Thai',    'THAI'],
  FOREIGN: ['foreign', 'Foreign', 'FOREIGN']
}

FUNCTION normalizeQuotaFilter(value)
  INPUT: any
  OUTPUT: 'THAI' | 'FOREIGN' | null

  IF value is an array THEN value := first element
  IF value is not a string THEN RETURN null
  text := trim(value).toLowerCase()
  IF text is empty THEN RETURN null
  hasThai    := text contains 'thai'
  hasForeign := text contains 'foreign'
  IF hasThai AND NOT hasForeign THEN RETURN 'THAI'
  IF hasForeign AND NOT hasThai THEN RETURN 'FOREIGN'
  RETURN null       // empty, 'Company Name', unknown, or ambiguous
END FUNCTION

FUNCTION buildOwnershipQuotaCondition(value)
  OUTPUT: Prisma where fragment | null

  key := normalizeQuotaFilter(value)
  IF key is null THEN RETURN null
  RETURN { OR: QUOTA_WORDS[key].map(word => ({ ownershipQuota: { contains: word } })) }
END FUNCTION

EXPORT { normalizeQuotaFilter, buildOwnershipQuotaCondition }
```

Why a few casings instead of one `contains`: MySQL text columns are usually case-insensitive (`utf8mb4_unicode_ci` or `_general_ci`), but the real collation was not checked. Matching `thai`, `Thai`, and `THAI` works under either kind of collation and does not need `mode: 'insensitive'`.

**2. `src/repositories/propertyRepository.js` - `findAll()`**

- Import the helper at the top: `const { buildOwnershipQuotaCondition } = require('../utils/ownershipQuota');`
- Add `propertyQuota` to the destructured `options`.
- After the `zoneId` filter and before the listings filter, add:
  ```
  condition := buildOwnershipQuotaCondition(propertyQuota)
  IF condition THEN where.AND := [...(where.AND || []), condition]
  ```
- No other lines change. `count` already uses the same `where`, so totals and paging stay correct.

**3. `src/services/searchService.js` - `searchProperties()`**

- Import the same helper.
- Replace the block (current lines 72-75):
  ```
  if (propertyQuota) {
    where.ownershipQuota = propertyQuota.toUpperCase();
  }
  ```
  with:
  ```
  condition := buildOwnershipQuotaCondition(propertyQuota)
  IF condition THEN where.AND := [...(where.AND || []), condition]
  ```
- The existing `where.OR` for the text search stays as is. Using `where.AND` keeps both conditions active together.

**No change needed in the backend:**

- `searchController.js`, `propertyController.js`, `propertyService.js`, and the routes. They already pass the query through.
- `prisma/schema.prisma`. No migration, no new column, no data update.
- The save code in `propertyRepository.js` (create and update) and `routes/properties` validation. The stored values stay as they are.

#### Frontend (`/Users/ize/Desktop/04_Projects/weprop_frontend`)

**4. `src/app/[locale]/properties/list/page.jsx` - `searchProperties()`**

- Add, next to the other filters:
  ```
  const quota = searchParams.propertyQuota || searchParams.quota;
  if (quota) queryParams.append('propertyQuota', quota);
  ```
- The `|| searchParams.quota` part supports old bookmarked links and keeps the page consistent with the home page.
- The `suspenseKey` is built from all search params, so changing the quota already triggers a new load. The page already uses `export const dynamic = 'force-dynamic'`.

**5. `src/components/homes/home-three/search/FilterSearch.jsx` - `handleSearch()`**

- Change `params.append('quota', quota)` to `params.append('propertyQuota', quota)`.
- The values `thai` and `foreign` stay as they are. The backend helper accepts them.

**6. `src/components/properties/PropertiesList.jsx`**

- In the initial `useState` filters and in the `useEffect` that rebuilds filters from the URL, read:
  ```
  propertyQuota: urlSearchParams.get('propertyQuota') || urlSearchParams.get('quota') || ''
  ```
- This accepts both names, so old links with `quota=` also work. Nothing else in the file changes. `fetchProperties()` already sends `propertyQuota` to the backend.

**No change needed in the frontend:**

- `src/components/properties/listing/HeroSearchBar.jsx` and `ListingPropertiesPage.jsx`: they already put `propertyQuota` (`THAI`/`FOREIGN`) in the URL. The backend now accepts those values.
- `src/data/home-data/DropdownData.js`, the property form components (`PropertyDetailSection.jsx`, add/edit/duplicate forms), `propertyFormStore.js`, `propertyFormSchema.js`.

### Next.js proxy and caching check

Findings from reading `src/app/api/properties/route.js` and `next.config.js`:

- **Filter parameter**: the proxy copies every query parameter to the backend (`searchParams.forEach(... params.append ...)`). `propertyQuota` is not blocked. No change needed.
- **Who uses the proxy**: neither search page. `PropertiesList.jsx` calls the backend URL directly. `/properties/list` uses `serverApi` (server side), which sets `cache: 'no-store'`, `revalidate: 0`, and adds a `_t` timestamp. The list page is also `force-dynamic`.
- **`next.config.js` headers**: `/api/:path*` gets `Cache-Control: public, max-age=300, s-maxage=300` (5 minutes). This applies only to Next.js's own `/api/*` routes, which the search pages do not use. The cache key includes the query string, so `?propertyQuota=FOREIGN` and `?propertyQuota=THAI` are separate entries and do not mix.
- **Conclusion**: no change to `route.js` or `next.config.js` is needed for this fix, and no cache hides the new filter on the two search pages.
- **Follow-up (not part of this fix)**: if the proxy is ever used for search, a 5-minute public cache could show stale results, and Next.js 14 may also cache the inner `fetch` by default. Adding `cache: 'no-store'` to that `fetch` and a `no-store` header for `/api/properties` would remove that risk. This was not tested because the route is unused by search.

### Out of scope (listed, not changed)

- **"All Quota" not clearing on `/properties`**: in `PropertiesList.handleSearch`, `propertyQuota: searchData.propertyQuota || filters.propertyQuota` keeps the old quota when the visitor switches back to "All Quota". The same `||` pattern exists for property type, zone, and price. It does not block this fix: choosing Thai or Foreign now filters correctly, and opening the page with no quota shows all properties. Fixing it would change how other filters clear, which touches requirement 3.2. If wanted later, the smallest change is to treat quota only: `propertyQuota: 'propertyQuota' in searchData ? (searchData.propertyQuota || '') : filters.propertyQuota`.
- On `/properties/list`, the search bar dropdown shows "All Quota" after a reload even when the URL has a quota. This is a display issue only; the results are filtered correctly.
- Cleaning up legacy `ownership_quota` data, adding an index, or changing the stored values to codes.
- Removing the debug `console.log` lines in the repository and controller.

### Legacy data risk

- Older rows may store other text in `ownership_quota` (different wording, other languages, or `NULL`). The backend has no `.env` in the workspace, so the real values could not be read.
- The tolerant match (contains `thai` / `foreign`, a few casings) covers most variants such as `Thai quota`, `THAI`, `Thai`, `Foreign quota`.
- Risk: a legacy value such as a company name that contains the word "Thai" would match the Thai filter. Rows with `NULL` or text that has neither word never match Thai or Foreign (they still show for "All Quota").
- **Required check before release**, on the real database:
  ```sql
  SELECT ownership_quota, COUNT(*) AS total
  FROM properties
  WHERE deleted_at IS NULL
  GROUP BY ownership_quota
  ORDER BY total DESC;
  ```
  (If the soft-delete column has another name, drop the `WHERE` line.) To check the collation, run `SHOW FULL COLUMNS FROM properties LIKE 'ownership_quota';`.
- If the result shows only `Thai Quota`, `Foreign Quota`, `Company Name`, and `NULL`, the helper could later be tightened to an exact match by changing only `ownershipQuota.js`. If other text appears, decide per value which filter it belongs to and add it to the helper.

### Exact list of files

| Project | File | Change |
|---|---|---|
| Backend | `src/utils/ownershipQuota.js` | NEW. Mapping helper. |
| Backend | `src/repositories/propertyRepository.js` | `findAll()`: read `propertyQuota`, add condition through `where.AND`. |
| Backend | `src/services/searchService.js` | Replace exact match with helper condition through `where.AND`. |
| Backend | `src/utils/__tests__/ownershipQuota.test.js` | NEW. Helper unit tests. |
| Backend | `src/services/__tests__/searchService.quota.test.js` | NEW. Checks the Prisma `where` built for quota. |
| Backend | `src/repositories/__tests__/propertyRepository.quota.test.js` | NEW. Checks the Prisma `where` built by `findAll()`. |
| Frontend | `src/app/[locale]/properties/list/page.jsx` | Forward `propertyQuota` (also accept `quota`). |
| Frontend | `src/components/homes/home-three/search/FilterSearch.jsx` | Send `propertyQuota` instead of `quota`. |
| Frontend | `src/components/properties/PropertiesList.jsx` | Read `propertyQuota` or `quota` (2 places). |

Not changed: `src/app/api/properties/route.js`, `next.config.js`, `prisma/schema.prisma`, controllers, routes, form components.

## Testing Strategy

### Validation Approach

First show the bug on the unfixed code, then confirm the fix and confirm that nothing else changed. The backend already has `jest` and `supertest` in `devDependencies` (`npm test` runs `jest`) but has no test files yet. The frontend has no test runner, so frontend checks are manual. No new dependency is needed. "Property-style" tests are written as table-driven loops over many generated variants.

### Exploratory Bug Condition Checking

**Goal**: Show the bug before the fix and confirm the root causes. If a test does not fail as expected, re-think the root cause.

**Test Plan**: Mock `@prisma/client` in jest so no database is needed. Call the code and read the `where` object passed to `prisma.property.findMany` / `count`. Also do the manual API checks below against a development database that has one Thai, one Foreign, and one Company Name property.

**Test Cases**:
1. **findAll ignores quota**: call `findAll({ propertyQuota: 'FOREIGN' })` and assert the `where` has a quota condition (fails on unfixed code: no condition).
2. **searchService exact match**: call `searchProperties({ propertyQuota: 'FOREIGN' })` and assert the `where` can match `Foreign Quota` (fails on unfixed code: `ownershipQuota: 'FOREIGN'`).
3. **List page drops quota (manual)**: open `/properties/list?propertyQuota=FOREIGN` and watch the backend log or network call: the request has no `propertyQuota` (fails on unfixed code).
4. **Home page parameter (manual)**: choose Foreign on the home page and check the URL: it has `quota=foreign`, and the results are not filtered (fails on unfixed code).
5. **Array value**: call `searchProperties({ propertyQuota: ['a', 'b'] })` (throws on unfixed code).

**Expected Counterexamples**:
- `where` has no quota condition (`findAll`) or has `ownershipQuota: 'FOREIGN'` (`searchService`).
- Possible causes: unread option, missing forwarded parameter, exact match on a code instead of the stored text, parameter name mismatch.

### Fix Checking

**Goal**: For all inputs where the bug condition holds, the fixed code gives the expected result.

**Pseudocode:**
```
FOR ALL input WHERE isBugCondition(input) DO
  result := fixedSystem(input)
  ASSERT every property in result has ownershipQuota matching input quota key
  ASSERT no property in result has the other quota
  ASSERT every property in result is published AND not deleted
END FOR
```

### Preservation Checking

**Goal**: For all inputs where the bug condition does not hold, the fixed code gives the same result as the original code.

**Pseudocode:**
```
FOR ALL input WHERE NOT isBugCondition(input) DO
  ASSERT originalSystem(input) = fixedSystem(input)
END FOR
```

**Testing Approach**: Property-style tests are good here because the helper has a large input space (casings, spaces, types). They catch edge cases that a few hand-written examples miss.

**Test Plan**: Capture the `where` object built by the unfixed code for requests without a quota (all other filters combined in many ways). After the fix, assert the `where` is deeply equal. Then run the same listings manually on the real data.

**Test Cases**:
1. **No quota**: with `propertyQuota` missing, `''`, `undefined`, or `'Company Name'`, the `where` equals the original `where` (no `AND` key added).
2. **Other filters**: property type, zone, price range, bedrooms, bathrooms, listing type, and keyword produce the same `where` as before.
3. **Text search plus quota**: `where.OR` (text search) and `where.AND` (quota) are both present, and neither overwrites the other.
4. **Saving quota**: adding, editing, and duplicating a property still stores `Thai Quota` / `Foreign Quota` / `Company Name` (no code touched; confirm by saving one of each and reading the detail page).

### Unit Tests

- `ownershipQuota.test.js`: `THAI`, `thai`, `Thai`, `Thai Quota`, `  thai quota  `, `tHaI` all give `'THAI'`; the same for Foreign; `''`, `'   '`, `null`, `undefined`, `123`, `{}`, `'Company Name'`, `'all'` give `null`; `['foreign', 'thai']` uses the first element; a string with both words gives `null`; the function never throws.
- `buildOwnershipQuotaCondition`: returns `null` when the key is `null`; otherwise returns an `OR` list of `contains` conditions on `ownershipQuota` with the casing variants.
- A simple "stored text matches" check: apply the condition rules in plain JavaScript to the strings `Thai Quota`, `Foreign Quota`, `Company Name`, `thai quota`, `FOREIGN QUOTA`, and `NULL`, and assert Thai matches only the Thai strings and Foreign matches only the Foreign strings.

### Property-Based Tests

- Generate casing variants of `thai` and `foreign` (every upper/lower combination, random surrounding spaces, with and without the word `quota`) and assert the same key for all variants of one word.
- Generate random mixes of the other filters and assert the quota condition is added only when the key is not `null`, and that other `where` fields are unchanged.
- Generate random non-string values (numbers, objects, arrays, booleans) and assert the helper never throws.

### Integration Tests

- **API checks (curl or supertest with a development database)**, using the header `x-api-key`:
  - `GET /api/properties?propertyQuota=FOREIGN`, `=foreign`, `=Foreign Quota`: only Foreign Quota rows. Same for THAI.
  - `GET /api/search/properties?propertyQuota=FOREIGN`, `=thai`: only the matching quota.
  - No `propertyQuota`, and `propertyQuota=` : all quotas, same count as before the fix.
  - Quota plus `propertyType`, `zoneId`, price range, `type=sale`, and `keyword`: all conditions apply together; `pagination.total` and `meta.total` match the number of rows.
  - Repeated `propertyQuota` parameter: no 500 error.
- **Manual checks (frontend)**:
  - Home page: choose Foreign Quota, search. The URL has `propertyQuota=foreign` and only Foreign properties show. Repeat with Thai and with "All Quota".
  - Open an old link `/properties?quota=foreign`: only Foreign properties show.
  - `/properties`: use the hero search bar with Thai, then Foreign. Results change each time and the Thai property never appears under Foreign.
  - `/properties/list`: same checks, plus paging to page 2 keeps the filter.
  - Customer scenario: save a property as "Thai Quota" in the back office, publish it, filter by Foreign Quota on the Search page, and confirm it does not appear; filter by Thai Quota and confirm it does.
  - Check one property of each quota on its detail page for the saved quota text.
- **Data check**: run the `SELECT ... GROUP BY ownership_quota` query above and review the values before release.
