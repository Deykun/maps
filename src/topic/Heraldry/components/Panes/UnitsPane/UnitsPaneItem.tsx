import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { getSpriteDataFromUnit } from '@/topic/Heraldry/utils/getSpriteDataFromUnit';

import {
  showUnitOnMap,
} from '@/topic/Heraldry/stores/cursorStore';

import ButtonCircle from '@/components/UI/ButtonCircle';

import IconMarker from '@/components/Icons/IconMarker';
import IconPlusMagnifyingGlass from '@/components/Icons/IconPlusMagnifyingGlass';
import IconLink from '@/components/Icons/IconLink';
import IconScriptBroken from '@/components/Icons/IconScriptBroken';

import { CoatOfArmsMapData } from '@/topic/Heraldry/types';

import DevelopmentActions from '@/topic/Heraldry/components/DevelopmentActions/DevelopmentActions';

type Props = {
  className?: string,
  unit: CoatOfArmsMapData,
  setPreviewUnit: (unit: CoatOfArmsMapData) => void,
}

const UnitsPaneItem = ( { className, unit, setPreviewUnit }: Props) => {
  const { title, url, place, type } = unit;

  const isFormerUnit = type.length > 0 && type[0].startsWith('former');
  
  const { t } = useTranslation();

  // markers, colors
  
  const markersList = [];

  // const markersList = [
  //   ...(markers?.animals || []).map((v) => t(`heraldry.animal.${v}`)),
  //   ...(markers?.items || []).map((v) => t(`heraldry.item.${v}`)),
  // ];

  const {
    spriteOffsetX,
    spriteOffsetY,
    url: spriteUrl,
  } = getSpriteDataFromUnit(unit);

  return (
    <li className={clsx('flex gap-2 items-center', { [className || '']: className })}>
      <span className="relative size-[80px] md:size-20 flex-shrink-0">
        <span className="inline-block size-[80px] rounded-[4px] bg-white border">
          <span
            className="inline-block size-[80px] scale-[0.7] origin-center"
            style={{
              backgroundImage: `url('${spriteUrl}')`,
              backgroundPositionX: `-${spriteOffsetX}px`,
              backgroundPositionY: `-${spriteOffsetY}px`,
            }}
          />
        </span>
      </span>
      <span className="w-full">
        <a href={`${url}?id=${unit.id}`} target="_blank" className="text-[14px] font-[500] tracking-wide line-clamp-2 text-[#312f2f] hover:text-black duration-300">
          <span>{title}</span>
          {' '}
          <IconLink className="inline-block size-3" /> 
        </a>
        {markersList.length > 0 && <p className="sans mt-[2px] text-[10px] tracking-wider opacity-70">{markersList.join(', ')}</p>}
        <p className={clsx('sans mt-[2px] text-[10px] tracking-wider line-clamp-1', {
          'opacity-70': className,
          'text-[#ca1a1a]': !place?.name
        })}>
          {isFormerUnit && <>
            <IconScriptBroken className="inline-block size-3" />
            {' '}
            {t('heraldry.item.formerUnit')}
            {place?.name ? ',' : ''}
          </>}
          {' '}
          {place?.name || t('heraldry.item.noLocation')}
        </p>
        <span className="mt-1 flex gap-2">
          <ButtonCircle
            size="small"
            onClick={() => showUnitOnMap(unit.id)}
            label={t('heraldry.item.showOnMap')}
            labelPosition="top"
          >
            <IconMarker />
          </ButtonCircle>
          <ButtonCircle
            size="small"
            onClick={() => setPreviewUnit(unit)}
            label={t('heraldry.item.showMore')}
            labelPosition="top"
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
