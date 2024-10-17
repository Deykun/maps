export const PATHS_DATA: {
  type?: string,
  pathNameLink: string,
  path: string,
  title: string,
  social: string,
  lang: string,
  country?: string,
}[] = [
  {
    type: 'heraldryCountry',
    pathNameLink: 'heraldry.de.mapTitle',
    path: 'deutsche-heraldik',
    title: 'Deutschland Wappenkarte | Heraldik-Karten',
    social: `
      <meta property="og:title" content="🛡️ Deutschland Wappenkarte" />
      <meta property="og:description" content="Interaktive Karte mit über 15.000 deutschen Wappen.">
      <meta name="description" content="Interaktive Karte mit über 15.000 deutschen Wappen.">
      <meta property="og:image" content="https://deykun.github.io/maps/social/wappen-in-deutschland-map.png" />
    `,
    lang: 'de',
    country: 'de',
  },
  {
    type: 'heraldryCountry',
    pathNameLink: 'heraldry.et.mapTitle',
    path: 'eesti-heraldika',
    title: 'Praegused ja endised Eesti vappide kujundid | Heraldilised kaardid',
    social: `  
      <meta property="og:title" content="🛡️ Praegused ja endised Eesti vappide kujundid" />
      <meta property="og:description" content="Interaktiivne kaart, millel on üle 250 vapi.">
      <meta name="description" content="Interaktiivne kaart, millel on üle 250 vapi.">
      <meta property="og:image" content="https://deykun.github.io/maps/social/praegused-ja-endised-eesti-vappide-kujundid.png" />
    `,
    lang: 'et',
    country: 'et',
  },
  {
    type: 'heraldryCountry',
    pathNameLink: 'heraldry.fi.mapTitle',
    path: 'suomalainen-heraldikka',
    title: 'Suomen vaakunat - Heraldikka, kartta | Suomi | Heraldinen kartat',
    social: `  
      <meta property="og:title" content="🛡️ Suomen vaakunat - Heraldikka, kartta | Suomi" />
      <meta property="og:description" content="Interaktiivinen kartta, jossa on yli 500 vaakunaa.">
      <meta name="description" content="Interaktiivinen kartta, jossa on yli 500 vaakunaa.">
      <meta property="og:image" content="https://deykun.github.io/maps/social/suomen-vaakunat.png" />
    `,
    lang: 'fi',
    country: 'fi',
  },
  {
    type: 'heraldryCountry',
    pathNameLink: 'heraldry.pl.mapTitle',
    path: 'heraldyka',
    title: 'Herby polskich miast, powiatów i gmin - Heraldyka, mapa | Polska | Mapy heraldyczne',
    social: `  
      <meta property="og:title" content="🛡️ Mapa herbów polskich miast, powiatów i gmin" />
      <meta property="og:description" content="Interaktywna mapa zawiera ponad 2500 herbów.">
      <meta name="description" content="Interaktywna mapa zawiera ponad 2500 herbów.">
      <meta property="og:image" content="https://deykun.github.io/maps/social/herby-polskich-gmin-i-miast.png" />
    `,
    lang: 'pl',
    country: 'pl',
  },
] as const;

export const HERALDRY_COUNTRIES = PATHS_DATA.filter(({ type }) => type === 'heraldryCountry');