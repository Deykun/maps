
import { useRef, useEffect, memo } from 'react';
// import { default as Map } from './assets/europe.svg';
import SvgMap from './SvgMap';
import { render, onResize } from './canvas/render';

import useEffectChange from '../../../hooks/useEffectChange'

import './HeraldryCanvas.scss';

type Props = {
  className?: string,
  zoomLevel?: number
}

const HeraldryCanvas = ({ className, zoomLevel = 2 }: Props) => {

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasCtxRef = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      canvasCtxRef.current = canvasRef.current.getContext('2d');
      const ctx = canvasCtxRef.current;

      if (ctx) {
        render({ canvas: canvasRef.current, ctx });
      }
    }
  }, []);

  useEffectChange(() => {
    onResize();
  }, [zoomLevel])

  const width = Math.max(window.innerWidth, (1920 / 2) * zoomLevel);

  return (
    <div
      className="heraldry-canvas relative aspect-[680_/_520] bg-[#eee]"
      style={{ width }}
    >
      <SvgMap />
      <canvas ref={canvasRef} width={width} className='absolute top-0 left-0 w-full h-full' />
    </div>
  );
}

export default memo(HeraldryCanvas)
