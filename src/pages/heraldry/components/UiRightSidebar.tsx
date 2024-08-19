import { useState, useEffect } from 'react';
import { AdministrativeUnit } from '@/topic/Heraldry/types';

import IconNews from '@/components/Icons/IconNews';

import UiButton from './UiButton';
import UiPanes from './UiPanes/UiZoom';
import UiSelected from './UiPanes/UiSelected';

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
      <UiSelected selected={selected} />
      <div className="heraldry-ui-pane pointer-events-auto mt-auto">
        <UiButton>
          <IconNews />
        </UiButton>
      </div>
    </div>
  );
}

export default UiRightSidebar;
