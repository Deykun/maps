import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { removeDiacratics } from '@/utils/text';

import useOutsideClick from '@/hooks/useOutsideClick';

import { CoatOfArmsMapData } from '@/topic/Heraldry/types';

import IconCoatOfArms from '@/topic/Heraldry/components/IconCoatOfArms';

import Panel from '@/components/UI/Panel';
import ButtonIcon from '@/components/UI/ButtonIcon';

import useUnitsPaneStore, { setUnitsPaneSearchPhrase } from '@/topic/Heraldry/stores/unitsPaneStore';

import { getDoesUnitMatch, getUnitSortRank } from './utils/units';

import UnitsPaneSidebar from './UnitsPane/UnitsPaneSidebar';

type Props = {
  children?: React.ReactNode,
  units?: CoatOfArmsMapData[],
  setShouldFetchDetails: (value: boolean) => void,
}

const UnitsPane = ({ 
  units = [],
  setShouldFetchDetails,
}: Props) => {
  const searchPhrase = useUnitsPaneStore(state => state.searchPhrase);
  const [isOpen, setIsOpen] = useState(false);
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [filteredUnits, setFilteredUnits] = useState(units);

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
      setUnitsPaneSearchPhrase('');

      return;
    }
  }, [units]);

  useEffect(() => {
    // setPreviewUnit(undefined);

    if (searchPhrase === '') {
      /*
        It's reversed because states/provinces
        are at the top of the map, so they are rendered last,
        so here we reverse them.
      */
      setFilteredUnits(units.reverse());

      return;
    }

    const listPhraseNormalized = removeDiacratics(searchPhrase.toLowerCase());

    const filteredUnits = units.reverse().filter((unit) => {
      return getDoesUnitMatch(listPhraseNormalized, unit);
    }).sort((a, b) => {
      const aRank = getUnitSortRank(listPhraseNormalized, a);
      const bRank = getUnitSortRank(listPhraseNormalized, b);

      return bRank - aRank;
    });

    setFilteredUnits(filteredUnits);
  }, [units, searchPhrase]);

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
          {searchPhrase.length > 0
            && filteredUnits.length > 0
            && filteredUnits.length < 100
            && <span className="ui-button-icon-marker ui-button-icon-marker--on-soft">{filteredUnits.length}</span>}
        </ButtonIcon>
      </Panel>
      {isOpen && <UnitsPaneSidebar
        units={filteredUnits}
        layout={layout}
        setLayout={setLayout}
      />}
    </div>
  );
}

export default UnitsPane;
