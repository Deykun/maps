import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { removeDiacratics } from '@/utils/text';

import useOutsideClick from '@/hooks/useOutsideClick';

import { CoatOfArmsDetailsData, CoatOfArmsMapData } from '@/topic/Heraldry/types';

import IconCoatOfArms from '@/topic/Heraldry/components/IconCoatOfArms';

import Panel from '@/components/UI/Panel';
import ButtonIcon from '@/components/UI/ButtonIcon';

import { getDoesUnitMatch, getUnitSortRank } from './utils/units';

import UnitsPaneSidebar from './UnitsPane/UnitsPaneSidebar';

type Props = {
  children?: React.ReactNode,
  units?: CoatOfArmsMapData[],
  phrase?: string,
  shouldShowCount?: boolean,
  setShouldFetchDetails: (value: boolean) => void,
}

const UnitsPane = ({ 
  units = [],
  phrase = '',
  shouldShowCount = false,
  setShouldFetchDetails,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [filterPhrase, setFilterPhrase] = useState(phrase);
  const [filteredUnits, setFilteredUnits] = useState(units);
  const [selectedPaneUnits, setSelectedPaneUnits] = useState<CoatOfArmsMapData[]>([]);

  const { t } = useTranslation();

  useOutsideClick('#units-pane', () => {
    setIsOpen(false);
  }, '.heraldry-cursor-last-point-wrapper');
 

  useEffect(() => {
    if (isOpen) {
      setShouldFetchDetails(true);
    }
  }, [isOpen]);

  useEffect(() => {
    if (units.length === 0) {
      setIsOpen(false);
      setFilterPhrase('');

      return;
    }
    
    setFilterPhrase(phrase);
  }, [units, phrase]);

  useEffect(() => {
    // setPreviewUnit(undefined);

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

    if (selectedPaneUnits.length > 0) {
      if (filteredUnits.length === 0) {
        setSelectedPaneUnits([]);
      } else {
        const filteredIds = filteredUnits.map(({ id }) => id);
        
        setSelectedPaneUnits(selectedPaneUnits.filter(({ id }) => filteredIds.includes(id)))
      }
    }
  }, [units, filterPhrase]);

  return (
    <div className="pointer-events-auto" id="units-pane">
      <Panel className="ui-panel--rounded-l">
        <ButtonIcon
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
            && <span className="ui-button-icon-marker ui-button-icon-marker--on-soft">{filteredUnits.length}</span>}
        </ButtonIcon>
      </Panel>
      {isOpen && <UnitsPaneSidebar
        filterPhrase={filterPhrase}
        setFilterPhrase={setFilterPhrase}
        units={filteredUnits}
        setSelectedPaneUnits={setSelectedPaneUnits}
        selectedPaneUnits={selectedPaneUnits}
        layout={layout}
        setLayout={setLayout}
      />}
    </div>
  );
}

export default UnitsPane;
