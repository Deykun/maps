import { create } from 'zustand';
import { devtools } from 'zustand/middleware'

import { getFiltersFromSearchParams } from '@/topic/Heraldry/utils/getSearchParams';

type UnitPaneStoreState = {
  type: string[],
  shouldIgnoreFormer: boolean,
  color: string[],
}

const initial = getFiltersFromSearchParams();

const emptyState = {
  type: [],
  shouldIgnoreFormer: false,
  color: [],
}

export const useFiltersStore = create<UnitPaneStoreState>()(
  devtools(
    () => ({
      type: initial.typeFilters || emptyState.type,
      shouldIgnoreFormer: initial.shouldIgnoreFormer || emptyState.shouldIgnoreFormer,
      color: initial.colorFilters || emptyState.color,
    } as UnitPaneStoreState),
    { name: 'filterDevelopmentStore' },
  )
);

export const resetFilters = () => {
  useFiltersStore.setState(emptyState);
}

const getBooleanFilterSet = (filterName: 'shouldIgnoreFormer') => (value: boolean) => {
  useFiltersStore.setState((state) => ({
      ...state,
      [filterName]: value,
  }));
}

export const setShouldIgnoreFormer = getBooleanFilterSet('shouldIgnoreFormer');

const getStringsFilterSet = (filterName: 'type' | 'color') => (values: string[]) => {
  useFiltersStore.setState((state) => ({
      ...state,
      [filterName]: values,
  }));
}

export const setType = getStringsFilterSet('type');
export const setColor = getStringsFilterSet('color');

const getBooleanFilterToogle = (filterName: 'shouldIgnoreFormer') => () => {
  useFiltersStore.setState((state) => ({
      ...state,
      [filterName]: !state[filterName],
  }));
}

export const toggleShouldIgnoreFormer = getBooleanFilterToogle('shouldIgnoreFormer');

const getStringsFilterToggle = (filterName: 'type' | 'color') => (value: string) => {
  useFiltersStore.setState((state) => {
    const isActive = state[filterName].includes(value);
    
    return {
      ...state,
      [filterName]: isActive ? state[filterName].filter((item) => item !== value) : [...state[filterName], value],
    }
  });
}

export const toggleType = getStringsFilterToggle('type');
export const toggleColor = getStringsFilterToggle('color');

export default useFiltersStore;