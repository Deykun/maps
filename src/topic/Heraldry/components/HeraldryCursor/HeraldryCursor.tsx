import { memo } from 'react';

import './HeraldryCursor.scss';

type Props = {
  top: string | number,
  left: string | number,
  isHovering?: boolean,
}

const HeraldryCursor = ({ top, left, isHovering = true, selected = [] }: Props) => {
  return (
    <div
      className="heraldry-cursor-wrapper absolute -translate-x-1/2 -translate-y-1/2 hover:z-10 group duration-0"
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

export default memo(HeraldryCursor);
