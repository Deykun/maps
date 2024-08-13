import fs from 'fs';
import { PATHS_DATA } from '../src/constants';

PATHS_DATA.forEach(({ path, title, social, lang = 'en' }) => {
  let html = fs.readFileSync('./dist/index.html', 'utf-8');

  html = html.replace('lang="en"', `lang="${lang}"`);
  html = html.replace('<title>🗺️ maps</title>', `<title>${title}</title>`);
  html = html.replace('<!-- SOCIAL -->', social);

  fs.writeFileSync(`./dist/${path}.html`, html);
});
