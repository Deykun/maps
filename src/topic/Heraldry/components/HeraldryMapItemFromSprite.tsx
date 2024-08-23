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
  size: number,
}

const HeraldryMapItemFromSprite = ({ unit, setListPhrase, style, size }: Props) => {
  const {
    id,
    shortTitle,
    title,
  } = unit;
  const {
    url,
    spriteOffsetY,
  } = getSpriteDataFromUnit(unit);

  return (
    <button
      id={`coat-${id}`}
      className="coat coat--with-sprite absolute -translate-x-1/2 -translate-y-1/2 group"
      style={style}
      onClick={() => setListPhrase(title)}
      role="button"
      data-title={shortTitle || title}
    >
      <span className="coat-sprite" style={{
        backgroundImage: `url('${url}')`,
        backgroundPositionY: `-${spriteOffsetY}px`,
        transform: `scale(${((size + 1) / 11).toFixed(2)})`,
      }}/>
    </button>
  );
};

export default memo(HeraldryMapItemFromSprite);
