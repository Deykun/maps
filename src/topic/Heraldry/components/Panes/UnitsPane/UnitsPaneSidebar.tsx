import { memo, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { CoatOfArmsMapData } from '@/topic/Heraldry/types';

import IconGithub from '@/components/Icons/IconGithub';
import IconEraser from '@/components/Icons/IconEraser';
import IconLayoutGrid from '@/components/Icons/IconLayoutGrid';
import IconLayoutList from '@/components/Icons/IconLayoutList';
import IconCoatOfArms from '@/topic/Heraldry/components/IconCoatOfArms';

import Panel from '@/components/UI/Panel';
import Space from '@/components/UI/Space';

import ButtonIcon from '@/components/UI/ButtonIcon';

import useUnitsPaneStore, { setSelected, setDetailsUnit, setUnitsPaneSearchPhrase } from '@/topic/Heraldry/stores/unitsPaneStore';

import UnitsPaneItemGrid from './UnitsPaneItemGrid';
import UnitsPaneItemList from './UnitsPaneItemList';
import UnitsPaneSidebarDetailsContent from './UnitsPaneSidebarDetailsContent';
import UnitsPaneSearchInput from './UnitsPaneSearchInput';
import UnitsPaneBulkDevActions from './UnitsPaneBulkDevActions';

type Props = {
  units?: CoatOfArmsMapData[],
  layout: 'grid' | 'list',
  setLayout: (value: 'grid' | 'list') => void,
};

const UnitsPaneSidebar = ({
  units = [],
  layout,
  setLayout,
}: Props) => {
  const [filterPage, setFilterPage] = useState(0);
  const searchPhrase = useUnitsPaneStore(state => state.searchPhrase);
  const detailsUnit = useUnitsPaneStore(state => state.details);
  const selected = useUnitsPaneStore(state => state.selected);

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
    setUnitsPaneSearchPhrase('');
    setSelected([]);
  }

  const canUseGrid = units.length > 4;
  const shouldUseGridLayout = layout === 'grid' && canUseGrid;

  const pageSize = shouldUseGridLayout ? 20 : 6;
  const itemsToShow = pageSize * (filterPage + 1);

  return (
    <div className="ui-slide-from-right-sidebar no-scrollbar fixed top-0 right-0 z-[-1] w-[100vw] max-h-[100dvh] overflow-auto pointer-events-none">
      <div className="ml-auto w-[400px] max-w-[100vw]">
        <div className="bg-ui-dark text-ui-dark-contrast p-[12px] pr-[60px] rounded-bl-[18px] flex flex-col gap-[12px] relative pointer-events-auto">
          {detailsUnit ?
            <UnitsPaneSidebarDetailsContent />
            : <>
                <h3 className="flex gap-3 items-center text-[14px]">
                  <IconCoatOfArms className="size-5 text-white" />
                  <span>{t('heraldry.list.title')}</span>
                </h3>
                <div className="sticky top-0 z-[1] -my-[12px] py-[12px] bg-ui-dark rounded-b-[12px]">
                  <Panel className="ui-panel--rounded-l ui-panel--rounded-r">
                    <UnitsPaneSearchInput />
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
                      <UnitsPaneBulkDevActions />
                      <ButtonIcon
                        wrapperClassName="ml-auto"
                        size="small"
                        isDisabled={searchPhrase.length === 0 && selected.length === 0}
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
                    {units.slice(0, itemsToShow).map((unit) => <UnitsPaneItemGrid
                      key={unit.id}
                      unit={unit}
                    />)}
                  </ul>}
                  {!shouldUseGridLayout && <ul className="flex flex-col gap-2 empty:hidden">
                    {units.slice(0, itemsToShow).map((unit) => <UnitsPaneItemList
                      key={unit.id}
                      unit={unit}
                    />)}
                  </ul>}
                  {units.length > itemsToShow && 
                  <div className="mt-1 text-center border-t border-t-[#7b6767] pt-2">
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
    </div>
  );
}

export default memo(UnitsPaneSidebar);
