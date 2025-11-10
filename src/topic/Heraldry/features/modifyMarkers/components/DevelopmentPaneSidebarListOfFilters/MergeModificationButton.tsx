import { MarkerParams, ComplexManualMarker } from "@/topic/Heraldry/types";
import { useTranslation } from "react-i18next";

import { copyText } from "@/utils/text";

import IconCopy from "@/components/Icons/IconCopy";
import IconSelectNew from "@/components/Icons/IconSelectNew";

import ButtonText from "@/components/UI/ButtonText";
import { getMergedFilterData } from "../../utils/get-merged-filter-data";

type Props = {
  filter: MarkerParams;
  include: ComplexManualMarker[];
  exclude: ComplexManualMarker[];
  setDraftFilter: (v: MarkerParams) => void;
};

const MergeModificationButton = ({
  filter: initFilter,
  include,
  exclude,
  setDraftFilter,
}: Props) => {
  const { t } = useTranslation();

  const handleClick = () => {
    const mergedFilter = getMergedFilterData({
      initFilter,
      include,
      exclude,
    });

    setDraftFilter(mergedFilter);
  };

  const handleCopyFiler = () => {
    const mergedFilter = getMergedFilterData({
      initFilter,
      include,
      exclude,
    });

    copyText(`${JSON.stringify(mergedFilter, null, 4)},`);
  };

  return (
    <>
      <ButtonText size="small" onClick={handleCopyFiler}>
        <span>{t("main.copy")}</span>
        <IconCopy />
      </ButtonText>
      <ButtonText
        size="small"
        onClick={handleClick}
        wrapperClassName="ml-auto"
        isActive
      >
        <span>Use</span>
        <IconSelectNew />
      </ButtonText>
    </>
  );
};

export default MergeModificationButton;
