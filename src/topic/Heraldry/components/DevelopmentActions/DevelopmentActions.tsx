import clsx from 'clsx';
import { useMemo, useState } from 'react';
import { queryClient } from '@/main';

import {
  toggleAsCustomFilterExclude,
  toggleAsCustomFilterInclude,
  useFiltersDevelopmentStore,
} from '@/topic/Heraldry/stores/filtersDevelopmentStore';

import { copyMessage } from '@/utils/text';

import IconCopy from '@/components/Icons/IconCopy';
import IconMarkerMinus from '@/components/Icons/IconMarkerMinus';
import IconMarkerPlus from '@/components/Icons/IconMarkerPlus';
import IconQuote from '@/components/Icons/IconQuote';

import { CoatOfArmsMapData } from '@/topic/Heraldry/types';

import Pane from '@/components/UI/Pane';
import Button from '@/components/UI/Button';
import ButtonCircle from '@/components/UI/ButtonCircle';

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
  const isFiltersDevelopmentModeActive = useFiltersDevelopmentStore((state) => state.isModeActive);
  const filterExclude = useFiltersDevelopmentStore((state) => state.filter.exclude);
  const filterInclude = useFiltersDevelopmentStore((state) => state.filter.include);

  const description = useMemo(() => {
    if (!isFiltersDevelopmentModeActive || !shouldShowDescription) {
      return undefined;
    }

    const data = queryClient.getQueryData(['dev', unit.lang]);

    if (data) {
      return Object.values(data).find(({ id: idToCheck }) => idToCheck === unit.id)?.description;
    }

    return undefined;
  }, [unit.id]);

  if (!isFiltersDevelopmentModeActive) {
    return null;
  }

  return (
    <div className={clsx(className, 'flex gap-2 pointer-events-none')}>
      <ButtonCircle
        size={buttonSize}
        className="pointer-events-auto"
        onClick={() => toggleAsCustomFilterExclude(unit.title)}
        isActive={filterExclude?.includes(unit.title)}
        label="Exclude"
        labelPosition={labelPositions}
      >
        <IconMarkerMinus />
      </ButtonCircle>
      {shouldShowDescription && 
        <span className="relative">
          <ButtonCircle
            size={buttonSize}
            className="pointer-events-auto"
            onClick={() => setIsMoreOpen(!isMoreOpen)}
            isActive={isMoreOpen}
            label={`Description - ${description?.length || 0}ch.`}
            labelPosition={labelPositions ?? 'bottom'}
          >
            <IconQuote />
          </ButtonCircle>
          {isMoreOpen &&
            <Pane
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-[300px]"
            >
              <p className="sans text-[10px] text-justify">{description}</p>
              <Button
                onClick={() => copyMessage(
                  description.replace(/(\r\n|\n|\r)/gm, ' ').replace( /\s\s+/g, ' ')
                )}
              >
                <span>Copy</span>
                <IconCopy />
              </Button>
            </Pane>
          }
        </span>
      }
      <ButtonCircle
        size={buttonSize}
        className="pointer-events-auto"
        onClick={() => toggleAsCustomFilterInclude(unit.title)}
        isActive={filterInclude?.includes(unit.title)}
        label="Include"
        labelPosition={labelPositions ?? 'right'}
      >
        <IconMarkerPlus />
      </ButtonCircle>
    </div>
  );
};

export default DevelopmentActions;
