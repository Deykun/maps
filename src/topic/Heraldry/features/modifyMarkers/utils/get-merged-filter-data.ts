import { ComplexManualMarker, MarkerParams } from "@/topic/Heraldry/types";

type Params = {
  initFilter: MarkerParams;
  include: ComplexManualMarker[];
  exclude: ComplexManualMarker[];
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

  return {
    ...initFilter,
    include: [...includeWithRemoved, ...rulesToInclude],
    exclude: [...excludeWithRemoved, ...rulesToExclude],
  };
};
