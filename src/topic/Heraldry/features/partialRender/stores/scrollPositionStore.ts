


import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { ScrollPosition } from '@/topic/Heraldry/types';

type ScrollPositionStoreState = ScrollPosition;

export const useScrollPositionStore = create<ScrollPositionStoreState>()(
  devtools(
    () => ({
      width: 0,
      height: 0,
      left: 0,
      top: 0,
    } as ScrollPositionStoreState),
    { name: 'scrollPositionStore' },
  )
)

export const updateScrollPosition = (state: ScrollPositionStoreState) => {
  const prevState = useScrollPositionStore.getState();

  if (JSON.stringify(prevState) !== JSON.stringify(state)) {
    useScrollPositionStore.setState(state);
  }  
};

export default useScrollPositionStore;
