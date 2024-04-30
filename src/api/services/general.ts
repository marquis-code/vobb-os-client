/*
=================================
GENERAL SERVICES
=================================
*/

import { getRequest, refreshTokenURL } from "api";

/**
 * Refresh token service
 * @returns an axios promise
 */

export const refreshTokenService = () => {
  return getRequest({
    url: refreshTokenURL()
  });
};
