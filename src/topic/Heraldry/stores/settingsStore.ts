import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware'

import { clamp } from '@/utils/math';

import { setCoatSize as setCanvasCoatSize } from '@/pages/heraldry/components/canvas/render';

export const zoomUnitInPx = 640;

export const zoomMin = 5;
export const zoomMax = 35;

type SettingStoreState = {
  zoomLevel: number;
  zoomCenterX: number,
  zoomCenterY: number,
  coatSize: number;
}

export const useSettingStore = create<SettingStoreState>()(
  devtools(
    persist(
      () => ({
        zoomLevel: 12,
        zoomCenterX: 0,
        zoomCenterY: 0,
        coatSize: 40,
      }),
      { name: 'settingsStore' },
    )
  )
)

export const zoomIn = ({ x = 0, y = 0 }: { x?: number, y?: number } = {}) => {
  useSettingStore.setState((state) => ({
    zoomLevel: clamp(zoomMin, state.zoomLevel + 1, zoomMax),
    zoomCenterX: x,
    zoomCenterY: y,
  }));
};

export const zoomOut = ({ x = 0, y = 0 }: { x?: number, y?: number } = {}) => {
  useSettingStore.setState((state) => ({
    zoomLevel: clamp(zoomMin, state.zoomLevel - 1, zoomMax),
    zoomCenterX: x,
    zoomCenterY: y,
  }));
};

export const setCoatSize = (size: number) => {
  useSettingStore.setState(() => ({ coatSize: size }));
  setCanvasCoatSize(size);
};

export default useSettingStore;