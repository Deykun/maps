import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import { getSpriteDataFromUnit } from '@/topic/Heraldry/utils/getSpriteDataFromUnit';
import { CoatOfArmsMapData } from '@/topic/Heraldry/types';

import { setDetailsUnit } from '@/topic/Heraldry/stores/unitsPaneStore';
import { showUnitOnMap } from '@/topic/Heraldry/stores/cursorStore';

import ButtonIcon from '@/components/UI/ButtonIcon';

import IconMarker from '@/components/Icons/IconMarker';

import UnitsPaneUnitMarkers from './UnitsPaneUnitMarkers';
import UnitsPaneSelectCheckbox from './UnitsPaneSelectCheckbox';

type Props = {
  className?: string,
  unit: CoatOfArmsMapData,
}

const UnitsPaneItemList = ( { className, unit }: Props) => {
  const { t } = useTranslation();

  const imagePath = (unit.imagesList || []).find(({ width }) => width === '80w')?.path;

  const {
    spriteOffsetX,
    spriteOffsetY,
    url: spriteUrl,
  } = getSpriteDataFromUnit(unit);

  return (
    <li className={clsx('flex flex-nowrap gap-3 border-b border-b-[#7b6767] border-dashed pb-2 last:border-b-0 last:pb-0', { [className || '']: className })}>
      <button
        className="block relative size-[65px] flex-shrink-0 rounded-[8px] bg-white"
        onClick={() => setDetailsUnit(unit)}
      >
        <span
          className={clsx(
            'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
            'inline-block size-[80px] scale-[0.5] origin-center'
          )}
          style={{
            backgroundImage: `url('${spriteUrl}')`,
            backgroundPositionX: `-${spriteOffsetX}px`,
            backgroundPositionY: `-${spriteOffsetY}px`,
          }}
          data-src={imagePath}
        />
      </button>
      <div className="flex flex-col gap-1 justify-start items-start self-center">
        <button className="block text-left text-[12px] font-[500] hover:text-white duration-300" onClick={() => setDetailsUnit(unit)}>{unit.title}</button>
        <p className="text-[10px] line-clamp-1 mb-1">{unit.place?.name}</p>
        <UnitsPaneUnitMarkers unit={unit} shouldShowContentAsTooltip />
      </div>
      <div className="flex flex-col gap-1 ml-auto">
        <ButtonIcon
          size="small"
          onClick={() => showUnitOnMap(unit.id)}
          label={t('heraldry.item.showOnMap')}
          labelPosition="bottomLeft"
        >
          <IconMarker />
        </ButtonIcon>
        <UnitsPaneSelectCheckbox
          wrapperClassName="mt-auto"
          unit={unit}
        />
      </div>
    </li>
  );
};

export default UnitsPaneItemList;
