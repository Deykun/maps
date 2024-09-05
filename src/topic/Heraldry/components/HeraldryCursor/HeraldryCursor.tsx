import { useEffect } from 'react';
import clsx from 'clsx';
import { AdministrativeUnit } from '@/topic/Heraldry/types';

import './HeraldryCursor.scss';

type Props = {
  top: string | number,
  left: string | number,
  isHovering?: boolean,
  selected: AdministrativeUnit[],
}

const HeraldryCursor = ({ top, left, isHovering = true, selected = [] }: Props) => {
  return (
    <div
      className={clsx('heraldry-cursor-wrapper absolute hover:z-10 group duration-0 select-none', {
        'heraldry-cursor-wrapper--without-content': selected.length === 0,
      })}
      style={{
        top,
        left,
        opacity: isHovering ? '100%' : '0%',
      }}
      onClick={() => {}}
    >
      <span className="heraldry-cursor">
        {selected.length > 0 && <span className="heraldry-cursor-marker">{selected.length}</span>}
        {/* <span className="heraldry-cursor-marker">{selected.length + 1}</span> */}
      </span>
    </div>
  );
};

export default HeraldryCursor;
