import unitFromJSON from "../../../public/data/heraldry/dk/unit.json";
import formerUnitFromJSON from "../../../public/data/heraldry/dk/formerUnit.json";
import {
  AdministrativeUnit,
  CoatOfArmsDetailsData,
} from "../../../src/topic/Heraldry/types";

import cachedUnit from "../../../public/data/heraldry/dk/unit-details-data.json";
import cachedFormerUnit from "../../../public/data/heraldry/dk/formerUnit-details-data.json";

import { getDetails } from "../utils/get-details";

const units = unitFromJSON as AdministrativeUnit[];
const formerUnits = formerUnitFromJSON as AdministrativeUnit[];

getDetails({
  administrativeDivisions: units,
  alreadyFetchedDivisions: cachedUnit as CoatOfArmsDetailsData[],
  path: "unit",
  country: "dk",
});

getDetails({
  administrativeDivisions: formerUnits,
  alreadyFetchedDivisions: cachedFormerUnit as CoatOfArmsDetailsData[],
  path: "formerUnit",
  country: "dk",
});
