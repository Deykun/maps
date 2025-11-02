Municipalities handle local government (342 total as of 2025).

https://nl.wikipedia.org/wiki/Categorie:Wapen_(heraldiek)

Nederlands provinciewapen - Dutch provincial coat of arms
https://nl.wikipedia.org/wiki/Categorie:Nederlands_provinciewapen

Wapen van Nederlandse gemeente - Coat of arms of a Dutch municipality
https://nl.wikipedia.org/wiki/Categorie:Wapen_van_Nederlandse_gemeente

Wapen van Nederlandse heerlijkheid - Coat of arms of a Dutch lordship
https://nl.wikipedia.org/wiki/Categorie:Wapen_van_Nederlandse_heerlijkheid

Voormalige - former
dorp - city/town

Pick region.

And paste to generate the list for the region:

```js
title = document.getElementById('firstHeading').innerText.replace('Categorie:', '');
group = 'historicGemeenteBySource';
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
