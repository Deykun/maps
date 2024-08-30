import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import IconSelectNew from '@/components/Icons/IconSelectNew';
import Pane from '@/components/UI/Pane';

import DevelopmentPaneSnippet from './DevelopmentPaneSnippet';

type FetchParmas = {
  country: string,
  unitTypes: string[],
}


// await fetch('/maps/data/heraldry/et/unit-map.json').then((response) => response.json()).then((byKey) => Object.values(byKey)),

const fetchData = async ({ country, unitTypes }: FetchParmas) => {

  const devData = await Promise.all(
    unitTypes.map((unit) => fetch(`/maps/data/heraldry/${country}/${unit}-dev.json`).then((response) => response.json()).then((byKey) => Object.values(byKey))),
  );

  console.log(devData);
};

type Props = FetchParmas & {
};

const DevelopmentPaneCustomFilter = ({
  country,
  unitTypes,
}: Props) => {
  const { t } = useTranslation();

  const {
    // isLoading,
    // isError,
    // error,
    data,
  } = useQuery({
    queryFn: () => fetchData({ country, unitTypes }),
    queryKey: ['filter', country],
  });

  return (
    <Pane className="fixed left-12 mt-3 w-[400px] top-0 ml-6">
      <h3 className="flex gap-3 items-center">
        <IconSelectNew className="size-5" />
        <span>
          Create a filter
        </span>
      </h3>
      <div className="sans text-[14px] flex flex-col gap-2">
          <input
            // value={filterPhrase}
            // onChange={(e) => setFilterPhrase(e.target.value || '')}
            className="sans w-full p-1 px-2 text-[14px] bg-white border"
            placeholder='name (ex. "eagle", "apple")'
          />
          <input
            // value={filterPhrase}
            // onChange={(e) => setFilterPhrase(e.target.value || '')}
            className="sans w-full p-1 px-2 text-[14px] bg-white border"
            placeholder='phrases (ex. "eagle, eagles", "apple, apples")'
          />
          <input
            // value={filterPhrase}
            // onChange={(e) => setFilterPhrase(e.target.value || '')}
            className="sans w-full p-1 px-2 text-[14px] bg-white border"
            placeholder='includes (ex. "Coat of arms of Berlin")'
          />
                    <input
            // value={filterPhrase}
            // onChange={(e) => setFilterPhrase(e.target.value || '')}
            className="sans w-full p-1 px-2 text-[14px] bg-white border"
            placeholder='excludes (ex. "Coat of arms of Berlin")'
          />
      </div>
    </Pane>
  );
}

export default DevelopmentPaneCustomFilter;
