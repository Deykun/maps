import clsx from 'clsx';
import { useMemo, useState } from 'react';
import { queryClient } from '@/main';

import {
  minLengthOfLongDescription,
  toggleAsCustomFilterExclude,
  toggleAsCustomFilterInclude,
  useFiltersDevelopmentStore,
  getIsMatchingManualMarker,
} from '@/topic/Heraldry/stores/filtersDevelopmentStore';

import { copyText } from '@/utils/text';

import IconCopy from '@/components/Icons/IconCopy';
import IconMarkerMinus from '@/components/Icons/IconMarkerMinus';
import IconMarkerPlus from '@/components/Icons/IconMarkerPlus';
import IconQuote from '@/components/Icons/IconQuote';

import { CoatOfArmsMapData } from '@/topic/Heraldry/types';

import Panel from '@/components/UI/Panel';
import ButtonText from '@/components/UI/ButtonText';
import ButtonIcon from '@/components/UI/ButtonIcon';

import UnitsPaneUnitMarkers from '@/topic/Heraldry/components/Panes/UnitsPane/UnitsPaneUnitMarkers';

type Props = {
  className?: string,
  unit: CoatOfArmsMapData,
  buttonSize?: 'small',
  labelPositions?: 'top',
  shouldShowDescription?: boolean,
}

const DevelopmentActions = ({
  className,
  unit,
  buttonSize,
  labelPositions,
  shouldShowDescription = false,
}: Props) => {
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const isFiltersDevModeActive = useFiltersDevelopmentStore((state) => state.isModeActive);
  const filterExclude = useFiltersDevelopmentStore((state) => state.filter.exclude);
  const filterInclude = useFiltersDevelopmentStore((state) => state.filter.include);

  const description = useMemo(() => {
    if (!isFiltersDevModeActive || !shouldShowDescription) {
      return '';
    }

    const data = queryClient.getQueryData(['dev', unit.lang]);

    if (data) {
      return Object.values(data).find(({ id: idToCheck }) => idToCheck === unit.id)?.description as string || '';
    }

    return '';
  }, [unit.id]);

  if (!isFiltersDevModeActive) {
    return null;
  }

  return (
    <div className={clsx(className, 'flex gap-2 pointer-events-none')}>
      <Panel className="ui-panel--rounded-l ui-panel--rounded-r pointer-events-auto flex-row">
        <ButtonIcon
          size={buttonSize}
          className="relative pointer-events-auto"
          onClick={() => toggleAsCustomFilterExclude(unit)}
          isActive={getIsMatchingManualMarker(filterExclude, unit)}
          label="Exclude"
          labelPosition={labelPositions}
        >
          <IconMarkerMinus />
        </ButtonIcon>
        {shouldShowDescription && (description?.length || 0) > 0 && 
          <span className="relative">
            <ButtonIcon
              size={buttonSize}
              className="relative pointer-events-auto"
              onClick={() => setIsMoreOpen(!isMoreOpen)}
              isActive={isMoreOpen}
              label="Description"
              labelPosition={labelPositions ?? 'bottom'}
            >
              <IconQuote className={description.length < minLengthOfLongDescription ? 'scale-50' : ''} />
              {description.length > 0 && <span className="ui-button-icon-marker ui-button-icon-marker--small ui-button-icon-marker--on-soft !px-[4px] !text-[9px] !h-[16px]">
                {description.length > 749 ? '+750' : description.length}
              </span>}
            </ButtonIcon>
            {isMoreOpen &&
              <Panel
                className="ui-panel--rounded-l ui-panel--rounded-r absolute bottom-full left-1/2 -translate-x-1/2 mb-5 w-[300px]"
              >
                <p className="sans text-[10px] text-justify line-clamp-5">{description}</p>
                <div className="flex justify-center gap-2">
                  <UnitsPaneUnitMarkers unit={unit} shouldShowContentAsTooltip />
                  <ButtonText
                    size="small"
                    onClick={() => copyText(
                      description.replace(/(\r\n|\n|\r)/gm, ' ').replace( /\s\s+/g, ' ')
                    )}
                    isActive
                    isOnLight
                  >
                    <span>Copy</span>
                    <IconCopy />
                  </ButtonText>
                </div>
              </Panel>
            }
          </span>
        }
        <ButtonIcon
          size={buttonSize}
          className="relative pointer-events-auto"
          onClick={() => toggleAsCustomFilterInclude(unit)}
          isActive={getIsMatchingManualMarker(filterInclude, unit)}
          label="Include"
          labelPosition={labelPositions ?? 'right'}
        >
          <IconMarkerPlus />
        </ButtonIcon>
      </Panel>
    </div>
  );
};

export default DevelopmentActions;
