import clsx from 'clsx';
import { getSpriteDataFromUnit } from '@/topic/Heraldry/utils/getSpriteDataFromUnit';
import { CoatOfArmsMapData } from '@/topic/Heraldry/types';

type Props = {
  className?: string,
  unit: CoatOfArmsMapData,
  setDetailsUnit: (unit: CoatOfArmsMapData) => void,
}

const UnitsPaneItemList = ( { className, unit, setDetailsUnit }: Props) => {
  const imagePath = (unit.imagesList || []).find(({ width }) => width === '80w')?.path;

  const {
    spriteOffsetX,
    spriteOffsetY,
    url: spriteUrl,
  } = getSpriteDataFromUnit(unit);

  return (
    <li className={clsx('flex flex-wrap gap-[6px]', { [className || '']: className })}>
      <button
        className="block relative size-[57px] rounded-[8px] bg-white"
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
      <div>
        <h4>{unit.title}</h4>
      </div>
    </li>
  );
};

export default UnitsPaneItemList;
