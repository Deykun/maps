import { MarkerParams } from '@/topic/Heraldry/types';


import { useFilterModificationStore } from '@/topic/Heraldry/features/modifyMarkers/stores/filtersModificationStore';

import DevelopmentPaneSnippet from '@/topic/Heraldry/components/Panes/DevelopmentPane/DevelopmentPaneSnippet';

import MergeMofificationButton from './MergeMofificationButton';

type Props = {
  className?: string,
  snippetClassName?: string,
  type: 'animal' | 'item',
  name: string,
  filter: MarkerParams,
  setDraftFilter: (v: MarkerParams) => void,
}

const FilterModifications = ({ className, snippetClassName, type, name, filter, setDraftFilter }: Props) => {
  const {
    include = [],
    exclude = [],
  } = useFilterModificationStore(state => state[type][name] || {});

  if (include.length === 0 && exclude.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      <div className="flex gap-2 justify-between items-center mb-1">
        <h5 className="text-[12px] font-[500] text-white">Modifications</h5>
        <MergeMofificationButton
          filter={filter}
          include={include}
          exclude={exclude}
          setDraftFilter={setDraftFilter}
        />
      </div>
      <DevelopmentPaneSnippet
        className={snippetClassName}
        include={include}
        exclude={exclude}
      />
    </div>
  );
};

export default FilterModifications;
