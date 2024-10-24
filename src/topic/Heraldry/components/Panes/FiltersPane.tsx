import { memo, useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import useOutsideClick from '@/hooks/useOutsideClick';

import { WITH_ANIMAL, WITHOUT_ANIMAL } from '@/topic/Heraldry/constants';

import { capitalize } from '@/utils/text';

import {
  useFiltersDevelopmentStore,
  toggleFilterDevlopmentMode,
} from '@/topic/Heraldry/stores/filtersDevelopmentStore';

import IconMapMagnifyingGlass from '@/components/Icons/IconMapMagnifyingGlass';
import IconBuilding from '@/components/Icons/IconBuilding';
import IconColor from '@/components/Icons/IconColor';
import IconControls from '@/components/Icons/IconControls';
import IconFlask from '@/components/Icons/IconFlask';
import IconAnimal from '@/components/Icons/IconAnimal';
import IconCrown from '@/components/Icons/IconCrown';
import IconEraser from '@/components/Icons/IconEraser';
import IconCubeAnd from '@/components/Icons/IconCubeAnd';
import IconCubeOr from '@/components/Icons/IconCubeOr';
import IconEye from '@/components/Icons/IconEye';
import IconEyeCrossed from '@/components/Icons/IconEyeCrossed';
import IconLoader from '@/components/Icons/IconLoader';

import Panel from '@/components/UI/Panel';
import SubPanel from '@/components/UI/SubPanel';

import ButtonIcon from '@/components/UI/ButtonIcon';

import { colorsMarkersByNames } from '@/topic/Heraldry/constants';

import FiltersPaneSidebarAnimals from './FiltersPane/FiltersPaneSidebarAnimals';
import FiltersPaneSidebarItems from './FiltersPane/FiltersPaneSidebarItems';
import FiltersPaneSidebarTypes from './FiltersPane/FiltersPaneSidebarTypes';

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
  typeFilters: string[],
  setTypeFilters: FilterSetter,
  typeFiltersList: FilterItem[],
  shouldIgnoreFormer: boolean,
  setShouldIgnoreFormer: (value: boolean) => void,
  colorFilters: string[],
  setColorFilters: FilterSetter,
  colorFiltersList: FilterItem[],
  animalFilters: string[],
  setAnimalFilters: FilterSetter,
  animalFiltersList: FilterItem[],
  itemFilters: string[],
  setItemFilters: FilterSetter,
  itemFiltersList: FilterItem[],
  filterOperator: 'or' | 'and',
  setFilterOperator: (operator: 'or' | 'and') => void,
  shouldReverseFilters: boolean,
  setShouldReverseFilters: (value: boolean) => void,
  setShouldFetchDetails: (value: boolean) => void,
  isFetchingDetails: boolean,
};

const FiltersPane = ({
  lang,
  totalVisibleUnits,
  typeFilters,
  setTypeFilters,
  typeFiltersList,
  shouldIgnoreFormer,
  setShouldIgnoreFormer,
  colorFilters,
  setColorFilters,
  colorFiltersList,
  animalFilters,
  setAnimalFilters,
  animalFiltersList,
  itemFilters,
  setItemFilters,
  itemFiltersList,
  filterOperator,
  setFilterOperator,
  shouldReverseFilters,
  setShouldReverseFilters,
  setShouldFetchDetails,
  isFetchingDetails,
}: Props) => {
  const [wasOpen, setWasOpen] = useState(false);
  const isFiltersDevModeActive = useFiltersDevelopmentStore((state) => state.isModeActive);
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

  const toggleType = useCallback(getFilterToggle(typeFilters, setTypeFilters), [typeFilters]);
  
  const toggleColor = useCallback(getFilterToggle(colorFilters, setColorFilters), [colorFilters]);
  
  const toggleAnimal = useCallback((animal: string) => {
    if ([WITH_ANIMAL, WITHOUT_ANIMAL].includes(animal)) {
      setAnimalFilters(animalFilters.includes(animal) ? [] : [animal]);

      return;
    }

    getFilterToggle(animalFilters.filter((active) => ![WITH_ANIMAL, WITHOUT_ANIMAL].includes(active)), setAnimalFilters)(animal);
  }, [animalFilters]);

  const toggleItem = useCallback(getFilterToggle(itemFilters, setItemFilters), [itemFilters]);

  const resetFilters = () => {
    setTypeFilters([]);
    setShouldIgnoreFormer(false);
    setColorFilters([]);
    setAnimalFilters([]);
    setItemFilters([]);
    setFilterOperator('and');
    setShouldReverseFilters(false);
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
            onClick={resetFilters}
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
      {activeMenu === 'type' && <FiltersPaneSidebarTypes
        lang={lang}
        filters={typeFilters}
        setFilters={setTypeFilters}
        toggle={toggleType}
        filtersList={typeFiltersList}
        shouldIgnoreFormer={shouldIgnoreFormer}
        setShouldIgnoreFormer={setShouldIgnoreFormer}
      />}
      {activeMenu === 'color' && <SubPanel order={2} className="ui-slide-from-right-sidebar no-scrollbar z-[-1] mt-2 absolute right-12 mr-2 flex-row">
        {Object.keys(colorsMarkersByNames).map((name) => <ButtonIcon
          key={name}
          wrapperClassName="relative bg-white rounded-[8px]"
          className="hover:!bg-transparent"
          onClick={() => toggleColor(name)}
          label={capitalize(t(`heraldry.color.${name}`))}
          labelPosition="bottomLeft"
        >
          <IconColor
            className={clsx('duration-300 drop-shadow-lg', {
              'opacity-30': !colorFilters.includes(name),
            })}
            style={{
              fill: colorsMarkersByNames[name],
            }}
          />
          {colorFilters.includes(name) && <span className="ui-button-icon-marker-dot" />}
        </ButtonIcon>)}
      </SubPanel>}
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
      {activeMenu === 'settings' && <SubPanel order={5} className="ui-slide-from-right-sidebar no-scrollbar z-[-1] mt-2 absolute right-12 mr-2 flex-row">
        <ButtonIcon
          wrapperClassName="ml-auto"
          onClick={() => setFilterOperator(filterOperator === 'and' ? 'or' : 'and')}
          label={`${t('heraldry.filterOperator')} ${t(`heraldry.filterOperator.${filterOperator}`)}`}
          labelPosition="bottomLeft"
        >
          {filterOperator === 'and' ? <IconCubeAnd /> : <IconCubeOr />}
        </ButtonIcon>
        <ButtonIcon
          wrapperClassName="ml-auto"
          onClick={() => setShouldReverseFilters(!shouldReverseFilters)}
          label={`${t('heraldry.filterReverse')} ${t(`heraldry.filterReverse.${shouldReverseFilters ? 'yes' : 'no'}`)}`}
          labelPosition="bottomLeft"
        >
          {shouldReverseFilters ? <IconEyeCrossed /> : <IconEye />}
          {shouldAddWarningForRevesedFilters && <span className="ui-button-icon-marker ui-button-icon-marker--on-soft">!</span>}
        </ButtonIcon>
        <span className="border-l"></span>
        <ButtonIcon
          isActive={isFiltersDevModeActive}
          onClick={toggleFilterDevlopmentMode}
          label="Development mode"
          labelPosition="bottomLeft"
        >
          <IconFlask />
        </ButtonIcon>
      </SubPanel>}
    </div>
  );
}

export default memo(FiltersPane);
