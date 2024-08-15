export const PATHS_DATA: {
  pathNameLink: string,
  path: string,
  title: string,
  social: string,
  lang: string,
}[] = [
  {
    pathNameLink: 'heraldry.et.mapTitle',
    path: 'eesti-heraldika',
    title: '🛡️ Praegused ja endised Eesti vappide kujundid',
    social: `  
      <meta property="og:title" content="🛡️ Praegused ja endised Eesti vappide kujundid" />
      <meta property="og:image" content="https://deykun.github.io/maps/social/praegused-ja-endised-eesti-vappide-kujundid.png" />
    `,
    lang: 'et',
  },
  {
    pathNameLink: 'heraldry.fi.mapTitle',
    path: 'suomalainen-heraldikka',
    title: '🛡️ The coat of arms of Finland',
    social: `  
      <meta property="og:title" content="🛡️ The coat of arms of Finland" />
    `,
    lang: 'fi',
  },
  {
    pathNameLink: 'heraldry.pl.mapTitle',
    path: 'heraldyka',
    title: '🛡️ Herby polskich miast, powiatów i gmin - Heraldyka, mapa | Polska',
    social: `  
      <meta name="description" content="Mapa herbów polskich miast, powiatów i gmin.">
      <meta property="og:title" content="Mapa herbów polskich miast, powiatów i gmin." />
      <meta property="og:image" content="https://deykun.github.io/maps/social/herby-polskich-gmin-i-miast.png" />
    `,
    lang: 'pl',
  },
] as const;