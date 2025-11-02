import type { wikiSummary } from "wikipedia";
import { getCountryOverrides } from "./get-country-overrides";
import { AdministrativeUnit } from "../../../../../../src/topic/Heraldry/types";

type Params = {
  country: string;
};

export const getVerifiedLocation = (
  title: string | undefined,
  params: Params
): AdministrativeUnit["place"] | undefined => {
  if (!title) {
    return undefined;
  }

  const overrides = getCountryOverrides(params.country);
  const location = overrides.locationsByTitle[title];

  if (!location) {
    return undefined;
  }

  return {
    ...location,
    name: location.name || title,
  };
};
