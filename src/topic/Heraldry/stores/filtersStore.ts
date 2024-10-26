import { create } from 'zustand';
import { devtools } from 'zustand/middleware'

import { WITH_ANIMAL, WITHOUT_ANIMAL } from '@/topic/Heraldry/constants';

import { getFiltersFromSearchParams } from '@/topic/Heraldry/utils/getSearchParams';

type UnitPaneStoreState = {
  type: string[],
  shouldIgnoreFormer: boolean,
  color: string[],
  animal: string[],
  item: string[],
  filterOperator: 'or' | 'and',
  shouldReverseFilters: boolean,
  shouldHideMissingImages: boolean,
}

const initial = getFiltersFromSearchParams();

const emptyState: UnitPaneStoreState = {
  type: [],
  shouldIgnoreFormer: false,
  color: [],
  animal: [],
  item: [],
  filterOperator: 'and',
  shouldReverseFilters: false,
  shouldHideMissingImages: false,
}

export const useFiltersStore = create<UnitPaneStoreState>()(
  devtools(
    () => ({
      type: initial.typeFilters || emptyState.type,
      shouldIgnoreFormer: initial.shouldIgnoreFormer ?? emptyState.shouldIgnoreFormer,
      color: initial.colorFilters || emptyState.color,
      animal: initial.animalFilters || emptyState.animal,
      item: initial.itemFilters || emptyState.item,
      filterOperator: initial.filterOperator || emptyState.filterOperator,
      shouldReverseFilters: initial.shouldReverseFilters ?? emptyState.shouldReverseFilters,
      shouldHideMissingImages: emptyState.shouldHideMissingImages,
    } as UnitPaneStoreState),
    { name: 'filterStore' },
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

const getStringsFilterSet = (filterName: 'type' | 'color' | 'animal' | 'item') => (values: string[]) => {
  useFiltersStore.setState((state) => ({
      ...state,
      [filterName]: values,
  }));
}

export const setType = getStringsFilterSet('type');
export const setColor = getStringsFilterSet('color');
export const setAnimal = getStringsFilterSet('animal');
export const setItem = getStringsFilterSet('item');

const getBooleanFilterToogle = (filterName: 'shouldIgnoreFormer' | 'shouldReverseFilters' | 'shouldHideMissingImages') => () => {
  useFiltersStore.setState((state) => ({
      ...state,
      [filterName]: !state[filterName],
  }));
}

export const toggleShouldIgnoreFormer = getBooleanFilterToogle('shouldIgnoreFormer');
export const toggleShouldReverseFilters = getBooleanFilterToogle('shouldReverseFilters');
export const toggleShouldHideMissingImages = getBooleanFilterToogle('shouldHideMissingImages');

export const toggleFilterOperator = () => {
  useFiltersStore.setState((state) => ({
      ...state,
      filterOperator: state.filterOperator === 'and' ? 'or' : 'and',
  }));
}

const getStringsFilterToggle = (filterName: 'type' | 'color' | 'animal' | 'item') => (value: string) => {
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
export const defaultToggleAnimal = getStringsFilterToggle('animal');

export const toggleAnimal = (animal: string) => {
  if ([WITH_ANIMAL, WITHOUT_ANIMAL].includes(animal)) {
    const animalFilters = useFiltersStore.getState().animal;

    setAnimal(animalFilters.includes(animal) ? [] : [animal]);

    return;
  }

  defaultToggleAnimal(animal);
};

export const toggleItem = getStringsFilterToggle('item');

export default useFiltersStore;