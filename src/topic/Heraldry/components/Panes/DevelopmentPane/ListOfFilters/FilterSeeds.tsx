import { memo } from "react";

import IconCopy from "@/components/Icons/IconCopy";
import IconSelected from "@/components/Icons/IconSelected";
import {
  useFilterModificationStore,
  selectShortcuts,
} from "@/topic/Heraldry/features/modifyMarkers/stores/filtersModificationStore";
import ButtonText from "@/components/UI/ButtonText";
import { copyText } from "@/utils/text";
import useQueryFiltersSeeds from "@/topic/Heraldry/features/modify/hooks/useQueryFiltersSeeds";
import { MarkerParams } from "@/topic/Heraldry/types";
import { getMergedFilterData } from "@/topic/Heraldry/features/modifyMarkers/utils/get-merged-filter-data";

type Props = {
  country: string;
};

const FilterSeeds = ({ country }: Props) => {
  const shortcuts = useFilterModificationStore((state) =>
    selectShortcuts(state, 500)
  );
  const { data } = useQueryFiltersSeeds({ country });

  const handleClickCopy = () => {
    if (!data) {
      return;
    }

    const modifications = useFilterModificationStore.getState();

    const newData: {
      types: MarkerParams[];
      animals: MarkerParams[];
      items: MarkerParams[];
    } = JSON.parse(JSON.stringify(data));

    shortcuts.forEach(({ type, name }) => {
      let typeKey: "animals" | "items" | undefined;
      if (type === "animal") {
        typeKey = "animals";
      } else if (type === "item") {
        typeKey = "items";
      }

      if (typeKey) {
        const { include = [], exclude = [] } = modifications[type][name] || {};

        if (newData[typeKey].some((filter) => filter.name === name)) {
          newData[typeKey] = newData[typeKey].map((filter) => {
            if (filter.name === name) {
              return getMergedFilterData({
                initFilter: filter,
                include,
                exclude,
              });
            }

            return filter;
          });
        } else {
          newData[typeKey].push({
            name,
            phrases: [],
            include,
            exclude,
          });
        }
      }
    });

    newData.types = newData.types
      .map((filter) => {
        return {
          ...filter,
          phrases: filter.phrases?.sort((a, b) => a.localeCompare(b)),
        };
      })
      .sort((a, b) => a.name.localeCompare(b.name));

    newData.animals = newData.animals
      .map((filter) => {
        return {
          ...filter,
          phrases: filter.phrases?.sort((a, b) => a.localeCompare(b)),
        };
      })
      .sort((a, b) => a.name.localeCompare(b.name));

    newData.items = newData.items
      .map((filter) => {
        return {
          ...filter,
          phrases: filter.phrases?.sort((a, b) => a.localeCompare(b)),
        };
      })
      .sort((a, b) => a.name.localeCompare(b.name));
    copyText(JSON.stringify(newData, null, 2));
  };

  return (
    <div className="flex gap-2">
      <h3 className="flex gap-3 items-center text-[14px]">
        <IconSelected className="size-5 text-white" />
        <span>Filters seeds</span>
      </h3>
      <ButtonText
        wrapperClassName="ml-auto"
        onClick={handleClickCopy}
        size="small"
        isActive
      >
        <span>Copy seed</span>
        <IconCopy />
      </ButtonText>
    </div>
  );
};

export default memo(FilterSeeds);
