import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { AdministrativeUnit } from '@/topic/Heraldry/types';
import { colorsMarkersByNames } from '@/topic/Heraldry/constants';

import IconMarker from '@/components/Icons/IconMarker';
import IconPlusMagnifyingGlass from '@/components/Icons/IconPlusMagnifyingGlass';
import IconLink from '@/components/Icons/IconLink';

type Props = {
  className?: string,
  unit: AdministrativeUnit,
  setPreviewUnit: (unit: AdministrativeUnit) => void,
}

const UnitsPaneItemDetails = ( { className, unit, setPreviewUnit }: Props) => {
  const { id, title, url, imagesList, imageSrcSet, place, markers, colors } = unit;  
  
  const { t } = useTranslation();

  const markersList = [
    ...(markers?.animals || []).map((v) => t(`heraldry.animal.${v}`)),
    ...(markers?.items || []).map((v) => t(`heraldry.item.${v}`)),
  ];

  const focusCoat = () => {
    document.getElementById(`coat-${id}`)?.focus();
  }

  return (
    <li className={clsx('flex gap-2 items-center', { [className || '']: className })}>
      <span className="relative size-10 md:size-20 flex-shrink-0">
        <img
          src={imagesList?.[0].path}
          srcSet={imageSrcSet}
          className="size-10 md:size-20 object-contain p-2 rounded-t-[4px] rounded-b-[30px] bg-white border"
          alt=""
          loading="lazy"
        />      
        <div className="absolute bottom-0 right-0 translate-y-[50%] md:translate-y-0 flex gap-1">
          <button
            className="bg-white p-1 rounded-full shadow-md"
            onClick={focusCoat}
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
        <div className="mt-1 empty:hidden flex gap-1">
          {Object.entries(colors?.byNames || {}).map(([colorName, colors = []]) => {
            const title = [
              colors.sort((a, b) => a.distance - b.distance)?.[0]?.distance?.toFixed(1),
              t(`heraldry.color.${colorName}`),
            ].filter(Boolean).join(' - ');

            return (
              <span
              className="inline-flex mr-1 size-3 rounded-[3px] bg-[#eee] shadow-sm group overflow-hidden"
              title={title} 
              style={{ backgroundColor: colorsMarkersByNames[colorName] }}
            >
              {colors.map((item) => <span
                className="color size-full opacity-0 group-hover:opacity-100 duration-300"
                style={{ backgroundColor: item.color }}
              />)}
            </span>
            )
          })}
        </div>
        <div className="hidden">
          <p className="my-2">
            {Object.entries(colors?.byNamesRejected || {}).map(([colorName, colors = []]) => 
              <span
                className="inline-flex mx-1 size-4 rounded-md bg-[#eee] group overflow-hidden"
                title={`${colorName} ${colors.sort((a, b) => a.distance - b.distance)?.[0]?.distance}`} 
                style={{ backgroundColor: colorsMarkersByNames[colorName] }}
              >
                {colors.map((item) => <span className="color size-full opacity-0 group-hover:opacity-100 duration-300" style={{ backgroundColor: item.color }} />)}
              </span>
            )}
          </p>
          <p className="my-2">
            {(colors?.hexPalette || []).map((hexColor) => {
              return (
                <span className="inline-flex size-4" style={{ backgroundColor: hexColor }}>
                  ?
                </span>
              );
            })}
          </p>
        </div>
      </span>
    </li>
  );
};

export default UnitsPaneItemDetails;
