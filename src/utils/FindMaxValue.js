export const findMaxValue = (list, valueName) => {
  return Math.max(...list.map((item) => item[valueName]));
};
