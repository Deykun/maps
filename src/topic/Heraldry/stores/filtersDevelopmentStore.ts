import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware'

import { AdministrativeUnitIndex, MarkerParams, MarkerParamsWithResult } from '@/topic/Heraldry/types';

import { getHasMarker } from '@/topic/Heraldry/utils/markers/getMarker';

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
    persist(
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

export const toggleAsCustomFilterExclude = (unitTitle: string) => {
  useFiltersDevelopmentStore.setState((state) => {
    const exclude = state.filter.exclude?.includes(unitTitle)
      ? (state.filter.exclude || []).filter((unitnTitleToCheck) => unitTitle !== unitnTitleToCheck)
      : Array.from(new Set([...(state.filter.exclude || []), unitTitle]));

    return {
      ...state,
      filter: {
        ...state.filter,
        exclude,
        include: (state.filter.include || []).filter((unitnTitleToCheck) => unitTitle !== unitnTitleToCheck),
      }
    };
  });
};

export const toggleAsCustomFilterInclude = (unitTitle: string) => {
  useFiltersDevelopmentStore.setState((state) => {
    const include = state.filter.include?.includes(unitTitle)
      ? (state.filter.include || []).filter((unitnTitleToCheck) => unitTitle !== unitnTitleToCheck)
      : Array.from(new Set([...(state.filter.include || []), unitTitle]))
    
    return {
      ...state,
      filter: {
        ...state.filter,
        exclude: (state.filter.exclude || []).filter((unitnTitleToCheck) => unitTitle !== unitnTitleToCheck),
        include,
      }
    };
  });
};

export const updateCustomFilterResultBasedOnData = (data: AdministrativeUnitIndex[]) => {
  const state = useFiltersDevelopmentStore.getState();

  // It only shows units with descriptions
  // const filteredUnitsIds = data.filter(({ description }) => (description.length || 0) > 70).map(({ id }) => id);

  const filteredUnitsIds = data.filter(({ title, description }) => getHasMarker(
    {
      title,
      text: description,
    }, {
      phrases: state.filter.phrases,
      include: state.filter.include,
      exclude: state.filter.exclude,
    },
  )).map(({ id }) => id);

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