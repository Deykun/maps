import { create } from 'zustand';
import { devtools } from 'zustand/middleware'

import { getFiltersFromSearchParams } from '@/topic/Heraldry/utils/getSearchParams';

type UnitPaneStoreState = {
  type: string[],
  shouldIgnoreFormer: boolean,
  color: string[],
  filterOperator: 'or' | 'and',
  shouldReverseFilters: boolean,
}

const initial = getFiltersFromSearchParams();

const emptyState: UnitPaneStoreState = {
  type: [],
  shouldIgnoreFormer: false,
  color: [],
  filterOperator: 'and',
  shouldReverseFilters: false,
}

export const useFiltersStore = create<UnitPaneStoreState>()(
  devtools(
    () => ({
      type: initial.typeFilters || emptyState.type,
      shouldIgnoreFormer: initial.shouldIgnoreFormer ?? emptyState.shouldIgnoreFormer,
      color: initial.colorFilters || emptyState.color,
      filterOperator: initial.filterOperator || emptyState.filterOperator,
      shouldReverseFilters: initial.shouldReverseFilters ?? emptyState.shouldReverseFilters
    } as UnitPaneStoreState),
    { name: 'filterDevelopmentStore' },
  )
);

export const resetFilters = () => {
  useFiltersStore.setState(emptyState);
}

const getBooleanFilterSet = (filterName: 'shouldIgnoreFormer' | 'shouldReverseFilters') => (value: boolean) => {
  useFiltersStore.setState((state) => ({
      ...state,
      [filterName]: value,
  }));
}

export const setShouldIgnoreFormer = getBooleanFilterSet('shouldIgnoreFormer');
export const setShouldReverseFilters = getBooleanFilterSet('shouldReverseFilters');

const getStringsFilterSet = (filterName: 'type' | 'color') => (values: string[]) => {
  useFiltersStore.setState((state) => ({
      ...state,
      [filterName]: values,
  }));
}

export const setType = getStringsFilterSet('type');
export const setColor = getStringsFilterSet('color');

const getBooleanFilterToogle = (filterName: 'shouldIgnoreFormer' | 'shouldReverseFilters') => () => {
  useFiltersStore.setState((state) => ({
      ...state,
      [filterName]: !state[filterName],
  }));
}

export const toggleShouldIgnoreFormer = getBooleanFilterToogle('shouldIgnoreFormer');
export const toggleShouldReverseFilters = getBooleanFilterToogle('shouldReverseFilters');

export const toggleFilterOperator = () => {
  useFiltersStore.setState((state) => ({
      ...state,
      filterOperator: state.filterOperator === 'and' ? 'or' : 'and',
  }));
}

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