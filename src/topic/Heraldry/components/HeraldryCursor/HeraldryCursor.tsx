import { memo } from 'react';

import './HeraldryCursor.scss';

type Props = {
  top: string | number,
  left: string | number,
}

const HeraldryCursor = ({ top, left }: Props) => {
  return (
    <div
      className="heraldry-cursor-wrapper absolute -translate-x-1/2 -translate-y-1/2 hover:z-10 group"
      style={{
        top,
        left
      }}
      onClick={() => {}}
    >
      <span className="heraldry-cursor"></span>
    </div>
  );
};

export default memo(HeraldryCursor);
