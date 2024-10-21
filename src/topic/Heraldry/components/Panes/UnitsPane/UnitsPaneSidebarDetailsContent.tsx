import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { CoatOfArmsMapData } from '@/topic/Heraldry/types';
import { colorsMarkersByNames } from '@/topic/Heraldry/constants';

import { getImageSrcSet } from '@/utils/image';

import {
  useFiltersDevelopmentStore,
} from '@/topic/Heraldry/stores/filtersDevelopmentStore';

import {
  showUnitOnMap,
} from '@/topic/Heraldry/stores/cursorStore';

import IconAnimal from '@/components/Icons/IconAnimal';
import IconBook from '@/components/Icons/IconBook';
import IconMarker from '@/components/Icons/IconMarker';
import IconMinusMagnifyingGlass from '@/components/Icons/IconMinusMagnifyingGlass';
import IconLink from '@/components/Icons/IconLink';
import IconWikipedia from '@/components/Icons/IconWikipedia'
import IconUndo from '@/components/Icons/IconUndo';


import Panel from '@/components/NewUI/Panel';
import ButtonIcon from '@/components/NewUI/ButtonIcon';
import ButtonText from '@/components/NewUI/ButtonText';

import ButtonCircle from '@/components/UI/ButtonCircle';

import DevelopmentActions from '@/topic/Heraldry/components/DevelopmentActions/DevelopmentActions';

import UnitsPaneUnitDescription from './UnitsPaneUnitDescription';
import UnitsPaneUnitMarkers from './UnitsPaneUnitMarkers';
import UnitsPaneUnitColors from './UnitsPaneUnitColors';

type Props = {
  className?: string,
  unit: CoatOfArmsMapData,
  setDetailsUnit: (unit: CoatOfArmsMapData | undefined) => void,
}

const UnitsPaneSidebarDetailsContent = ( { unit, setDetailsUnit }: Props) => {
  const isFiltersDevModeActive = useFiltersDevelopmentStore((state) => state.isModeActive);
  const { title, url, imagesList, place } = unit;
  
  const { t } = useTranslation();

  return (
    <>
      <div className="flex justify-between items-center">
        <ButtonText
          onClick={() => setDetailsUnit(undefined)}
        >
          <IconUndo />
          <span>{t('heraldry.list.title')}</span>
        </ButtonText>

        <span className="text-ui-dark-contrast text-[10px] pr-2">
          id: {unit.id}
        </span>
      </div>
      <Panel className="ui-panel--rounded-l ui-panel--rounded-r">
        <span className="relative block size-full aspect-square mb-2">
          <img
            src={imagesList?.[0].path}
            srcSet={getImageSrcSet(imagesList)}
            className="size-full object-contain p-2 rounded-[8px] bg-white"
            alt=""
          />
          {isFiltersDevModeActive &&
            <div className={clsx(
              'absolute bottom-0 left-0',
              'flex gap-1 p-1',
            )}>
              <UnitsPaneUnitColors id={unit.id} country={unit.lang} labelPosition="right" shouldShowOnlyRejected />  
            </div>
          }
          <div className={clsx(
            'absolute bottom-0 right-0',
            'flex gap-1 p-1',
          )}>
            <UnitsPaneUnitColors id={unit.id} country={unit.lang} labelPosition="left" />  
          </div>
        </span>
        <h3 className="w-full px-2 text-center text-[18px] font-[500] tracking-wide text-white duration-300">
          {title}
        </h3>
      </Panel>
      <div className="text-center">
        <ButtonText
          size="small"
          href={url}
          target="_blank"
        >
          <IconBook />
          <span>Wikipedia</span>
        </ButtonText>
        <ButtonText
          size="small"
          onClick={() => showUnitOnMap(unit.id)}
        >
          <IconMarker />
          <span>{t('heraldry.item.showOnMap')}</span>
        </ButtonText>
      </div>
      <Panel className="ui-panel--rounded-l ui-panel--rounded-r">
        <p className="text-[12px] text-center">
          {place?.name || t('heraldry.item.noLocation')}
        </p>
      </Panel>
      <DevelopmentActions
        unit={unit}
        buttonSize="small"
        labelPositions="top"
      />
      <UnitsPaneUnitMarkers id={unit.id} country={unit.lang} />
      <UnitsPaneUnitDescription id={unit.id} country={unit.lang} />
    </>
  );
};

export default UnitsPaneSidebarDetailsContent;
