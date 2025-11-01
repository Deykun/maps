import gminyFromJSON from "../../../public/data/heraldry/pl/gminy.json";
import miastaFromJSON from "../../../public/data/heraldry/pl/miasta.json";
import powiatyFromJSON from "../../../public/data/heraldry/pl/powiaty.json";
import wojewodztwaFromJSON from "../../../public/data/heraldry/pl/wojewodztwa.json";

import cachedGminy from "../../../public/data/heraldry/pl/gminy-details-data.json";
import cachedMiasta from "../../../public/data/heraldry/pl/miasta-details-data.json";
import cachedPowiaty from "../../../public/data/heraldry/pl/powiaty-details-data.json";
import cachedWojewodztwa from "../../../public/data/heraldry/pl/wojewodztwa-details-data.json";

import {
  AdministrativeUnit,
  CoatOfArmsDetailsData,
} from "../../../src/topic/Heraldry/types";

import { getDetails } from "../utils/get-details";

const gminy = gminyFromJSON as AdministrativeUnit[];
const miasta = miastaFromJSON as AdministrativeUnit[];
const powiaty = powiatyFromJSON as AdministrativeUnit[];
const wojewodztwa = wojewodztwaFromJSON as AdministrativeUnit[];

getDetails({
  administrativeDivisions: gminy,
  // alreadyFetchedDivisions: cachedGminy as CoatOfArmsDetailsData[],
  path: "gminy",
  country: "pl",
});

getDetails({
  administrativeDivisions: miasta,
  alreadyFetchedDivisions: cachedMiasta as CoatOfArmsDetailsData[],
  path: "miasta",
  country: "pl",
});

getDetails({
  administrativeDivisions: powiaty,
  alreadyFetchedDivisions: cachedPowiaty as CoatOfArmsDetailsData[],
  path: "powiaty",
  country: "pl",
});

getDetails({
  administrativeDivisions: wojewodztwa,
  alreadyFetchedDivisions: cachedWojewodztwa as CoatOfArmsDetailsData[],
  path: "wojewodztwa",
  country: "pl",
});
