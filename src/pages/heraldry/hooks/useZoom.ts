import { useEffect, useLayoutEffect, useState } from 'react';
import SvgMap from '../components/SvgMap';
import { debounce } from '@/utils/time';
import { useSettingStore, zoomUnitInPx, zoomIn, zoomOut } from '@/topic/Heraldry/stores/settingsStore';

const getWidthForZoom = (zoomLevel: number) => Math.max(window.innerWidth, zoomUnitInPx * zoomLevel);

export default function useZoom(ref: React.MutableRefObject<HTMLInputElement>) {
  const zoomLevel = useSettingStore(state => state.zoomLevel);
  const zoomCenterX = useSettingStore(state => state.zoomCenterX);
  const zoomCenterY = useSettingStore(state => state.zoomCenterY);
  const [width, setWidth] = useState(getWidthForZoom(zoomLevel))

  useEffect(() => {
    const handleScroll = debounce(50, (event: WheelEvent) => {
      event.preventDefault();

      const poinerLocation = {
        x: event.clientX,
        y: event.clientY,
      };

      if (event.deltaY < 0) {
        zoomIn(poinerLocation);
      } else {
        zoomOut(poinerLocation);
      }
    });

    const handleScrollEnd = () => {
      document.getElementById('europe-marker')?.scrollIntoView({
        // behavior: 'smooth', 
        block: 'nearest',
        inline: 'nearest',
      });
    };
    
    if (ref.current) {
      ref.current.addEventListener('wheel', handleScroll, { passive: true });
      ref.current.addEventListener('scrollend', handleScrollEnd);

      document.getElementById('europe-marker')?.scrollIntoView({
        block: 'center',
        inline: 'center',
      });
    }

    return () => {
      if (ref.current) {
        ref.current.removeEventListener('wheel', handleScroll);
        ref.current.removeEventListener('scrollend', handleScrollEnd);
      }
    };
  }, [ref.current]);

  useLayoutEffect(() => {
    if (ref.current) {
      const scrollTop = ref.current?.scrollTop || 0;
      const scrollLeft = ref.current?.scrollLeft || 0;
      const viewPortWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      const viewPortHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
      const height = width * (SvgMap.aspectX / SvgMap.aspectY);

      const centerX = zoomCenterX ? (scrollLeft + zoomCenterX) : (scrollLeft + (viewPortWidth / 2));
      const centerY = zoomCenterY ? (scrollTop + zoomCenterY) : (scrollTop + (viewPortHeight / 2));
      const centerPercentageX = centerX / width;
      const centerPercentageY = centerY / height;

      const newWidth = getWidthForZoom(zoomLevel);
      const newHeight = newWidth * (SvgMap.aspectX / SvgMap.aspectY);

      const newLeft = centerPercentageX * newWidth - (viewPortWidth / 2);
      const newTop = centerPercentageY * newHeight - (viewPortHeight / 2);

      ref.current?.scroll({
        // behavior: 'smooth',
        left: newLeft,
        top: newTop,
      });

      setWidth(newWidth);   
    }
  }, [zoomLevel, ref.current]);

  return width;
}
