type Colors = {
  [key: string]: string,
}

export const colorsByNames: Colors = {
  red: '#f00',
  green: '#0f0',
  blue: '#00f',
};

export const WITH_ANIMAL = 'withAnimal';
export const WITHOUT_ANIMAL = 'withoutAnimals';

export type AdministrativeUnit = {
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
  },
  image?: {
    source: string
    width: number
    height: number
  },
  imageUrl?: string,
  imageSrcSet?: string,
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
