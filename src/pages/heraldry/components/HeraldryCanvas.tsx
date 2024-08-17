
import { useRef, useEffect, useState, memo } from 'react';
import SvgMap from './SvgMap';

import { render, onResize, setCoatOfArms } from './canvas/render';

import useEffectChange from '../../../hooks/useEffectChange'

// import MapGrid from './dev/MapGrid';
// import HeraldryCanvasAligmentTools from './dev/HeraldryCanvasAligmentTools';

import { zoomUnitInPx } from './constants';

import './HeraldryCanvas.scss';

type Props = {
  zoomLevel?: number
  units: object[],
}

const HeraldryCanvas = ({ zoomLevel = 2, units }: Props) => {
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
      }
    }
  }, []);

  useEffect(() => {
    setCoatOfArms(units);
  }, [units]);



  useEffectChange(() => {
    onResize(settings);
  }, [settings, zoomLevel]);

  const width = Math.max(window.innerWidth, zoomUnitInPx * zoomLevel);
  const aspectRatio = `${SvgMap.aspectX} / ${SvgMap.aspectY}`

  return (
    <div
      className="heraldry-canvas relative bg-[#eee]"
      style={{ width, aspectRatio }}
    >
      <SvgMap />
      <canvas ref={canvasRef} width={width} className='absolute top-0 left-0 w-full h-full' />
      {/* <MapGrid /> */}
      {/* <HeraldryCanvasAligmentTools setSettings={setSettings} settings={settings} /> */}
    </div>
  );
}

export default memo(HeraldryCanvas)
