/*
=================================
SETTINGS SERVICES
=================================
*/

import {
  getRequest,
  patchRequest,
  personalAccountDetailsURL,
  personalAccountUpdateURL,
  personalEmailUpdateURL,
  personalEmailUpdateVerifyURL,
  postRequest
} from "api";

/*
PERSONAL PROFILE SERVICES
*/
interface personalAccountDetailsRequestBody {
  first_name: string;
  last_name: string;
  phone_number: string;
  avatar: File;
}

/**
 * Personal account etails service
 * @returns axios promise
 */
export const personalAccountDetailsService = () => {
  return getRequest({
    url: personalAccountDetailsURL()
  });
};

/**
 * Update personal details service
 * @param data - An object containing the personal information including firstname, lastname, number and/or avatar
 * @returns axios promise
 */
export const personalAccountUpdateService = (data: FormData) => {
  return patchRequest({
    url: personalAccountUpdateURL(),
    data: data
  });
};

/**
 * Update personal email service
 * @param data - An object containing email, type string.
 * @returns axios promise
 */
export const personalEmailUpdateService = (data: { email: string }) => {
  return postRequest({
    url: personalEmailUpdateURL(),
    data: data
  });
};

/**
 * Verify personal email update service
 * @param data - An object containing otp, type string.
 * @returns axios promise
 */
export const personalEmailUpdateVerifyService = (data: { otp: string }) => {
  return patchRequest({
    url: personalEmailUpdateVerifyURL(),
    data: data
  });
};
