import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { MarkerParamsWithResult } from '@/topic/Heraldry/types';


import useEffectChange from '@/hooks/useEffectChange';
import useOutsideClick from '@/hooks/useOutsideClick';

import IconEraser from '@/components/Icons/IconEraser';
import IconFlask from '@/components/Icons/IconFlask';
import IconSelected from '@/components/Icons/IconSelected';
import IconSelectNew from '@/components/Icons/IconSelectNew';

import Pane from '@/components/UI/Pane';
import ButtonCircle from '@/components/UI/ButtonCircle';

import DevelopmentPaneAppFilters from './DevelopmentPane/DevelopmentPaneAppFilters';
import DevelopmentPaneCustomFilter from './DevelopmentPane/DevelopmentPaneCustomFilter';

type Props = {
  country: string,
  unitTypes: string[],
  customFilter?: MarkerParamsWithResult,
  setCustomFilter: (filter?: MarkerParamsWithResult) => void
  unitNameForAction: string,
};

const DevelopmentPane = ({
  country,
  unitTypes,
  customFilter,
  setCustomFilter,
  unitNameForAction,
}: Props) => {
  const [activeCustomAction, setActiveCustomAction] = useState<undefined | 'plus' | 'minus'>(undefined);
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
  }, [isOpen]);

  useEffect(() => {
    if (!customFilter) {
      setActiveCustomAction(undefined);
    }
  }, [customFilter]);

  useEffectChange(() => {
    if (customFilter && unitNameForAction) {
      if (activeCustomAction === 'minus') {
        setCustomFilter({
          ...customFilter,
          exclude: Array.from(new Set([...(customFilter.exclude || []), unitNameForAction])),
          include: (customFilter.include || []).filter((unitName) => unitNameForAction !== unitName),
        });
      }

      if (activeCustomAction === 'plus') {
        setCustomFilter({
          ...customFilter,
          exclude: (customFilter.exclude || []).filter((unitName) => unitNameForAction !== unitName),
          include: Array.from(new Set([...(customFilter.include || []), unitNameForAction])),
        });
      }
    }
  }, [unitNameForAction])

  const toggleMenu = (name: string) => () => setActiveMenu((v) => v === name ? '' : name);

  const hasActive = Boolean(customFilter); 

  return (
    <div className="relative pointer-events-auto" id="development-pane">
      <Pane>
        <ButtonCircle onClick={() => setIsOpen(!isOpen)} isActive={isOpen} title={t('heraldry.titleFilters')}>
          <IconFlask />
          <span className="ui-button-circle-marker empty:hidden">
            {activeCustomAction === 'minus' && '-'}
            {activeCustomAction === 'plus' && '+'}
            {!activeCustomAction && hasActive && '✓'}
          </span>
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
        {hasActive && <>
          <span className="border-t" />
          <ButtonCircle onClick={() => setCustomFilter()}>
            <IconEraser />
          </ButtonCircle>
        </>}
      </Pane>
      {activeMenu === 'filters' &&
        <DevelopmentPaneAppFilters
          country={country}
          setCustomFilter={setCustomFilter}
        />
      }
      {activeMenu === 'customFilter' &&
        <DevelopmentPaneCustomFilter
          country={country}
          unitTypes={unitTypes}
          customFilter={customFilter}
          setCustomFilter={setCustomFilter}
          activeCustomAction={activeCustomAction}
          setActiveCustomAction={setActiveCustomAction}
        />
      }
    </div>
  );
}

export default DevelopmentPane;
