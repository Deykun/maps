import { AdministrativeUnit, WITH_ANIMAL, WITHOUT_ANIMAL } from '../constants';

export const getFilteredUnits = (units: AdministrativeUnit[], colorFilters: string[], animalFilters: string[], itemFilters: string[]) => {
  const filteredUnits = units.filter(
    (unit) => {
      const isColorFilterActive = colorFilters.length > 0;
      if (isColorFilterActive) {
        const isPrimary = unit?.colors?.primary?.name && colorFilters.includes(unit?.colors?.primary?.name);
        if (!isPrimary) {
          return false;
        }

        const isInPalette = Array.isArray(unit?.colors?.palette)
          && unit.colors.palette.some(({ name }) => colorFilters.includes(name));

        if (!isInPalette) {
          return false;
        }
      }

      const isAnimalFilterActive = animalFilters.length > 0;
      if (isAnimalFilterActive) {
        const animals = unit?.markers?.animals || [];
        const hasAnimals = animals.length > 0;

        if ([WITH_ANIMAL, WITHOUT_ANIMAL].includes(animalFilters[0])) {
          if (animalFilters[0] === WITH_ANIMAL && !hasAnimals) {
            return false;
          } else if (animalFilters[0] === WITHOUT_ANIMAL && hasAnimals) {
            return false;
          }
        } else {
          if (!hasAnimals) {
            return false;
          }

          const hasAllAnimals = animalFilters.every((active) => animals.includes(active));
          if (!hasAllAnimals) {
            return false;
          }
        }
      }

      const isItemFilterActive = itemFilters.length > 0;
      if (isItemFilterActive) {
        const items = unit?.markers?.items || [];
        const hasItems = items.length > 0;

        if (!hasItems) {
          return false;
        }

        const hasAllItems = itemFilters.every((active) => items.includes(active))
        if (!hasAllItems) {
          return false;
        }
      }

      return true;
    }
  );

  const unitsForMap = filteredUnits.filter(
    (unit) => typeof unit?.place?.coordinates?.lon === 'number' && typeof unit?.imageUrl === 'string',
  );

  const subtitleParts = [
    ...colorFilters.map((value) => `heraldry.color.${value}`),
    ...animalFilters.map((value) => `heraldry.animal.${value}`),
    ...itemFilters.map((value) => `heraldry.item.${value}`),
  ];

  return {
    filteredUnits,
    unitsForMap,
    subtitleParts,
  }
}