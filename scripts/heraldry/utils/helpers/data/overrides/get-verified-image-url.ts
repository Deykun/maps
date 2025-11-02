import type { wikiSummary } from "wikipedia";
import { getCountryOverrides } from "./get-country-overrides";

type DataToOverride = wikiSummary["thumbnail"] | undefined;

type Params = {
  country: string;
};

export const getVerifiedImageUrl = (
  thumbnail: DataToOverride,
  params: Params
): DataToOverride => {
  if (!thumbnail) {
    return thumbnail;
  }

  const overrides = getCountryOverrides(params.country);

  const source =
    overrides.imageUrlByWikipediaUrlThumbnail[thumbnail?.source] ||
    thumbnail?.source;

  return {
    ...thumbnail,
    source,
  };
};
