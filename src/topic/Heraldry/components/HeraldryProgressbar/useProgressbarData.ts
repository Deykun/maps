import { useProgressStore } from '@/topic/Heraldry/stores/progressStore';

export default function useProgressbarData(type: ('loading' | 'all') = 'loading') {
  const fetchingTexts = useProgressStore(state => state.fetchingTexts);
  const processingTexts = useProgressStore(state => state.processingTexts);
  const fetchingImages = useProgressStore(state => state.fetchingImages);
  const fetchingFilters = useProgressStore(state => state.fetchingFilters);
  const processingMap = useProgressStore(state => state.processingMap);

  const fetchingSummary: [number, number, string][] = [
    [fetchingTexts.values.length, fetchingTexts.totals.length, 'fetchingTexts'],
    [processingTexts.value, processingTexts.total, 'processingTexts'],
    [fetchingImages.values.length, fetchingImages.totals.length, 'fetchingImages'],
    [fetchingFilters.values.length, fetchingFilters.totals.length, 'fetchingFilters'],
    [processingMap.value, processingMap.total, 'processingMap'],
  ];

  const allProgresses: {
    label: string,
    value: number,
    total: number,
  }[] = fetchingSummary.map(([value, total, label]) => ({ label, value, total }));

  if (type === 'loading') {
    const fetchingProgresses = allProgresses.filter(({ value, total }) => value < total);
    const { value = 1, total = 1 } = fetchingProgresses[0] || {};

    return ({
      firstValue: value,
      firstTotal: total,
      progresses: fetchingProgresses,
    });
  }

  const { value = 1, total = 1 } = allProgresses[0] || {};

  return ({
    firstValue: value,
    firstTotal: total,
    progresses: allProgresses, 
  });
};
