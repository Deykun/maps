import wiki from 'wikipedia';
import chalk from 'chalk';

import { urls } from './heraldyka/constants';

// The gmina is the basic unit of the administrative division of Poland, similar to a municipality.

const smallAdministrativeDivision = Object.values(urls.gminyByWojewodztwo).flatMap(
	({ title, urls }) => urls.map(
		(gmina) => ({ ...gmina, type: 'gmina', partOf: title }
	),
));

console.log(chalk.blue(`${smallAdministrativeDivision.length} gmins to check.`))

const limited = smallAdministrativeDivision;

(async () => {
	wiki.setLang('pl')

	for (const unit of limited) {
		console.log(unit);

		try {
			const page = await wiki.page(unit.title);
			// console.log(page);
			//Response of type @Page object
			const summary = await page.summary();
			// console.log(summary);
			const content = await page.content();
			// const links = await page.references();
			// const images = await page.images()

			console.log({
				extract: content.substring(0, 3000),
				image: summary.thumbnail,
			})
	// 		//Response of type @wikiSummary - contains the intro and the main image
		} catch (error) {
	// 		console.log(error);
	// 		//=> Typeof wikiError
		}
		
	}
})();