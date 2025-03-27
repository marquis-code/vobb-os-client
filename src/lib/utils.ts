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

export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export function shortenText(text, maxLength) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + "...";
}
export const calculateTotalWordCount = (values: any) => {
  let wordCountObj = {};
  Object.keys(values).forEach((fieldName) => {
    if (fieldName.startsWith("long-text")) {
      wordCountObj[fieldName] = values[fieldName].trim().split(/\s+/).length;
    }
  });
  return wordCountObj;
};


export const numberToOrdinal = (n: number): string => {
  const suffixes = ["th", "st", "nd", "rd"];
  const value = n % 100;
  return n + (suffixes[(value - 20) % 10] || suffixes[value] || suffixes[0]) + " Stage";
};

export const isArrayEqual = (a, b) => {
  if (a.length !== b.length) return false;
  const sortedA = [...a].sort();
  const sortedB = [...b].sort();
  return sortedA.every((val, idx) => val === sortedB[idx]);
};