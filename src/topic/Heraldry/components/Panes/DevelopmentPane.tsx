import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import useOutsideClick from '@/hooks/useOutsideClick';

import IconFlask from '@/components/Icons/IconFlask';
import IconPacakgeChecked from '@/components/Icons/IconPacakgeChecked';
import IconPackageMagnifyingGlass from '@/components/Icons/IconPackageMagnifyingGlass';


import Pane from '@/components/UI/Pane';
import SubPane from '@/components/UI/SubPane';
import ButtonCircle from '@/components/UI/ButtonCircle';

type Props = {
  lang: string,
};

const DevelopmentPane = ({
  lang,
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
            <IconPacakgeChecked />
          </ButtonCircle>
          <ButtonCircle onClick={toggleMenu('customFilter')} isActive={activeMenu === 'customFilter'} title="Create your own filter">
            <IconPackageMagnifyingGlass />
          </ButtonCircle>
        </>}
      </Pane>
      {activeMenu === 'filters' && <Pane className="fixed left-12 mt-3 w-[400px] top-0 ml-6">
        <h3 className="flex gap-3 items-center">
          <IconPacakgeChecked className="size-5" />
          <span>
            App filters
          </span>
        </h3>
        <div className="sans text-[12px] tracking-wide text-justify flex flex-col gap-2">
          <p>If you see a filter for eagle, crown, or anchor, it's based on the description of the coat of arms scraped from Wikipedia.</p>
          <p>For the <strong>'apple'</strong> filter, we can use phrases like <strong>'apple', 'apples'</strong> and if the description contains one of those words, the coat of arms will be marked accordingly.</p>
          <p>This method isn't ideal (for example, sometimes the text describes a previous version of the coat of arms). The 'excludes' and 'includes' options allow us to manually remove or add specific coat of arms.</p>
        </div>
      </Pane>}
    </div>
  );
}

export default DevelopmentPane;
