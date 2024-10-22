import { useCallback } from 'react';
import clsx from 'clsx';

import {
  useCursorStore,
} from '@/topic/Heraldry/stores/cursorStore';

import {
  useFiltersDevelopmentStore,
} from '@/topic/Heraldry/stores/filtersDevelopmentStore';

import {
  getShortTitle
} from '@/topic/Heraldry/utils/getShortTitle';

import Panel from '@/components/NewUI/Panel';
import ButtonIcon from '@/components/NewUI/ButtonIcon';

import IconCoatOfArms from '@/topic/Heraldry/components/IconCoatOfArms';
import DevelopmentActions from '@/topic/Heraldry/components/DevelopmentActions/DevelopmentActions';

import './HeraldryCursorLastPoint.scss';

const HeraldryCursorLastPoint = () => {
  const isFiltersDevModeActive = useFiltersDevelopmentStore((state) => state.isModeActive);
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
      <Panel className="relative rounded-full p-[3px] bg-ui-dark">
        <ButtonIcon
          size="large"
          id="heraldry-cursor-last-point"
          className="heraldry-cursor-last-point rounded-full"
          wrapperClassName={clsx({
            'heraldry-cursor-last-point--unique': lastClick.hovered.length === 0,
          })}
          onClick={handleClick}
          label={lastClick.hovered.length === 1 ? lastClick.hovered.map(({ lang, title }) => getShortTitle(lang, title)).join(', ') : undefined}
          labelPosition="bottom"
        >
          <IconCoatOfArms units={lastClick.hovered} />
          <span className="ui-button-icon-marker">{lastClick.hovered.length}</span>
        </ButtonIcon>
        {isFiltersDevModeActive && lastClick.hovered.length === 1 && <DevelopmentActions
          className="heraldry-cursor-last-point-development"
          unit={lastClick.hovered[0]}
          shouldShowDescription
        />}
      </Panel>
    </div>
  );
};

export default HeraldryCursorLastPoint;
