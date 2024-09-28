// ehemaliger Städte - former cities
// ehemaliger Gemeinden - former municipalities

// Stadtwappen - city coat of arms
// Städtewappen - cities
// Stadtteilwappen - district coat of arms
// Gemeindewappen - Coat of arms of a municipality
// Ortsteil - "district" or "locality" in English. It refers to a subdivision or part of a larger administrative area, such as a city or municipality.

// Ehemalige Gemeindewappen - Former municipal coat of arms
// Ehemalige Landkreiswappen - Former district coat of arms
// Ehemalige Gemeinden mit eigenem Wappen - Former municipalities with their own coat of arms

// Wappen der Städte und Gemeinden - Coat of arms of cities and municipalities
// Wappen ehemaliger Städte und Gemeinden - Coat of arms of former cities and municipalities
// Wappen der Städte, Märkte und Gemeinden - Coat of arms of the towns, markets, and municipalities
// Wappen ehemals selbstständiger Gemeinden - Coats of arms of formerly independent municipalities
// Wappen ehemaliger Landkreise - Coat of arms of former districts
// Wappen der Ortsteile - Coats of arms of the local districts

// Marktgemeinde -> Gemeinden 


export const getTypesFromTitle = (title: string) => {
  const lowercaseTitle = title.toLowerCase();
  const isFormer = ['ehemalige', 'ehemaliger'].some((v) => lowercaseTitle.includes(title));
};