import { memo } from 'react';
import { AdministrativeUnit } from '../types';
import { getSpriteDataFromUnit } from '@/topic/Heraldry/utils/getSpriteDataFromUnit';

type Props = {
  unit: AdministrativeUnit,
  style: {
    top: string,
    left: string,
  },
  setListPhrase: (title: string) => void,
}

const HeraldryMapItemFromSprite = ({ unit, setListPhrase, style }: Props) => {
  const {
    shortTitle,
    title,
  } = unit;
  const {
    url,
    spriteOffsetY,
  } = getSpriteDataFromUnit(unit);

  return (
    <button
      className="coat coat--with-sprite absolute -translate-x-1/2 -translate-y-1/2 hover:z-10 group"
      style={style}
      onClick={() => setListPhrase(title)}
      role="button"
      data-title={shortTitle || title}
    >
      <span className="coat-sprite" style={{ backgroundImage: `url('${url}')`, backgroundPositionY: `-${spriteOffsetY}px` }}></span>
    </button>
  );
};

export default memo(HeraldryMapItemFromSprite);
