import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import {
  showUnitOnMap,
} from '@/topic/Heraldry/stores/cursorStore';

import ButtonCircle from '@/components/UI/ButtonCircle';

import IconMarker from '@/components/Icons/IconMarker';
import IconPlusMagnifyingGlass from '@/components/Icons/IconPlusMagnifyingGlass';
import IconLink from '@/components/Icons/IconLink';

import { AdministrativeUnit } from '@/topic/Heraldry/types';

import DevelopmentActions from '@/topic/Heraldry/components/DevelopmentActions/DevelopmentActions';

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
      <span className="relative size-[80px] md:size-20 flex-shrink-0">
        <img
          src={imagesList?.[0].path}
          srcSet={imageSrcSet}
          className="size-[80px] md:size-20 object-contain p-2 rounded-[4px] bg-white border"
          alt=""
          loading="lazy"
        />
      </span>
      <span className="w-full">
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
        <span className="mt-1 flex gap-2">
          <ButtonCircle
            size="small"
            onClick={() => showUnitOnMap(unit.id)}
          >
            <IconMarker />
          </ButtonCircle>
          <ButtonCircle
            size="small"
            onClick={() => setPreviewUnit(unit)}
          >
            <IconPlusMagnifyingGlass />
          </ButtonCircle>
          <DevelopmentActions
            unit={unit}
            buttonSize="small"
            labelPositions="top"
          />
        </span>
      </span>
    </li>
  );
};

export default UnitsPaneItem;
