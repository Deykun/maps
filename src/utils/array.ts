export const chunkArray = <T>(array: T[], chunkSize: number): T[][] => {
  if (chunkSize <= 0) {
      throw new Error('Chunk size must be greater than 0');
  }

  const result: T[][] = [];

  for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
  }

  return result;
};
