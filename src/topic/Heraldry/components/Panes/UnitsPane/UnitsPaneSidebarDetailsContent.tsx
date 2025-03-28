import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import { getImageSrcSet } from '@/utils/image';

import {
  useFiltersDevelopmentStore,
} from '@/topic/Heraldry/stores/filtersDevelopmentStore';

import {
  showUnitOnMap,
} from '@/topic/Heraldry/stores/cursorStore';

import Image from '@/components/Image/Image';

import IconBook from '@/components/Icons/IconBook';
import IconMarker from '@/components/Icons/IconMarker';
import IconUndo from '@/components/Icons/IconUndo';

import Panel from '@/components/UI/Panel';
import ButtonText from '@/components/UI/ButtonText';

import useUnitsPaneStore, { setDetailsUnit } from '@/topic/Heraldry/stores/unitsPaneStore';

import AddOrRemoveMarkers from '@/topic/Heraldry/features/modifyMarkers/components/AddOrRemoveMarkers/AddOrRemoveMarkers'

import UnitsPaneSelectCheckbox from './UnitsPaneSelectCheckbox';

import UnitsPaneUnitColors from './UnitsPaneUnitColors';
import UnitsPaneUnitDescription from './UnitsPaneUnitDescription';
import UnitsPaneUnitMarkers from './UnitsPaneUnitMarkers';


const UnitsPaneSidebarDetailsContent = () => {
  const isFiltersDevModeActive = useFiltersDevelopmentStore((state) => state.isModeActive);
  const unit = useUnitsPaneStore(state => state.details);
  
  const { t } = useTranslation();

  if (!unit) {
    return null;
  }

  const { title, url, imagesList, place } = unit;

  return (
    <>
      <div className="flex justify-between items-center gap-2">
        <ButtonText
          onClick={() => setDetailsUnit(undefined)}
        >
          <IconUndo />
          <span>{t('heraldry.list.title')}</span>
        </ButtonText>
        <UnitsPaneSelectCheckbox
          wrapperClassName="ml-auto"
          className="[&_svg]:!fill-ui !bg-transparent"
          unit={unit}
        />
        <span className="text-ui-dark-contrast text-[10px] text-right pr-2">
          id: <span className="text-white">{unit.id}</span>    
          {unit.mergedIds && <>
            <br />
            <small className="line-clamp-1">
              {unit.mergedIds.join(', ')}
            </small>
          </>}
        </span>
      </div>
      <Panel className="ui-panel--rounded-l ui-panel--rounded-r">
        <span className="relative block size-full aspect-square mb-2">
          <Image
            src={imagesList?.[0].path}
            srcSet={getImageSrcSet(imagesList)}
            className="size-full object-contain p-2 rounded-[8px] bg-white"
            alt=""
          />
          {isFiltersDevModeActive &&
            <div className={clsx(
              'absolute bottom-0 left-0',
              'flex gap-1 p-1',
              'opacity-10 saturate-0 hover:saturate-100 hover:opacity-100 duration-150',
            )}>
              <UnitsPaneUnitColors id={unit.id} country={unit.country} labelPosition="bottomRight" shouldShowOnlyRejected />  
            </div>
          }
          <div className={clsx(
            'absolute bottom-0 right-0',
            'flex gap-1 p-1',
          )}>
            <UnitsPaneUnitColors id={unit.id} country={unit.country} labelPosition="bottomLeft" />  
          </div>
        </span>
        <h3 className="w-full px-2 text-center text-[18px] font-[500] tracking-wide text-white duration-300">
          {title}
        </h3>
      </Panel>
      <div className="flex gap-1 justify-center">
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
      <UnitsPaneUnitMarkers unit={unit} />
      <AddOrRemoveMarkers unit={unit} />
      <UnitsPaneUnitDescription id={unit.id} country={unit.country} mergedIds={unit.mergedIds} />
    </>
  );
};

export default UnitsPaneSidebarDetailsContent;
