import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import useOutsideClick from '@/hooks/useOutsideClick';

import IconFlask from '@/components/Icons/IconFlask';
import IconSelected from '@/components/Icons/IconSelected';
import IconSelectNew from '@/components/Icons/IconSelectNew';


import Pane from '@/components/UI/Pane';
import SubPane from '@/components/UI/SubPane';
import ButtonCircle from '@/components/UI/ButtonCircle';

import DevelopmentPaneAppFilters from './DevelopmentPane/DevelopmentPaneAppFilters';
import DevelopmentPaneCustomFilter from './DevelopmentPane/DevelopmentPaneCustomFilter';

type Props = {
  country: string,
  unitTypes: string[],
};

const DevelopmentPane = ({
  country,
  unitTypes,
}: Props) => {
  const [activeMenu, setActiveMenu] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

    // Not the nicest solution, but it works
    useOutsideClick('#development-pane', () => {
      setActiveMenu('');
    });
  
    useEffect(() => {
      if (!isOpen) {
        setActiveMenu('');
      }
    }, [isOpen])

  const toggleMenu = (name: string) => () => setActiveMenu((v) => v === name ? '' : name); 

  return (
    <div className="relative pointer-events-auto" id="development-pane">
      <Pane>
        <ButtonCircle onClick={() => setIsOpen(!isOpen)} isActive={isOpen} title={t('heraldry.titleFilters')}>
          <IconFlask />
        </ButtonCircle>
        {isOpen && <>
          <span className="border-t" />
          <ButtonCircle onClick={toggleMenu('filters')} isActive={activeMenu === 'filters'} title="App filters">
            <IconSelected />
          </ButtonCircle>
          <ButtonCircle onClick={toggleMenu('customFilter')} isActive={activeMenu === 'customFilter'} title="Create your own filter">
            <IconSelectNew />
          </ButtonCircle>
        </>}
      </Pane>
      {activeMenu === 'filters' && <DevelopmentPaneAppFilters country={country} />}
      {activeMenu === 'customFilter' && <DevelopmentPaneCustomFilter country={country} unitTypes={unitTypes} />}
    </div>
  );
}

export default DevelopmentPane;
