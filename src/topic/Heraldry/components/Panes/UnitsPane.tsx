import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import { removeDiacratics } from '@/utils/text';

import useOutsideClick from '@/hooks/useOutsideClick';

import IconEraser from '@/components/Icons/IconEraser';
import IconTextMagnifyingGlass from '@/components/Icons/IconTextMagnifyingGlass';
import IconGithub from '@/components/Icons/IconGithub';

import { CoatOfArmsMapData } from '@/topic/Heraldry/types';
import IconCoatOfArms from '@/topic/Heraldry/components/IconCoatOfArms';

import Pane from '@/components/UI/Pane';
import ButtonCircle from '@/components/UI/ButtonCircle';

import { getDoesUnitMatch, getUnitSortRank } from './utils/units';

import UnitsPaneItem from './UnitsPane/UnitsPaneItem';
import UnitsPaneItemDetails from './UnitsPane/UnitsPaneItemDetails';

type Props = {
  children?: React.ReactNode,
  units?: CoatOfArmsMapData[],
  phrase?: string,
  shouldShowCount?: boolean,
}

const UnitsPane = ({ 
  units = [],
  phrase = '',
  shouldShowCount = false,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [previewUnit, setPreviewUnit] = useState<CoatOfArmsMapData | undefined>(undefined);
  const [filterPhrase, setFilterPhrase] = useState(phrase);
  const [filteredUnits, setFilteredUnits] = useState(units);
  const [filterPage, setFilterPage] = useState(0);

  const { t } = useTranslation();

  useOutsideClick('#units-pane', () => {
    setIsOpen(false);
  }, '.heraldry-cursor-last-point-wrapper');

  useEffect(() => {
    if (units.length === 0) {
      setIsOpen(false);
      setFilterPhrase('');
      setFilterPage(0);
      setPreviewUnit(undefined);

      return;
    }
    
    setFilterPage(0);
    setFilterPhrase(phrase);
  }, [units, phrase]);

  useEffect(() => {
    setPreviewUnit(undefined);

    if (filterPhrase === '') {
      /*
        It's reversed because states/provinces
        are at the top of the map, so they are rendered last,
        so here we reverse them.
      */
      setFilteredUnits(units.reverse());

      return;
    }

    const listPhraseNormalized = removeDiacratics(filterPhrase.toLowerCase());

    const filteredUnits = units.reverse().filter((unit) => {
      return getDoesUnitMatch(listPhraseNormalized, unit);
    }).sort((a, b) => {
      const aRank = getUnitSortRank(listPhraseNormalized, a);
      const bRank = getUnitSortRank(listPhraseNormalized, b);

      return bRank - aRank;
    });

    setFilteredUnits(filteredUnits);
  }, [units, filterPhrase]);

  const itemsToShow = 5 + 10 * filterPage;

  return (
    <div className="pointer-events-auto" id="units-pane">
      <Pane>
        <ButtonCircle
          id="units-pane-toggle"
          isDisabled={units.length === 0}
          isActive={isOpen}
          onClick={() => setIsOpen(!isOpen)}
          label={t('heraldry.list.title')}
        >
          <IconCoatOfArms units={filteredUnits} />
          {shouldShowCount
            && phrase === filterPhrase
            && filteredUnits.length > 0
            && filteredUnits.length < 100
            && <span className="ui-button-circle-marker">{filteredUnits.length}</span>}
        </ButtonCircle>
      </Pane>
      {isOpen && <Pane className="ui-slide-from-top absolute top-0 right-full z-50 w-[400px] overflow-auto mr-3">
        <div className="relative flex gap-1 justify-center items-center">
          <IconTextMagnifyingGlass className="size-4 absolute top-1/2 -translate-y-1/2 left-3 md:left-8 opacity-20" />
          <input
            value={filterPhrase}
            onChange={(e) => setFilterPhrase(e.target.value || '')}
            className={clsx('w-full p-1 pl-[50px] md:pl-[85px] pr-[40px] h-[34px] leading-[34px] font-[600] rounded-t-[4px] bg-white border', {
              'text-[16px]': filterPhrase.length < 10,
              'text-[12px]': filterPhrase.length >= 10,
            })}
            placeholder={t('heraldry.list.limitListToPlaceholder')}
          />
          <ButtonCircle
            wrapperClassName="absolute top-1/2 right-1 -translate-y-1/2"
            id="units-pane-toggle"
            isDisabled={filterPhrase.length === 0}
            onClick={() => setFilterPhrase('')}
            size="small"
          >
            <IconEraser />
          </ButtonCircle>
        </div>
        {previewUnit && <UnitsPaneItemDetails unit={previewUnit} setPreviewUnit={setPreviewUnit} />}
        {!previewUnit && <div className="border-t pt-2 pb-4 max-h-[480px] snap-y overflow-auto">
          {filteredUnits.length === 0 && <p className="text-center text-[14px] my-2">{t('heraldry.noResult')}</p>}
          <ul className="flex flex-col gap-3 empty:hidden">
            {filteredUnits.slice(0, itemsToShow).map((unit) => (
              <UnitsPaneItem key={unit.id} className="snap-end" unit={unit} setPreviewUnit={setPreviewUnit} />
            ))}
          </ul>
          <div className={clsx("mt-5 text-center", {
            'hidden': filteredUnits.length <= itemsToShow,
          })}>
            <button className="snap-center" onClick={() => setFilterPage(filterPage + 1)}>
              {t('heraldry.list.showMore')}
            </button>
          </div>
        </div>
        }
        <p className="sans tracking-wider text-right rounded-b-[4px] p-2 text-white bg-[#000000ba] hover:bg-[#000000cb] duration-300">
          <small className="block text-[8px] sm:text-[10px]">
            {t('heraldry.list.footer')}
          </small>
          <a href="https://github.com/Deykun/maps/issues" target="_blank" className="text-[8px] sm:text-[12px] font-[500]">
            github.com/Deykun/maps/issues
            <IconGithub className="inline size-5 fill-current ml-2" />
          </a>
        </p>
      </Pane>}
    </div>
  );
}

export default UnitsPane;
