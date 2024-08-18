import { AdministrativeUnit } from '@/topic/Heraldry/types';

import { zoomMin, zoomMax } from './constants';

import IconPlus from '@/components/Icons/IconPlus';
import IconMinus from '@/components/Icons/IconMinus';
import IconShieldCheck from '@/components/Icons/IconShieldCheck';
import IconNews from '@/components/Icons/IconNews';

import UiButton from './UiButton';

type Props = {
  selected?: AdministrativeUnit[],
  setZoomLevel?: (zoom: number) => void,
}

const UiRightSidebar = ({ setZoomLevel, selected = [] }: Props) => {
  // const { t } = useTranslation();

  return (
    <div className="fixed top-3 bottom-3 right-3 flex flex-col justify-between pointer-events-none">
      <nav className="heraldry-ui-pane pointer-events-auto">
        <UiButton onClick={() => setZoomLevel((zoomLevel: number) => Math.min(zoomMax, zoomLevel + 1))}>
          <IconPlus />
        </UiButton>
        <UiButton onClick={() => setZoomLevel((zoomLevel: number) => Math.max(zoomMin, zoomLevel - 1))}>
          <IconMinus />
        </UiButton>
        <UiButton>
            <IconShieldCheck />
            {selected.length > 0 && <span className="heraldry-ui-button-marker">{selected.length}</span>}
        </UiButton>
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
