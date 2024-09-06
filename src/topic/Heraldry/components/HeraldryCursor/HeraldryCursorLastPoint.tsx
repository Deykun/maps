import { useCallback } from 'react';
import clsx from 'clsx';
import { AdministrativeUnit } from '@/topic/Heraldry/types';

import IconCoatOfArms from '@/topic/Heraldry/components/IconCoatOfArms';

import Pane from '@/components/UI/Pane';
import ButtonCircle from '@/components/UI/ButtonCircle';

import './HeraldryCursorLastPoint.scss';

type Props = {
  top: string | number,
  left: string | number,
  selected: AdministrativeUnit[],
}

const HeraldryCursorLastPoint = ({ top, left, selected }: Props) => {
  const handleClick = useCallback(() => {
    // event.preventDefault();

    console.log('addas')
  }, []);

  return (
    <div
      className={clsx('heraldry-cursor-last-position-wrapper absolute -translate-x-1/2 -translate-y-1/2 hover:z-5 group duration-0 select-none')}
      style={{
        top,
        left,
      }}
    >
      <Pane className="rounded-full p-1">
        <ButtonCircle
          className="heraldry-cursor-last-position"
          // isActive={isOpen}
          onClick={handleClick}
        >
          <IconCoatOfArms units={selected} />
          <span className="ui-button-circle-marker">{selected.length}</span>
        </ButtonCircle>
      </Pane>
    </div>
  );
};

export default HeraldryCursorLastPoint;
