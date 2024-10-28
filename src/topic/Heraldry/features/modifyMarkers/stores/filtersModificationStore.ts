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

const emptyState: FiltersModificationStoreState = {
  animal: {},
  item: {},
};

export const useFilterModificationStore = create<FiltersModificationStoreState>()(
  devtools(
    persist(
    () => (emptyState as FiltersModificationStoreState),
      { name: 'filtersModificationStore' },
    )
  )
)

export const resetModifications = () => useFilterModificationStore.setState(emptyState);

const getListModifier = (action: 'reset' | 'include' | 'exclude') => (unit: CoatOfArmsMapData, markerType: MarkerType, item: string) => {
  const imageHashToChange = unit.imageHash;

  if (!imageHashToChange) {
    console.error('Unit without image hash');

    return;
  }

  const ruleToAdd: ComplexManualMarker = { imageHash: imageHashToChange, note: unit.title };

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

    // Backup
    const country = document.documentElement.getAttribute('country');
    localStorage.setItem(`${country}_maps_${markerType}_${item}`, JSON.stringify(newFilter));

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

type Shortcut = { name: string, type: 'animal' | 'item', total: number };

export const selectShortcuts = (state: FiltersModificationStoreState): Shortcut[] => {
  const animal: Shortcut[] = Object.entries(state.animal).map(([name, { include = [] } = {}]) => ({ name, type: 'animal', total: include.length }));
  const item: Shortcut[] = Object.entries(state.item).map(([name, { include = [] } = {}]) => ({ name, type: 'item', total: include.length }));

  return [...animal, ...item].sort((a, b) => a.total - b.total).slice(0, 6);
};

export default useFilterModificationStore;
