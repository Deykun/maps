import { urls } from "./constants";
import { AdministrativeUnit } from "../../../src/topic/Heraldry/types";

import { fetchData } from "../utils/fetch-data";

import alreadyFetchedJSON from "../../../public/data/heraldry/nl/gemeente.json";
import alreadyFetchedFormerJSON from "../../../public/data/heraldry/nl/formerGemeente.json";

const alreadyFetchedDivisions = alreadyFetchedJSON as AdministrativeUnit[];
const alreadyFetchedFormerDivisions =
  alreadyFetchedFormerJSON as AdministrativeUnit[];

const administrativeDivisions: AdministrativeUnit[] = Object.values(
  urls.gemeenteBySource
)
  .flatMap(({ title, urls }) =>
    urls.map((unit) => ({ ...unit, type: ["gemeente"], partOf: title }))
  )
  .filter(
    (unit) =>
      !unit.title.startsWith("Lijst van wapens") &&
      !unit.url.includes("/wiki/Categorie:")
  );

fetchData({
  administrativeDivisions: administrativeDivisions,
  // alreadyFetchedDivisions: alreadyFetchedDivisions,
  unitNames: ["gemeente"],
  path: "./public/data/heraldry/nl/gemeente.json",
  country: "nl",
});

const formerAdministrativeDivisions: AdministrativeUnit[] = Object.values(
  urls.historicGemeenteBySource
)
  .flatMap(({ title, urls }) =>
    urls.map((unit) => ({ ...unit, type: ["formerGemeente"], partOf: title }))
  )
  .filter(
    (unit) =>
      !unit.title.startsWith("Lijst van wapens") &&
      !unit.url.includes("/wiki/Categorie:")
  );

fetchData({
  administrativeDivisions: formerAdministrativeDivisions,
  // alreadyFetchedDivisions: alreadyFetchedFormerDivisions,
  unitNames: ["formerGemeente"],
  path: "./public/data/heraldry/nl/formerGemeente.json",
  country: "nl",
});
