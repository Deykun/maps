import { memo, useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import useOutsideClick from '@/hooks/useOutsideClick';

import { WITH_ANIMAL, WITHOUT_ANIMAL } from '@/topic/Heraldry/constants';

import IconMapMagnifyingGlass from '@/components/Icons/IconMapMagnifyingGlass';
import IconBuilding from '@/components/Icons/IconBuilding';
import IconColor from '@/components/Icons/IconColor';
import IconControls from '@/components/Icons/IconControls';
import IconAnimal from '@/components/Icons/IconAnimal';
import IconCrown from '@/components/Icons/IconCrown';
import IconEraser from '@/components/Icons/IconEraser';
import IconLoader from '@/components/Icons/IconLoader';

import Panel from '@/components/UI/Panel';

import ButtonIcon from '@/components/UI/ButtonIcon';

import useFiltersStore, { resetFilters } from '@/topic/Heraldry/stores/filtersStore'

import FiltersPaneSidebarAnimals from './FiltersPane/FiltersPaneSidebarAnimals';
import FiltersPaneSidebarItems from './FiltersPane/FiltersPaneSidebarItems';
import FiltersPaneSidebarTypes from './FiltersPane/FiltersPaneSidebarTypes';
import FiltersPaneSubPanelColors from './FiltersPane/FiltersPaneSubPanelColors';
import FiltersPaneSubPanelSettings from './FiltersPane/FiltersPaneSubPanelSettings';

const getFilterToggle = (values: string[], setValues: (values: string[]) => void) => (value: string) => {
  if (values.includes(value)) {
    setValues(values.filter((active) => active !== value));

    return;
  }

  setValues([...values, value]);
}

type FilterItem = {
  value: string,
  total: number,
}

type FilterSetter = (values: string[]) => void;

type Props = {
  lang: string,
  totalVisibleUnits: number,
  typeFiltersList: FilterItem[],

  colorFiltersList: FilterItem[],
  animalFilters: string[],
  setAnimalFilters: FilterSetter,
  animalFiltersList: FilterItem[],
  itemFilters: string[],
  setItemFilters: FilterSetter,
  itemFiltersList: FilterItem[],
  setShouldFetchDetails: (value: boolean) => void,
  isFetchingDetails: boolean,
};

const FiltersPane = ({
  lang,
  totalVisibleUnits,
  typeFiltersList,
  colorFiltersList,
  animalFilters,
  setAnimalFilters,
  animalFiltersList,
  itemFilters,
  setItemFilters,
  itemFiltersList,
  setShouldFetchDetails,
  isFetchingDetails,
}: Props) => {
  const shouldReverseFilters = useFiltersStore(state => state.shouldReverseFilters);
  const [wasOpen, setWasOpen] = useState(false);
  const shouldIgnoreFormer = useFiltersStore(state => state.shouldIgnoreFormer);
  const typeFilters = useFiltersStore(state => state.type);
  const colorFilters = useFiltersStore(state => state.color);
  const [activeMenu, setActiveMenu] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  // Not the nicest solution, but it works
  useOutsideClick('#filters-pane', () => {
    setActiveMenu('');
  });

  useEffect(() => {
    if (!isOpen) {
      setActiveMenu('');
    } else {
      setShouldFetchDetails(true);
      setWasOpen(true)
    }
  }, [isOpen]);

  const toggleMenu = (name: string) => () => setActiveMenu((v) => v === name ? '' : name); 
  
  const toggleAnimal = useCallback((animal: string) => {
    if ([WITH_ANIMAL, WITHOUT_ANIMAL].includes(animal)) {
      setAnimalFilters(animalFilters.includes(animal) ? [] : [animal]);

      return;
    }

    getFilterToggle(animalFilters.filter((active) => ![WITH_ANIMAL, WITHOUT_ANIMAL].includes(active)), setAnimalFilters)(animal);
  }, [animalFilters]);

  const toggleItem = useCallback(getFilterToggle(itemFilters, setItemFilters), [itemFilters]);

  const handleResetFilters = () => {
    resetFilters();
    setAnimalFilters([]);
    setItemFilters([]);
    // Don't hint to open after clearing
    setWasOpen(true);
  };

  const activeTotalTypes = typeFilters.length + (shouldIgnoreFormer ? 1 : 0);

  const activeTotal = activeTotalTypes + colorFilters.length + animalFilters.length + itemFilters.length;

  const shouldAddWarningForRevesedFilters = totalVisibleUnits === 0 && shouldReverseFilters;

  return (
    <div className="relative pointer-events-auto" id="filters-pane">
      <Panel className="ui-panel--rounded-l">
        <ButtonIcon
          onClick={() => setIsOpen(!isOpen)}
          isActive={isOpen}
          label={t('heraldry.titleFilters')}
        >
          <IconMapMagnifyingGlass />
          {activeTotal > 0 && <span className="ui-button-icon-marker ui-button-icon-marker--on-soft">{activeTotal}</span>}
          {activeTotal === 0 && !wasOpen && <span className="ui-button-icon-marker ui-button-icon-marker--on-soft">!</span>}
        </ButtonIcon>
        {isOpen && <>
          <span className="border-t" />
          <ButtonIcon
            onClick={toggleMenu('type')}
            isActive={activeMenu === 'type'}
            label={t('heraldry.unit.filterTitle')}
          >
            <IconBuilding />
            {activeTotalTypes > 0 && <span className="ui-button-icon-marker ui-button-icon-marker--on-soft">{activeTotalTypes}</span>}
          </ButtonIcon>
          <ButtonIcon
            onClick={toggleMenu('color')}
            isActive={activeMenu === 'color'}
            label={t('heraldry.color.filterTitle')}
            isDisabled={colorFiltersList.length === 0}
          >
            <IconColor />
            {colorFilters.length > 0 && <span className="ui-button-icon-marker ui-button-icon-marker--on-soft">{colorFilters.length}</span>}
          </ButtonIcon>
          <ButtonIcon
            onClick={toggleMenu('animal')}
            isActive={activeMenu === 'animal'}
            label={t('heraldry.animal.filterTitle')}
            isDisabled={animalFiltersList.length === 0}
          >
            <IconAnimal animals={animalFilters.length === 1 ? animalFilters : []} />
            {animalFilters.length > 0 && <span className="ui-button-icon-marker ui-button-icon-marker--on-soft">{animalFilters.length}</span>}
          </ButtonIcon>
          <ButtonIcon
            onClick={toggleMenu('item')}
            isActive={activeMenu === 'item'}
            label={t('heraldry.item.filterTitle')}
            isDisabled={itemFiltersList.length === 0}
          >
            <IconCrown />
            {itemFilters.length > 0 && <span className="ui-button-icon-marker ui-button-icon-marker--on-soft">{itemFilters.length}</span>}
          </ButtonIcon>
          <ButtonIcon
            onClick={toggleMenu('settings')}
            isActive={activeMenu === 'settings'}
            label={t('heraldry.titleSettings')}
          >
            <IconControls />
            {shouldAddWarningForRevesedFilters && <span className="ui-button-icon-marker ui-button-icon-marker--on-soft">!</span>}
          </ButtonIcon>
        </>}
        {activeTotal > 0 && <>
          <span className="border-t" />
          <ButtonIcon
            onClick={handleResetFilters}
            label={t('heraldry.clearFilters')}
          >
            <IconEraser />
          </ButtonIcon>
        </>}
        {isOpen && isFetchingDetails && <>
          <span className="border-t" />
          <ButtonIcon tagName="span" isActive>
            <IconLoader />
          </ButtonIcon>
        </>}
      </Panel>
      {activeMenu === 'type' && <FiltersPaneSidebarTypes lang={lang} filtersList={typeFiltersList} />}
      {activeMenu === 'color' && <FiltersPaneSubPanelColors className="absolute right-12 z-[-1] mt-1 mr-2" order={2} />}
      {activeMenu === 'animal' && <FiltersPaneSidebarAnimals
        filters={animalFilters}
        setFilters={setAnimalFilters}
        toggle={toggleAnimal}
        filtersList={animalFiltersList}
      />}
      {activeMenu === 'item' && <FiltersPaneSidebarItems
        filters={itemFilters}
        setFilters={setItemFilters}
        toggle={toggleItem}
        filtersList={itemFiltersList}
      />}
      {activeMenu === 'settings' && <FiltersPaneSubPanelSettings
        className="absolute right-12 z-[-1] mt-1 mr-2"
        order={5}
        shouldAddWarningForRevesedFilters={shouldAddWarningForRevesedFilters}
      />}
    </div>
  );
}

export default memo(FiltersPane);
