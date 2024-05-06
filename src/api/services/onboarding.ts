/*
=================================
ONBOARDING SERVICES
=================================
*/

import { patchRequest, personalDetailsURL } from "api";
interface personalData {
  first_name: string;
  last_name: string;
}

/**
 * personal details service
 * @param data - An object containing the personal information including firstname and lastname
 * @returns axios promise
 */
export const personalDetailsService = (data: personalData) => {
  return patchRequest({
    url: personalDetailsURL(),
    data: data
  });
};
