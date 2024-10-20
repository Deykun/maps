import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import { CoatOfArmsMapData } from '@/topic/Heraldry/types';

import IconGithub from '@/components/Icons/IconGithub';
import IconCheck from '@/components/Icons/IconCheck';
import IconEraser from '@/components/Icons/IconEraser';
import IconScriptBroken from '@/components/Icons/IconScriptBroken';
import IconLayoutGrid from '@/components/Icons/IconLayoutGrid';
import IconLayoutList from '@/components/Icons/IconLayoutList';


import Panel from '@/components/NewUI/Panel';
import Space from '@/components/NewUI/Space';
import Button from '@/components/UI/Button';
import ButtonCircle from '@/components/UI/ButtonCircle';

import ButtonIcon from '@/components/NewUI/ButtonIcon';

import UnitsPaneItemGrid from './UnitsPaneItemGrid';
import UnitsPaneSidebarDetailsContent from './UnitsPaneSidebarDetailsContent';

import './UnitsPaneSidebar.scss';

type Props = {
  filterPhrase: string,
  setFilterPhrase: (value: string) => void,
  units?: CoatOfArmsMapData[],
};

const UnitsPaneSidebar = ({
  units = [],
  filterPhrase,
  setFilterPhrase,
}: Props) => {
  const [filterPage, setFilterPage] = useState(0);
  // const [detailsUnit, setDetailsUnit] = useState<CoatOfArmsMapData | undefined>(undefined);
  const [detailsUnit, setDetailsUnit] = useState<CoatOfArmsMapData | undefined>( {
    "lang": "pl",
    "index": 0,
    "id": "miasta-0",
    "title": "Herb Barda",
    "url": "https://pl.wikipedia.org/wiki/Herb_Barda",
    "type": [
     "miasta"
    ],
    "place": {
     "name": "Bardo (miasto)",
     "coordinates": {
      "lat": 50.508611,
      "lon": 16.743889
     }
    },
    "imagesList": [
     {
      "width": "80w",
      "path": "images/heraldry/pl/miasta/785898e3-herb-barda-80w.webp"
     },
     {
      "width": "320w",
      "path": "images/heraldry/pl/miasta/785898e3-herb-barda-320w.webp"
     }
    ]
   });

  const { t } = useTranslation();

  const itemsToShow = 20 * (filterPage + 1);

  return (
    <div className="ui-slide-from-right-sidebar fixed top-0 right-0 z-[-1] w-[400px] max-w-[100vw] max-h-[100vh] overflow-auto">
      <div className="bg-ui-dark p-[12px] pr-[60px] rounded-bl-[18px] flex flex-col gap-[12px] relative">
        {detailsUnit ?
          <UnitsPaneSidebarDetailsContent unit={detailsUnit} setDetailsUnit={setDetailsUnit}/>
          : <>
            <Panel className="ui-panel--rounded-l ui-panel--rounded-r">
              <input
                value={filterPhrase}
                onChange={(e) => setFilterPhrase(e.target.value || '')}
                className={clsx('block w-full bg-ui-contrast text-ui-dark placeholder-ui-dark caret-marker rounded-full py-2 px-4')}
                placeholder={t('heraldry.list.limitListToPlaceholder')}
              />
              <div className="mt-2 flex gap-1">
                <ButtonIcon
                  size="small"
                  isActive
                  onClick={() => setFilterPhrase('')}
                  label={t('heraldry.list.labelGrid')}
                  labelPosition="right"
                >
                  <IconLayoutGrid />
                </ButtonIcon>
                <ButtonIcon
                  size="small"
                  onClick={() => setFilterPhrase('')}
                  label={t('heraldry.list.labelList')}
                  labelPosition="right"
                >
                  <IconLayoutList />
                </ButtonIcon>
                <ButtonIcon
                  wrapperClassName="ml-auto"
                  size="small"
                  isDisabled={filterPhrase.length === 0}
                  onClick={() => setFilterPhrase('')}
                  label={t('heraldry.list.clear')}
                  labelPosition="left"
                >
                  <IconEraser />
                </ButtonIcon>
              </div>
            </Panel>
            <Panel className="ui-panel--rounded-l ui-panel--rounded-r text-[14px]">
              {units.length === 0 && <p className="text-center my-2">{t('heraldry.noResult')}</p>}
              <ul className="flex flex-wrap gap-[6px]">
                {units.slice(0, itemsToShow).map((unit) => <UnitsPaneItemGrid unit={unit} setDetailsUnit={setDetailsUnit} />)}
              </ul>
              {units.length > itemsToShow && 
              <div className={clsx("mt-5 text-center")}>
                <button className="snap-center" onClick={() => setFilterPage(filterPage + 1)}>
                  {t('heraldry.list.showMore')} <small>({units.length - itemsToShow})</small>
                </button>
              </div>}
            </Panel>
            <Panel className="ui-panel--rounded-l ui-panel--rounded-r bg-black">
              <small className="block text-[14px]">
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
      <Space isLast isLarge className="bg-ui-dark" />
    </div>
  );
}

export default memo(UnitsPaneSidebar);
