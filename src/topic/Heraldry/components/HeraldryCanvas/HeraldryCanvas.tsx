import React, { useRef, useEffect, useState, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

// import usePrevious from '@/hooks/usePrevious';
// import IconShieldCheckers from '@/components/Icons/IconShieldCheckers';

// import { useSettingStore } from '@/topic/Heraldry/stores/settingsStore';

import {
  setLastClick,
  showUnitOnMap,
  useCursorStore,
} from '@/topic/Heraldry/stores/cursorStore';

import { mergeRefs } from '@/utils/ref';

import { AdministrativeUnit, MapOffset } from '@/topic/Heraldry/types';
// import SvgMap from './SvgMap';
import { mapPadding } from '@/topic/Heraldry/constants'
import { render, onResize, setCoatOfArms, getCoatOfArmsForXandY, setCoatSize } from './canvas/render';

import useDebouncedResizeObserver from '@/hooks/useDebouncedResizeObserver'
import useEffectChange from '@/hooks/useEffectChange'


import useHeraldryCursorPosition from '@/topic/Heraldry/components/HeraldryCursor/useHeraldryCursorPosition';
import HeraldryCursor from '@/topic/Heraldry/components/HeraldryCursor/HeraldryCursor';
import HeraldryCursorLastPoint from '@/topic/Heraldry/components/HeraldryCursor/HeraldryCursorLastPoint';

// import MapGrid from './dev/MapGrid';
// import HeraldryCanvasAligmentTools from './dev/HeraldryCanvasAligmentTools';

import './HeraldryCanvas.scss';

type Props = {
  units: AdministrativeUnit[],
  children: React.ReactNode,
  mapOffset: MapOffset,
  coatSize: number,
  setListPhrase: (title: string) => void,
}

const HeraldryCanvas = ({ units, children, mapOffset, coatSize, setListPhrase }: Props) => {
  const idToShow = useCursorStore((state) => state.idToShow);
  const [hovered, setHovered] = useState<AdministrativeUnit[]>([]);
  // const [lastClick, setLastClick] = useState<undefined | {
  //   x: number,
  //   y: number,
  //   hovered: AdministrativeUnit[],
  // }>(undefined);

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
    setLastClick(undefined);
  }, [units]);

  useEffectChange(() => {
    onResize(settings, mapOffset);
    setLastClick(undefined);
  }, [settings, dimensions?.width]);

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

    const selectedTitles = getCoatOfArmsForXandY({
      x: canvasX,
      y: canvasY,
    });

    const selectedUnits = units.filter(({ title }) => selectedTitles.includes(title));

    setHovered(selectedUnits);
  }, [position]);

  const handleMapClick = useCallback(() => {
    if (hovered.length > 0 && hovered.length < 40) {
      setListPhrase(hovered.map(({ id }) => `id:${id}`).join(', '));
      setLastClick({
        x: position.x,
        y: position.y,
        hovered: hovered,
      });
    } else {
      setLastClick(undefined);
    }
  }, [hovered]);

  useEffect(() => {
    console.log('idToShow', idToShow);
    if (idToShow) {
      const unit = units.find(({ id }) => id === idToShow);

      if (unit && canvasRef.current) {
        if (typeof unit?.place?.coordinates?.lon === 'number' && typeof unit?.place?.coordinates?.lat === 'number') {
          const {
            minLatTop,
            maxLatTop,
            minLonLeft,
            maxLonLeft,
          } = mapOffset;
  
          const widthLon = Math.abs(minLonLeft - maxLonLeft);
          const heightLat = Math.abs(minLatTop - maxLatTop);
          
          const percentageX = (unit.place.coordinates.lon - minLonLeft) / widthLon;
          const percentageY = (maxLatTop - unit.place.coordinates.lat) / heightLat;

          const canvas = canvasRef.current.getClientRects()[0];

          const position = {
            x: canvas.left * percentageX + mapPadding,
            y: canvas.top * percentageY + mapPadding,
          }
          
          setLastClick({
            x: position.x,
            y: position.y,
            hovered: [unit],
          });

          document.getElementById('heraldry-cursor-last-position')?.focus();
        }
      }
    }
  }, [idToShow])

  return (
    <>
      <div
        ref={mergeRefs(wrapperRef, elementRef)}
        className="heraldry-canvas absolute top-0 left-0 size-full cursor-none"
        onClick={handleMapClick}
        // onMouseOver={handleMouseOver}
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

export default memo(HeraldryCanvas);
