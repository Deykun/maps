import { useState, useEffect } from 'react';
import { AdministrativeUnit } from '@/topic/Heraldry/types';

import IconPlus from '@/components/Icons/IconPlus';
import IconMinus from '@/components/Icons/IconMinus';
import IconShieldCheck from '@/components/Icons/IconShieldCheck';
import IconNews from '@/components/Icons/IconNews';

import UiButton from './UiButton';

import { zoomMin, zoomMax } from './constants';

type Props = {
  selected?: AdministrativeUnit[],
  setZoomLevel?: (zoom: number) => void,
}

const UiRightSidebar = ({ setZoomLevel, selected = [] }: Props) => {
  const [isSelectedMenuOpen, setIsSelectedMenuOpen] = useState(false);
  // const { t } = useTranslation();

  useEffect(() => {
    setIsSelectedMenuOpen(false);
  }, [selected]);

  return (
    <div className="fixed top-3 bottom-3 right-3 flex flex-col justify-between pointer-events-none">
      <nav className="heraldry-ui-pane pointer-events-auto">
        <UiButton onClick={() => setZoomLevel((zoomLevel: number) => Math.min(zoomMax, zoomLevel + 1))}>
          <IconPlus />
        </UiButton>
        <UiButton onClick={() => setZoomLevel((zoomLevel: number) => Math.max(zoomMin, zoomLevel - 1))}>
          <IconMinus />
        </UiButton>
        <UiButton isDisabled={selected.length === 0} onClick={() => setIsSelectedMenuOpen(v => !v)}>
            <IconShieldCheck />
            {selected.length > 0 && <span className="heraldry-ui-button-marker">{selected.length}</span>}
        </UiButton>
        {isSelectedMenuOpen && <div className="heraldry-ui-pane absolute right-full max-h-[300px] w-[200px] overflow-auto top-0 mr-2">
          <ul>
            {selected.map(({ title, url }) => (
              <li key={title}>
                <a href={url} target="_blank" className="text-[12px] line-clamp-1">
                  {title}
                </a>
              </li>
            ))}
          </ul>
        </div>}
      </nav>
      <div className="heraldry-ui-pane pointer-events-auto">
        <UiButton>
          <IconNews />
        </UiButton>
      </div>
    </div>
  );
}

export default UiRightSidebar;
