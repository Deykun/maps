import { create } from 'zustand';
import { devtools } from 'zustand/middleware'

import { CoatOfArmsMapData, AdministrativeUnitIndex, MarkerParams, MarkerParamsWithResult, ManualMarker, ComplexManualMarker } from '@/topic/Heraldry/types';

import { getHasMarker } from '@/topic/Heraldry/utils/markers/getMarker';

export const minLengthOfLongDescription = 70;

type FiltersModificationStoreState = {
  isModeActive: boolean,
  filter: MarkerParamsWithResult,
}

export const EMPTY_CUSTOM_FILTER: MarkerParams = {
  name: '',
  phrases: [],
  exclude: [],
  include: [],
};

export const useFilterModificationStore = create<FiltersModificationStoreState>()(
  devtools(
    () => ({
      // Is active locally by default
      isModeActive: window?.location?.href?.includes('localhost') || false,
      filter: {
        ...EMPTY_CUSTOM_FILTER,
        isActive: false,
        result: [],
      },
    } as FiltersModificationStoreState),
    { name: 'filtersModificationStore' },
  )
)

export default useFilterModificationStore;
