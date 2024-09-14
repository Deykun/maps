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
        isModeActive: false,
        filter: {
          isActive: false,
          ...EMPTY_CUSTOM_FILTER,
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
  console.log('toggleCustomFilterVisiblitytoggleCustomFilterVisiblity');
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
      ...state.filter,
      ...EMPTY_CUSTOM_FILTER,
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

export const setCustomFilterExclude = (unitTitle: string) => {
  useFiltersDevelopmentStore.setState((state) => ({
    ...state,
    filter: {
      ...state.filter,
      exclude: Array.from(new Set([...(state.filter.exclude || []), unitTitle])),
      include: (state.filter.include || []).filter((unitnTitleToCheck) => unitTitle !== unitnTitleToCheck),
    },
  }));
};

export const setCustomFilterInclude = (unitTitle: string) => {
  useFiltersDevelopmentStore.setState((state) => ({
    ...state,
    filter: {
      ...state.filter,
      exclude: (state.filter.exclude || []).filter((unitnTitleToCheck) => unitTitle !== unitnTitleToCheck),
      include: Array.from(new Set([...(state.filter.include || []), unitTitle])),
    }
  }));
}

export const updateCustomFilterResultBasedOnData = (data: AdministrativeUnitIndex[]) => {
  const state = useFiltersDevelopmentStore.getState();

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