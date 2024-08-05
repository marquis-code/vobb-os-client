/*
=================================
SETTINGS SERVICES
=================================
*/

import {
  blacklistIpAddressURL,
  changePasswordProfileURL,
  createOrgPropertiesURL,
  fetchLoginHistoryURL,
  fetchMemberPropertiesURL,
  fetchOrgPropertiessURL,
  fetchUserActivitiesURL,
  getRequest,
  patchRequest,
  personalAccountDetailsURL,
  personalAccountUpdateURL,
  personalEmailResendVerifyURL,
  personalEmailUpdateURL,
  personalEmailUpdateVerifyURL,
  postRequest,
  putRequest,
  send2faCodeURL,
  toggle2faStatusURL,
  toggleGoogleAuthURL,
  updateOrgPropertiesURL
} from "api";
import { activityParamsProps } from "types";

interface changePasswordRequestBody {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface blacklistRequestBody {
  ip: string;
  blacklist_status: boolean;
}

interface queryParamsProps {
  page?: number;
  limit?: number;
}

export interface updatePropertiesRequestBody {
  attribute: string;
  type: string;
  data: string[];
}

/*
PERSONAL PROFILE SERVICES
*/

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
    data
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
    data
  });
};

/**
 * Resend personal email update otp service
 * @param data - An object containing otp, type string.
 * @returns axios promise
 */
export const personalEmailResendVerifyService = () => {
  return postRequest({
    url: personalEmailResendVerifyURL()
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
    data
  });
};

/*
SECURITY SERVICES
*/

/**
 * CHange password service
 * @param data - An object containing old password, new password and confirmPassword.
 * @returns axios promise
 */
export const changePasswordProfileService = (data: changePasswordRequestBody) => {
  return patchRequest({
    url: changePasswordProfileURL(),
    data
  });
};

/**
 * Send 2fa code service
 * @param data - An object containing enable2FA, boolean.
 * @returns axios promise
 */
export const send2faCodeService = (data: { enable2FA: Boolean }) => {
  return postRequest({
    url: send2faCodeURL(),
    data
  });
};

/**
 * Toggle 2fa status service
 * @param data - An object containing otp, string.
 * @returns axios promise
 */
export const toggle2faStusService = (data: { otp: string }) => {
  return patchRequest({
    url: toggle2faStatusURL(),
    data
  });
};

/**
 * Fetch login history service
 * @param page indicating page number
 * @param limit indicating how many per page view
 * @returns axios promise
 */
export const fetchLoginHistoryService = ({ page, limit }) => {
  return getRequest({
    url: fetchLoginHistoryURL({ page, limit })
  });
};

/**
 * Toggle google auth service
 * @param data - An object containing login_with_google, boolean.
 * @returns axios promise
 */
export const toggleGoogleAuthService = (data: { login_with_google: Boolean }) => {
  return patchRequest({
    url: toggleGoogleAuthURL(),
    data
  });
};

/**
 * Blacklist/Whitelist ipAddress service
 * @param data - An object containing ip, string and blacklist_status of either 'allowed' or 'blocked'.
 * @returns axios promise
 */
export const blacklistIpAddressService = (data: blacklistRequestBody) => {
  return patchRequest({
    url: blacklistIpAddressURL(),
    data
  });
};

/**
 * Fetch organisation's properties service
 * @param page showing page number requested,
 * @param limit showing number of items per page
 * @returns axios promise
 */
export const fetchOrgPropertiesService = ({ page, limit }: queryParamsProps) => {
  return getRequest({
    url: fetchOrgPropertiessURL({ page, limit })
  });
};

/**
 * Fetch organisation's attributes service
 * @returns axios promise
 */
export const fetchMemberPropertiesService = () => {
  return getRequest({
    url: fetchMemberPropertiesURL()
  });
};

/**
 * Create an organisation's property service
 * @param id of attribute
 * @returns axios promise
 */
export const createOrgPropertiesService = (data: updatePropertiesRequestBody) => {
  return postRequest({
    url: createOrgPropertiesURL(),
    data
  });
};

/**
 * Update an organisation's property service
 * @param id of attribute
 * @returns axios promise
 */
export const updateOrgPropertiesService = (data: updatePropertiesRequestBody) => {
  return putRequest({
    url: updateOrgPropertiesURL(),
    data
  });
};

/**
 * Fetch user's activity service
 * @returns axios promise
 */
export const fetchUserActivitiesService = ({
  page,
  limit,
  sort,
  ...queryParams
}: activityParamsProps) => {
  return getRequest({
    url: fetchUserActivitiesURL({ page, limit, sort, ...queryParams })
  });
};
