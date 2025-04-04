import clsx from 'clsx';
import { CoatOfArmsMapData } from '@/topic/Heraldry/types';

import './HeraldryCursor.scss';

import HeraldryCursorDevMarker from './HeraldryCursorDevMarker';

type Props = {
  top: string | number,
  left: string | number,
  isHovering?: boolean,
  hovered: CoatOfArmsMapData[],
}

const HeraldryCursor = ({ top, left, isHovering = true, hovered }: Props) => {
  return (
    <div
      className={clsx('hidden sm:block heraldry-cursor-wrapper absolute hover:z-10 group duration-0 select-none', {
        'heraldry-cursor-wrapper--without-content': hovered.length === 0,
      })}
      style={{
        top,
        left,
        opacity: isHovering ? '100%' : '0%',
      }}
    >
      <span className="heraldry-cursor">
        {hovered.length > 0 && <span className="heraldry-cursor-marker">
          <HeraldryCursorDevMarker hovered={hovered} />
          <span>{hovered.length}</span>
        </span>}
      </span>
    </div>
  );
};

export default HeraldryCursor;
