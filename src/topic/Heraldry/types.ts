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

export type ColorStatus = Greyscale & {
  didMatch: boolean,
  color: string,
  name: string,
  matcherColor: string,
  distanceToTreshold: number,
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
  lang: string,
  id: string,
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
}

export type CoatOfArmsDetailsData = {
  colors?: {
    hexPalette: string[],
    byNames: {
      [color: string]: ColorStatus[],
    }
    byNamesRejected: {
      [color: string]: ColorStatus[],
    }
  },
  markers: {
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

export type MarkerParams = {
  name: string,
  phrases?: string[],
  exclude?: string[],
  include?: string[],
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