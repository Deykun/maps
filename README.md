# 🛡️ Heraldic maps of selected countries

These maps were created by parsing data from Wikipedia, and sometimes cities are marked incorrectly or placed on the wrong side of the country. This is just a fun open-source project that can still show some interesting things about geography and heraldry. I ask that you keep this in mind. It’s easy to feel upset about inaccuracies (especially when our town is marked incorrectly), but that isn't intentional. I’m continuously working to improve the parsing and verification process, though it will never be perfect. My goal is to make these maps usable and reasonably reliable, move on to other countries, and eventually connect all of Europe into one comprehensive map.

## Heraldic maps of countries
Below is a list of country maps with the coats of arms of provinces, states, or municipalities (depending on what was available) marked on them. The data is parsed from Wikipedia, often with text descriptions, which makes filtering coats of arms containing elements like an eagle quite easy.

### Coats of arms in Germany 🇩🇪 (🧪 beta)
https://deykun.github.io/maps/deutsche-heraldik

### Coats of arms in Estonia 🇪🇪
https://deykun.github.io/maps/eesti-heraldika

### Coats of arms in Finland 🇫🇮
https://deykun.github.io/maps/suomalainen-heraldikka

### Coats of arms in Norway 🇳🇴
https://deykun.github.io/maps/norges-heraldikk

### Coats of arms in Poland 🇵🇱
https://deykun.github.io/maps/heraldyka

## About the process
Some countries have dedicated pages for the coat of arms of smaller cities and municipalities on Wikipedia (e.g. Estonia, Finland, Poland). For those, I visit the category page containing the list of such coats of arms and parse them to obtain initial links to those pages (they are stored in: `scripts/heraldry/[country]/constants.ts`). Using npm's `wikipedia` package, I fetch the coat of arms page (save the main image and descriptions) and attempt to locate the link in the data to fetch the page of the city or town in order to retrieve its location. These cases are the best because they provide me with clear descriptions and images.

There are countries, like Germany, that usually have pages with a lot of coat of arms, so I wrote a dedicated parser as a user-script to create a seed while visually showing me what has been indexed and based on what.

Sometimes, there will be a list of 30 coat of arms under the header "Former cities' coats of arms", and the images need to be aware they are under that header to recognize their status (city & and being former). Occasionally, there will be a footnote in the image description, so there’s a process to parse that as well. It isn’t ideal, and Germany's Wikipedia has more than one approach for this, so it isn’t as reliable for Germany.

[Read more about the app - DEVELOPMENT.md](docs/DEVELOPMENT.md)