# Bugfix Requirements Document

## Introduction

On the public property search pages, the "Property Quota" filter does not work. A customer set a property's ownership to "Thai Quota" in the back office. Later they chose "Foreign Quota" in the search filter and still saw that Thai property in the results.

The quota filter is ignored on the main search page (`/properties`), and it is dropped before it reaches the server on the second search page (`/properties/list`). The filter values sent by the website (`THAI`, `FOREIGN`, `thai`, `foreign`) also do not match the values saved by the property form (`Thai Quota`, `Foreign Quota`, `Company Name`). As a result, visitors cannot narrow properties by ownership quota. Foreign buyers can see properties they are not allowed to buy.

## Bug Analysis

### Current Behavior (Defect)

1.1 WHEN a visitor selects "Foreign Quota" (or "Thai Quota") on the `/properties` search page THEN the system sends the quota value to `GET /api/properties`, which ignores it, and returns properties of every ownership quota, including properties saved as "Thai Quota"

1.2 WHEN a visitor selects a quota on the `/properties/list` search page THEN the system does not pass the quota value to the search request, and returns properties of every ownership quota

1.3 WHEN a quota value (for example `FOREIGN` or `THAI`) reaches `GET /api/search/properties` THEN the system compares it with the saved value by exact text match, so `FOREIGN` never equals the saved `Foreign Quota`, and the filter finds no matching properties

1.4 WHEN a visitor selects a quota in the home page search box and submits THEN the system sends it in a parameter named `quota` with a lowercase value (`thai` or `foreign`), but the search page only reads `propertyQuota`, so the choice is lost and properties of every ownership quota are shown

### Expected Behavior (Correct)

2.1 WHEN a visitor selects "Foreign Quota" on the `/properties` search page THEN the system SHALL return only published properties whose saved ownership quota is "Foreign Quota", and SHALL NOT return properties saved as "Thai Quota"

2.2 WHEN a visitor selects "Thai Quota" on the `/properties` search page THEN the system SHALL return only published properties whose saved ownership quota is "Thai Quota", and SHALL NOT return properties saved as "Foreign Quota"

2.3 WHEN a visitor selects a quota on the `/properties/list` search page THEN the system SHALL pass the quota value to the search request and SHALL return only properties with the matching saved ownership quota

2.4 WHEN a quota value reaches `GET /api/search/properties` THEN the system SHALL match it against the saved ownership quota values ("Thai Quota" and "Foreign Quota") so that the Foreign Quota filter returns Foreign Quota properties and the Thai Quota filter returns Thai Quota properties

2.5 WHEN a visitor selects a quota in the home page search box and submits THEN the system SHALL carry the choice to the search page, and the search page SHALL show only properties with the matching ownership quota

### Unchanged Behavior (Regression Prevention)

3.1 WHEN no quota is selected (the "All Quota" option) THEN the system SHALL CONTINUE TO return properties of every ownership quota, including "Company Name"

3.2 WHEN a visitor filters by property type, zone, price range, bedrooms, bathrooms, or listing type (sale or rent) without a quota THEN the system SHALL CONTINUE TO return the same results as before

3.3 WHEN a visitor combines a quota with other filters (for example property type, zone, or price range) THEN the system SHALL CONTINUE TO apply every selected filter together, and SHALL return only properties that match all of them

3.4 WHEN the system returns search results THEN the system SHALL CONTINUE TO show only published properties that are not deleted, with the same paging, sorting, images, labels, zone, and property type data as before

3.5 WHEN an admin saves a property with an ownership quota in the add, edit, or duplicate form THEN the system SHALL CONTINUE TO store the chosen value ("Thai Quota", "Foreign Quota", or "Company Name") unchanged

3.6 WHEN a visitor opens a property detail page THEN the system SHALL CONTINUE TO show the saved ownership quota of that property
