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
  distanceColor: string,
  distanceToTreshold: number,
  thresholdDistance: number,
  distance: number,
}

export type AdministrativeUnit = {
  lang: string,
  id: string,
  index: number,
  title: string,
  shortTitle?: string,
  url: string,
  partOf?: string,
  type?: string[],
  description?: string,
  colors?: {
    primary: {
      color: string,
      name: string,
    },
    palette: {
      color: string,
      name: string,
      distance?: number,
    }[],
    byNames: {
      [color: string]: ColorStatus[],
    }
  },
  image?: {
    source: string
    width: number
    height: number
  },
  imageUrl?: string,
  imageSrcSet?: string,
  imagesList?: {
    path: string,
    name: string,
    width: string,
  }[],
  place?: {
    name?: string,
    coordinates?: {
      lat?: number,
      lon?: number,
    }
  },
  markers?: {
    animals?: string[],
    items?: string[],
  }
}

export type AdministrativeUnitsGroup = {
  key: string,
  title: string,
  urls: AdministrativeUnit[],
}
