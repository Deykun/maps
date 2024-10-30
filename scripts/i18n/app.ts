import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

import { resources } from '../../src/locales/config';

const keys = Object.keys(resources.en.translation);
const langs = Object.keys(resources);

const app = express();
const port = 3000;

app.use('/admin', express.static(path.join(__dirname, 'admin')));

app.get('/', (req: Request, res: Response) => {
  res.send(`
    <!doctype html>
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/admin/reset.css">
        <link rel="stylesheet" href="/admin/style.css">
        <script>
          window.appLangs = ${JSON.stringify(langs)};
        </script>
        <script src="/admin/script.js"></script>
      </head>
      <body>
        <main>
          <table>
            <tr>
              <td>
                <img src="/admin/images/translate.svg" />
              </td>
              ${langs.map((lang) => {
                return `<th data-lang-header="${lang}">
                  ${lang}
                  <button class="button-copy" data-copy="${lang}">
                    <span>Kopiuj</span>
                    <img src="/admin/images/copy.svg" />
                  </button>
                </th>
                `;
              }).join('')}
            </tr>
            ${keys.map((key) => {
              return `<tr>
                <th>${key}</th>
                ${langs.map((lang) => {
                  return `<td>            
                    <textarea
                      data-field-lang="${lang}"
                      data-field-key="${key}"
                    >${resources[lang].translation[key] || ''}</textarea>
                  </td>
                  `;
                }).join('')}
              </tr>`;
            }).join('')}
          </table>
        </main>
      </body>
    </htm>
  `);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});