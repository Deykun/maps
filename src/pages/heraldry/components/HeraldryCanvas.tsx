
import React, { useRef, useEffect, useState, memo, useCallback } from 'react';
import { AdministrativeUnit } from '../../../topic/Heraldry/types';
import SvgMap from './SvgMap';
import { render, onResize, setCoatOfArms, getCoatOfArmsForXandY } from './canvas/render';

import useEffectChange from '../../../hooks/useEffectChange'

// import MapGrid from './dev/MapGrid';
// import HeraldryCanvasAligmentTools from './dev/HeraldryCanvasAligmentTools';

import { zoomUnitInPx } from './constants';

import './HeraldryCanvas.scss';

type Props = {
  zoomLevel?: number
  units: AdministrativeUnit[],
  setSelected: (units: AdministrativeUnit[]) => void,
}

const HeraldryCanvas = ({ zoomLevel = 2, units, setSelected }: Props) => {
  const [
    settings,
    // setSettings,
  ] = useState({
    latTop: -0.448050,
    latShift: 2.7800,
    mapHeightStreech: 1.01400,
  });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasCtxRef = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      canvasCtxRef.current = canvasRef.current.getContext('2d');
      const ctx = canvasCtxRef.current;

      if (ctx) {
        render({ canvas: canvasRef.current, ctx, aspectX: SvgMap.aspectX, aspectY: SvgMap.aspectY });
        onResize(settings);
      }
    }
  }, []);

  useEffect(() => {
    setCoatOfArms(units, settings);
  }, [units]);

  useEffectChange(() => {
    onResize(settings);
  }, [settings, zoomLevel]);

  // 
  const handleMapClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    const x = event.nativeEvent.offsetX;
    const y = event.nativeEvent.offsetY;

    const selectedTitles = getCoatOfArmsForXandY({ x, y });

    const selectedUnits = units.filter(({ title }) => selectedTitles.includes(title));

    setSelected(selectedUnits);
  }, []);

  const width = Math.max(window.innerWidth, zoomUnitInPx * zoomLevel);
  const aspectRatio = `${SvgMap.aspectX} / ${SvgMap.aspectY}`

  return (
    <div
      className="heraldry-canvas relative bg-[#f7f7f7]"
      style={{ width, aspectRatio }}
      onClick={handleMapClick}
    >
      <header className="map-intro">
        <h1 className="map-title">Heraldic Map of Europe</h1>
        <p><strong className="font-bold">{units.length}</strong> coat of arms.</p>
      </header>
      <SvgMap />
      <canvas ref={canvasRef} width={width} className='absolute top-0 left-0 w-full h-full' />
      <div id="europe-marker" className="absolute z-20 pointer-events-none" style={{
        top: '17%',
        right: '30%',
        width: '30%',
        height: '30%',
      }} />
      {/* <MapGrid /> */}
      {/* <HeraldryCanvasAligmentTools setSettings={setSettings} settings={settings} /> */}
    </div>
  );
}

export default memo(HeraldryCanvas)
