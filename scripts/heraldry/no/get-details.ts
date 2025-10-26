import flykerFromJSON from "../../../public/data/heraldry/no/fylker.json";
import formerFlykerFromJSON from "../../../public/data/heraldry/no/formerFylker.json";
import kommuneFromJSON from "../../../public/data/heraldry/no/kommune.json";

import cachedFylker from "../../../public/data/heraldry/no/fylker-details-data.json";
import cachedFormerFylker from "../../../public/data/heraldry/no/formerFylker-details-data.json";
import cachedKommune from "../../../public/data/heraldry/no/kommune-details-data.json";

import {
  AdministrativeUnit,
  CoatOfArmsDetailsData,
} from "../../../src/topic/Heraldry/types";

import { getDetails } from "../utils/get-details";

const fylker = flykerFromJSON as AdministrativeUnit[];
const formerFylker = formerFlykerFromJSON as AdministrativeUnit[];
const kommune = kommuneFromJSON as AdministrativeUnit[];

getDetails({
  administrativeDivisions: fylker,
  alreadyFetchedDivisions: cachedFylker as CoatOfArmsDetailsData[],
  path: "fylker",
  country: "no",
});

getDetails({
  administrativeDivisions: formerFylker,
  alreadyFetchedDivisions: cachedFormerFylker as CoatOfArmsDetailsData[],
  path: "formerFylker",
  country: "no",
});

getDetails({
  administrativeDivisions: kommune,
  alreadyFetchedDivisions: cachedKommune as CoatOfArmsDetailsData[],
  path: "kommune",
  country: "no",
});
