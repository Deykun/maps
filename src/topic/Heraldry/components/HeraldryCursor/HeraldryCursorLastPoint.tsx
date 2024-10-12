import { useCallback } from 'react';
import clsx from 'clsx';

import {
  useCursorStore,
} from '@/topic/Heraldry/stores/cursorStore';

import {
  useFiltersDevelopmentStore,
} from '@/topic/Heraldry/stores/filtersDevelopmentStore';

import Pane from '@/components/UI/Pane';
import ButtonCircle from '@/components/UI/ButtonCircle';

import IconCoatOfArms from '@/topic/Heraldry/components/IconCoatOfArms';
import DevelopmentActions from '@/topic/Heraldry/components/DevelopmentActions/DevelopmentActions';

import './HeraldryCursorLastPoint.scss';

const HeraldryCursorLastPoint = () => {
  const isFiltersDevelopmentModeActive = useFiltersDevelopmentStore((state) => state.isModeActive);
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
      className={clsx('heraldry-cursor-last-point-wrapper absolute -translate-x-1/2 -translate-y-1/2 hover:z-5 group duration-0 select-none')}
      style={{
        top: lastClick.y,
        left: lastClick.x,
      }}
    >
      <Pane className="rounded-full p-1">
        <ButtonCircle
          size="large"
          id="heraldry-cursor-last-point"
          className="heraldry-cursor-last-point"
          onClick={handleClick}
          label={lastClick.hovered.length === 1 ? lastClick.hovered.map(({ title }) => title).join(', ') : undefined}
          labelPosition="bottom"
        >
          <IconCoatOfArms units={lastClick.hovered} />
          <span className="ui-button-circle-marker">{lastClick.hovered.length}</span>
        </ButtonCircle>
        {isFiltersDevelopmentModeActive && lastClick.hovered.length === 1 && <DevelopmentActions
          className="heraldry-cursor-last-point-development"
          unit={lastClick.hovered[0]}
        />}
      </Pane>
    </div>
  );
};

export default HeraldryCursorLastPoint;
