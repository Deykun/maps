import React, { useRef, useEffect, useState, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

// import usePrevious from '@/hooks/usePrevious';
// import IconShieldCheckers from '@/components/Icons/IconShieldCheckers';

// import { useSettingStore } from '@/topic/Heraldry/stores/settingsStore';

import { AdministrativeUnit, MapOffset } from '@/topic/Heraldry/types';
// import SvgMap from './SvgMap';
import { render, onResize, setCoatOfArms, getCoatOfArmsForXandY } from './canvas/render';

import useEffectChange from '../../../hooks/useEffectChange'

// import MapGrid from './dev/MapGrid';
// import HeraldryCanvasAligmentTools from './dev/HeraldryCanvasAligmentTools';

import './HeraldryCanvas.scss';

type Props = {
  units: AdministrativeUnit[],
  setSelected: (units: AdministrativeUnit[]) => void,
  mapOffset: MapOffset,
}

const HeraldryCanvas = ({ units, setSelected, mapOffset }: Props) => {
  const [
    settings,
    // setSettings,
  ] = useState({
    latTop: -0.448050,
    latShift: 2.7800,
    mapHeightStreech: 1.01400,
  });

  const { t } = useTranslation();

  // const prevWidth = usePrevious(width, width);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasCtxRef = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      canvasCtxRef.current = canvasRef.current.getContext('2d');
      const ctx = canvasCtxRef.current;

      if (ctx) {
        render({ canvas: canvasRef.current, ctx, mapOffset });
        onResize(settings);
      }
    }
  }, [canvasRef.current]);

  useEffect(() => {
    setCoatOfArms(units, settings);
  }, [units]);

  // useEffectChange(() => {
  //   onResize(settings);
  // }, [settings, width]);

  // const handleMapClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
  //   const x = event.nativeEvent.offsetX;
  //   const y = event.nativeEvent.offsetY;

  //   const selectedTitles = getCoatOfArmsForXandY({ x, y });

  //   const selectedUnits = units.filter(({ title }) => selectedTitles.includes(title));

  //   setSelected(selectedUnits);
  // }, []);

  // const aspectRatio = `${SvgMap.aspectX} / ${SvgMap.aspectY}`

  return (
    <div
      className="heraldry-canvas absolute top-0 left-0 size-full"
      // onClick={handleMapClick}
    >
      <canvas ref={canvasRef} className='size-full' />

    </div>
  );
}

export default memo(HeraldryCanvas)
