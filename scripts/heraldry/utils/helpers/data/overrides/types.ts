import { AdministrativeUnit } from "../../../../../../src/topic/Heraldry/types";

export type CountryOverrides = {
  imageUrlByWikipediaUrlThumbnail: {
    [wikipediaUrl: string]: string;
  };
  locationsByTitle: {
    [title: string]: AdministrativeUnit["place"];
  };
  locationPageByTitle: {
    [title: string]: string;
  };
};

export type CountryOverridesInput = Partial<CountryOverrides>;
