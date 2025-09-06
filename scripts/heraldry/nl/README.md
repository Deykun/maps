https://en.wikipedia.org/wiki/Administrative_divisions_of_Finland

- 19 regions - maakunta
- 70 sub-regions - seutukunta
- 309 munocopalities - kunta

vaakuna - coat of arms

Suomen kuntien vaakunat - Coats of arms of Finnish municipalities
https://fi.wikipedia.org/w/index.php?title=Luokka:Suomen_kuntien_vaakunat&pagefrom=Outokumpu%0AOutokummun+vaakuna#mw-pages


Historic - Suomen entisten kuntien vaakunat - Coats of arms of former Finnish municipalities
https://fi.wikipedia.org/wiki/Luokka:Suomen_entisten_kuntien_vaakunat

Check?
https://fi.wikipedia.org/wiki/Luettelo_Suomen_kunnista

```
document.querySelectorAll('.CategoryTreeToggle:not([aria-expanded="true"])')

title = document.getElementById('firstHeading').innerText.replace('Luokka:', '');
group = 'maakuntaBySource';
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
