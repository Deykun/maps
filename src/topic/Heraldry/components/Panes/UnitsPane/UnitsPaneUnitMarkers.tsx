import clsx from 'clsx';

import { CoatOfArmsMapData } from '@/topic/Heraldry/types';

import IconAnimal from '@/components/Icons/IconAnimal';
import IconBuilding from '@/components/Icons/IconBuilding';
import IconScriptBroken from '@/components/Icons/IconScriptBroken';
import IconCrown from '@/components/Icons/IconCrown';

import UnitsPaneUnitMarkersList from './UnitsPaneUnitMarkersList';

import useGetUnitMarkersFromCache from '@/topic/Heraldry/features/modify/hooks/useGetUnitMarkersFromCache';

type Props = {
  className?: string,
  unit: CoatOfArmsMapData,
  shouldShowContentAsTooltip?: boolean,
  shouldShowTypes?: boolean,
}

const UnitsPaneUnitMarkers = ({ className, unit, shouldShowContentAsTooltip = false, shouldShowTypes = true }: Props) => {
  const {
    animals,
    items,
  } = useGetUnitMarkersFromCache(unit, unit.country);

  const hasContent = animals.length > 0 || items.length > 0 || unit.type.length > 0;

  if (!hasContent) {
    return null;
  }

  return (
    <p
      className={clsx(
        'flex flex-wrap justify-center gap-4',
        'text-[10px]',
        {
          'inline-flex text-ui-contrast': shouldShowContentAsTooltip,
          'flex text-ui-dark-contrast': !shouldShowContentAsTooltip,
          [className || '']: className,
        }
      )}
    >
      <UnitsPaneUnitMarkersList
        list={animals}
        listTitle="heraldry.animal.filterTitle"
        listElementPrefix="heraldry.animal"
        icon={({ className }) => <IconAnimal className={className} animals={animals} />}
        shouldShowContentAsTooltip={shouldShowContentAsTooltip}
      />
      <UnitsPaneUnitMarkersList
        list={items}
        listTitle="heraldry.item.filterTitle"
        listElementPrefix="heraldry.item"
        icon={IconCrown}
        shouldShowContentAsTooltip={shouldShowContentAsTooltip}
      />
      {shouldShowTypes && <UnitsPaneUnitMarkersList
        list={unit.type}
        listTitle="heraldry.unit.filterTitle"
        listElementPrefix={`heraldry.unit.type.${unit.country}`}
        icon={unit.type.some((v) => !v.startsWith('former')) ? IconBuilding : IconScriptBroken}
        shouldShowContentAsTooltip={shouldShowContentAsTooltip}
      />}
    </p>
  );
};

export default UnitsPaneUnitMarkers;
