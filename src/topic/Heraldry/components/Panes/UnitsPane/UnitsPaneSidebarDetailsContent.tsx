import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { CoatOfArmsMapData } from '@/topic/Heraldry/types';
import { colorsMarkersByNames } from '@/topic/Heraldry/constants';

import { getImageSrcSet } from '@/utils/image';

import {
  showUnitOnMap,
} from '@/topic/Heraldry/stores/cursorStore';


import IconBook from '@/components/Icons/IconBook';
import IconMarker from '@/components/Icons/IconMarker';
import IconMinusMagnifyingGlass from '@/components/Icons/IconMinusMagnifyingGlass';
import IconLink from '@/components/Icons/IconLink';
import IconWikipedia from '@/components/Icons/IconWikipedia'
import IconUndo from '@/components/Icons/IconUndo';


import Panel from '@/components/NewUI/Panel';
import ButtonIcon from '@/components/NewUI/ButtonIcon';
import ButtonText from '@/components/NewUI/ButtonText';

import ButtonCircle from '@/components/UI/ButtonCircle';

import DevelopmentActions from '@/topic/Heraldry/components/DevelopmentActions/DevelopmentActions';

import UnitsPaneItemDetailsFromDevelopmentMode from './UnitsPaneItemDetailsFromDevelopmentMode';
import UnitsPaneUnitMarkers from './UnitsPaneUnitMarkers';
import UnitsPaneUnitColors from './UnitsPaneUnitColors';

type Props = {
  className?: string,
  unit: CoatOfArmsMapData,
  setDetailsUnit: (unit: CoatOfArmsMapData | undefined) => void,
}

const UnitsPaneSidebarDetailsContent = ( { className, unit, setDetailsUnit }: Props) => {
  const { title, url, imagesList, place, markers, colors } = unit;
  
  const { t } = useTranslation();

  const markersList = [];

  // const markersList = [
  //   ...(markers?.animals || []).map((v) => t(`heraldry.animal.${v}`)),
  //   ...(markers?.items || []).map((v) => t(`heraldry.item.${v}`)),
  // ];

  return (
    <>
      <div className="flex justify-between items-center">
        <ButtonText
          onClick={() => setDetailsUnit(undefined)}
        >
          <IconUndo />
          <span>{t('heraldry.list.title')}</span>
        </ButtonText>

        <span className="text-ui-dark-contrast text-[10px] pr-2">
          id: {unit.id}
        </span>
      </div>
      <Panel className="ui-panel--rounded-l ui-panel--rounded-r">
        <span className="relative block size-full aspect-square mb-2">
          <img
            src={imagesList?.[0].path}
            srcSet={getImageSrcSet(imagesList)}
            className="size-full object-contain p-2 rounded-[8px] bg-white"
            alt=""
          />      
          <div className="absolute bottom-0 right-0 translate-y-[50%]  flex gap-2">
            <DevelopmentActions
              unit={unit}
              buttonSize="small"
              labelPositions="top"
            />
          </div>
        </span>
        <h3 className="w-full px-2 text-center text-[18px] font-[500] tracking-wide text-white duration-300">
          {title}
        </h3>
      </Panel>
      <div className="text-center">
        <ButtonText
          size="small"
          href={url}
          target="_blank"
        >
          <IconBook />
          <span>Wikipedia</span>
        </ButtonText>
        <ButtonText
          size="small"
          onClick={() => showUnitOnMap(unit.id)}
        >
          <IconMarker />
          <span>{t('heraldry.item.showOnMap')}</span>
        </ButtonText>
      </div>
      <Panel className="ui-panel--rounded-l ui-panel--rounded-r">
        <p className="text-[12px] text-center">
          {place?.name || t('heraldry.item.noLocation')}
        </p>
      </Panel>
      <UnitsPaneUnitMarkers id={unit.id} country={unit.lang} />
      <UnitsPaneItemDetailsFromDevelopmentMode id={unit.id} country={unit.lang} />
      <UnitsPaneUnitColors id={unit.id} country={unit.lang} />
        {/* <div className="mt-2 empty:hidden flex gap-1 justify-center">
          {Object.entries(colors?.byNames || {}).map(([colorName, colors = []]) => {
            const title = [
              `${colors.sort((a, b) => a.distance - b.distance)?.[0]?.distance?.toFixed(1)} p.`,
              t(`heraldry.color.${colorName}`),
            ].filter(Boolean).join(' - ');

            return (
              <span
                key={colorName}
                className="inline-flex mr-1 size-3 rounded-[3px] bg-[#eee] shadow-sm group overflow-hidden"
                title={title} 
                style={{ backgroundColor: colorsMarkersByNames[colorName] }}
            >
              {colors.map((item) => <span
                key={item.color}
                className="color size-full opacity-0 group-hover:opacity-100 duration-300"
                style={{ backgroundColor: item.color }}
              />)}
            </span>
            )
        })}
      </div> */}
      <div className="hidden">
        <p className="my-2">
          <span className="text-[12px]">Rejected:</span>
          {Object.entries(colors?.byNamesRejected || {}).map(([colorName, colors = []]) => {
            const bestMatch = colors.sort((a, b) => a.distanceToTreshold - b.distanceToTreshold)?.[0];

            return (
              <span
                key={colorName}
                className="inline-flex mx-1 size-4 rounded-md bg-[#eee] group overflow-hidden"
                title={`${colorName} ${bestMatch?.distanceToTreshold}`} 
                style={{ backgroundColor: colorsMarkersByNames[colorName], border: `2px solid ${bestMatch.matcherColor}` }}
              >
                {colors.map((item) => <span key={item.color} className="color size-full opacity-0 group-hover:opacity-100 duration-300" style={{ backgroundColor: item.color }} />)}
              </span>
            );
          })}
        </p>
        <p className="my-2">
          {(colors?.hexPalette || []).map((hexColor) => {
            return (
              <span key={hexColor} className="inline-flex size-4" style={{ backgroundColor: hexColor }} />
            );
          })}
        </p>
      </div>
    </>
  );
};

export default UnitsPaneSidebarDetailsContent;
