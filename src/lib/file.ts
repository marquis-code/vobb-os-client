export const isFile = (value: any): value is File => value instanceof File;
export const isEmptyObj = (obj: {}) => Object.keys(obj).length === 0;
export const arraysHaveSameElements = (arr1: string[], arr2: string[] | undefined): boolean => {
  if (arr1.length !== arr2?.length) {
    return false;
  }

  const sortedArr1 = [...arr1].sort();
  const sortedArr2 = [...arr2].sort();

  for (let i = 0; i < sortedArr1.length; i++) {
    if (sortedArr1[i] !== sortedArr2[i]) {
      return false;
    }
  }

  return true;
};
