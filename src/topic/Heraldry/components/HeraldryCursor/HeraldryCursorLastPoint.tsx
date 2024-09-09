import { useCallback } from 'react';
import clsx from 'clsx';

import {
  useCursorStore,
} from '@/topic/Heraldry/stores/cursorStore';

import IconCoatOfArms from '@/topic/Heraldry/components/IconCoatOfArms';

import Pane from '@/components/UI/Pane';
import ButtonCircle from '@/components/UI/ButtonCircle';

import './HeraldryCursorLastPoint.scss';

const HeraldryCursorLastPoint = () => {
  const lastClick = useCursorStore(state => state.lastClick);

  const handleClick = useCallback(() => {
    // TODO: replace with some kind of global store
    document.getElementById(`units-pane-toggle`)?.click();
  }, []);

  if (!Array.isArray(lastClick?.hovered) || lastClick.hovered.length === 0) {
    return null;
  }

  return (
    <div
      key={`${lastClick.x}x${lastClick.y}`}
      className={clsx('heraldry-cursor-last-position-wrapper absolute -translate-x-1/2 -translate-y-1/2 hover:z-5 group duration-0 select-none')}
      style={{
        top: lastClick.y,
        left: lastClick.x,
      }}
    >
      <Pane className="rounded-full p-1">
        <ButtonCircle
          id="heraldry-cursor-last-position"
          className="heraldry-cursor-last-position"
          // isActive={isOpen}
          onClick={handleClick}
          title={lastClick.hovered.length <= 3 ? lastClick.hovered.map(({ shortTitle, title }) => shortTitle || title).join(', ') : undefined}
        >
          <IconCoatOfArms units={lastClick.hovered} />
          <span className="ui-button-circle-marker">{lastClick.hovered.length}</span>
        </ButtonCircle>
      </Pane>
    </div>
  );
};

export default HeraldryCursorLastPoint;
