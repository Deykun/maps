# Adding country

It's a rough description, based on countries that have dedicated coat of arms pages.

# Setting up the page in the app - `src`

1. Copy `scripts/heraldry/fi` with a correct country code.
2. Copy `src/pages/suomalainen-heraldikka` with a proper slug
3. Change `HeraldryFI.tsx` inside to `Heraldry[COUNTRY CODE].tsx` (also the name inside)
4. Add country in `src/app/Routes.tsx`
5. If country uses a new language add it to `src/locales` (to `[langcoode].json` and `config.ts`) (it can be an empty `{}`) (keep in mind that language may differ from country code)
6. Add basic data to `src/constants.ts`
7. Add country flag based on `src/topic/Heraldry/components/Panes/NavigationPane/Flags/README.md`

# Gathering data - `scripts`


1. That data lands in `scripts/heraldry/[countryCode]/constants.ts`
former current is defiened here

`scripts/heraldry/[country code]/README.md` you can list useful links and helpful dictionary.

Find category pages and index them by moddifing script:
```
document.querySelectorAll('.CategoryTreeToggle:not([aria-expanded="true"])')

title = document.getElementById('firstHeading').innerText.replace('Categorie:', '');
group = 'provinceBySource';
key = title

mapped = {
  key,
	title,
  urls: Array.from(document.querySelectorAll('.mw-category-group a')).map((el) => ({
    title: el.innerText,
    url: el.href,
  }))
};

console.log(`urls.${group}['${key}'] = `, JSON.stringify(mapped));
```

# Passing data to map `src/pages/[nl-slug]`

1. 