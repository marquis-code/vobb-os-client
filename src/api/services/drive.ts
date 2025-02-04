/*
=================================
DRIVE SERVICES
=================================
*/

import { fetchDefaultFoldersURL, fetchUsersFoldersURL, getRequest } from "api";
import { fetchUsersFoldersQueryParams } from "types";

export const fetchDefaultFoldersService = () => {
  return getRequest({
    url: fetchDefaultFoldersURL()
  });
};

export const fetchUsersFoldersService = (queryParams: fetchUsersFoldersQueryParams) => {
  return getRequest({
    url: fetchUsersFoldersURL(queryParams)
  });
};
