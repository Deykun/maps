import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { CoatOfArmsMapData, ComplexManualMarker, MarkerType } from '@/topic/Heraldry/types';

type FiltersModificationStoreState = {
  animal: {
    [name: string]: {
      include?: ComplexManualMarker[],
      exclude?: ComplexManualMarker[],
    }
  },
  item: {
    [name: string]: {
      include?: ComplexManualMarker[],
      exclude?: ComplexManualMarker[],
    }
  },
}

export const useFilterModificationStore = create<FiltersModificationStoreState>()(
  devtools(
    persist(
    () => ({
        animal: {},
        item: {},
      } as FiltersModificationStoreState),
      { name: 'filtersModificationStore' },
    )
  )
)

const getListModifier = (action: 'reset' | 'include' | 'exclude') => (unit: CoatOfArmsMapData, markerType: MarkerType, item: string) => {
  const imageHashToChange = unit.imageHash;

  if (!imageHashToChange) {
    console.error('Unit without image hash');

    return;
  }

  const ruleToAdd: ComplexManualMarker = { imageHash: imageHashToChange, note: unit.title.substring(0, 50) };

  useFilterModificationStore.setState((state) => {
    const filter = state[markerType][item];

    let include = filter?.include || [];
    let exclude = filter?.exclude || [];

    // Removed from both to deal with duplicates
    const includeWithRemoved = include.filter(({ imageHash }) => imageHash !== imageHashToChange);
    const excludeWithRemoved = exclude.filter(({ imageHash }) => imageHash !== imageHashToChange);
    
    let newInclude = includeWithRemoved;
    let newExclude = excludeWithRemoved;

    if (action === 'include') {
      newInclude = [...newInclude, ruleToAdd];
    }

    if (action === 'exclude') {
      newExclude = [...newExclude, ruleToAdd];
    }

    const newFilter = {
      include: newInclude,
      exclude: newExclude,
    };

    localStorage.setItem(`maps_${markerType}_${item}`, JSON.stringify(newFilter));

    return {
      ...state,
      [markerType]: {
        ...state[markerType],
        [item]: newFilter,
      },
    };
  });
};

export const removeFromIncludeAndExcludeInMarker = getListModifier('reset');

export const excludeUnitFromMarker = getListModifier('exclude');

export const includeUnitInMarker = getListModifier('include');

const getListForUnit = (action: 'include' | 'exclude') => (unit: CoatOfArmsMapData, markerType: MarkerType) => (state: FiltersModificationStoreState) => {
  const imageHashToChange = unit.imageHash;

  if (!imageHashToChange) {
    console.error('Unit without image hash');

    return [];
  }

  const markerTypeList = state[markerType];

  const list = Object.entries(markerTypeList).filter(
    ([_item, rules]) => (rules[action] || []).some(({ imageHash }) => imageHash === imageHashToChange)
  ).map(
    ([item]) => item
  );

  return list;
}

export const selectUnitExcludeModifictions = getListForUnit('exclude');

export const selectUnitIncludeModifictions = getListForUnit('include');

export default useFilterModificationStore;
