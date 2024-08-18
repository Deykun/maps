import { useState, useEffect } from 'react';
import { AdministrativeUnit } from '@/topic/Heraldry/types';

import IconShieldCheck from '@/components/Icons/IconShieldCheck';
import IconNews from '@/components/Icons/IconNews';

import UiButton from './UiButton';
import UiPanes from './UiPanes/UiZoom';

type Props = {
  selected?: AdministrativeUnit[],
}

const UiRightSidebar = ({ selected = [] }: Props) => {
  const [isSelectedMenuOpen, setIsSelectedMenuOpen] = useState(false);
  // const { t } = useTranslation();

  useEffect(() => {
    setIsSelectedMenuOpen(false);
  }, [selected]);

  return (
    <div className="fixed top-3 bottom-3 right-3 flex flex-col gap-3 pointer-events-none">
      <UiPanes />
      <nav className="heraldry-ui-pane pointer-events-auto">
        <UiButton isDisabled={selected.length === 0} isActive={isSelectedMenuOpen} onClick={() => setIsSelectedMenuOpen(v => !v)}>
            <IconShieldCheck />
            {selected.length > 0 && <span className="heraldry-ui-button-marker">{selected.length}</span>}
        </UiButton>
        {isSelectedMenuOpen && <div className="heraldry-ui-pane absolute right-full max-h-[300px] w-[300px] overflow-auto top-0 mr-2">
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
      <div className="heraldry-ui-pane pointer-events-auto mt-auto">
        <UiButton>
          <IconNews />
        </UiButton>
      </div>
    </div>
  );
}

export default UiRightSidebar;
