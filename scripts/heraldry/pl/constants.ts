import { AdministrativeUnitsGroup } from "../../../src/topic/Heraldry/types";
import { urls as urlForGminy } from "./constantsForTypes/gminy";
import { urls as urlForMiasta } from "./constantsForTypes/miasta";
import { urls as urlForPowiaty } from "./constantsForTypes/powiaty";

export const urls: {
  gminyByWojewodztwo: {
    [wojewodztwo: string]: AdministrativeUnitsGroup;
  };
  miastaByWojewodztwo: {
    [wojewodztwo: string]: AdministrativeUnitsGroup;
  };
  powiatyByWojewodztwo: {
    [wojewodztwo: string]: AdministrativeUnitsGroup;
  };
  herbyWojewodztw: AdministrativeUnitsGroup;
} = {
  gminyByWojewodztwo: urlForGminy.gminyByWojewodztwo,
  miastaByWojewodztwo: urlForMiasta.miastaByWojewodztwo,
  powiatyByWojewodztwo: urlForPowiaty.powiatyByWojewodztwo,
  herbyWojewodztw: {} as AdministrativeUnitsGroup,
};

urls.herbyWojewodztw = {
  key: "Kategoria:Herby województw obecnego podziału administracyjnego[edytuj]",
  title: "Herby województw obecnego podziału administracyjnego",
  urls: [
    {
      title: "Herb województwa dolnośląskiego",
      url: "https://pl.wikipedia.org/wiki/Herb_wojew%C3%B3dztwa_dolno%C5%9Bl%C4%85skiego",
    },
    {
      title: "Herb województwa kujawsko-pomorskiego",
      url: "https://pl.wikipedia.org/wiki/Herb_wojew%C3%B3dztwa_kujawsko-pomorskiego",
    },
    {
      title: "Herb województwa lubelskiego",
      url: "https://pl.wikipedia.org/wiki/Herb_wojew%C3%B3dztwa_lubelskiego",
    },
    {
      title: "Herb województwa lubuskiego",
      url: "https://pl.wikipedia.org/wiki/Herb_wojew%C3%B3dztwa_lubuskiego",
    },
    {
      title: "Herb województwa łódzkiego",
      url: "https://pl.wikipedia.org/wiki/Herb_wojew%C3%B3dztwa_%C5%82%C3%B3dzkiego",
    },
    {
      title: "Herb województwa małopolskiego",
      url: "https://pl.wikipedia.org/wiki/Herb_wojew%C3%B3dztwa_ma%C5%82opolskiego",
    },
    {
      title: "Herb województwa mazowieckiego",
      url: "https://pl.wikipedia.org/wiki/Herb_wojew%C3%B3dztwa_mazowieckiego",
    },
    {
      title: "Herb województwa opolskiego",
      url: "https://pl.wikipedia.org/wiki/Herb_wojew%C3%B3dztwa_opolskiego",
    },
    {
      title: "Herb województwa podkarpackiego",
      url: "https://pl.wikipedia.org/wiki/Herb_wojew%C3%B3dztwa_podkarpackiego",
    },
    {
      title: "Herb województwa podlaskiego",
      url: "https://pl.wikipedia.org/wiki/Herb_wojew%C3%B3dztwa_podlaskiego",
    },
    {
      title: "Herb województwa pomorskiego",
      url: "https://pl.wikipedia.org/wiki/Herb_wojew%C3%B3dztwa_pomorskiego",
    },
    {
      title: "Herb województwa śląskiego",
      url: "https://pl.wikipedia.org/wiki/Herb_wojew%C3%B3dztwa_%C5%9Bl%C4%85skiego",
    },
    {
      title: "Herb województwa świętokrzyskiego",
      url: "https://pl.wikipedia.org/wiki/Herb_wojew%C3%B3dztwa_%C5%9Bwi%C4%99tokrzyskiego",
    },
    {
      title: "Herb województwa warmińsko-mazurskiego",
      url: "https://pl.wikipedia.org/wiki/Herb_wojew%C3%B3dztwa_warmi%C5%84sko-mazurskiego",
    },
    {
      title: "Herb województwa wielkopolskiego",
      url: "https://pl.wikipedia.org/wiki/Herb_wojew%C3%B3dztwa_wielkopolskiego",
    },
    {
      title: "Herb województwa zachodniopomorskiego",
      url: "https://pl.wikipedia.org/wiki/Herb_wojew%C3%B3dztwa_zachodniopomorskiego",
    },
  ],
};
