


import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type ScrollPositionStoreState = {
  width: number,
  height: number,
  left: number,
  top: number,
}



export const useFilterModificationStore = create<ScrollPositionStoreState>()(
  devtools(
    persist(
    () => ({
      width: 0,
      height: 0,
      left: 0,
      top: 0,
    } as ScrollPositionStoreState),
      { name: 'scrollPositionStore' },
    )
  )
)

export const updateScrollPosition = (state: ScrollPositionStoreState) => {
  const prevState = useFilterModificationStore.getState();

  if (JSON.stringify(prevState) !== JSON.stringify(state)) {
    console.log(state);
    console.log('prevState', prevState);
    useFilterModificationStore.setState(state);
  }  
};

export default useFilterModificationStore;
