import { getSprites } from "../utils/web";

import gemeenteFromJSON from "../../../public/data/heraldry/nl/gemeente-map-data.json";
import formerGemeenteFromJSON from "../../../public/data/heraldry/nl/formerGemeente-map-data.json";
import provinceFromJSON from "../../../public/data/heraldry/nl/province-map-data.json";

getSprites({
  mapJSON: gemeenteFromJSON,
  type: "gemeente",
  country: "nl",
});

getSprites({
  mapJSON: formerGemeenteFromJSON,
  type: "formerGemeente",
  country: "nl",
});

getSprites({
  mapJSON: provinceFromJSON,
  type: "province",
  country: "nl",
});
