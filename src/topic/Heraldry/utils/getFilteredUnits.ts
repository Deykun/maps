import { MarkerParamsWithResult, CoatOfArmsMapData, CoatOfArmsDetailsData } from '../types';
import { WITH_ANIMAL, WITHOUT_ANIMAL } from '../constants';
import { collapsePhrases } from './markers/collapsePhrases';
import { mergeMarkersForUnit } from './markers/mergeMarkersForUnit';

export type SubtitlePart = {
  operator: 'or' | 'and';
  labels: string[];
};

export type GetFilterUnitsResponse = {
  filteredUnits: CoatOfArmsMapData[];
  unitsForMap: CoatOfArmsMapData[];
  subtitleParts: SubtitlePart[],
};

export type GetFilteredUnitsParams = {
  lang: string,
  unitsForMapAll: CoatOfArmsMapData[],
  detailsForUnitsById: {
    [id: string]: CoatOfArmsDetailsData,
  },
  filterOperator: 'and' | 'or',
  shouldReverseFilters: boolean,
  shouldIgnoreFormer: boolean,
  brokenHashes: string[],
  shouldHideMissingImages: boolean,
  customFilter: MarkerParamsWithResult | undefined,
  typeFilters: string[],
  colorFilters: string[],
  animalFilters: string[],
  itemFilters: string[],
};

export const getFilteredUnits = ({
  lang,
  unitsForMapAll,
  detailsForUnitsById,
  filterOperator,
  shouldReverseFilters,
  shouldIgnoreFormer,
  brokenHashes,
  shouldHideMissingImages,
  customFilter,
  typeFilters,
  colorFilters,
  animalFilters,
  itemFilters,
}: GetFilteredUnitsParams) => {
  console.log(' - Units being filtered')
  const filterResponse = {
    matches: true,
    notMatches: false
  };

  if (shouldReverseFilters) {
    filterResponse.matches = false;
    filterResponse.notMatches = true;
  }
  
  const isCustomFilterActive = customFilter && customFilter.isActive && Array.isArray(customFilter.result);
  const isTypeFilterActive = typeFilters.length > 0;
  const isColorFilterActive = colorFilters.length > 0;
  const isAnimalFilterActive = animalFilters.length > 0;
  const isItemFilterActive = itemFilters.length > 0;

  const filteredUnits = unitsForMapAll.filter(
    (unit) => {
      if (isCustomFilterActive) {
        /*
          The custom filter doesn't use filterResponse.notMatches because customFilter.result has it built in, allowing the user to reverse the custom filter separately.
          
          For example, by selecting "lion" as a custom filter and reversing it, we get all CoA that do not match it.
          
          Then, we can enable the "without animals" filter, which isn't custom.
          
          This will match all CoA without animals and apply additional filtering based on the reversed lion filter.
          
          This is essentially how the filters are created. For more details, refer to FILTERS.md.
        */
        if ((customFilter.result?.length || 0) === 0) {
          return false;
        }

        if ((unit.mergedIds || []).length > 0) {
          const unitsIdsToCheck = [unit.id, ...(unit.mergedIds || [])];
  
          if (!unitsIdsToCheck.some((id) => customFilter.result?.includes(id))) {
            return false;
          }
        } else {
          if (!customFilter.result?.includes(unit.id)) {
            return false;
          }
        }
      }

      if (shouldHideMissingImages && brokenHashes.some((brokenHash) => unit.imageHash === brokenHash)) {
        return filterResponse.notMatches;
      }

      if (isTypeFilterActive) {
        if ((unit?.type?.length || 0) === 0) {
          return filterResponse.notMatches;
        }

        const isOneOfPickedTypes = typeFilters.some((active) => (unit?.type || []).includes(active));
        if (!isOneOfPickedTypes) {
          return filterResponse.notMatches;
        }
      }

      if (shouldIgnoreFormer) {
        const areAllTypesFormer = (unit?.type?.length || 0) > 0 && unit.type?.every((item) => item.startsWith('former'));
        if (areAllTypesFormer) {
          return false;
        }
      }

      if (isColorFilterActive) {
        const unitColors = detailsForUnitsById?.[unit.id]?.colors;

        if (Object.keys(unitColors?.byNames || {}).length === 0) {
          return filterResponse.notMatches;
        }
        
        if (filterOperator === 'or' && !Object.keys(unitColors?.byNames || {}).some((name) => colorFilters.includes(name))) {
          return filterResponse.notMatches;
        }

        if (filterOperator === 'and' && !colorFilters.every((active) => Object.keys(unitColors?.byNames || {}).some(( name ) => name === active))) {
          return filterResponse.notMatches;
        }
      }

      if (isAnimalFilterActive) {
        const animals = mergeMarkersForUnit(unit, detailsForUnitsById, 'animals');
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

      if (isItemFilterActive) {
        const items = mergeMarkersForUnit(unit, detailsForUnitsById, 'items');
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
    (unit) => typeof unit?.place?.coordinates?.lon === 'number' && (unit?.imagesList?.length || 0) > 0,
  );

  const subtitleParts: { operator: 'or' | 'and', labels: string[] }[] = [];
  
  if (customFilter && customFilter.isActive) {
    if ((customFilter?.include || []).length > 0) {
      subtitleParts.push({ operator: 'and', labels: [`+${(customFilter?.include || []).length} ⛨`] })
    }

    if ((customFilter?.exclude || []).length > 0) {
      subtitleParts.push({ operator: 'and', labels: [`-${(customFilter?.exclude || []).length} ⛨`] })
    }

    if ((customFilter?.phrases || []).length > 0 && Array.isArray(customFilter?.result)) {
      // Phrases always work as or
      // subtitleParts.push({ operator: 'or', labels: (customFilter?.phrases?.map((value) => `„${value}”`) || []) })

      subtitleParts.push({ operator: 'or', labels: collapsePhrases(customFilter?.phrases || [], -7).map((value) => `„${value}”`) || [] });
    }
  }

  if (shouldIgnoreFormer) {
    subtitleParts.push({ operator: 'or', labels: [`heraldry.unit.type.currentlyExisting`] })
  }

  if (typeFilters.length > 0) {
    // Using and operator for type like city, county is pointless
    subtitleParts.push({ operator: 'or', labels: typeFilters.map((value) => `heraldry.unit.type.${lang}.${value}`) })
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