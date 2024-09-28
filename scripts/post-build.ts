import fs from 'fs';
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { PATHS_DATA } from '../src/constants';

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const BASEDIR = resolve(__dirname, '..');

PATHS_DATA.forEach(({ type, path, title, social, lang = 'en', country }) => {
  let html = fs.readFileSync('./dist/index.html', 'utf-8');

  html = html.replace('lang="en"', `lang="${lang}"`);
  html = html.replace('<title>🗺️ maps</title>', `<title>${title}</title>`);
  html = html.replace('<!-- SOCIAL -->', social);

  if (type === 'heraldryCountry' && country) {
    const sprites = fs.readdirSync(`${BASEDIR}/public/images/heraldry/${country}/web/sprites/`);

    if (sprites.length > 0) {
      // First 3
      const preloadSprites = sprites.slice(0, 3).map((filename) => `<link rel="preload" href="/maps/images/heraldry/pl/web/sprites/${filename}" as="image" />`);

      html = html.replace('<!-- PRELOAD -->', preloadSprites.join(`
    `));
    }
  }

  fs.writeFileSync(`./dist/${path}.html`, html);
});
