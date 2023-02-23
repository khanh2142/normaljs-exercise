export const checkExistInArray = (arr, fieldName, value) => {
  return arr.some((item) => item[fieldName] == value);
};
