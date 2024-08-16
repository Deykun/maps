
import { useRef, useEffect, useState, memo } from 'react';
// import { default as Map } from './assets/europe.svg';
import SvgMap from './SvgMap';
import MapGrid from './MapGrid';
import { render, onResize, setCoatOfArms } from './canvas/render';

import useEffectChange from '../../../hooks/useEffectChange'

import './HeraldryCanvas.scss';

type Props = {
  className?: string,
  zoomLevel?: number
  units: object[],
}

const HeraldryCanvas = ({ className, zoomLevel = 2, units }: Props) => {
  const [settings, setSettings] = useState({
    latTop: 6,
    latRate: -0.25,
    latDynamic: -0.25,
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

  useEffect(() => {
    try {
      const height = document.querySelector('canvas').getBoundingClientRect().height * 1.16;
      const y = window.gg(54.362930, height * 1.16, settings);

      const percentage = y / height * 100;


      if (!(percentage > 25 && percentage < 35)) {
        // console.log('shouldFix');
        // console.log('percentage', percentage);
        // const x = height * 0.30;
        // // console.log('y', y);
        // console.log('settings.latTop - now', settings.latTop);
        // console.log('settings.latTop - propsed', (y - x) * 100 / height);
        // const newLatTop = (y - x) * 100 / height;
        // setSettings((v) => ({
        //   ...v,
        //   latTop: newLatTop,
        // }));
      } else {
        console.log('not-fix')
      }
    } catch (err) {
      console.log(err)
    }
  }, [settings]);

  const width = Math.max(window.innerWidth, (1920 / 2) * zoomLevel);
  const aspectRatio = `${SvgMap.aspectX} / ${SvgMap.aspectY}`

  return (
    <div
      className="heraldry-canvas relative bg-[#eee]"
      style={{ width, aspectRatio }}
    >
      <SvgMap />
      <canvas ref={canvasRef} width={width} className='absolute top-0 left-0 w-full h-full' />
      <MapGrid />
      <div className="fixed top-[80px] left-2 z-20 flex flex-col gap-3">
        <span className="bg-white p-2">
          {settings.latTop}
          <br />
          <div className="flex gap-2">
            <button onClick={() => setSettings((s) => ({ ...s, latTop: s.latTop - 0.1 }))}>-</button>
            <input
              type="range"
              min="-200"
              max="200"
              defaultValue={settings.latTop}
              step="0.05"
              onChange={(e) => {
                e.preventDefault(); setSettings((s) => ({ ...s, latTop: Number(e.target.value)}))}}
            />
            <button onClick={() => setSettings((s) => ({ ...s, latTop: s.latTop + 0.1 }))}>+</button>
          </div>
        </span>
        <span className="bg-white p-2">
          {settings.latRate}
          <br />
          <div className="flex gap-2">
            <button onClick={() => setSettings((s) => ({ ...s, latT: s.latRate - 0.05}))}>-</button>
            <input
              type="range"
              min="-3"
              max="3"
              defaultValue={settings.latRate}
              step="0.05"
              onChange={(e) => {
                e.preventDefault(); setSettings((s) => ({ ...s, latRate: Number(e.target.value)}))}}
            />
            <button onClick={() => setSettings((s) => ({ ...s, latT: s.latRate - 0.05}))}>+</button>
          </div>
        </span>
        <span className="bg-white p-2">
          {settings.latDynamic}
          <br />
          <div className="flex gap-2">
            <button onClick={() => setSettings((s) => ({ ...s, latT: s.latDynamic - 0.05}))}>-</button>
            <input
              type="range"
              min="-7"
              max="7"
              defaultValue={settings.latDynamic}
              step="0.05"
              onChange={(e) => {
                e.preventDefault(); setSettings((s) => ({ ...s, latDynamic: Number(e.target.value)}))
              }}
            />
            <button onClick={() => setSettings((s) => ({ ...s, latT: s.latDynamic - 0.05}))}>+</button>
          </div>
        </span>
      </div>
    </div>
  );
}

export default memo(HeraldryCanvas)
