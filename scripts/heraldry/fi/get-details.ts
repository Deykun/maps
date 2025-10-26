import kuntaFromJSON from "../../../public/data/heraldry/fi/kunta.json";
import formerKuntaFromJSon from "../../../public/data/heraldry/fi/formerKunta.json";
import maakuntaFromJSon from "../../../public/data/heraldry/fi/maakunta.json";
import { AdministrativeUnit, CoatOfArmsDetailsData } from "../../../src/topic/Heraldry/types";

import cachedKunta from "../../../public/data/heraldry/fi/kunta-details-data.json";
import cachedFormerKunta from "../../../public/data/heraldry/fi/formerKunta-details-data.json";
import cachedMaakunta from "../../../public/data/heraldry/fi/maakunta-details-data.json";

import { getDetails } from "../utils/get-details";

const kunta = kuntaFromJSON as AdministrativeUnit[];
const formerKunta = formerKuntaFromJSon as AdministrativeUnit[];
const maakunta = maakuntaFromJSon as AdministrativeUnit[];

getDetails({
  administrativeDivisions: kunta,
  alreadyFetchedDivisions: cachedKunta as CoatOfArmsDetailsData[],
  path: "kunta",
  country: "fi",
});

getDetails({
  administrativeDivisions: formerKunta,
  alreadyFetchedDivisions: cachedFormerKunta as CoatOfArmsDetailsData[],
  path: "formerKunta",
  country: "fi",
});

getDetails({
  administrativeDivisions: maakunta,
  alreadyFetchedDivisions: cachedMaakunta as CoatOfArmsDetailsData[],
  path: "maakunta",
  country: "fi",
});
