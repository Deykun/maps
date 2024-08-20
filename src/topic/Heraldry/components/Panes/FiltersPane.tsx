import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

// import IconPlus from

import IconMapMagnifyingGlass from '@/components/Icons/IconMapMagnifyingGlass';
import IconBuilding from '@/components/Icons/IconBuilding';
import IconColor from '@/components/Icons/IconColor';
import IconColorAlt from '@/components/Icons/IconColorAlt';
import IconAnimal from '@/components/Icons/IconAnimal';
import IconCrown from '@/components/Icons/IconCrown';
import IconEraser from '@/components/Icons/IconEraser';

import Pane from '@/components/UI/Pane';
import SubPane from '@/components/UI/SubPane';
import ButtonCircle from '@/components/UI/ButtonCircle';

type Props = {
  colorFilters: string[],
  toggleColor: (color: string) => void,
  resetFilters: () => void,
};

const FiltersPane = ({
  colorFilters,
  toggleColor,
  resetFilters,
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

  const activeTotal = colorFilters.length;

  const toggleMenu = (name: string) => () => setActiveMenu((v) => v === name ? '' : name); 

  return (
    <div className="relative">
      <Pane>
        <ButtonCircle onClick={() => setIsOpen(!isOpen)}>
          <IconMapMagnifyingGlass />
          {activeTotal > 0 && <span className="ui-button-circle-marker">{activeTotal}</span>}
        </ButtonCircle>
        {isOpen && <>
          <span className="border-t" />
          <ButtonCircle onClick={toggleMenu('type')} isActive={activeMenu === 'type'}>
            <IconBuilding />
          </ButtonCircle>
          <ButtonCircle onClick={toggleMenu('color')} isActive={activeMenu === 'color'}>
            <IconColor />
            {colorFilters.length > 0 && <span className="ui-button-circle-marker">{colorFilters.length}</span>}
          </ButtonCircle>
          <ButtonCircle onClick={toggleMenu('animal')} isActive={activeMenu === 'animal'}>
            <IconAnimal />
          </ButtonCircle>
          <ButtonCircle onClick={toggleMenu('other')} isActive={activeMenu === 'other'}>
            <IconCrown />
          </ButtonCircle>
        </>}
        {activeTotal > 0 && <>
          <span className="border-t" />
          <ButtonCircle onClick={resetFilters}>
            <IconEraser />
          </ButtonCircle>
        </>}
      </Pane>
      {activeMenu === 'color' && <SubPane order={2} className="absolute right-12 mt-2 mr-3 flex-row">
        {[
          { name: 'red', classNameIcon: '!fill-[#d61e27]' },
          { name: 'green', classNameIcon: '!fill-[#299649]' },
          { name: 'blue', classNameIcon: '!fill-[#1d7dc0]' },
        ].map(({ name, classNameIcon }) => <ButtonCircle onClick={() => toggleColor(name)}>
          <IconColor
            className={clsx(classNameIcon, 'duration-300', {
              'opacity-30': !colorFilters.includes(name)
            })}
          />
        </ButtonCircle>)}
      </SubPane>}
      {/* {isOpen && <div className="heraldry-ui-pane absolute right-full max-h-[300px] w-[300px] overflow-auto top-0 mr-2">
        <div className="flex items-center gap-2">
          <IconShieldCheckers className="size-4"/>
          <h3>Size of the coat of arms</h3>
        </div>
        <div className="flex items-center gap-2">

        </div>
      </div>} */}
    </div>
  );
}

export default FiltersPane;
