import { AdministrativeUnitsGroup } from "../../../src/topic/Heraldry/types";
import { urls as urlForCurrent } from "./constantsByHistoricStatus/current";
import { urls as urlForFormer } from "./constantsByHistoricStatus/former";

export const urls: {
  provinceBySource: {
    [source: string]: AdministrativeUnitsGroup;
  };
  gemeenteBySource: {
    [source: string]: AdministrativeUnitsGroup;
  };
  historicGemeenteBySource: {
    [source: string]: AdministrativeUnitsGroup;
  };
} = {
  provinceBySource: urlForCurrent.provinceBySource,
  gemeenteBySource: urlForCurrent.gemeenteBySource,
  historicGemeenteBySource: urlForFormer.historicGemeenteBySource,
};
