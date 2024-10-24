import { create } from 'zustand';
import { devtools } from 'zustand/middleware'

import { CoatOfArmsMapData, AdministrativeUnitIndex, MarkerParams, MarkerParamsWithResult, ManualMarker, ComplexManualMarker } from '@/topic/Heraldry/types';

import { getHasMarker } from '@/topic/Heraldry/utils/markers/getMarker';

export const minLengthOfLongDescription = 70;

type FiltersDevelopmentStoreState = {
  isModeActive: boolean,
  filter: MarkerParamsWithResult,
}

export const EMPTY_CUSTOM_FILTER: MarkerParams = {
  name: '',
  phrases: [],
  exclude: [],
  include: [],
};

export const useFiltersDevelopmentStore = create<FiltersDevelopmentStoreState>()(
  devtools(
    () => ({
      // Is active locally by default
      isModeActive: window?.location?.href?.includes('localhost') || false,
      filter: {
        ...EMPTY_CUSTOM_FILTER,
        isActive: false,
        result: [],
      },
    } as FiltersDevelopmentStoreState),
    { name: 'filterDevelopmentStore' },
  )
)

export const toggleFilterDevlopmentMode = () => {
  useFiltersDevelopmentStore.setState((state) => ({
    ...state,
    isModeActive: !state.isModeActive,
  }));
};

export const toggleCustomFilterVisiblity = () => {
  useFiltersDevelopmentStore.setState((state) => ({
    ...state,
    filter: {
      ...state.filter,
      isActive: !state.filter.isActive, 
    },
  }));
};

export const setCustomFilter = (filter: Partial<MarkerParams>) => {
  useFiltersDevelopmentStore.setState((state) => ({
    ...state,
    filter: {
      ...state.filter,
      ...filter,
    },
  }));
};

export const clearCustomFilter = () => {
  useFiltersDevelopmentStore.setState((state) => ({
    ...state,
    filter: {
      ...EMPTY_CUSTOM_FILTER,
      isActive: false,
      result: [],
    },
  }));
};

export const setCustomFilterName = (name: string) => {
  useFiltersDevelopmentStore.setState((state) => ({
    ...state,
    filter: {
      ...state.filter,
      name, 
    },
  }));
};

export const setCustomFilterPhrases = (phrases: string[]) => {
  useFiltersDevelopmentStore.setState((state) => ({
    ...state,
    filter: {
      ...state.filter,
      phrases, 
    },
  }));
};

export const getIsMatchingManualMarker = (rule: ManualMarker[] = [], { title, imageHash = '' }: { title: string, imageHash?: string }) => {
  if (rule.length === 0) {
    return false;
  }

  const strings = rule.filter((value) => typeof value === 'string') as string[];
  if (strings.includes(title)) {
    return true;
  }

  const imageHashes = (rule.filter((value) => typeof value !== 'string') as ComplexManualMarker[]).map(({ imageHash }) => imageHash);
  if (imageHashes.includes(imageHash)) {
    return true;
  }

  return false;
}


export const toggleAsCustomFilterExclude = (unit: CoatOfArmsMapData) => {
  useFiltersDevelopmentStore.setState((state) => {
    const isActive = getIsMatchingManualMarker(state.filter.exclude, unit);

    const exclude = isActive
      ? (state.filter.exclude || []).filter(
        (ruleToCheck) => typeof ruleToCheck === 'string' ? unit.title !== ruleToCheck : unit.imageHash !== ruleToCheck.imageHash)
      : [...(state.filter.exclude || []), (unit.imageHash ? { imageHash: unit.imageHash, note: unit.title } : unit.title)]

    return {
      ...state,
      filter: {
        ...state.filter,
        exclude,
        include: (state.filter.include || []).filter(
          (ruleToCheck) => typeof ruleToCheck === 'string' ? unit.title !== ruleToCheck : unit.imageHash !== ruleToCheck.imageHash
        ),
      }
    };
  });
};

export const toggleAsCustomFilterInclude = (unit: CoatOfArmsMapData) => {
  useFiltersDevelopmentStore.setState((state) => {
    const isActive = getIsMatchingManualMarker(state.filter.include, unit);

    const include = isActive
      ? (state.filter.include || []).filter(
        (ruleToCheck) => typeof ruleToCheck === 'string' ? unit.title !== ruleToCheck : unit.imageHash !== ruleToCheck.imageHash)
        : [...(state.filter.include || []), (unit.imageHash ? { imageHash: unit.imageHash, note: unit.title } : unit.title)]
    
    return {
      ...state,
      filter: {
        ...state.filter,
        exclude: (state.filter.exclude || []).filter(
          (ruleToCheck) => typeof ruleToCheck === 'string' ? unit.title !== ruleToCheck : unit.imageHash !== ruleToCheck.imageHash
        ),
        include,
      }
    };
  });
};

