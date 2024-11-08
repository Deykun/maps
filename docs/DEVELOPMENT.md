# Application logic tl;dr

## How Data is Collected and Prepared for the Web

1. A custom JavaScript script is used to fetch seed data for indexing:
   - For countries like Poland, Estonia, and Finland, the seed data consists of links to pages titled "Coat of Arms of Municipality of X" - and script fetches descriptions from respository
   - For Germany, the data is parsed from Wikipedia directly, including the image link, description, and potential location name.

2. The seed data is located in `scripts/heraldry/[COUNTRY]/constants.ts`.

3. `yarn fetch:[COUNTRY]:unit` transforms data from constants into `unit.json` in `public/data/heraldry/[COUNTRY]/unit.json`. This unifies all the seed data into one format, fetches pages with locations, and saves the locations.

4. `yarn fetch:[COUNTRY]:unit-map` fetches images to the repository, resizes them, and generates two JSON files:
   - `public/data/heraldry/[COUNTRY]/unit-map-data.json` – contains minimal information needed to render items on the map (e.g., image, location, title, IDs, types)
   - `public/data/heraldry/[COUNTRY]/unit-dev-data.json` – contains descriptions of units for development mode in the app (used to create filters based on these descriptions).

5. `yarn web:[COUNTRY]` transforms fetched images into sprites used by the map.

6. `yarn index:[COUNTRY]` based on `public/data/heraldry/[COUNTRY]/filters.json` reindexes colors, animals, and items and stores them in `public/data/heraldry/[COUNTRY]/unit-details-data.json` - this file is fetched when that information is needed (for example, when a user opens filters or enters the site with filters set up in the URL)"

## What happens when user enters the site

1. All `public/data/heraldry/[COUNTRY]/*-map-data.json` files are fetched and merged into a single array (duplicates are merged, and the list is sorted if necessary)
   - Optionally, if a filter is activated in the URL, `public/data/heraldry/[COUNTRY]/*-details-data.json` is also fetched.

2. After obtaining the array of CoA, the map is displayed, and the canvas triggers a fetch for sprites.

## How is the map maintained

Usually markers have mistakes,  `public/data/heraldry/[COUNTRY]/filters.json` is updated and `yarn index:[COUNTRY]` is run to update markers in `public/data/heraldry/[COUNTRY]/*-details-data.json`.

## How to add new country

This section is under construction and will likely never be finished. However, the country pages don’t have much code. Simply copy the flow from `scripts/heraldry/fi` and `src/pages/suomalainen-heraldikka` and TS schould be your friend. The biggest challenge will likely be gathering seed data.
