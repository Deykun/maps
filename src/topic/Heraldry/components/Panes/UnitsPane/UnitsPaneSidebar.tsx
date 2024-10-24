import { memo, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import { CoatOfArmsMapData } from '@/topic/Heraldry/types';

import IconGithub from '@/components/Icons/IconGithub';
import IconEraser from '@/components/Icons/IconEraser';
import IconLayoutGrid from '@/components/Icons/IconLayoutGrid';
import IconLayoutList from '@/components/Icons/IconLayoutList';
import IconCoatOfArms from '@/topic/Heraldry/components/IconCoatOfArms';

import Panel from '@/components/UI/Panel';
import Space from '@/components/UI/Space';

import ButtonIcon from '@/components/UI/ButtonIcon';

import UnitsPaneItemGrid from './UnitsPaneItemGrid';
import UnitsPaneItemList from './UnitsPaneItemList';
import UnitsPaneSidebarDetailsContent from './UnitsPaneSidebarDetailsContent';
import UnitsPaneSearchInput from './UnitsPaneSearchInput';
import UnitsPaneBulkDevActions from './UnitsPaneBulkDevActions';

type Props = {
  filterPhrase: string,
  setFilterPhrase: (value: string) => void,
  units?: CoatOfArmsMapData[],
  layout: 'grid' | 'list',
  setLayout: (value: 'grid' | 'list') => void,
  setSelectedPaneUnits: (units: CoatOfArmsMapData[]) => void,
  selectedPaneUnits: CoatOfArmsMapData[],
};

const UnitsPaneSidebar = ({
  units = [],
  filterPhrase,
  setFilterPhrase,
  layout,
  setLayout,
  setSelectedPaneUnits,
  selectedPaneUnits = [],
}: Props) => {
  const [filterPage, setFilterPage] = useState(0);
  const [detailsUnit, setDetailsUnit] = useState<CoatOfArmsMapData | undefined>(undefined);

  const { t } = useTranslation();

  useEffect(() => {
    setFilterPage(0);
  }, [layout]);

  useEffect(() => {
    if (units.length === 0) {
      setFilterPage(0);
      setDetailsUnit(undefined);

      return;
    } else if (units.length > 0) {
      const hasCurrentlyOpen = units.some(({ id }) => id === detailsUnit?.id);

      if (!hasCurrentlyOpen) {
        setDetailsUnit(undefined);
      }
    }
    
    setFilterPage(0);
  }, [units]);

  const handleClear = () => {
    setFilterPhrase('');
    setSelectedPaneUnits([]);
  }

  const canUseGrid = units.length > 4;
  const shouldUseGridLayout = layout === 'grid' && canUseGrid;

  const pageSize = shouldUseGridLayout ? 20 : 6;
  const itemsToShow = pageSize * (filterPage + 1);

  const isClearDisabled = filterPhrase.length === 0 && (shouldUseGridLayout || selectedPaneUnits.length === 0);

  return (
    <div className="ui-slide-from-right-sidebar no-scrollbar fixed top-0 right-0 z-[-1] w-[400px] max-w-[100vw] max-h-[100svh] overflow-auto">
      <div className="bg-ui-dark text-ui-dark-contrast p-[12px] pr-[60px] rounded-bl-[18px] flex flex-col gap-[12px] relative">
        {detailsUnit ?
          <UnitsPaneSidebarDetailsContent unit={detailsUnit} setDetailsUnit={setDetailsUnit}/>
          : <>
            <h3 className="flex gap-3 items-center text-[14px]">
              <IconCoatOfArms className="size-5 text-white" units={[]} />
              <span>{t('heraldry.list.title')}</span>
            </h3>
            <div className="sticky top-0 z-[1] -my-[12px] py-[12px] bg-ui-dark rounded-b-[12px]">
              <Panel className="ui-panel--rounded-l ui-panel--rounded-r">
                <UnitsPaneSearchInput
                  filterPhrase={filterPhrase}
                  setFilterPhrase={setFilterPhrase}
                />
                <div className="mt-2 flex gap-1">
                  <ButtonIcon
                    size="small"
                    isActive={shouldUseGridLayout}
                    isDisabled={!canUseGrid}
                    onClick={() => setLayout('grid')}
                    label={t('heraldry.list.labelGrid')}
                    labelPosition="bottomRight"
                  >
                    <IconLayoutGrid />
                  </ButtonIcon>
                  <ButtonIcon
                    size="small"
                    isActive={!shouldUseGridLayout}
                    onClick={() => setLayout('list')}
                    label={t('heraldry.list.labelList')}
                    labelPosition="bottomRight"
                  >
                    <IconLayoutList />
                  </ButtonIcon>
                  {!shouldUseGridLayout &&
                    <UnitsPaneBulkDevActions
                      setSelectedPaneUnits={setSelectedPaneUnits}
                      selectedPaneUnits={selectedPaneUnits}
                    />
                  }
                  <ButtonIcon
                    wrapperClassName="ml-auto"
                    size="small"
                    isDisabled={isClearDisabled}
                    onClick={handleClear}
                    label={t('heraldry.list.clear')}
                    labelPosition="bottomLeft"
                  >
                    <IconEraser />
                  </ButtonIcon>
                </div>
              </Panel>
            </div>
            <Panel className="ui-panel--rounded-l ui-panel--rounded-r text-[14px]">
              {units.length === 0 && <p className="text-center my-2">{t('heraldry.noResult')}</p>}
              {shouldUseGridLayout && <ul className="flex flex-wrap gap-[6px] empty:hidden">
                {units.slice(0, itemsToShow).map((unit, index) => <UnitsPaneItemGrid
                  key={unit.id}
                  unit={unit}
                  setDetailsUnit={setDetailsUnit}
                  labelPosition={[(index + 2) % 5, (index + 1) % 5].includes(0) ? 'bottomLeft' : 'bottomRight'}
                />)}
              </ul>}
              {!shouldUseGridLayout && <ul className="flex flex-col gap-2 empty:hidden">
                {units.slice(0, itemsToShow).map((unit) => <UnitsPaneItemList
                  key={unit.id}
                  unit={unit}
                  setDetailsUnit={setDetailsUnit}
                  setSelectedPaneUnits={setSelectedPaneUnits}
                  selectedPaneUnits={selectedPaneUnits}
                />)}
              </ul>}
              {units.length > itemsToShow && 
              <div className={clsx("mt-2 text-center")}>
                <button className="snap-center" onClick={() => setFilterPage(filterPage + 1)}>
                  {t('heraldry.list.showMore')} <small>({units.length - itemsToShow})</small>
                </button>
              </div>}
            </Panel>
            <Panel className="ui-panel--rounded-l ui-panel--rounded-r bg-black">
              <small className="block text-[10px]">
                {t('heraldry.list.footer')}
              </small>
              <a
                href="https://github.com/Deykun/maps/issues"
                target="_blank"
                className="text-[10px] sm:text-[12px] text-white font-[500]"
              >
                github.com/Deykun/maps/issues
                <IconGithub className="inline size-5 fill-white ml-2" />
              </a>
          </Panel>
          </>
        }
      </div>
      <Space side="right" isLast isLarge className="bg-ui-dark mb-5" />
    </div>
  );
}

export default memo(UnitsPaneSidebar);
