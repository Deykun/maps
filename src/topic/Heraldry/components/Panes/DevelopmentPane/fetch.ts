import { AdministrativeUnitIndex } from '@/topic/Heraldry/types';

export const fetchTitlesAndDescriptions = async ({ country, unitTypes }: { country: string, unitTypes: string[] }) => {
  const devData = await Promise.all(
    unitTypes.map((unit) => fetch(`/maps/data/heraldry/${country}/${unit}-dev.json`).then(
      (response) => response.json()
    ).then(
      (byKey) => Object.values(byKey) as AdministrativeUnitIndex[])
    ),
  );

  return devData.flatMap((unit) => unit);
};
