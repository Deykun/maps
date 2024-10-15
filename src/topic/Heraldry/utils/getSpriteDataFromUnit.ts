import { CoatOfArmsMapData } from '@/topic/Heraldry/types'
import { numberOfColumnsPerSprite, numberOfRowsPerSprite, spriteSize, spriteOffset } from '@/topic/Heraldry/constants';

const numberOfImagesPerSprite = numberOfColumnsPerSprite * numberOfRowsPerSprite;

export const getSpriteLocation = (index: number) => {
  const spriteIndex = Math.floor(index / numberOfImagesPerSprite);
  const spriteColumn = Math.floor(index / numberOfRowsPerSprite) % numberOfColumnsPerSprite;
  const spriteRow = index % numberOfRowsPerSprite;

  return {
    spriteIndex,
    spriteColumn,
    spriteRow,
  }
}

export const getSpriteDataFromUnit = (unit: CoatOfArmsMapData) => {
  const {
    spriteIndex,
    spriteColumn,
    spriteRow,
  } = getSpriteLocation(unit.index);

  const spriteOffsetX = spriteSize * spriteColumn + spriteOffset * spriteColumn;
  const spriteOffsetY = spriteSize * spriteRow + spriteOffset * spriteRow;

  return {
    url: `images/heraldry/${unit.lang}/web/sprites/${unit.spriteRoot || unit.type?.[0] || ''}-${spriteIndex}.webp`,
    indexX: spriteColumn,
    indexY: spriteRow,
    spriteOffsetX,
    spriteOffsetY,
  };
};
