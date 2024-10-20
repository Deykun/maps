import { memo, useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import useOutsideClick from '@/hooks/useOutsideClick';

import { WITH_ANIMAL, WITHOUT_ANIMAL } from '@/topic/Heraldry/constants';

import {
  useFiltersDevelopmentStore,
  toggleFilterDevlopmentMode,
} from '@/topic/Heraldry/stores/filtersDevelopmentStore';

import IconMapMagnifyingGlass from '@/components/Icons/IconMapMagnifyingGlass';
import IconBuilding from '@/components/Icons/IconBuilding';
import IconCheck from '@/components/Icons/IconCheck';
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

import Pane from '@/components/UI/Pane';
import SubPane from '@/components/UI/SubPane';
import ButtonCircle from '@/components/UI/ButtonCircle';

import { colorsMarkersByNames } from '@/topic/Heraldry/constants';

import FiltersPaneTypesFilter from './FiltersPane/FiltersPaneTypesFilter';

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
  typeFilters: string[],
  setTypeFilters: FilterSetter,
  typeFiltersList: FilterItem[],
  shouldIgnoreFormer: boolean,
  setShouldIgnoreFormer: (value: boolean) => void,
  colorFilters: string[],
  setColorFilters: FilterSetter,
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
  typeFilters,
  setTypeFilters,
  typeFiltersList,
  shouldIgnoreFormer,
  setShouldIgnoreFormer,
  colorFilters,
  setColorFilters,
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
  const isFiltersDevelopmentModeActive = useFiltersDevelopmentStore((state) => state.isModeActive);
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
    }
  }, [isOpen])

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
  };

  const activeTotalTypes = typeFilters.length + (shouldIgnoreFormer ? 1 : 0);

  const activeTotal = activeTotalTypes + colorFilters.length + animalFilters.length + itemFilters.length;

  return (
    <div className="relative pointer-events-auto" id="filters-pane">
      <Pane className="ui-pane--magic">
        <ButtonCircle
          onClick={() => setIsOpen(!isOpen)}
          isActive={isOpen}
          label={t('heraldry.titleFilters')}
        >
          <IconMapMagnifyingGlass />
          {activeTotal > 0 && <span className="ui-button-circle-marker">{activeTotal}</span>}
        </ButtonCircle>
        {isOpen && <>
          <span className="border-t" />
          <ButtonCircle
            onClick={toggleMenu('type')}
            isActive={activeMenu === 'type'}
            label={t('heraldry.unit.filterTitle')}
          >
            <IconBuilding />
            {activeTotalTypes > 0 && <span className="ui-button-circle-marker">{activeTotalTypes}</span>}
          </ButtonCircle>
          <ButtonCircle
            onClick={toggleMenu('color')}
            isActive={activeMenu === 'color'}
            label={t('heraldry.color.filterTitle')}
          >
            <IconColor />
            {colorFilters.length > 0 && <span className="ui-button-circle-marker">{colorFilters.length}</span>}
          </ButtonCircle>
          <ButtonCircle
            onClick={toggleMenu('animal')}
            isActive={activeMenu === 'animal'}
            label={t('heraldry.animal.filterTitle')}
            isDisabled={animalFiltersList.length === 0}
          >
            <IconAnimal />
            {animalFilters.length > 0 && <span className="ui-button-circle-marker">{animalFilters.length}</span>}
          </ButtonCircle>
          <ButtonCircle
            onClick={toggleMenu('item')}
            isActive={activeMenu === 'item'}
            label={t('heraldry.item.filterTitle')}
            isDisabled={itemFiltersList.length === 0}
          >
            <IconCrown />
            {itemFilters.length > 0 && <span className="ui-button-circle-marker">{itemFilters.length}</span>}
          </ButtonCircle>
          <ButtonCircle
            onClick={toggleMenu('settings')}
            isActive={activeMenu === 'settings'}
            label={t('heraldry.titleSettings')}
          >
            <IconControls />
          </ButtonCircle>
        </>}
        {activeTotal > 0 && <>
          <span className="border-t" />
          <ButtonCircle
            onClick={resetFilters}
            label={t('heraldry.clearFilters')}
          >
            <IconEraser />
          </ButtonCircle>
        </>}
        {isOpen && isFetchingDetails && <>
          <span className="border-t" />
          <ButtonCircle tagName="span" isActive>
            <IconLoader />
          </ButtonCircle>
        </>}
      </Pane>
      {activeMenu === 'type' && <FiltersPaneTypesFilter 
        lang={lang}
        typeFilters={typeFilters}
        setTypeFilters={setTypeFilters}
        toggleType={toggleType}
        typeFiltersList={typeFiltersList}
        shouldIgnoreFormer={shouldIgnoreFormer}
        setShouldIgnoreFormer={setShouldIgnoreFormer}
      />}
      {activeMenu === 'color' && <SubPane order={2} className="ui-slide-from-top ui-pane-magic-border absolute right-full z-50 mt-2 mr-3 flex-row">
        {Object.keys(colorsMarkersByNames).map((name) => <ButtonCircle
          key={name}
          className={clsx({
            'border border-[#eac6a8]': colorFilters.includes(name),
          })}
          onClick={() => toggleColor(name)}
          title={t(`heraldry.unit.type.${lang}.${name}`)}
        >
          <IconColor
            className={clsx('duration-300 drop-shadow-lg', {
              'opacity-30': !colorFilters.includes(name),
            })}
            style={{
              fill: colorsMarkersByNames[name],
            }}
          />
        </ButtonCircle>)}
      </SubPane>}
      {activeMenu === 'animal' && <Pane className="ui-slide-from-top ui-pane-magic-border fixed top-0 right-full z-50 w-[400px] mr-3">
        <h3 className="flex gap-3 items-center">
          <IconAnimal className="size-5" />
          <span>
            {t('heraldry.animal.filterTitle')}
          </span>
          <ButtonCircle
            wrapperClassName="ml-auto"
            onClick={() => setAnimalFilters([])}
            isDisabled={animalFilters.length === 0}
          >
            <IconEraser />
            {animalFilters.length > 0 && <span className="ui-button-circle-marker">{animalFilters.length}</span>}
          </ButtonCircle>
        </h3>
        <div className="sans grid grid-cols-1 gap-1">
            <button
              className={clsx('font-[500] text-[14px] text-left hover:text-[#d2543a]', { 
                'font-[600] text-[#d2543a]': animalFilters.includes(WITH_ANIMAL),
              })}
              onClick={() => toggleAnimal(WITH_ANIMAL)}
            >
              {animalFilters.includes(WITH_ANIMAL) && <IconCheck className="inline size-3 fill-current" />} {t(`heraldry.animal.${WITH_ANIMAL}`)}
            </button>
            <button
              className={clsx('font-[500] text-[14px] text-left hover:text-[#d2543a]', { 
                'font-[600] text-[#d2543a]': animalFilters.includes(WITHOUT_ANIMAL),
              })}
              onClick={() => toggleAnimal(WITHOUT_ANIMAL)}
            >
              {animalFilters.includes(WITHOUT_ANIMAL) && <IconCheck className="inline size-3 fill-current" />} {t(`heraldry.animal.${WITHOUT_ANIMAL}`)}
            </button>
        </div>
        {animalFiltersList.length > 0 && <div className="sans mt-2 pt-3 border-t border-t-[#dbd7d7] grid grid-cols-1 max-h-full overflow-auto sm:grid-cols-2 gap-1">
          {animalFiltersList.map(({ value, total }) => 
            <button
              onClick={() => toggleAnimal(value)}
              className={clsx('font-[500] text-[14px] text-left hover:text-[#d2543a]', { 
                'font-[600] text-[#d2543a]': animalFilters.includes(value),
              })}
            >
               {animalFilters.includes(value) && <IconCheck className="inline size-3 fill-current" />}
               {' '}
               {t(`heraldry.animal.${value}`)}
               {' '}
               {total > 0 && <small className="text-[10px] text-[#b2afaf] tracking-widest font-[400]">({total})</small>}
            </button>
          )}
        </div>}
      </Pane>}
      {activeMenu === 'item' && <Pane className="ui-slide-from-top ui-pane-magic-border fixed top-0 right-full z-50 w-[400px] mr-3">
        <h3 className="flex gap-3 items-center">
          <IconCrown className="size-5" />
          <span>
            {t('heraldry.item.filterTitle')}
          </span>
          <ButtonCircle
            wrapperClassName="ml-auto"
            onClick={() => setItemFilters([])}
            isDisabled={itemFilters.length === 0}
          >
            <IconEraser />
            {itemFilters.length > 0 && <span className="ui-button-circle-marker">{itemFilters.length}</span>}
          </ButtonCircle>
        </h3>
        {itemFiltersList.length > 0 && <div className="sans grid grid-cols-1 max-h-[80lvh] overflow-auto sm:grid-cols-2 gap-1">
          {itemFiltersList.map(({ value, total }) => 
            <button
              onClick={() => toggleItem(value)}
              className={clsx('font-[500] text-[14px] text-left hover:text-[#d2543a]', { 
                'font-[600] text-[#d2543a]': itemFilters.includes(value),
              })}
            >
              {itemFilters.includes(value) && <IconCheck className="inline size-3 fill-current" />}
              {' '}
              {t(`heraldry.item.${value}`)}
              {' '}
              {total > 0 && <small className="text-[10px] text-[#b2afaf] tracking-widest font-[400]">({total})</small>}
            </button>
          )}
        </div>}
      </Pane>}
      {activeMenu === 'settings' && <SubPane order={5} className="ui-slide-from-top ui-pane-magic-border absolute right-12 mt-2 mr-3 flex-row">
        <ButtonCircle
          wrapperClassName="ml-auto"
          onClick={() => setFilterOperator(filterOperator === 'and' ? 'or' : 'and')}
          title={`${t('heraldry.filterOperator')} ${t(`heraldry.filterOperator.${filterOperator}`)}`}
        >
          {filterOperator === 'and' ? <IconCubeAnd /> : <IconCubeOr />}
        </ButtonCircle>
        <ButtonCircle
          wrapperClassName="ml-auto"
          onClick={() => setShouldReverseFilters(!shouldReverseFilters)}
          title={`${t('heraldry.filterReverse')} ${t(`heraldry.filterReverse.${shouldReverseFilters ? 'yes' : 'no'}`)}`}
        >
          {shouldReverseFilters ? <IconEyeCrossed /> : <IconEye />}
        </ButtonCircle>
        <span className="border-l"></span>
        <ButtonCircle isActive={isFiltersDevelopmentModeActive} onClick={toggleFilterDevlopmentMode}>
          <IconFlask />
        </ButtonCircle>
      </SubPane>}
    </div>
  );
}

export default memo(FiltersPane);
