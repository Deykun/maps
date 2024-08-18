import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware'

import { clamp } from '@/utils/math';

import { setCoatSize as setCanvasCoatSize } from '@/pages/heraldry/components/canvas/render';

export const zoomUnitInPx = 1920 / 3;

export const zoomMax = 40;
export const zoomMin = 5;

type SettingStoreState = {
  zoomLevel: number;
  coatSize: number;
}

export const useSettingStore = create<SettingStoreState>()(
  devtools(
    persist(
      () => ({
        zoomLevel: 8,
        coatSize: 40,
      }),
      { name: 'settingsStore' },
    )
  )
)

export const zoomIn = () => {
  useSettingStore.setState((state) => ({ zoomLevel: clamp(zoomMin, state.zoomLevel + 1, zoomMax) }));
};

export const zoomOut = () => {
  useSettingStore.setState((state) => ({ zoomLevel: clamp(zoomMin, state.zoomLevel - 1, zoomMax) }));
};

export const setCoatSize = (size: number) => {
  useSettingStore.setState(() => ({ coatSize: size }));
  setCanvasCoatSize(size);
};

export default useSettingStore;