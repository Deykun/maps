I wasn't able to fetch subcategories from category page with the `wikpedia` package.

Go to:
https://pl.wikipedia.org/wiki/Kategoria:Herby_gmin_polskich
https://pl.wikipedia.org/wiki/Kategoria:Herby_miast_Polski
https://pl.wikipedia.org/wiki/Kategoria:Herby_powiat%C3%B3w

Pick region.

And paste to generate the list for the region:

```
document.querySelectorAll('.CategoryTreeToggle:not([aria-expanded="true"])')

title = document.getElementById('firstHeading').innerText.replace('Kategoria:', '').replaceAll('[edytuj wstęp]', '');
group = 'powiatyByWojewodztwo';
key = title.split(' ').at(-1).replaceAll(' ', '_');

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
