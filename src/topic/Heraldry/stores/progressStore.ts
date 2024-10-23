import { create } from 'zustand';
import { devtools } from 'zustand/middleware'

type FechtingProgress = {
  values: string[],
  totals: string[],
}

type ProcessingProgress = {
  value: number,
  total: number,
}

type ProgressStoreState = {
  fetchingTexts: FechtingProgress,
  processingTexts: ProcessingProgress,
  fetchingImages: FechtingProgress,
  processingMap: ProcessingProgress,
  fetchingFilters: FechtingProgress,
};

const emptyFetchingProgress: FechtingProgress = { values: [], totals: [] };
const emptyProcessingProgress: ProcessingProgress = { value: 0, total: 0 };

export const useProgressStore = create<ProgressStoreState>()(
  devtools(() => ({
      fetchingTexts: emptyFetchingProgress,
      processingTexts: emptyProcessingProgress,
      fetchingImages: emptyFetchingProgress,
      processingMap: emptyProcessingProgress,
      fetchingFilters: emptyFetchingProgress,
    } as ProgressStoreState),
  { name: 'progressStore' })
);

export const getUpdateTotalProcessingData = (name: 'processingTexts' | 'processingMap') =>
  ({ value, total }: { value: number, total: number }) => {
    useProgressStore.setState((state) => ({
      ...state,
      [name]: {
        value,
        total,
      },
    })
  );
};

export const getUpdateTotalFetchingData = (name: 'fetchingTexts' | 'fetchingImages' | 'fetchingFilters', { shouldKeepValues = false } = {}) =>
  (totals: string[]) => {
    useProgressStore.setState((state) => ({
      ...state,
      [name]: {
        values: shouldKeepValues ? state[name].values : [],
        totals,
      },
    })
  );
};

export const getUpdateValueFetchingData = (name: 'fetchingTexts' | 'fetchingImages' | 'fetchingFilters') =>
  (value: string) => {
    useProgressStore.setState((state) => ({
      ...state,
      [name]: {
        values: [...new Set([...state[name].values, value])],
        totals: state[name].totals,
      },
    })
  );
};

// - - - 

export const updateTotalsForTexts = getUpdateTotalFetchingData('fetchingTexts');

export const updateProcessingTexts = getUpdateTotalProcessingData('processingTexts');

export const updateValueForTexts = getUpdateValueFetchingData('fetchingTexts');

export const updateTotalsForImages = getUpdateTotalFetchingData('fetchingImages', { shouldKeepValues: true });

export const updateValueForImages = getUpdateValueFetchingData('fetchingImages');

export const updateProcessingMap = getUpdateTotalProcessingData('processingMap');

export const updateTotalsForFilters = getUpdateTotalFetchingData('fetchingFilters');

export const updateValueForFilters = getUpdateValueFetchingData('fetchingFilters');

export default useProgressStore;