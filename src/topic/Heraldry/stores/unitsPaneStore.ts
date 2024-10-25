import { create } from 'zustand';
import { devtools } from 'zustand/middleware'

import { CoatOfArmsMapData } from '@/topic/Heraldry/types';


type UnitPaneStoreState = {
  searchPhrase: string,
  selected: CoatOfArmsMapData[],
  details?: CoatOfArmsMapData,
}

export const useUnitsPaneStore = create<UnitPaneStoreState>()(
  devtools(
    () => ({
      searchPhrase: '',
      selected: [],
      details: undefined,
    } as UnitPaneStoreState),
    { name: 'filterDevelopmentStore' },
  )
);

export const setUnitsPaneSearchPhrase = (value: string) => {
  useUnitsPaneStore.setState((state) => ({
    ...state,
    searchPhrase: value,
  }));
};

export const setDetailsUnit = (unit: CoatOfArmsMapData | undefined) => {
  useUnitsPaneStore.setState((state) => ({
    ...state,
    details: unit,
  }));
};

export const toggleSelected = (unit: CoatOfArmsMapData) => {
  useUnitsPaneStore.setState((state) => {
    const isSelected = state.selected.some(({ id }) => id === unit.id);

    return {
      ...state,
      selected: isSelected ? state.selected.filter(({ id }) => id !== unit.id) : [...state.selected, unit],
    }
  });
};

export const setSelected = (units: CoatOfArmsMapData[]) => {
  useUnitsPaneStore.setState((state) => ({
      ...state,
      selected: units,
  }));
}

export default useUnitsPaneStore;