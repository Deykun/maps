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