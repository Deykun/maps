import unitFromJSON from "../../../public/data/heraldry/nl/gemeente.json";
import formerUnitFromJSON from "../../../public/data/heraldry/nl/formerGemeente.json";
import { AdministrativeUnit } from "../../../src/topic/Heraldry/types";

import { fetchImages } from "../utils/fetch-images";

const units = unitFromJSON as AdministrativeUnit[];
const formerUnits = formerUnitFromJSON as AdministrativeUnit[];

fetchImages({
  administrativeDivisions: units,
  path: "gemeente",
  country: "nl",
});

fetchImages({
  administrativeDivisions: formerUnits,
  path: "formerGemeente",
  country: "nl",
});
