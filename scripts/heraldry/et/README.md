Since administrative reform in 2017, there are in total 79 local governments, including 15 towns and 64 rural municipalities. All municipalities have equal legal status and form part of a county, which is a state administrative unit.[1] Representative body of local authorities is municipal council, elected at general direct elections for a four-year term. The council appoints local government, headed by a mayor. For additional decentralization the local authorities may form municipal districts with limited authority, currently those have been formed in Tallinn and Hiiumaa.[2]

https://en.wikipedia.org/wiki/Administrative_divisions_of_Estonia

1. maakond
2. vald

1. maakondadeks - 15
2. omavalitsusüksust - 79, vallad - 64

https://et.wikipedia.org/wiki/Kategooria:Eesti_vapid
https://et.wikipedia.org/wiki/Eesti_valdade_loend
https://et.wikipedia.org/wiki/Kategooria:Hiiu_maakonna_vapid

https://et.wikipedia.org/wiki/V%C3%A4rska_vald

vaapp - one coat of arms
vapid - multiple coat of arms

```
document.querySelectorAll('.CategoryTreeToggle:not([aria-expanded="true"])')

title = document.getElementById('firstHeading').innerText.replace('Kategooria:', '').replaceAll('[edytuj]', '');
group = 'valdByMaakond';
key = title.split(' ').at(-3).replaceAll('"', '');

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