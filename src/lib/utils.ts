import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getOptionTypeValidationMsg = (error) => {
  return error?.message ?? error?.value?.message?.toString() ?? error?.label?.message?.toString();
};
