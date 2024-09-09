import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import {
  showUnitOnMap,
} from '@/topic/Heraldry/stores/cursorStore';

import IconMarker from '@/components/Icons/IconMarker';
import IconPlusMagnifyingGlass from '@/components/Icons/IconPlusMagnifyingGlass';
import IconLink from '@/components/Icons/IconLink';

import { AdministrativeUnit } from '@/topic/Heraldry/types';
import { colorsMarkersByNames } from '@/topic/Heraldry/constants';

type Props = {
  className?: string,
  unit: AdministrativeUnit,
  setPreviewUnit: (unit: AdministrativeUnit) => void,
}

const UnitsPaneItem = ( { className, unit, setPreviewUnit }: Props) => {
  const { title, url, imagesList, imageSrcSet, place, markers, colors } = unit;  
  
  const { t } = useTranslation();

  const markersList = [
    ...(markers?.animals || []).map((v) => t(`heraldry.animal.${v}`)),
    ...(markers?.items || []).map((v) => t(`heraldry.item.${v}`)),
  ];

  return (
    <li className={clsx('flex gap-2 items-center', { [className || '']: className })}>
      <span className="relative size-[70px] md:size-20 flex-shrink-0">
        <img
          src={imagesList?.[0].path}
          srcSet={imageSrcSet}
          className="size-[70px] md:size-20 object-contain p-2 rounded-t-[4px] rounded-b-[30px] bg-white border"
          alt=""
          loading="lazy"
        />
        <div className="absolute bottom-0 right-0 translate-y-[50%] md:translate-y-[25%] flex gap-1">
          <button
            className="bg-white p-1 rounded-full shadow-md"
            onClick={() => showUnitOnMap(unit.id)}
          >
            <IconMarker className="size-4" />
          </button>
          <button
            className="bg-white p-1 rounded-full shadow-md"
            onClick={() => setPreviewUnit(unit)}
          >
            <IconPlusMagnifyingGlass className="size-4" />
          </button>
        </div>

      </span>
      <span>
        <a href={url} target="_blank" className="text-[14px] font-[500] tracking-wide line-clamp-2 text-[#312f2f] hover:text-black duration-300">
          <span>{title}</span>
          {' '}
          <IconLink className="inline-block size-3" /> 
        </a>
        {markersList.length > 0 && <p className="sans mt-[2px] text-[10px] tracking-wider opacity-70">{markersList.join(', ')}</p>}
        <p className={clsx('sans mt-[2px] text-[10px] tracking-wider line-clamp-1', {
          'opacity-70': className,
          'text-[#ca1a1a]': !place?.name
        })}>
          {' '}
          {place?.name || t('heraldry.item.noLocation')}
        </p>
        <div className="mt-1 empty:hidden flex gap-1 hidden">
          {Object.entries(colors?.byNames || {}).map(([colorName, colors = []]) => {
            const title = [
              colors.sort((a, b) => a.distance - b.distance)?.[0]?.distance?.toFixed(1),
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
      </span>
    </li>
  );
};

export default UnitsPaneItem;
