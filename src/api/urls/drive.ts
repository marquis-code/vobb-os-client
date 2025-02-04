import { SortOrderType } from "components";
import { fetchUsersFoldersQueryParams } from "types";

const prefix = "/drive";

/**
 * Get default folders URL
 *
 * @returns url string
 *
 */

export const fetchDefaultFoldersURL = () => `${prefix}`;

/**
 * Get users folders URL
 *
 * @returns url string
 *
 */

export const fetchUsersFoldersURL = (queryParams: fetchUsersFoldersQueryParams) => {
  const queryString = Object.entries(queryParams)
    .filter(([_, value]) => value !== undefined && value !== "")
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`)
    .join("&");

  return `${prefix}/user/${queryString ? `?${queryString}` : ""}`;
};
