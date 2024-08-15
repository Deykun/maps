import { useRef, useEffect, memo } from 'react';
import { render } from './canvas/render';

type Props = {
  className?: string,
}

const HeraldryCanvas = ({ className }: Props) => {
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

  return (
      <canvas ref={canvasRef} className={className} />
  );
}

export default memo(HeraldryCanvas)
