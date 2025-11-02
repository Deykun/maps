import { getCountryOverrides } from "./get-country-overrides";

type Params = {
  country: string;
};

export const getVerifiedLocationPage = (
  title: string | undefined,
  params: Params
): string | undefined => {
  if (!title) {
    return undefined;
  }

  const overrides = getCountryOverrides(params.country);
  const locationPage = overrides.locationPageByTitle[title];

  return locationPage;
};
