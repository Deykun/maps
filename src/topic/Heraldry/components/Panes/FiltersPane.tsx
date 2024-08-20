import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import { WITH_ANIMAL, WITHOUT_ANIMAL } from '@/topic/Heraldry/constants';

import IconMapMagnifyingGlass from '@/components/Icons/IconMapMagnifyingGlass';
import IconBuilding from '@/components/Icons/IconBuilding';
import IconColor from '@/components/Icons/IconColor';
import IconControls from '@/components/Icons/IconControls';
import IconAnimal from '@/components/Icons/IconAnimal';
import IconCrown from '@/components/Icons/IconCrown';
import IconEraser from '@/components/Icons/IconEraser';
import IconCubeAnd from '@/components/Icons/IconCubeAnd';
import IconCubeOr from '@/components/Icons/IconCubeOr';
import IconEye from '@/components/Icons/IconEye';
import IconEyeCrossed from '@/components/Icons/IconEyeCrossed';

import Pane from '@/components/UI/Pane';
import SubPane from '@/components/UI/SubPane';
import ButtonCircle from '@/components/UI/ButtonCircle';

type Props = {
  lang: string,
  typeFilters: string[],
  setTypeFilters: (values: string[]) => void,
  typeFiltersList: { value: string, total: number }[],
  colorFilters: string[],
  setColorFilters: (values: string[]) => void,
  resetFilters: () => void,
  animalFilters: string[],
  setAnimalFilters: (values: string[]) => void,
  animalFiltersList: { value: string, total: number }[],
  filterOperator: 'or' | 'and',
  setFilterOperator: (operator: 'or' | 'and') => void,
  shouldReverseFilters: boolean,
  setShouldReverseFilters: (value: boolean) => void,
};

