import React, { useRef, useEffect, useState, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

// import usePrevious from '@/hooks/usePrevious';
// import IconShieldCheckers from '@/components/Icons/IconShieldCheckers';

// import { useSettingStore } from '@/topic/Heraldry/stores/settingsStore';

import { AdministrativeUnit, MapOffset } from '@/topic/Heraldry/types';
// import SvgMap from './SvgMap';
import { mapPadding } from '@/topic/Heraldry/constants'
import { render, onResize, setCoatOfArms, getCoatOfArmsForXandY, setCoatSize } from './canvas/render';

import useDebouncedResizeObserver from '@/hooks/useDebouncedResizeObserver'
import useEffectChange from '@/hooks/useEffectChange'

// import MapGrid from './dev/MapGrid';
// import HeraldryCanvasAligmentTools from './dev/HeraldryCanvasAligmentTools';

import './HeraldryCanvas.scss';

type Props = {
  units: AdministrativeUnit[],
  setSelected: (units: AdministrativeUnit[]) => void,
  children: React.ReactNode,
  mapOffset: MapOffset,
  coatSize: number,
}

const HeraldryCanvas = ({ units, setSelected, children, mapOffset, coatSize }: Props) => {
  const [dpi, setDpi] = useState(window.devicePixelRatio)
  const [
    settings,
    // setSettings,
  ] = useState({
    latTop: -0.448050,
    latShift: 2.7800,
    mapHeightStreech: 1.01400,
  });

  const { t } = useTranslation();

  const { ref: wrapperRef, dimensions } = useDebouncedResizeObserver<HTMLDivElement>(10);

  // const prevWidth = usePrevious(width, width);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasCtxRef = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      canvasCtxRef.current = canvasRef.current.getContext('2d');
      const ctx = canvasCtxRef.current;

      if (ctx) {
        render({ canvas: canvasRef.current, ctx, mapOffset });
        onResize(settings, mapOffset);
      }
    }
  }, [canvasRef.current]);

  useEffect(() => {
    setCoatOfArms(units, settings);
  }, [units]);

  useEffectChange(() => {
    onResize(settings, mapOffset);
  }, [settings, dimensions?.width]);

  useEffectChange(() => {
    setDpi(window.devicePixelRatio);
    setCoatSize(coatSize);
  }, [coatSize]);
children
  // const handleMapClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
  //   const x = event.nativeEvent.offsetX;
  //   const y = event.nativeEvent.offsetY;

  //   const selectedTitles = getCoatOfArmsForXandY({ x, y });

  //   const selectedUnits = units.filter(({ title }) => selectedTitles.includes(title));

  //   setSelected(selectedUnits);
  // }, []);

  return (
    <div
      ref={wrapperRef}
      className="heraldry-canvas absolute top-0 left-0 size-full"
      // onClick={handleMapClick}
      style={{ padding: mapPadding }}
    >
      {children}
      <canvas ref={canvasRef} className="absolute top-0 left-0 size-full pointer-events-none" />
    </div>
  );
}

export default memo(HeraldryCanvas)
