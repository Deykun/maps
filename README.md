# 🛡️ Heraldic maps of selected countries. 🇩🇪 🇪🇪 🇫🇮 🇵🇱

These are maps created by parsing data from Wikipedia, and sometimes things are marked incorrectly, or the location of a city is moved to a different side of the country. It’s not intentional — this is just a fun, open-source project that can still show some interesting things about geography and heraldry.

So I have only one request: don’t be a jerk. It’s easy to get upset when our city is marked incorrectly, but no one did that on purpose. I’m trying my best, and the process of parsing and verifying things is gradually improving.

My goal is to make it usable and reasonably reliable, move on to the next country, and eventually connect the maps into one for all of Europe.

## Heraldic maps of countries
Below is a list of country maps with the coats of arms of provinces, states, or municipalities (depending on what was available) marked on them. The data is parsed from Wikipedia, often with text descriptions, which makes filtering coats of arms containing elements like an eagle quite easy.

### Coats of arms in Germany (beta)
https://deykun.github.io/maps/deutsche-heraldik

### Coats of arms in Estonia
https://deykun.github.io/maps/eesti-heraldika

### Coats of arms in Finland
https://deykun.github.io/maps/suomalainen-heraldikka

### Coats of arms of Polish cities, counties, and municipalities
https://deykun.github.io/maps/heraldyka

## About the process
Some countries have dedicated pages for the coat of arms of smaller cities and municipalities (e.g. Estonia, Finland, Poland). For these, I visit the category page containing the list of such coats of arms and parse them to obtain initial links to those pages (they are stored in: `scripts/heraldry/[country]/constants.ts`). Using npm's `wikipedia` package, I fetch the coat of arms page (save the main image and descriptions) and attempt to locate the link in the data to fetch the page of the city or town in order to retrieve its location. The cases are the best because they provide me with clear descriptions and images.

There are countries, like Germany, that usually have pages with a lot of coat of arms, so I wrote a dedicated parser as a user-script to create a seed while visually showing me what has been indexed and based on what.

Sometimes, there will be a list of 30 coat of arms under the header 'Former cities' coats of arms,' and the images need to be aware they are under that header to recognize their status (city & former). Occasionally, there will be a footnote in the image description, so there’s a process to parse that as well. It isn’t ideal, and Germany's Wikipedia has more than one approach for this, so it isn’t as reliable for Germany.
