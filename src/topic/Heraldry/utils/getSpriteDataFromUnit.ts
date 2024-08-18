import { AdministrativeUnit } from '@/topic/Heraldry/types'
import { numberOfImagesPerSprite, spriteSize, spriteOffset } from '@/topic/Heraldry/constants'

export const getSpriteDataFromUnit = (unit: AdministrativeUnit) => {
  const spriteIndex = Math.floor(Math.min(unit.index / numberOfImagesPerSprite));
  const index = unit.index % numberOfImagesPerSprite;
  const spriteOffsetY = spriteSize * index + spriteOffset * index;

  return {
    url: `images/heraldry/${unit.lang}/web/sprites/${unit.type?.[0] || ''}-${spriteIndex}.webp`,
    index,
    spriteOffsetY,
  };
};
