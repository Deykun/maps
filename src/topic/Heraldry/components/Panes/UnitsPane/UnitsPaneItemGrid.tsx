import clsx from 'clsx';
import { getShortTitle } from '@/topic/Heraldry/utils/getShortTitle';
import { getSpriteDataFromUnit } from '@/topic/Heraldry/utils/getSpriteDataFromUnit';
import { CoatOfArmsMapData } from '@/topic/Heraldry/types';

import { setDetailsUnit } from '@/topic/Heraldry/stores/unitsPaneStore';

type Props = {
  className?: string,
  unit: CoatOfArmsMapData,
  labelPosition?: 'bottomLeft' | 'bottomRight'
}

const UnitsPaneItemGrid = ( { className, unit, labelPosition = 'bottomRight' }: Props) => {
  const imagePath = (unit.imagesList || []).find(({ width }) => width === '80w')?.path;

  const {
    spriteOffsetX,
    spriteOffsetY,
    url: spriteUrl,
  } = getSpriteDataFromUnit(unit);

  return (
    <li className={clsx('m-0 p-0 size-[57px]', { [className || '']: className })}>
      <button
        className={clsx(
          'block relative size-[57px] rounded-[8px] bg-white',
          'ui-tooltip-wrapper ui-tooltip-wrapper--small',
        )}
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
          <span
            className={clsx('ui-tooltip text-left', {
              [`ui-tooltip--${labelPosition}`]: labelPosition,
            })}
          >
            {getShortTitle(unit.lang, unit.title).split(' ').map((word, index) => <span key={word}>
              {index !== 0 && (word.length > 3 ? ' ' : <br />)}{word}
            </span>)}
          </span>
      </button>
    </li>
  );
};

export default UnitsPaneItemGrid;
