/*
=================================
DRIVE SERVICES
=================================
*/

import {
  deleteDocumentsURL,
  deleteRequest,
  fetchClientFilesURL,
  fetchClientsFoldersURL,
  fetchDefaultFoldersURL,
  fetchPackageOfferingsURL,
  fetchPackagesFoldersURL,
  fetchUserFilesURL,
  fetchUsersFoldersURL,
  getRequest,
  patchRequest,
  postRequest,
  renameFileURL,
  renameFolderURL,
  uploadFileURL
} from "api";
import { fetchFoldersQueryParams } from "types";

export const fetchDefaultFoldersService = () => {
  return getRequest({
    url: fetchDefaultFoldersURL()
  });
};

export const fetchUsersFoldersService = (queryParams: fetchFoldersQueryParams) => {
  return getRequest({
    url: fetchUsersFoldersURL(queryParams)
  });
};

export const fetchClientsFoldersService = (queryParams: fetchFoldersQueryParams) => {
  return getRequest({
    url: fetchClientsFoldersURL(queryParams)
  });
};

export const fetchPackagesFoldersService = (queryParams: fetchFoldersQueryParams) => {
  return getRequest({
    url: fetchPackagesFoldersURL(queryParams)
  });
};

export const fetchPackageOfferingsService = (
  id: string,
  queryParams: fetchFoldersQueryParams
) => {
  return getRequest({
    url: fetchPackageOfferingsURL(id, queryParams)
  });
};

export const fetchUserFilesService = (id: string, queryParams: fetchFoldersQueryParams) => {
  return getRequest({
    url: fetchUserFilesURL(id, queryParams)
  });
};

export const fetchClientFilesService = (id: string, queryParams: fetchFoldersQueryParams) => {
  return getRequest({
    url: fetchClientFilesURL(id, queryParams)
  });
};

export const deleteDocumentsService = (ids: string[]) => {
  return deleteRequest({
    url: deleteDocumentsURL(ids)
  });
};

export const renameFileService = (id: string, data: { name: string }) => {
  return patchRequest({
    url: renameFileURL(id),
    data
  });
};

export const renameFolderService = (id: string, data: { name: string }) => {
  return patchRequest({
    url: renameFolderURL(id),
    data
  });
};

export const uploadFileService = (
  id: string,
  path: "general" | "user" | "client",
  data: FormData
) => {
  return postRequest({
    url: uploadFileURL(id, path),
    data
  });
};
