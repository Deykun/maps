import { useState } from 'react';

// import IconPlus from

import IconMapMagnifyingGlass from '@/components/Icons/IconMapMagnifyingGlass';
import IconFlag from '@/components/Icons/IconFlag';
import IconColor from '@/components/Icons/IconColor';
import IconAnimal from '@/components/Icons/IconAnimal';
import IconCrown from '@/components/Icons/IconCrown';

import Pane from '@/components/UI/Pane';
import ButtonCircle from '@/components/UI/ButtonCircle';

type Props = {
  // zoomIn: () => void,
  // zoomOut: () => void,
  // zoomLevel: number,
  // zoomMin: number,
  // zoomMax: number,
  // setCoatSize: (size: number) => void,
  // coatSize: 40,
};

const FiltersPane = ({

}: Props) => {
  const [activeMenu, setActiveMenu] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  // const zoomLevel = useSettingStore(state => state.zoomLevel);
  // const coatSize = useSettingStore(state => state.coatSize);
  // const { t } = useTranslation();

  const toggleMenu = (name: string) => () => setActiveMenu((v) => v === name ? '' : name); 

  return (
    <div>
      <Pane>
        <ButtonCircle onClick={() => setIsOpen(!isOpen)}>
          <IconMapMagnifyingGlass />
        </ButtonCircle>
        {isOpen && <>
          <span className="border-t" />
          <ButtonCircle onClick={toggleMenu('type')} isActive={activeMenu === 'type'}>
            <IconFlag />
          </ButtonCircle>
          <ButtonCircle onClick={toggleMenu('color')} isActive={activeMenu === 'color'}>
            <IconColor />
          </ButtonCircle>
          <ButtonCircle onClick={toggleMenu('animal')} isActive={activeMenu === 'animal'}>
            <IconAnimal />
          </ButtonCircle>
          <ButtonCircle onClick={toggleMenu('other')} isActive={activeMenu === 'other'}>
            <IconCrown />
          </ButtonCircle>
        </>}
      </Pane>
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
