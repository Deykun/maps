import React, { useRef, useEffect, useState, memo, useCallback } from 'react';
import clsx from 'clsx';

import {
  setLastClick,
  useCursorStore,
} from '@/topic/Heraldry/stores/cursorStore';

import { mergeRefs } from '@/utils/ref';

import { CoatOfArmsMapData, MapOffset } from '@/topic/Heraldry/types';
import { mapPadding, maxSelectedWithClick } from '@/topic/Heraldry/constants'
import { getXYfromLatLon } from '@/topic/Heraldry/utils/getPosition';

import { render, onResize, setCoatOfArms, getCoatOfArmsForXandY, setCoatSize } from './canvas/render';

import useDebouncedResizeObserver from '@/hooks/useDebouncedResizeObserver'
import useEffectChange from '@/hooks/useEffectChange'

import useHeraldryCursorPosition from '@/topic/Heraldry/components/HeraldryCursor/useHeraldryCursorPosition';
import HeraldryCursor from '@/topic/Heraldry/components/HeraldryCursor/HeraldryCursor';
import HeraldryCursorLastPoint from '@/topic/Heraldry/components/HeraldryCursor/HeraldryCursorLastPoint';

import useKeepPositionAfterResize from './useKeepPositionAfterResize';

import './HeraldryMapHTMLCanvas.scss';

type Props = {
  className?: string,
  units: CoatOfArmsMapData[],
  children: React.ReactNode,
  mapOffset: MapOffset,
  coatSize: number,
  setListPhrase: (phrase: string) => void,
}

const HeraldryMapHTMLCanvas = ({ className, units, children, mapOffset, coatSize, setListPhrase }: Props) => {
  const idToShow = useCursorStore((state) => state.idToShow);
  const [hovered, setHovered] = useState<CoatOfArmsMapData[]>([]);

  const { ref: wrapperRef, dimensions } = useDebouncedResizeObserver<HTMLDivElement>(10);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasCtxRef = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      canvasCtxRef.current = canvasRef.current.getContext('2d');
      const ctx = canvasCtxRef.current;

      if (ctx) {
        render({ canvas: canvasRef.current, ctx, coatSize, mapOffset });
      }
    }
  }, [canvasRef.current]);

  useEffect(() => {
    setCoatOfArms(units);
    setLastClick(undefined);
  }, [units]);

  useEffectChange(() => {
    onResize(mapOffset);
    setLastClick(undefined);
  }, [dimensions?.width]);

  useKeepPositionAfterResize(dimensions);

  useEffectChange(() => {
    setCoatSize(coatSize);
  }, [coatSize]);

  const {
    isHovering,
    position,
    elementRef,
  } = useHeraldryCursorPosition();

  useEffectChange(() => {
    /* 
      We have a 1200x1200 canvas that is scaled down to 100% x 100% (to ensure the canvas image looks good when the desktop is scaled).
      
      This code transforms the clicked point (x and y) to the corresponding point on the canvas.
    */

    let canvasX = position.x;
    let canvasY = position.y;

    const boxSize = canvasRef.current?.getClientRects()[0];

    const shouldScalePosition = typeof boxSize?.width === 'number'
      && typeof canvasRef.current?.width=== 'number'
      && Math.round(boxSize.width) !== Math.round(canvasRef.current.width);

    if (shouldScalePosition) {
      canvasX = (canvasX / boxSize.width) * (canvasRef?.current?.width || 1);
      canvasY = (canvasY / boxSize.height) * (canvasRef?.current?.height || 1);
    }

    const selectedIds = getCoatOfArmsForXandY({
      x: canvasX,
      y: canvasY,
    });

    const selectedUnits = units.filter(({ id }) => selectedIds.includes(id));

    setHovered(selectedUnits.reverse());
  }, [position]);

  const handleMapClick = useCallback((event: React.MouseEvent) => {
    if (hovered.length > 0) {
      if (hovered.length <= maxSelectedWithClick) {
        const phrase = hovered.map(({ id }) => `id:${id}`).join(', ');

        setListPhrase(phrase);
      } else {
        setListPhrase('');
      }

      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
  
        setLastClick({
          x,
          y,
          hovered: hovered,
        });
      }


    } else {
      setLastClick(undefined);
    }
  }, [hovered]);

  useEffect(() => {
    if (idToShow) {
      const unit = units.find(({ id }) => id === idToShow);

      if (unit && canvasRef.current) {
        if (typeof unit?.place?.coordinates?.lon === 'number' && typeof unit?.place?.coordinates?.lat === 'number') {
          const position = getXYfromLatLon({
            cordinates: {
              lonX: unit.place.coordinates.lon,
              latY: unit.place.coordinates.lat,
            },
            mapOffset,
            pixelRatio: 1,
            canvas: canvasRef.current.getClientRects()[0],
          });
          
          setLastClick({
            x: position.x,
            y: position.y,
            hovered: [unit],
          });

          setTimeout(() => {
            document.getElementById('heraldry-cursor-last-point')?.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
              inline: 'center',
            });
          })
        }
      }
    }
  }, [idToShow])

  return (
    <>
      <div
        ref={mergeRefs(wrapperRef, elementRef)}
        className={clsx('heraldry-map-canvas mx-auto cursor-none', className)}
        onClick={handleMapClick}
        style={{ padding: mapPadding }}
      >
        {children}
        <canvas ref={canvasRef} className="absolute top-0 left-0 size-full pointer-events-none" />
      </div>
      <HeraldryCursorLastPoint />
      <HeraldryCursor top={position.y} left={position.x} isHovering={isHovering} hovered={hovered} />
    </>
  );
}

export default memo(HeraldryMapHTMLCanvas);
