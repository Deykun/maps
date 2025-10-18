import React from "react";
import { CoatOfArmsMapData } from "@/topic/Heraldry/types";
import { updateProcessingTexts } from "@/topic/Heraldry/stores/progressStore";
const SvgMap = React.lazy(() => import("./components/SvgMap"));

import HeraldryMap from "@/topic/Heraldry/components/HeraldryMap/HeraldryMap";

const filterForCountryData = (
  units: CoatOfArmsMapData[],
  shouldUpdateLoader?: boolean
) => {
  return units.filter((unit: CoatOfArmsMapData, index) => {
    if (shouldUpdateLoader && index % 10) {
      updateProcessingTexts({ value: index, total: units.length });
    }

    if (["empty"].includes(unit.title)) {
      // Historic
      return false;
    }

    // if ([].includes(unit.title)) {
    //   // Outside of country
    //   return false;
    // }

    return true;
  });
};

const HeraldryNL = () => {
  return (
    <HeraldryMap
      lang="el"
      country="nl"
      mapWrapperClassName="[&>div>svg]:aspect-[1_/_1]"
      mapWrapperClassNameForZoom0="max-w-[65vh]"
      map={SvgMap}
      mapOffset={{
        minLatTop: 50.625,
        maxLatTop: 53.7,
        minLonLeft: 2.65,
        maxLonLeft: 7.9,
      }}
      dataPaths={[
        "/maps/data/heraldry/nl/formerGemeente",
        "/maps/data/heraldry/nl/gemeente",
        "/maps/data/heraldry/nl/province",
      ]}
      filterForCountryData={filterForCountryData}
    />
  );
};

export default HeraldryNL;
