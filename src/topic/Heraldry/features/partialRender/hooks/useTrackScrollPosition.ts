import { useRef, useCallback, useEffect } from 'react';
import throttle from 'lodash/throttle';
import debounce from 'lodash/debounce';

import useZoomStore from '@/topic/Heraldry/stores/zoomStore';
import { updateScrollPosition } from '@/topic/Heraldry/features/partialRender/stores/scrollPositionStore';

function useTrackScrollPosition() {
  const zoomLevel = useZoomStore(state => state.zoomLevel);
  const ref = useRef<HTMLDivElement | null>(null);

  const handleScroll = useCallback((_source: string) => {
    if (ref.current) {
      const { scrollTop, scrollLeft } = ref.current;
      const { width = 0, height = 0 } = ref.current.getClientRects()[0];

      updateScrollPosition({ width, height, left: scrollLeft, top: scrollTop });
    }
  }, [updateScrollPosition]);

  useEffect(() => {
    handleScroll('zoom');
  }, [ref.current, handleScroll, zoomLevel]);

  // Throttled and debounced versions of the scroll handler
  const throttledHandleScroll = useCallback(throttle(handleScroll, 1500), [handleScroll]);
  const debouncedHandleScroll = useCallback(debounce(() => {
    throttledHandleScroll.cancel();
    handleScroll('debounce');
  }, 300), [handleScroll]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const onScroll = () => {
      throttledHandleScroll('throttle');
      debouncedHandleScroll();
    };

    element.addEventListener('scroll', onScroll);

    return () => {
      element.removeEventListener('scroll', onScroll);
      throttledHandleScroll.cancel();
      debouncedHandleScroll.cancel();
    };
  }, [throttledHandleScroll, debouncedHandleScroll]);

  return ref;
}

export default useTrackScrollPosition;