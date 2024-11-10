import { create } from 'zustand';
import { devtools } from 'zustand/middleware'

export const zoomMin = 1;
export const zoomMax = 11;

type ZomeStoreState = {
  zoomLevel: number,
}

export const useZoomStore = create<ZomeStoreState>()(
  devtools(
    () => ({
      zoomLevel: 1,
    } as ZomeStoreState),
    { name: 'zoomStore' },
  )
)

export const setZoomLevel = (level: number) => {
  useZoomStore.setState((state) => ({
    ...state,
    zoomLevel: level,
  }));
};

export default useZoomStore;
