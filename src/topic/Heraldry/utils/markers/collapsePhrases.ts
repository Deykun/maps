const splitAt = (index: number, text: string) => [text.slice(0, index), text.slice(index)];

type SuffixesByRoots = {
  [root: string]: string[],
}

const shortenSuffixesIfPossible = (root: string, suffixes: string[]): { root: string, suffixes: string[] } => {
  const firstLetterOfFirstSuffix = suffixes[0][0];

  const canBeShorten = suffixes.every((v) => v.startsWith(firstLetterOfFirstSuffix));
  if (!canBeShorten) {
    return { root, suffixes };
  }

  const newRoot = `${root}${firstLetterOfFirstSuffix}`; // riv -> rive
  const newSuffixes = suffixes.map((v) => v.slice(1)); // er, ers -> r, rs

  return shortenSuffixesIfPossible(newRoot, newSuffixes);
}

export const collapsePhrases = (phrases: string[], suffixLength: number) => {
  const suffixesByRoots = phrases.reduce((stack: SuffixesByRoots, phrase) => {

    const [root, suffix] = splitAt(suffixLength, phrase);

    if (stack[root]) {
      stack[root].push(suffix);
    } else {
      stack[root] = [suffix];
    }

    return stack;

  }, {});


  const mergedPhrases = Object.entries(suffixesByRoots).map(([initRoot, initSuffixes]) => {
    if (initSuffixes.length === 1) {
      return `${initRoot}${initSuffixes[0]}`;
    }
    
    const {
      root,
      suffixes,
    } = shortenSuffixesIfPossible(initRoot, initSuffixes);

    const suffixesMerged = `<small class="text-[#4b4b4b]"> (</small>${suffixes.join('<small class="text-[#4b4b4b]">/</small>')}<small class="text-[#4b4b4b]">)</small>`;

    return `${root}${suffixesMerged}`
  });

  return mergedPhrases;
};
