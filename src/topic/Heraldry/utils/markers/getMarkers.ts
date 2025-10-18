import { getMarkers as getMarkersDE } from "./country/de";
import { getMarkers as getMarkersDK } from "./country/dk";
import { getMarkers as getMarkersET } from "./country/et";
import { getMarkers as getMarkersFI } from "./country/fi";
import { getMarkers as getMarkersNL } from "./country/nl";
import { getMarkers as getMarkersNO } from "./country/no";
import { getMarkers as getMarkersPL } from "./country/pl";

export const getMarkers = ({
  text: rawText = "",
  title,
  imageHash,
  country,
}: {
  text: string;
  title: string;
  imageHash: string;
  country: string;
}) => {
  let types: string[] = [];
  let animals: string[] = [];
  let items: string[] = [];

  if (country === "de") {
    const response = getMarkersDE({ text: rawText, title, imageHash });

    types = response.types;
    animals = response.animals;
    items = response.items;
  }

  if (country === "dk") {
    const response = getMarkersDK({ text: rawText, title, imageHash });

    types = response.types;
    animals = response.animals;
    items = response.items;
  }

  if (country === "et") {
    const response = getMarkersET({ text: rawText, title, imageHash });

    types = response.types;
    animals = response.animals;
    items = response.items;
  }

  if (country === "fi") {
    const response = getMarkersFI({ text: rawText, title, imageHash });

    types = response.types;
    animals = response.animals;
    items = response.items;
  }

  if (country === "nl") {
    const response = getMarkersNL({ text: rawText, title, imageHash });

    types = response.types;
    animals = response.animals;
    items = response.items;
  }

  if (country === "no") {
    const response = getMarkersNO({ text: rawText, title, imageHash });

    types = response.types;
    animals = response.animals;
    items = response.items;
  }

  if (country === "pl") {
    const response = getMarkersPL({ text: rawText, title, imageHash });

    types = response.types;
    animals = response.animals;
    items = response.items;
  }

  if (
    !animals.includes("bird") &&
    animals.some((active) =>
      [
        "crane",
        "cormorant",
        "duck",
        "eagle",
        "falcon",
        "capercaillie",
        "goose",
        "gull",
        "grouse",
        "hawk",
        "heron",
        "owl",
        "parrot",
        "peacock",
        "pelican",
        "pigeon",
        "phoenix",
        "stork",
        "raven",
        "rooster",
        "swan",
        "vulture",
      ].includes(active)
    )
  ) {
    animals.push("bird");
  }

  if (
    !animals.includes("insect") &&
    animals.some((active) =>
      ["bee", "ant", "dragonfly", "butterfly"].includes(active)
    )
  ) {
    animals.push("insect");
  }

  if (
    !animals.includes("wolf") &&
    animals.some((active) => ["wolverine"].includes(active))
  ) {
    animals.push("wolf");
  }

  if (
    !animals.includes("fish") &&
    animals.some((active) => ["salmon", "seahorse"].includes(active))
  ) {
    animals.push("fish");
  }

  if (
    !items.includes("flower") &&
    items.some((active) => ["lily", "rose"].includes(active))
  ) {
    items.push("flower");
  }

  if (
    !items.includes("walls") &&
    items.some((active) => ["lighthouse"].includes(active))
  ) {
    items.push("walls");
  }

  if (
    !items.includes("musicalInstrument") &&
    items.some((active) => ["violin", "flute", "horn"].includes(active))
  ) {
    items.push("musicalInstrument");
  }

  return {
    types,
    animals,
    items,
  };
};
