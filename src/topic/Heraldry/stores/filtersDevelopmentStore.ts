import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware'

import { MarkerParams, MarkerParamsWithResult } from '@/topic/Heraldry/types';

type FiltersDevelopmentStoreState = MarkerParamsWithResult & {
  isModeActive: boolean,
}

export const useFiltersDevelopmentStore = create<FiltersDevelopmentStoreState>()(
  devtools(
    persist(
      () => ({
        isModeActive: false,
        isActive: false,
        name: '',
        phrases: [],
        exclude: [],
        include: [],
        result: [],
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

export const customFilterExclude = (unitTitle: string) => {
  useFiltersDevelopmentStore.setState((state) => ({
    ...state,
      exclude: Array.from(new Set([...(state.exclude || []), unitTitle])),
      include: (state.include || []).filter((unitnTitleToCheck) => unitTitle !== unitnTitleToCheck),
  }));
};

export const customFilterInclude = (unitTitle: string) => {
  useFiltersDevelopmentStore.setState((state) => ({
    ...state,
    exclude: (state.exclude || []).filter((unitnTitleToCheck) => unitTitle !== unitnTitleToCheck),
    include: Array.from(new Set([...(state.include || []), unitTitle])),
  }));
}

// setCustomFilter({
//   ...customFilter,
//   exclude: Array.from(new Set([...(customFilter.exclude || []), unitNameForAction])),
//   include: (customFilter.include || []).filter((unitName) => unitNameForAction !== unitName),
// });
// export const zoomIn = ({ x = 0, y = 0 }: { x?: number, y?: number } = {}) => {
//   useSettingStore.setState((state) => ({
//     zoomLevel: clamp(zoomMin, state.zoomLevel + 1, zoomMax),
//     zoomCenterX: x,
//     zoomCenterY: y,
//   }));
// };

// export const zoomOut = ({ x = 0, y = 0 }: { x?: number, y?: number } = {}) => {
//   useSettingStore.setState((state) => ({
//     zoomLevel: clamp(zoomMin, state.zoomLevel - 1, zoomMax),
//     zoomCenterX: x,
//     zoomCenterY: y,
//   }));
// };

// export const setCoatSize = (size: number) => {
//   useSettingStore.setState(() => ({ coatSize: size }));
//   setCanvasCoatSize(size);
// };

export default useFiltersDevelopmentStore;