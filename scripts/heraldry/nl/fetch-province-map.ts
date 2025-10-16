import unitFromJSON from "../../../public/data/heraldry/nl/province.json";
import { AdministrativeUnit } from "../../../src/topic/Heraldry/types";

import { fetchImages } from "../utils/fetch-images";

const units = unitFromJSON as AdministrativeUnit[];

fetchImages({
  administrativeDivisions: units,
  path: "province",
  country: "nl",
});
