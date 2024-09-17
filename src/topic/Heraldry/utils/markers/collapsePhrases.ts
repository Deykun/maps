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

    const [initRoot, initSuffix] = splitAt(suffixLength, phrase);

    let root = initRoot;
    let suffix = initSuffix;

    // door, doors -> d(oor/oors) is pretty bad chunking, this set minimum length for root
    if (initRoot.length < 3) {
      const [suffixRoot, suffixSuffix] = splitAt(3 - initRoot.length, suffix);

      root = `${initRoot}${suffixRoot}`;
      suffix = suffixSuffix;
    }

    if (stack[root]) {
      stack[root].push(suffix);
    } else {
      stack[root] = [suffix];
    }

    return stack;

  }, {});

  const mergedPhrases = Object.entries(suffixesByRoots).map(([initRoot, initSuffixes]) => {
    const notEmptySuffixes = initSuffixes.filter(Boolean);
    if (notEmptySuffixes.length <= 1) {
      return `${initRoot}${notEmptySuffixes[0] || ''}`;
    }
    
    const {
      root,
      suffixes,
    } = shortenSuffixesIfPossible(initRoot, notEmptySuffixes);

    if (!root) {
      return suffixes;
    }
  
    const lessImpresiveClassName = 'inline-block text-[#a8a8a7]';

    const suffixesToMerge = suffixes.filter(Boolean).sort((a, b) => a.length - b.length);

    const suffixesMerged = ` <small class="${lessImpresiveClassName}"> (</small>${suffixesToMerge.join(`<small class="${lessImpresiveClassName} scale-x-50">/</small>`)}<small class="${lessImpresiveClassName}">)</small>`;

    return `${root}${suffixesMerged}`
  }).flatMap((v) => v);

  return mergedPhrases;
};
