import gemeenteFromJSON from "../../../public/data/heraldry/nl/gemeente.json";
import formerGemeenteFromJSON from "../../../public/data/heraldry/nl/formerGemeente.json";
import provinceFromJSON from "../../../public/data/heraldry/nl/province.json";
import {
  AdministrativeUnit,
  CoatOfArmsDetailsData,
} from "../../../src/topic/Heraldry/types";

import cachedGemeente from "../../../public/data/heraldry/nl/gemeente-details-data.json";
import cachedFormerGemeente from "../../../public/data/heraldry/nl/formerGemeente-details-data.json";
import cachedProvince from "../../../public/data/heraldry/nl/province-details-data.json";

import { getDetails } from "../utils/get-details";

getDetails({
  administrativeDivisions: gemeenteFromJSON as AdministrativeUnit[],
  alreadyFetchedDivisions: cachedGemeente as CoatOfArmsDetailsData[],
  path: "gemeente",
  country: "nl",
});

getDetails({
  administrativeDivisions: formerGemeenteFromJSON as AdministrativeUnit[],
  alreadyFetchedDivisions: cachedFormerGemeente as CoatOfArmsDetailsData[],
  path: "formerGemeente",
  country: "nl",
});

getDetails({
  administrativeDivisions: provinceFromJSON as AdministrativeUnit[],
  alreadyFetchedDivisions: cachedProvince as CoatOfArmsDetailsData[],
  path: "province",
  country: "nl",
});
