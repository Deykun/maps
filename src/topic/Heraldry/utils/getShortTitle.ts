export const getShortTitle = (lang: string, title: string) => {
  if (lang) {
    return title.replace('Herb gminy', 'Herb g.').replace('Herb powiatu', 'Herb p.').replace('Herb miasta', 'Herb m.').replace('Herb województwa', 'Herb w.');
  }

  return title;
}
