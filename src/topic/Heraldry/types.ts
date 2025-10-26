export type Colors = {
  [key: string]: string,
}

export type Greyscale = {
  isGreyscale: boolean,,
  isLowSaturation: boolean,
  isGrey: boolean,
  isBlack: boolean,
  isWhite: boolean,
}

export type RGB = [number, number, number];

export type ColorStatus = Greyscale & {
  didMatch: boolean,
  color: string,
  name: string,
  matcherColor: string,
  distanceToThreshold: number,
  thresholdDistance: number,
  distance: number,
}

export type AdministrativeUnitIndex = {
  id: string,
  title: string,
  url: string,
  description: string,
  imageUrl?: string,
  imageSrcSet?: string,
}

export type CoatOfArmsMapData = {
  country: string,
  id: string,
  mergedIds?: string[],
  index: number,
  title: string,
  url: string,
  type: string[],
  spriteRoot?: string,
  place: {
    name: string,
    coordinates: {
      lat: number,
      lon: number,
    }
  },
  imagesList?: {
    path: string,
    width: string,
  }[],
  imageHash?: string,
}

export type ColorStatusInDetails = Pick<ColorStatus, 'distanceToThreshold' | 'matcherColor' | 'color'>

export type MarkerType = 'animal' | 'item';

export type ImageColors = {
  hasTransparent: boolean,
  colorsByNames: {
    [name: string]: number,
  }
}

export type CoatOfArmsDetailsData = {
  id: string,
  colors?: {
    hexPalette: string[],
    byNames: {
      [color: string]: ColorStatusInDetails[],
    }
    byNamesRejected: {
      [color: string]: ColorStatusInDetails[],
    },
    colorsByNames: {
      [color: string]: number,
    }
  },
  markers?: {
    animals?: string[],
    items?: string[],
  }
}

export type AdministrativeUnit = CoatOfArmsMapData & CoatOfArmsDetailsData & {
  index: number,
  shortTitle?: string, // can be removed
  partOf?: string, // can be removed
  description?: string,
  image?: {
    source: string,
    sourceAlt?: string,
    width?: number,
    height?: number,
  },
  imageUrl?: string,
}

export type AdministrativeUnitsGroup = {
  key: string,
  title: string,
  urls: AdministrativeUnit[],
}

export type ComplexManualMarker = {
  imageHash: string,
  note?: string,
}

export type ManualMarker = string | ComplexManualMarker;

export type MarkerParams = {
  name: string,
  phrases?: string[],
  exclude?: ManualMarker[],
  include?: ManualMarker[],
}

export type MarkerParamsWithResult = MarkerParams & {
  isActive?: boolean,
  result?: string[],
}

export type MapOffset = {
  minLatTop: number,
  maxLatTop: number,
  minLonLeft: number,
  maxLonLeft: number,
  xModifier?: (percentageX: number, { percentageY }: { percentageY: number }) => number,
  yModifier?: (percentageY: number, { percentageX }: { percentageX: number }) => number,
}

export type UserScriptDivisionData = {
  locationName: string,
  locationUrl: string,
  thumbnailUrl?: string,
  description: string,
  type: string[],
  source: string,
  sourceTitle: string,
}

export type ScrollPosition = {
  width: number,
  height: number,
  left: number,
  top: number,
}
