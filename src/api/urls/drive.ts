import { fetchFoldersQueryParams } from "types";

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

export const fetchUsersFoldersURL = (queryParams: fetchFoldersQueryParams) => {
  const queryString = Object.entries(queryParams)
    .filter(([_, value]) => value !== undefined && value !== "")
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`)
    .join("&");

  return `${prefix}/user/${queryString ? `?${queryString}` : ""}`;
};

/**
 * Get clients folders URL
 *
 * @returns url string
 *
 */

export const fetchClientsFoldersURL = (queryParams: fetchFoldersQueryParams) => {
  const queryString = Object.entries(queryParams)
    .filter(([_, value]) => value !== undefined && value !== "")
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`)
    .join("&");

  return `${prefix}/client/${queryString ? `?${queryString}` : ""}`;
};

/**
 * Get packages folders URL
 *
 * @returns url string
 *
 */

export const fetchPackagesFoldersURL = (queryParams: fetchFoldersQueryParams) => {
  const queryString = Object.entries(queryParams)
    .filter(([_, value]) => value !== undefined && value !== "")
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`)
    .join("&");

  return `${prefix}/package/${queryString ? `?${queryString}` : ""}`;
};

/**
 * Get package offerings folders URL
 *
 * @returns url string
 *
 */

export const fetchPackageOfferingsURL = (id: string, queryParams: fetchFoldersQueryParams) => {
  const queryString = Object.entries(queryParams)
    .filter(([_, value]) => value !== undefined && value !== "")
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`)
    .join("&");

  return `${prefix}/package/offering/${id}/${queryString ? `?${queryString}` : ""}`;
};

/**
 * Get users files URL
 *
 * @returns url string
 *
 */

export const fetchUserFilesURL = (id: string | undefined, queryParams: fetchFoldersQueryParams) => {
  const queryString = Object.entries(queryParams)
    .filter(([_, value]) => value !== undefined && value !== "")
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`)
    .join("&");

  return `${prefix}/user/${id}${queryString ? `?${queryString}` : ""}`;
};

/**
 * Get clients files URL
 *
 * @returns url string
 *
 */
export const fetchClientFilesURL = (id: string, queryParams: fetchFoldersQueryParams) => {
  const queryString = Object.entries(queryParams)
    .filter(([_, value]) => value !== undefined && value !== "")
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`)
    .join("&");

  return `${prefix}/client/${id}${queryString ? `?${queryString}` : ""}`;
}; 

/**
 * Delete documents URL
 *
 * @returns url string
 *
 */

export const deleteDocumentsURL = (ids: string[]) => {
  const queryString = ids.map((id, index) => `ids[${index}]=${encodeURIComponent(id)}`).join("&");

  return `${prefix}/document?${queryString}`;
};

/**
 * Rename file URL
 *
 * @returns url string
 *
 */

export const renameFileURL = (id: string) => {
  return `${prefix}/rename/file/${id}`;
};

/**
 * Rename folder URL
 *
 * @returns url string
 *
 */

export const renameFolderURL = (id: string) => {
  return `${prefix}/rename/folder/${id}`;
};

/**
 * Upload file URL
 *
 * @returns url string
 *
 */
export const uploadFileURL = (id: string, path: "general" | "user" | "client") => {
  return `${prefix}/${path}/${id}`;
};
