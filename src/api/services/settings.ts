/*
=================================
SETTINGS SERVICES
=================================
*/

import {
  blacklistIpAddressURL,
  changePasswordProfileURL,
  fetchLoginHistoryURL,
  getRequest,
  patchRequest,
  personalAccountDetailsURL,
  personalAccountUpdateURL,
  personalEmailResendVerifyURL,
  personalEmailUpdateURL,
  personalEmailUpdateVerifyURL,
  postRequest,
  send2faCodeURL,
  toggle2faStatusURL,
  toggleGoogleAuthURL
} from "api";

interface changePasswordRequestBody {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface blacklistRequestBody {
  ip: string;
  blacklist_status: boolean;
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
    data: data
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
    data: data
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
    data: data
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
    data: data
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
    data: data
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
    data: data
  });
};