const bulkActionsCreator = (action: 'include' | 'exclude') => (units: CoatOfArmsMapData[]) => {
  const rulesToAdd: ComplexManualMarker[] = units.filter(({ imageHash }) => imageHash).map((unit) => ({ imageHash: unit.imageHash as string, note: unit.title.substring(0, 50) }));
  const titlesToRemove = units.map(({ title }) => title);
  const hashesToRemove = rulesToAdd.map(({ imageHash }) => imageHash);

  useFiltersDevelopmentStore.setState((state) => {
    // We removing them for both to avoid duplicates
    const excludeWithRemoved = (state.filter.exclude || []).filter((ruleToCheck) => typeof ruleToCheck === 'string'
      ? !titlesToRemove.includes(ruleToCheck)
      : !hashesToRemove.includes(ruleToCheck.imageHash)
    );

    const includeWithRemoved = (state.filter.include || []).filter((ruleToCheck) => typeof ruleToCheck === 'string'
      ? !titlesToRemove.includes(ruleToCheck)
      : !hashesToRemove.includes(ruleToCheck.imageHash)
    );

    let newExclude = excludeWithRemoved;
    let newInclude = includeWithRemoved;
    if (action === 'exclude') {
      newExclude = [...newExclude, ...rulesToAdd];
    }

    if (action === 'include') {
      newInclude = [...newInclude, ...rulesToAdd];
    }
      
    return {
      ...state,
      filter: {
        ...state.filter,
        exclude: newExclude,
        include: newInclude,
      }
    };
  });
};

export const bulkAddToFilterInclude = bulkActionsCreator('include');

export const bulkAddToFilterExclude = bulkActionsCreator('exclude');

export const showOnlyUnitsWithDescriptionInCustomFilter = (data: AdministrativeUnitIndex[], { shouldReverse = false } : { shouldReverse: boolean }) => {
  const state = useFiltersDevelopmentStore.getState();

  const filterResponse = {
    matches: true,
    notMatches: false
  };

  if (shouldReverse) {
    filterResponse.matches = false;
    filterResponse.notMatches = true;
  }

    // It only shows units with descriptions
    const filteredUnitsIds = data.filter(({ description }) => (description.length || 0) > minLengthOfLongDescription ? filterResponse.matches : filterResponse.notMatches).map(({ id }) => id);

    const wasUpdated = JSON.stringify(filteredUnitsIds) !== JSON.stringify(state.filter.result);

    if (wasUpdated) {
      useFiltersDevelopmentStore.setState({
        ...state,
        filter: {
          ...state.filter,
          ...EMPTY_CUSTOM_FILTER,
          name: "withText",
          phrases: ['only units with longer text'],
          isActive: true,
          result: filteredUnitsIds,
        }
      });
    }


    if (wasUpdated) {
      useFiltersDevelopmentStore.setState({
        ...state,
        filter: {
          ...state.filter,
          result: filteredUnitsIds,
        }
      });
    }
}

export const updateCustomFilterResultBasedOnData = (data: AdministrativeUnitIndex[], { shouldReverse = false } : { shouldReverse: boolean }) => {
  const state = useFiltersDevelopmentStore.getState();

  const filterResponse = {
    matches: true,
    notMatches: false
  };

  if (shouldReverse) {
    filterResponse.matches = false;
    filterResponse.notMatches = true;
  }

  const filteredUnitsIds = data.filter(({ title, description, imageUrl }) => getHasMarker(
    {
      title,
      text: description,
      imageHash: (imageUrl || '').split('/').at(-1)?.split('-')[0] || '', // images/heraldry/de/unit/17f85dc9-kreis-warendorf-80w.webp -> 17f85dc9
    }, {
      phrases: state.filter.phrases,
      include: state.filter.include,
      exclude: state.filter.exclude,
    },
  ) ? filterResponse.matches : filterResponse.notMatches).map(({ id }) => id);

  const wasUpdated = JSON.stringify(filteredUnitsIds) !== JSON.stringify(state.filter.result);

  if (wasUpdated) {
    useFiltersDevelopmentStore.setState({
      ...state,
      filter: {
        ...state.filter,
        result: filteredUnitsIds,
      }
    });
  }
};

export default useFiltersDevelopmentStore;
