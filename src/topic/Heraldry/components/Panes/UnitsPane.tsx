import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { removeDiacratics } from '@/utils/text';

import IconTextMagnifyingGlass from '@/components/Icons/IconTextMagnifyingGlass';
import IconShieldCheckers from '@/components/Icons/IconShieldCheckers';
import { AdministrativeUnit } from '@/topic/Heraldry/types';

import Pane from '@/components/UI/Pane';
import ButtonCircle from '@/components/UI/ButtonCircle';

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

      return;
    }
    
    setFilterPhrase(phrase);
  }, [units, phrase]);

  useEffect(() => {
    if (filterPhrase === '') {
      setFilteredUnits(units);

      return;
    }

    const listPhraseNormalized = removeDiacratics(filterPhrase.toLowerCase());

    const filteredUnits = units.filter((unit) => {
      const text = `${unit.title} ${unit?.place?.name || ''}`.toLowerCase();
      const indexText = removeDiacratics(text);

      return indexText.includes(listPhraseNormalized);
    });

    setFilteredUnits(filteredUnits);
  }, [units, filterPhrase]);

  if (units.length === 0) {
    return null;
  }

  const itemsToShow = 3 + 10 * filterPage;

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
      {isOpen && <Pane className="absolute right-full w-[400px] top-0 mr-2">
        <div className="relative">
          <IconTextMagnifyingGlass className="size-4 absolute top-1/2 -translate-y-1/2 left-8 opacity-20" />
          <input
            value={filterPhrase}
            onChange={(e) => setFilterPhrase(e.target.value || '')}
            className="w-full p-1 pl-[90px] text-[16px] font-[600] rounded-md bg-white borde"
            placeholder={t('heraldry.list.limitListToPlaceholder')}
          />
        </div>
        <div className="border-t py-2 max-h-[300px] overflow-auto">
          <ul className="flex flex-col gap-3">
            {filteredUnits.slice(0, itemsToShow).map((unit) => (
              <UnitsPaneItem key={unit.id} unit={unit} />
            ))}
          </ul>
          {filteredUnits.length > itemsToShow && <div className="mt-5 text-center">
            <button onClick={() => setFilterPage(filterPage + 1)}>
              {t('heraldry.list.showMore')}
            </button>
          </div>}
        </div>
      </Pane>}
    </>
  );
}

export default UnitsPane;
