import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { removeDiacratics } from '@/utils/text';

import IconTextMagnifyingGlass from '@/components/Icons/IconTextMagnifyingGlass';
import IconShieldCheckers from '@/components/Icons/IconShieldCheckers';
import IconGithub from '@/components/Icons/IconGithub';

import { AdministrativeUnit } from '@/topic/Heraldry/types';

import Pane from '@/components/UI/Pane';
import ButtonCircle from '@/components/UI/ButtonCircle';

import { getDoesUnitMatch, getUnitSortRank } from './utils/units';
import UnitsPaneItem from './UnitsPaneItem';

type Props = {
  children?: React.ReactNode,
  units?: AdministrativeUnit[],
  phrase?: string,
  shouldShowCount?: boolean,
}

const UnitsPane = ({ 
  units = [],
  children,
  phrase = '',
  shouldShowCount = false,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filterPhrase, setFilterPhrase] = useState(phrase);
  const [filteredUnits, setFilteredUnits] = useState(units);
  const [filterPage, setFilterPage] = useState(0);

  const { t } = useTranslation();

  useEffect(() => {
    if (units.length === 0) {
      setIsOpen(false);
      setFilterPhrase('');
      setFilterPage(0);

      return;
    }
    
    setFilterPage(0);
    setFilterPhrase(phrase);
  }, [units, phrase]);

  useEffect(() => {
    if (filterPhrase === '') {
      setFilteredUnits(units);

      return;
    }

    const listPhraseNormalized = removeDiacratics(filterPhrase.toLowerCase());

    const filteredUnits = units.filter((unit) => {
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
    <>
      <Pane>
        <ButtonCircle
          isDisabled={units.length === 0}
          isActive={isOpen}
          onClick={() => setIsOpen(!isOpen)}
        >
            {children ? children : <IconShieldCheckers />}
            {shouldShowCount && phrase === filterPhrase && filteredUnits.length > 0 && <span className="ui-button-circle-marker">{filteredUnits.length}</span>}
        </ButtonCircle>
      </Pane>
      {isOpen && <Pane className="absolute right-full w-[400px] top-0 mr-3">
        <div className="relative">
          <IconTextMagnifyingGlass className="size-4 absolute top-1/2 -translate-y-1/2 left-8 opacity-20" />
          <input
            value={filterPhrase}
            onChange={(e) => setFilterPhrase(e.target.value || '')}
            className="w-full p-1 pl-[85px] text-[16px] font-[600] rounded-t-[4px] bg-white border"
            placeholder={t('heraldry.list.limitListToPlaceholder')}
          />
        </div>
        <div className="border-t pt-2 pb-4 max-h-[300px] snap-y overflow-auto">
          <ul className="flex flex-col gap-3">
            {filteredUnits.slice(0, itemsToShow).map((unit) => (
              <UnitsPaneItem key={unit.id} className="snap-end" unit={unit} />
            ))}
          </ul>
          {filteredUnits.length > itemsToShow && <div className="mt-5 text-center">
            <button className="snap-center" onClick={() => setFilterPage(filterPage + 1)}>
              {t('heraldry.list.showMore')}
            </button>
          </div>}
        </div>
        <p className="sans tracking-wider text-right rounded-b-[4px] p-2 text-white bg-[#000000ba] hover:bg-[#000000cb] duration-300">
          <small className="block text-[10px]">
            {t('heraldry.list.footer')}
          </small>
          <a href="https://github.com/Deykun/maps/issues" target="_blank" className="text-[12px] font-[500]">
            github.com/Deykun/maps/issues
            <IconGithub className="inline size-5 fill-current ml-2" />
          </a>
        </p>
      </Pane>}
    </>
  );
}

export default UnitsPane;
