import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { AdministrativeUnit } from '@/topic/Heraldry/types';
import { colorsMarkersByNames } from '@/topic/Heraldry/constants';

import {
  showUnitOnMap,
} from '@/topic/Heraldry/stores/cursorStore';

import IconMarker from '@/components/Icons/IconMarker';
import IconMinusMagnifyingGlass from '@/components/Icons/IconMinusMagnifyingGlass';
import IconLink from '@/components/Icons/IconLink';

type Props = {
  className?: string,
  unit: AdministrativeUnit,
  setPreviewUnit: (unit?: AdministrativeUnit) => void,
}

const UnitsPaneItemDetails = ( { className, unit, setPreviewUnit }: Props) => {
  const { id, title, url, imagesList, imageSrcSet, place, markers, colors } = unit;  
  
  const { t } = useTranslation();

  const markersList = [
    ...(markers?.animals || []).map((v) => t(`heraldry.animal.${v}`)),
    ...(markers?.items || []).map((v) => t(`heraldry.item.${v}`)),
  ];

  return (
    <li className={clsx('flex flex-col gap-2 items-center', { [className || '']: className })}>
      <span className="relative size-full flex-shrink-0">
        <img
          src={imagesList?.[0].path}
          srcSet={imageSrcSet}
          className="size-full object-contain p-2 rounded-t-[4px] rounded-b-[30px] bg-white border"
          alt=""
          loading="lazy"
        />      
        <div className="absolute bottom-0 right-0 translate-y-[50%] md:translate-y-0 flex gap-1">
          <button
            className="bg-white p-1 rounded-full shadow-md"
            onClick={() => showUnitOnMap(unit.id)}
          >
            <IconMarker className="size-4" />
          </button>
          <button
            className="bg-white p-1 rounded-full shadow-md"
            onClick={() => setPreviewUnit(undefined)}
          >
            <IconMinusMagnifyingGlass className="size-4" />
          </button>
        </div>
      </span>
      <div className="w-full px-2 text-center">
        <a href={url} target="_blank" className="text-[18px] font-[500] tracking-wide text-[#312f2f] hover:text-black duration-300">
          <span>{title}</span>
          {' '}
          <IconLink className="inline-block size-3" /> 
        </a>
        {markersList.length > 0 && <p className="sans mt-[2px] text-[12px] tracking-wider opacity-70">{markersList.join(', ')}</p>}
        <p className={clsx('sans mt-[2px] text-[12px] tracking-wider line-clamp-2 opacity-70')}>
          {' '}
          {place?.name || t('heraldry.item.noLocation')}
        </p>
        <div className="mt-2 empty:hidden flex gap-1 justify-center">
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
        </div>
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
      </div>
    </li>
  );
};

export default UnitsPaneItemDetails;
