import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";

import useQueryFiltersSeeds from "@/topic/Heraldry/features/modify/hooks/useQueryFiltersSeeds";

type Props = {
  country: string;
  setSelected: (
    selected:
      | {
          type: "type" | "animal" | "item";
          name: string;
        }
      | undefined
  ) => void;
};

const FilterSelect = ({ country, setSelected }: Props) => {
  const { t } = useTranslation();
  const { isLoading, data } = useQueryFiltersSeeds({ country });

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      if (!data) {
        setSelected(undefined);

        return;
      }

      const value = event.target.value || "";
      const [type, name] = value.split("-");

      if (["type", "animal", "item"].includes(type)) {
        setSelected({
          type: type as "type" | "animal" | "item",
          name,
        });

        return;
      }

      setSelected(undefined);
    },
    [data]
  );

  return (
    <select
      disabled={isLoading}
      onChange={handleChange}
      className="block w-full bg-ui-contrast text-ui-dark placeholder-ui-dark caret-marker rounded-[8px] py-2 px-4"
    >
      <option>Pick filter</option>
      {data && (
        <>
          {data.types
            .sort((a, b) =>
              `${t(`heraldry.unit.type.${country}.${a.name}`)}`.localeCompare(
                `${t(`heraldry.unit.type.${country}.${b.name}`)}`
              )
            )
            .map(({ name }) => (
              <option key={name} value={`type-${name}`}>
                {t(`heraldry.unit.type.${country}.${name}`)} (
                {t("heraldry.unit.filterTitle")})
              </option>
            ))}
          {data.animals
            .sort((a, b) =>
              `${t(`heraldry.animal.${a.name}`)}`.localeCompare(
                `${t(`heraldry.animal.${b.name}`)}`
              )
            )
            .map(({ name }) => (
              <option key={name} value={`animal-${name}`}>
                {t(`heraldry.animal.${name}`)} (
                {t("heraldry.animal.filterTitle")})
              </option>
            ))}
          {data.items
            .sort((a, b) =>
              `${t(`heraldry.item.${a.name}`)}`.localeCompare(
                `${t(`heraldry.item.${b.name}`)}`
              )
            )
            .map(({ name }) => (
              <option key={name} value={`item-${name}`}>
                {t(`heraldry.item.${name}`)} ({t("heraldry.item.filterTitle")})
              </option>
            ))}
        </>
      )}
    </select>
  );
};

export default memo(FilterSelect);
