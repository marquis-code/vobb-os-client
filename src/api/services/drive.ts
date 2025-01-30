/*
=================================
DRIVE SERVICES
=================================
*/

import { fetchDefaultFoldersURL, getRequest } from "api";

export const fetchDefaultFoldersService = () => {
  return getRequest({
    url: fetchDefaultFoldersURL()
  });
};
