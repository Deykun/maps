export const clearLastLines = (count: number) => {
  process.stdout.moveCursor(0, -count);
  process.stdout.clearScreenDown();
};