const FiltersPane = ({
  lang,
  typeFilters,
  setTypeFilters,
  typeFiltersList,
  colorFilters,
  setColorFilters,
  resetFilters,
  animalFilters,
  setAnimalFilters,
  animalFiltersList,
  filterOperator,
  setFilterOperator,
  shouldReverseFilters,
  setShouldReverseFilters,
}: Props) => {
  const [activeMenu, setActiveMenu] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  // const zoomLevel = useSettingStore(state => state.zoomLevel);
  // const coatSize = useSettingStore(state => state.coatSize);
  const { t } = useTranslation();

  useEffect(() => {
    if (!isOpen) {
      setActiveMenu('');
    }
  }, [isOpen])
  animalFilters
  const activeTotal = typeFilters.length + colorFilters.length + animalFilters.length;

  const toggleMenu = (name: string) => () => setActiveMenu((v) => v === name ? '' : name); 

  const toggleType = useCallback((type: string) => {
    if (typeFilters.includes(type)) {
      setTypeFilters(typeFilters.filter((active) => active !== type));

      return;
    }

    setTypeFilters([...typeFilters, type]);
}, [typeFilters]);

  const toggleColor = useCallback((color: string) => {
      if (colorFilters.includes(color)) {
        setColorFilters(colorFilters.filter((active) => active !== color));

        return;
      }

      setColorFilters([...colorFilters, color]);
  }, [colorFilters]);
  
  const toggleAnimal = useCallback((animal: string) => {
    if ([WITH_ANIMAL, WITHOUT_ANIMAL].includes(animal)) {
      setAnimalFilters(animalFilters.includes(animal) ? [] : [animal]);

      return;
    }

    setAnimalFilters(animalFilters.includes(animal)
    ? animalFilters.filter((active) => active !== animal)
    : [...animalFilters, animal].filter((active) => ![WITH_ANIMAL, WITHOUT_ANIMAL].includes(active))
    );
  }, [animalFilters]);

  return (
    <div className="relative">
      <Pane>
        <ButtonCircle onClick={() => setIsOpen(!isOpen)} title={t('heraldry.titleFilters')}>
          <IconMapMagnifyingGlass />
          {activeTotal > 0 && <span className="ui-button-circle-marker">{activeTotal}</span>}
        </ButtonCircle>
        {isOpen && <>
          <span className="border-t" />
          <ButtonCircle onClick={toggleMenu('type')} isActive={activeMenu === 'type'}>
            <IconBuilding />
            {typeFilters.length > 0 && <span className="ui-button-circle-marker">{typeFilters.length}</span>}
          </ButtonCircle>
          <ButtonCircle onClick={toggleMenu('color')} isActive={activeMenu === 'color'} title={t('heraldry.color.filterTitle')}>
            <IconColor />
            {colorFilters.length > 0 && <span className="ui-button-circle-marker">{colorFilters.length}</span>}
          </ButtonCircle>
          <ButtonCircle onClick={toggleMenu('animal')} isActive={activeMenu === 'animal'} title={t('heraldry.animal.filterTitle')}>
            <IconAnimal />
            {animalFilters.length > 0 && <span className="ui-button-circle-marker">{animalFilters.length}</span>}
          </ButtonCircle>
          <ButtonCircle onClick={toggleMenu('other')} isActive={activeMenu === 'other'} title={t('heraldry.item.filterTitle')}>
            <IconCrown />
          </ButtonCircle>
          <ButtonCircle onClick={toggleMenu('settings')} isActive={activeMenu === 'settings'}>
            <IconControls />
          </ButtonCircle>
        </>}
        {activeTotal > 0 && <>
          <span className="border-t" />
          <ButtonCircle onClick={resetFilters}>
            <IconEraser />
          </ButtonCircle>
        </>}
      </Pane>
      {activeMenu === 'type' && <Pane className="fixed right-12 mt-3 w-[400px] top-0 mr-6">
        <h3 className="flex gap-3 items-center">
          <IconBuilding className="size-5" />
          <span>
            {t('heraldry.type.filterTitle')}
          </span>
          <ButtonCircle
            wrapperClassName="ml-auto"
            onClick={() => setTypeFilters([])}
            isDisabled={typeFilters.length === 0}
          >
            <IconEraser />
            {typeFilters.length > 0 && <span className="ui-button-circle-marker">{typeFilters.length}</span>}
          </ButtonCircle>
        </h3>
        {typeFiltersList.length > 0 && <div className="grid grid-cols-3 gap-1">
          {typeFiltersList.map(({ value, total }) => 
            <button
              onClick={() => toggleType(value)}
              className={clsx('font-[500] text-[12px] text-left hover:text-[#205dbd]', { 
                'font-[600] text-[#205dbd]': typeFilters.includes(value),
              })}
            >
              {t(`heraldry.unit.type.${lang}.${value}`)} {total > 0 && <small className="text-[10px] text-[#4b4b4b] tracking-widest font-[600]">({total})</small>}
            </button>
          )}
        </div>}
      </Pane>}
      {activeMenu === 'color' && <SubPane order={2} className="absolute right-12 mt-2 mr-3 flex-row">
        {[
          { name: 'red', classNameIcon: '!fill-[#d61e27]' },
          { name: 'green', classNameIcon: '!fill-[#299649]' },
          { name: 'blue', classNameIcon: '!fill-[#1d7dc0]' },
        ].map(({ name, classNameIcon }) => <ButtonCircle
          key={name}
          onClick={() => toggleColor(name)}
          title={t(`heraldry.unit.type.${lang}.${name}`)}
        >
          <IconColor
            className={clsx(classNameIcon, 'duration-300', {
              'opacity-30': !colorFilters.includes(name)
            })}
          />
        </ButtonCircle>)}
      </SubPane>}
      {activeMenu === 'animal' && <Pane className="fixed right-12 mt-3 w-[400px] top-0 mr-6">
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
        {animalFiltersList.length > 0 && <div className="grid grid-cols-3 gap-1">
          {[
            { value: WITH_ANIMAL, total: 0 },
            { value: WITHOUT_ANIMAL, total: 0 },
          ...animalFiltersList].map(({ value, total }) => 
            <button
              onClick={() => toggleAnimal(value)}
              className={clsx('font-[500] text-[12px] text-left hover:text-[#205dbd]', { 
                'font-[600] text-[#205dbd]': animalFilters.includes(value),
              })}
            >
              {t(`heraldry.animal.${value}`)} {total > 0 && <small className="text-[10px] text-[#4b4b4b] tracking-widest font-[600]">({total})</small>}
            </button>
          )}
        </div>}
      </Pane>}
      {activeMenu === 'settings' && <SubPane order={5} className="absolute right-12 mt-2 mr-3 flex-row">
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
          {shouldReverseFilters?  <IconEyeCrossed /> : <IconEye />}
        </ButtonCircle>
      </SubPane>}
    </div>
  );
}

export default FiltersPane;
