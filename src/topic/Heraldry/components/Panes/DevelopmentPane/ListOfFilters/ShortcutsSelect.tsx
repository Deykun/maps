import { memo } from "react";
import { useTranslation } from "react-i18next";

import IconEraser from "@/components/Icons/IconEraser";
import IconAnimal from "@/components/Icons/IconAnimal";
import IconCrown from "@/components/Icons/IconCrown";

import ButtonText from "@/components/UI/ButtonText";
import {
  useFilterModificationStore,
  selectShortcuts,
  resetModifications,
} from "@/topic/Heraldry/features/modifyMarkers/stores/filtersModificationStore";

import { SelectState } from "../DevelopmentPaneSidebarListOfFilters";

type Props = {
  selected: SelectState,
  setSelected: (selected: SelectState) => void;
};

const ShortcutsSelect = ({ selected, setSelected }: Props) => {
  const { t } = useTranslation();
  const shortcuts = useFilterModificationStore((state) =>
    selectShortcuts(state, 100)
  );

  if (shortcuts.length === 0) {
    return null;
  }

  return (
    <div className="flex gap-2 flex-wrap">
      <ButtonText size="small" onClick={resetModifications}>
        <IconEraser />
        <span>{t("heraldry.list.clear")}</span>
      </ButtonText>
      {shortcuts.map(({ name, type, total }) => (
        <ButtonText
          size="small"
          key={name}
          onClick={() => setSelected({ name, type })}
          isActive={selected?.name === name && selected?.type === type}
        >
          {type === "animal" ? <IconAnimal animals={[name]} /> : <IconCrown />}
          <span>
            {t(`heraldry.${type}.${name}`)} <small>({total})</small>
          </span>
        </ButtonText>
      ))}
    </div>
  );
};

export default memo(ShortcutsSelect);
