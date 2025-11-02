import type { Page } from "wikipedia";
import { AdministrativeUnit } from "../../../../../src/topic/Heraldry/types";
import { locationTitleByCoatOfArmsTitle } from "../../constants";
import { getVerifiedLocation } from "./overrides/get-verified-location";
import { getVerifiedLocationPage } from "./overrides/get-verified-location-page";

export const getLocationData = async (
  {
    country,
    division,
    unitNames,
  }: {
    country: string;
    division: AdministrativeUnit;
    unitNames: string[];
  },
  page: Page
): Promise<
  | {
      place: AdministrativeUnit["place"];
      locationPages: [];
    }
  | {
      place: undefined;
      locationPages: string[];
    }
> => {
  const title = division.title;

  const place = getVerifiedLocation(title, { country });
  if (place) {
    return {
      place,
      locationPages: [],
    };
  }

  const locationPage = getVerifiedLocationPage(title, { country });
  if (locationPage) {
    return {
      place: undefined,
      locationPages: [locationPage],
    };
  }

  const description = division.description || "";
  const categories = await page.categories();

  let locationPages: string[] = [];

  if (locationTitleByCoatOfArmsTitle[title]) {
    locationPages.push(locationTitleByCoatOfArmsTitle[title]);
  }

  if (country === "et") {
    const name = title.replace(" valla vapp", "").replace(" vapp", "");

    if (name) {
      locationPages.push(name);
    }
  }

  if (country === "fi") {
    const name = division.title.replace(" vaakuna", "");

    if (name) {
      locationPages.push(name);

      const nameRoot = name.slice(0, -3);
      if (nameRoot) {
        description
          .slice(0, 160)
          .split(" ")
          .forEach((word) => {
            if (word.startsWith(nameRoot)) {
              locationPages.push(word);
            }
          });
      }

      categories.forEach((category) => {
        if (category.split(" ").length <= 2) {
          // All categories with less than two words
          locationPages.push(category);
        }
      });

      if (name.endsWith("n")) {
        locationPages.push(`${name.slice(0, -1)}`);

        if (name.endsWith("en")) {
          locationPages.push(`${name.slice(0, -2)}i`);
        }

        if (unitNames.includes("kunta")) {
          locationPages.push(`${name.slice(0, -1)} (kunta)`);
        }

        if (name.endsWith("gon")) {
          locationPages.push(`${name.slice(-3)}ko`);
        }
      }

      if (unitNames.includes("maakunta")) {
        locationPages.push(`${name} maakunta`);
      }

      if (unitNames.includes("kunta")) {
        locationPages.push(`${name} (kunta)`);
      }

      locationPages = Array.from(
        new Set(
          locationPages
            .map((item) => item?.replace("Luokka:", ""))
            .filter(Boolean)
        )
      );
    }
  }

  if (country === "nl") {
    const name = division.title
      .replace("Wapen van ", "")
      .replace(/ \(.*\)/, "");

    if (name) {
      locationPages.push(name);
      locationPages.push(`${name} (gemeente)`);
      locationPages.push(`${name} (Drenthe)`);
      locationPages.push(`${name} (dorp)`);
      locationPages.push(`${name} (buurtschap)`);
      locationPages.push(`${name} (plaats)`);
      locationPages.push(`${name} (Nederland)`);
      locationPages.push(`${name} (Gelderland)`);
      locationPages.push(`${name} (Zuid-Holland)`);
      locationPages.push(`${name} (Neder-Betuwe)`);
      locationPages.push(`${name} (Noord-Holland)`);
      locationPages.push(`${name} (Bernheze)`);
    }
  }

  if (country === "pl") {
    const name = division.title
      .replace("Herb gminy ", "")
      .replace("Herp powiatu ", "")
      .replace("Herb miasta ", "")
      .replace("Herb ", "")
      .replace(/\((.*)\)/g, "")
      .trim();

    categories
      .filter((category) =>
        ["(gmina", "(powiat", "(województwo", "powiaty"].some((phrase) =>
          category.includes(phrase)
        )
      )
      .forEach((category) => {
        locationPages.push(category);
        locationPages.push(category.replace("Kategoria:", ""));

        const categoryWithoutBrackets = category
          .replace(/\((.*)\)/g, "")
          .trim();

        locationPages.push(categoryWithoutBrackets);

        if (division.type?.includes("gminy")) {
          locationPages.push(`${categoryWithoutBrackets} (gmina)`);
          locationPages.push(`${categoryWithoutBrackets} (gmina wiejska)`);
        }

        if (division.type?.includes("miasta")) {
          locationPages.push(`${categoryWithoutBrackets} (miasto)`);
        }

        if (division.type?.includes("powiaty")) {
          locationPages.push(`${categoryWithoutBrackets} (powiaty)`);
        }
      });

    if (name) {
      if (division.type?.includes("gminy")) {
        locationPages.push(`${name} (gmina)`);
        locationPages.push(`${name} (gmina wiejska)`);
      }

      if (division.type?.includes("miasta")) {
        locationPages.push(`${name} (miasto)`);
        locationPages.push(`${name.slice(0, -1)} (miasto)`);
      }

      if (division.type?.includes("powiaty")) {
        locationPages.push(`${name} (powiat)`);
      }

      if (name.endsWith("ka")) {
        locationPages.push(`${name.slice(0, -2)}ek`);
      }

      if (name.endsWith("owa")) {
        locationPages.push(`${name.slice(0, -3)}ów`);
      }

      if (name.includes("ego")) {
        locationPages.push(name.replace("ego", "y"));

        if (name.endsWith("a")) {
          locationPages.push(name.replace("ego", "y").slice(0, -1));
        }
      }

      if (division.type?.includes("gminy")) {
        locationPages.push(`${name.replace(/\((.*)\)/g, "").trim()} (gmina)`);
        locationPages.push(
          `${name.replace(/\((.*)\)/g, "").trim()} (gmina wiejska)`
        );
        locationPages.push(
          `${name.replace(/\((.*)\)/g, "").trim()} (gmina miejsko-wiejska)`
        );
      }

      if (
        division.type?.includes("miasta") ||
        division.type?.includes("gminy")
      ) {
        locationPages.push(`${name} (miasto)`);
      }

      if (
        division.type?.includes("powiaty") ||
        division.type?.includes("gminy")
      ) {
        locationPages.push(`${name} (gmina miejsko-wiejska)`);
      }

      categories
        .filter(
          (category) =>
            ![
              "przypisami",
              "herby",
              "artykuł",
              "herbach",
              "błędne dane",
              "szablon",
              "brak numeru",
            ].some((phrase) => category.includes(phrase))
        )
        .forEach((category) => {
          if (
            category
              .replace(/\((.*)\)/g, "")
              .trim()
              .split(" ").length <= 3
          ) {
            // All categories with less than three words
            locationPages.push(category);
          }
        });

      locationPages.push(name);

      locationPages = Array.from(
        new Set(
          locationPages.map((item) =>
            item?.replace("Kategoria:", "")?.replaceAll(",", "")?.trim()
          )
        )
      ).filter(Boolean);
    }
  }

  return {
    place: undefined,
    locationPages,
  };
};
