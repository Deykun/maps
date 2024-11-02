import { AdministrativeUnitIndex } from '@/topic/Heraldry/types';

import {
  updateTotalsForFiltersTexts,
  updateValueForFiltersTexts,
} from '@/topic/Heraldry/stores/progressStore';

export const fetchTitlesAndDescriptions = async ({ country, unitTypes }: { country: string, unitTypes: string[] }) => {
  updateTotalsForFiltersTexts(unitTypes);

  const devData = await Promise.all(
    unitTypes.map((unit) => fetch(`/maps/data/heraldry/${country}/${unit}-dev-data.json`).then(
      (response) => response.json()
    ).then(
      (byKey) => {
        updateValueForFiltersTexts(unit);

        return Object.values(byKey) as AdministrativeUnitIndex[];
      }
    ),
  ));

  return devData.flatMap((unit) => unit);
};
