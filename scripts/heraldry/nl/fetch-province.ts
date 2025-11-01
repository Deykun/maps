import { urls } from "./constants";
import { AdministrativeUnit } from "../../../src/topic/Heraldry/types";

import { fetchData } from "../utils/fetch-data";

import alreadyFetchedJSON from "../../../public/data/heraldry/nl/province.json";

const alreadyFetchedDivisions = alreadyFetchedJSON as AdministrativeUnit[];

const administrativeDivisions: AdministrativeUnit[] = Object.values(
  urls.provinceBySource
).flatMap(({ title, urls }) =>
  urls.map((unit) => ({ ...unit, type: ["province"], partOf: title }))
);

fetchData({
  administrativeDivisions: administrativeDivisions,
  alreadyFetchedDivisions: alreadyFetchedDivisions,
  unitNames: ["province"],
  path: "./public/data/heraldry/nl/province.json",
  country: "nl",
});
