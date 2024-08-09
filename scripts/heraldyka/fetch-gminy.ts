import fs from 'fs';
import wiki from 'wikipedia';
import chalk from 'chalk';

import { urls, Administrativedivision } from './constants';

// The gmina is the basic division of the administrative division of Poland, similar to a municipality.

const administrativeDivisions = Object.values(urls.gminyByWojewodztwo).flatMap(
	({ title, urls }) => urls.map(
		(gmina) => ({ ...gmina, type: 'gmina', partOf: title }
	),
));

const total = administrativeDivisions.length;

console.log(chalk.blue(`${total} gmins to check.`))

const contentToSave: Administrativedivision[] = [];

(async () => {
	wiki.setLang('pl')

	for (let i = 0; i < administrativeDivisions.length; i++) {
		const division = administrativeDivisions[i];

		if (i % 1 === 0) {
			console.log(`Progress ${(i / total * 100).toFixed(1)}%. ${i} out of ${total}. - ${division.title}`);
		}

		try {
			const page = await wiki.page(division.title);
			// console.log(page);
			//Response of type @Page object
			const summary = await page.summary();
			// console.log(summary);
			const content = await page.content();
			const categories = await page.categories();
			// const images = await page.images()

			const maindivisionCategory = categories.find((category) => category.includes('(gmina)') || category.includes('(gmina wiejska)'))

			if (maindivisionCategory) {
				const divisionPage = await wiki.page(maindivisionCategory.replace('Kategoria:', ''));
				// console.log(divisionPage);
				// const divisionSummary = await page.summary();
				// console.log(divisionSummary);
				const coordinates = await divisionPage.coordinates();

				division.place = {
					name: divisionPage.title,
					coordinates: {
						lat: coordinates.lat,
						lon: coordinates.lon,
					}
				}
			}

			contentToSave.push({
				...division,
				description: content.substring(0, 3000),
				image: summary.thumbnail,
			});
	// 		//Response of type @wikiSummary - contains the intro and the main image
		} catch (error) {
			// console.log(error);
	// 		//=> Typeof wikiError
		}
	}

	fs.writeFileSync(`./public/data/heraldyka/gminy.json`, JSON.stringify(contentToSave, null, 4));
})();