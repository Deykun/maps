export const clamp = (min: number, value: number, max: number) => {
  if (value > max) {
    return max;
  }

  if (value < min) {
    return min;
  }

  return value;
};

export const roundWithPrecision = (value: number, precision: number) => {
  const multiplier = Math.pow(10, precision || 0);

  return Math.round(value * multiplier) / multiplier;
};

export const formatLargeNumber = (value: number) => {
  // It looks like: 3 211 300
  return new Intl.NumberFormat('en-US').format(value).replace(',', ' ')
};
