import { useState } from "react";
import useEffectChange from '@/hooks/useEffectChange'

export default function useKeepPositionAfterResize(size?: { width: number, height: number } | null) {
  const [cachedSize, setCachedSize] = useState(size || { width: 0, height: 0 });

  useEffectChange(() => {
    // console.log(dimensions);
    const didChange = size?.width !== cachedSize.width;
    if (didChange) {
      const scrollableWrapperEl = document.getElementById('map-section');

      if (scrollableWrapperEl) {
        const prevScrollLeft = scrollableWrapperEl.scrollLeft || 0;
        const prevScrollTop = scrollableWrapperEl.scrollTop || 0;

        if (prevScrollLeft > 0 || prevScrollTop > 0) {
          const viewPortWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
          const viewPortHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

          const centerX = prevScrollLeft + (viewPortWidth / 2);
          const centerY = prevScrollTop + (viewPortHeight / 2);
          const centerPercentageX = centerX / cachedSize.width;
          const centerPercentageY = centerY / cachedSize.height;

          const newLeft = centerPercentageX * (size?.width || 0) - (viewPortWidth / 2);
          const newTop = centerPercentageY * (size?.height || 0) - (viewPortHeight / 2);

          console.log({
            centerPercentageX,
            centerPercentageY,
            viewPortWidth,
            viewPortHeight,
            newLeft,
            newTop,
          })

          scrollableWrapperEl?.scroll({
            // behavior: 'smooth',
            left: newLeft,
            top: newTop,
          });
        }

        setCachedSize({
          width: size?.width || 0,
          height: size?.height || 0,
        });
      }
    }


  }, [size]);
};
