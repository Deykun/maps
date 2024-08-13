import { AdministrativeUnit } from '../types';
import { WITH_ANIMAL, WITHOUT_ANIMAL } from '../constants';

export type SubtitlePart = {
  operator: 'or' | 'and';
  labels: string[];
};

export type GetFilterUnitsResponse = {
  filteredUnits: AdministrativeUnit[];
  unitsForMap: AdministrativeUnit[];
  subtitleParts: SubtitlePart[],
};

let filterResponse = {
  matches: true,
  notMatches: false
};

// DEV: Uncomment to reverse - it helps find matching that were skipped
// filterResponse.matches = false;
// filterResponse.notMatches = true;

export const getFilteredUnits = (
  units: AdministrativeUnit[],
  filterOperator: 'and' | 'or',
  typeFilers: string[],
  colorFilters: string[],
  animalFilters: string[],
  itemFilters: string[],
) => {
  const filteredUnits = units.filter(
    (unit) => {
      const isTypeFilterActive = typeFilers.length > 0;
      if (isTypeFilterActive) {
        if ((unit?.type?.length || 0) === 0) {
          return filterResponse.notMatches;
        }

        const isOneOfPickedTypes = typeFilers.some((active) => (unit?.type || []).includes(active));
        if (!isOneOfPickedTypes) {
          return filterResponse.notMatches;
        }
      }

      const isColorFilterActive = colorFilters.length > 0;
      if (isColorFilterActive) {
        const isPrimary = unit?.colors?.primary?.name && colorFilters.includes(unit?.colors?.primary?.name);
        if (!isPrimary) {
          return filterResponse.notMatches;
        }

        if (!Array.isArray(unit?.colors?.palette) || unit.colors.palette.length === 0) {
          return filterResponse.notMatches;
        }
        
        if (filterOperator === 'or' && !unit.colors.palette.some(({ name }) => colorFilters.includes(name))) {
          return filterResponse.notMatches;
        }

        if (filterOperator === 'and' && !colorFilters.every((active) => (unit.colors?.palette || []).some(({ name }) => name === active))) {
          return filterResponse.notMatches;
        }
      }

      const isAnimalFilterActive = animalFilters.length > 0;
      if (isAnimalFilterActive) {
        const animals = unit?.markers?.animals || [];
        const hasAnimals = animals.length > 0;

        if ([WITH_ANIMAL, WITHOUT_ANIMAL].includes(animalFilters[0])) {
          if (animalFilters[0] === WITH_ANIMAL && !hasAnimals) {
            return filterResponse.notMatches;
          } else if (animalFilters[0] === WITHOUT_ANIMAL && hasAnimals) {
            return filterResponse.notMatches;
          }
        } else {
          if (!hasAnimals) {
            return filterResponse.notMatches;
          }

          const needOneAndMissing = filterOperator === 'or' && !animalFilters.some((active) => animals.includes(active));
          if (needOneAndMissing) {
            return filterResponse.notMatches;
          }

          const needAllAndMissing = filterOperator === 'and' && !animalFilters.every((active) => animals.includes(active));
          if (needAllAndMissing) {
            return filterResponse.notMatches;
          }
        }
      }

      const isItemFilterActive = itemFilters.length > 0;
      if (isItemFilterActive) {
        const items = unit?.markers?.items || [];
        const hasItems = items.length > 0;

        if (!hasItems) {
          return filterResponse.notMatches;
        }

        const needOneAndMissing = filterOperator === 'or' && !itemFilters.some((active) => items.includes(active));
        if (needOneAndMissing) {
          return filterResponse.notMatches;
        }

        const needAllAndMissing = filterOperator === 'and' && !itemFilters.every((active) => items.includes(active));
        if (needAllAndMissing) {
          return filterResponse.notMatches;
        }
      }

      return filterResponse.matches;
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