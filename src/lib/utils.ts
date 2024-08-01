import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const isEmptyObj = (obj: {}) => Object.keys(obj).length === 0;
export const arraysHaveSameElements = (arr1: string[], arr2: string[]): boolean => {
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

export const getOptionTypeValidationMsg = (error) => {
  return error?.message ?? error?.value?.message?.toString() ?? error?.label?.message?.toString();
};

export const getInitials = (fullName: string) => {
  const names = fullName.split(" ");

  if (names.length > 1) {
    return names
      .slice(0, 2)
      .map((name) => name[0].toUpperCase())
      .join("");
  } else {
    return names[0].slice(0, 2).toUpperCase();
  }
};
