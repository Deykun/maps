import {
  ComplexManualMarker,
  ManualMarker,
  MarkerParams,
} from "@/topic/Heraldry/types";

type Params = {
  initFilter: MarkerParams;
  include: ComplexManualMarker[];
  exclude: ComplexManualMarker[];
};

const sortRules = (a?: ManualMarker, b?: ManualMarker) => {
  if (typeof a === "string" && typeof b === "string") {
    return a.localeCompare(b);
  }

  if (
    typeof (a as ComplexManualMarker)?.imageHash === "string" &&
    typeof (b as ComplexManualMarker)?.imageHash === "string"
  ) {
    return (a as ComplexManualMarker).imageHash.localeCompare(
      (b as ComplexManualMarker).imageHash
    );
  }

  return 0;
};

export const getMergedFilterData = ({
  initFilter,
  include,
  exclude,
}: Params): MarkerParams => {
  const hashesIncluded = (initFilter.include || [])
    .map((ruleToCheck) =>
      typeof ruleToCheck === "string" ? "" : ruleToCheck.imageHash
    )
    .filter(Boolean);
  const hashesExcluded = (initFilter.exclude || [])
    .map((ruleToCheck) =>
      typeof ruleToCheck === "string" ? "" : ruleToCheck.imageHash
    )
    .filter(Boolean);

  const hashesToRemove = [...include, ...exclude].map(
    ({ imageHash }) => imageHash
  );
  const titlesToRemove = [...include, ...exclude].map(({ note }) => note);

  const rulesToInclude = include.filter(
    ({ imageHash }) => !hashesExcluded.includes(imageHash)
  );
  const rulesToExclude = exclude.filter(
    ({ imageHash }) => !hashesIncluded.includes(imageHash)
  );

  const includeWithRemoved = (initFilter.include || []).filter((ruleToCheck) =>
    typeof ruleToCheck === "string"
      ? !titlesToRemove.includes(ruleToCheck)
      : !hashesToRemove.includes(ruleToCheck.imageHash)
  );

  const excludeWithRemoved = (initFilter.exclude || []).filter((ruleToCheck) =>
    typeof ruleToCheck === "string"
      ? !titlesToRemove.includes(ruleToCheck)
      : !hashesToRemove.includes(ruleToCheck.imageHash)
  );

  console.log({
    rulesToInclude,
    rulesToExclude,
  })

  return {
    ...initFilter,
    phrases: initFilter.phrases?.sort((a, b) => a.localeCompare(b)),
    include: [...includeWithRemoved, ...rulesToInclude].sort(sortRules),
    exclude: [...excludeWithRemoved, ...rulesToExclude].sort(sortRules),
  };
};
