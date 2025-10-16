import gemeenteFromJSON from "../../../public/data/heraldry/nl/gemeente.json";
import formerGemeenteFromJSON from "../../../public/data/heraldry/nl/formerGemeente.json";
import provinceFromJSON from "../../../public/data/heraldry/nl/province.json";
import { AdministrativeUnit } from "../../../src/topic/Heraldry/types";

import { getDetails } from "../utils/get-details";

getDetails({
  administrativeDivisions: gemeenteFromJSON as AdministrativeUnit[],
  path: "gemeente",
  country: "nl",
});

getDetails({
  administrativeDivisions: formerGemeenteFromJSON as AdministrativeUnit[],
  path: "formerGemeente",
  country: "nl",
});

getDetails({
  administrativeDivisions: provinceFromJSON as AdministrativeUnit[],
  path: "province",
  country: "nl",
});
