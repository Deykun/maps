import { overrides as overridesNL } from "../../../../nl/overrides";
import { CountryOverrides, CountryOverridesInput } from "./types";

const emptyOverrides: CountryOverrides = {
  imageUrlByWikipediaUrlThumbnail: {},
  locationsByTitle: {},
  locationPageByTitle: {},
};

const overridesByCountry: {
  [country: string]: CountryOverrides;
} = {
  nl: {
    ...emptyOverrides,
    ...overridesNL,
  },
};

export const getCountryOverrides = (country: string): CountryOverrides => {
  return overridesByCountry[country] || emptyOverrides;
};
