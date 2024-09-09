import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware'

import { AdministrativeUnit } from '@/topic/Heraldry/types';

type ClickType = {
  x: number
  y: number
  hovered: AdministrativeUnit[],
}

type FiltersDevelopmentStoreState = {
  idToShow: string,
  lastClick?: ClickType,
}

export const useCursorStore = create<FiltersDevelopmentStoreState>()(
  devtools(
    persist(
      () => ({
        idToShow: '',
        lastClick: undefined,
      } as FiltersDevelopmentStoreState),
      { name: 'filterDevelopmentStore' },
    )
  )
)

export const setLastClick = (click?: ClickType) => {
  useCursorStore.setState((state) => ({
    ...state,
    lastClick: click,
  }));
};

export const showUnitOnMap = (id: string = '') => {
  useCursorStore.setState((state) => ({
    ...state,
    idToShow: id,
  }));
};

export default useCursorStore;