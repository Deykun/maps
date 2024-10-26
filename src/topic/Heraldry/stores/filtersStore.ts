import { create } from 'zustand';
import { devtools } from 'zustand/middleware'

import { getFiltersFromSearchParams } from '@/topic/Heraldry/utils/getSearchParams';

type UnitPaneStoreState = {
  color: string[],
}

const initial = getFiltersFromSearchParams();

const emptyState = {
  color: [],
}

export const useFiltersStore = create<UnitPaneStoreState>()(
  devtools(
    () => ({
      color: initial.colorFilters || emptyState.color,
    } as UnitPaneStoreState),
    { name: 'filterDevelopmentStore' },
  )
);

export const resetFilters = () => {
  useFiltersStore.setState(emptyState);
}

const getStringsFilterToggle = (filterName: 'color') => (value: string) => {
  useFiltersStore.setState((state) => {
    const isActive = state[filterName].includes(value);
    
    return {
      ...state,
      [filterName]: isActive ? state[filterName].filter((item) => item !== value) : [...state[filterName], value],
    }
  });
}

export const toggleColor = getStringsFilterToggle('color');

export default useFiltersStore;