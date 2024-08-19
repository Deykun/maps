import React, { useRef, useEffect, useState, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import usePrevious from '@/hooks/usePrevious';
import IconShieldCheckers from '@/components/Icons/IconShieldCheckers';



import { useSettingStore } from '@/topic/Heraldry/stores/settingsStore';

import { AdministrativeUnit } from '@/topic/Heraldry/types';
import SvgMap from './SvgMap';
import { render, onResize, setCoatOfArms, getCoatOfArmsForXandY } from './canvas/render';

import useEffectChange from '../../../hooks/useEffectChange'

// import MapGrid from './dev/MapGrid';
// import HeraldryCanvasAligmentTools from './dev/HeraldryCanvasAligmentTools';

import './HeraldryCanvas.scss';

type Props = {
  width: number,
  units: AdministrativeUnit[],
  setSelected: (units: AdministrativeUnit[]) => void,
}

const HeraldryCanvas = ({ width, units, setSelected }: Props) => {
  const [
    settings,
    // setSettings,
  ] = useState({
    latTop: -0.448050,
    latShift: 2.7800,
    mapHeightStreech: 1.01400,
  });

  const { t } = useTranslation();

  const prevWidth = usePrevious(width, width);

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
  }, [canvasRef.current]);

  useEffect(() => {
    setCoatOfArms(units, settings);
  }, [units]);

  useEffectChange(() => {
    onResize(settings);
  }, [settings, width]);

  // 
  const handleMapClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    const x = event.nativeEvent.offsetX;
    const y = event.nativeEvent.offsetY;

    const selectedTitles = getCoatOfArmsForXandY({ x, y });

    const selectedUnits = units.filter(({ title }) => selectedTitles.includes(title));

    setSelected(selectedUnits);
  }, []);

  const aspectRatio = `${SvgMap.aspectX} / ${SvgMap.aspectY}`

  return (
    <div
      className="heraldry-canvas relative bg-[#f7f7f7]"
      style={{ width, aspectRatio }}
      onClick={handleMapClick}
    >
      <header className="map-intro text-right">
        <p>
          {t('heraldry.mapFooterSource')}
          {' '}          
          <a href="https://www.wikipedia.org/" className="font-bold tracking-wide" target="_blank" rel="nofollow noopener">wikipedia.org</a>.
        </p>
        <br />
        <p>{t('heraldry.list.footer')}</p>
        <h3 className="map-title">
          <a
            href="https://github.com/Deykun/maps"
            target="_blank"
          >
            github.com/deykun/maps
          </a>
        </h3>
        <br />
        <div className="flex justify-end items-center">
          <IconShieldCheckers className="size-[0.3cqi] fill-[#8ab300] mr-2" />
          <p><strong className="font-bold">{units.length}</strong> coat of arms.</p>
        </div>
      </header>
      <SvgMap />
      <canvas ref={canvasRef} width={width} className='absolute top-0 left-0 w-full h-full' />
      <div id="europe-marker" className="absolute z-20 bg-[red] pointer-events-none" style={{
        top: '19%',
        right: '35%',
        width: '28%',
        height: '28%',
        borderRadius: '30px',
        // opacity: 0.2,
        opacity: 0,
      }} />
      {/* <MapGrid /> */}
      {/* <HeraldryCanvasAligmentTools setSettings={setSettings} settings={settings} /> */}
    </div>
  );
}

export default memo(HeraldryCanvas)
