import { MarkerParamsWithResult, AdministrativeUnit } from '../types';
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

export const getFilteredUnits = (
  lang: string,
  units: AdministrativeUnit[],
  filterOperator: 'and' | 'or',
  shouldReverseFilters: boolean,
  customFilter: MarkerParamsWithResult | undefined,
  typeFilers: string[],
  colorFilters: string[],
  animalFilters: string[],
  itemFilters: string[],
) => {
  const filterResponse = {
    matches: true,
    notMatches: false
  };

  if (shouldReverseFilters) {
    filterResponse.matches = false;
    filterResponse.notMatches = true;
  }

  const filteredUnits = units.filter(
    (unit) => {
      const isCustomFilterActive = customFilter && customFilter.isActive && Array.isArray(customFilter.result);
      if (isCustomFilterActive) {
        if ((customFilter.result?.length || 0) === 0) {
          return filterResponse.notMatches;
        }

        if (!customFilter.result?.includes(unit.id)) {
          return filterResponse.notMatches;
        }
      }

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
        if (Object.keys(unit.colors?.byNames || {}).length === 0) {
          return filterResponse.notMatches;
        }
        
        if (filterOperator === 'or' && !Object.keys(unit.colors?.byNames || {}).some((name) => colorFilters.includes(name))) {
          return filterResponse.notMatches;
        }

        if (filterOperator === 'and' && !colorFilters.every((active) => Object.keys(unit.colors?.byNames || {}).some(( name ) => name === active))) {
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

  // Remove after
  const isCustomFilterActive = customFilter && Array.isArray(customFilter.result);
  if (isCustomFilterActive) {
    const InNewButNotOld = filteredUnits.filter(({ markers }) => {
      return ![...(markers?.animals || []), 'empty'].includes(customFilter.name)
    });

    const InOldButNotNew = units.filter(({ id, markers }) => {
      return [...(markers?.animals || []), 'empty'].includes(customFilter.name) && !filteredUnits.some((u) => u.id === id);
    });

    console.log({
      InNewButNotOld,
      InOldButNotNew,
      exclude: InNewButNotOld.map(({ title }) => title),
      excludeText: InNewButNotOld.map(({ title }) => `"${title}"`).join(','),
      include: InOldButNotNew.map(({ title }) => title),
      includeText: InOldButNotNew.map(({ title }) => `"${title}"`).join(','),
    })
    console.log(InNewButNotOld.map(({ title }) => `"${title}"`).join(','));
  }

  const unitsForMap = filteredUnits.filter(
    (unit) => typeof unit?.place?.coordinates?.lon === 'number' && typeof unit?.imageUrl === 'string',
  );

  const subtitleParts: { operator: 'or' | 'and', labels: string[] }[] = [];

  if ((customFilter?.phrases || []).length > 0 && Array.isArray(customFilter?.result)) {
    // Phrases always work as or
    subtitleParts.push({ operator: 'or', labels: (customFilter?.phrases?.map((value) => `„${value}”`) || []) })
  }

  if (typeFilers.length > 0) {
    // Using and operator for type like city, county is pointless
    subtitleParts.push({ operator: 'or', labels: typeFilers.map((value) => `heraldry.unit.type.${lang}.${value}`) })
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