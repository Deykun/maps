import { AdministrativeUnit, WITH_ANIMAL, WITHOUT_ANIMAL } from '../constants';

export const getFilteredUnits = (units: AdministrativeUnit[], filterOperator: 'and' | 'or', typeFilers: string[], colorFilters: string[], animalFilters: string[], itemFilters: string[]) => {
  const filteredUnits = units.filter(
    (unit) => {
      const isTypeFilterActive = typeFilers.length > 0;
      if (isTypeFilterActive) {
        if ((unit?.type?.length || 0) === 0) {
          return false;
        }

        const isOneOfPickedTypes = typeFilers.some((active) => (unit?.type || []).includes(active));
        if (!isOneOfPickedTypes) {
          return false;
        }
      }

      const isColorFilterActive = colorFilters.length > 0;
      if (isColorFilterActive) {
        const isPrimary = unit?.colors?.primary?.name && colorFilters.includes(unit?.colors?.primary?.name);
        if (!isPrimary) {
          return false;
        }

        if (!Array.isArray(unit?.colors?.palette) || unit.colors.palette.length === 0) {
          return false;
        }
        
        if (filterOperator === 'or' && !unit.colors.palette.some(({ name }) => colorFilters.includes(name))) {
          return false;
        }

        if (filterOperator === 'and' && !colorFilters.every((active) => (unit.colors?.palette || []).some(({ name }) => name === active))) {
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

          const needOneAndMissing = filterOperator === 'or' && !animalFilters.some((active) => animals.includes(active));
          if (needOneAndMissing) {
            return false;
          }

          const needAllAndMissing = filterOperator === 'and' && !animalFilters.every((active) => animals.includes(active));
          if (needAllAndMissing) {
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

        const needOneAndMissing = filterOperator === 'or' && !itemFilters.some((active) => items.includes(active));
        if (needOneAndMissing) {
          return false;
        }

        const needAllAndMissing = filterOperator === 'and' && !itemFilters.every((active) => items.includes(active));
        if (needAllAndMissing) {
          return false;
        }
      }

      return true;
    }
  );

  const unitsForMap = filteredUnits.filter(
    (unit) => typeof unit?.place?.coordinates?.lon === 'number' && typeof unit?.imageUrl === 'string',
  );

  const subtitleParts: { operator: 'or' | 'and', labels: string[] }[] = [];

  if (typeFilers.length > 0) {
    // Using and operator for type like city, county is pointless
    subtitleParts.push({ operator: 'or', labels: typeFilers.map((value) => `heraldry.unit.type.pl.${value}`) })
  }

  if (colorFilters.length > 0) {
    subtitleParts.push({ operator: filterOperator, labels: colorFilters.map((value) => `heraldry.color.${value}`) })
  }

  if (animalFilters.length > 0) {
    subtitleParts.push({ operator: filterOperator, labels: animalFilters.map((value) => `heraldry.animal.${value}`) })
  }

  if (itemFilters.length > 0) {
    subtitleParts.push({ operator: filterOperator, labels: itemFilters.map((value) => `heraldry.item.${value}`) })
  }

  return {
    filteredUnits,
    unitsForMap,
    subtitleParts,
  }
}