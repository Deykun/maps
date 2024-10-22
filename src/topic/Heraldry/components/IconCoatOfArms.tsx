import IconShieldCheckers from '@/components/Icons/IconShieldCheckers';

import { getSpriteDataFromUnit } from '@/topic/Heraldry/utils/getSpriteDataFromUnit';

import { getImageSrcSet } from '@/utils/image';
import { CoatOfArmsMapData } from '@/topic/Heraldry/types';

type Props = {
  className?: string,
  units: CoatOfArmsMapData[],
}

const IconCoatOfArms = ({ className, units }: Props) => {
  if (units.length !== 1) {
    return <IconShieldCheckers className={className} />
  }

  const {
    spriteOffsetX,
    spriteOffsetY,
    url: spriteUrl,
  } = getSpriteDataFromUnit(units[0]);

  return (
    <span className="pointer-events-none rounded-full block size-[80px] absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
      <span
        className="block size-[80px] scale-[0.3] origin-center"
        style={{
          backgroundImage: `url('${spriteUrl}')`,
          backgroundPositionX: `-${spriteOffsetX}px`,
          backgroundPositionY: `-${spriteOffsetY}px`,
        }}
      />
    </span>
  )
};

export default IconCoatOfArms;
