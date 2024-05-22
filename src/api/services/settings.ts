/*
=================================
SETTINGS SERVICES
=================================
*/

import {
  blacklistIpAddressURL,
  changePasswordProfileURL,
  fetchLoginHistoryURL,
  fetchOrgDetailsURL,
  getRequest,
  patchRequest,
  personalAccountDetailsURL,
  personalAccountUpdateURL,
  personalEmailResendVerifyURL,
  personalEmailUpdateURL,
  personalEmailUpdateVerifyURL,
  postRequest,
  putRequest,
  resendCodeOrgEmailsURL,
  send2faCodeURL,
  toggle2faStatusURL,
  toggleGoogleAuthURL,
  updateOrgEmailsURL,
  updateOrgNumbersURL,
  updateOrgProfileURL,
  verifyOrgEmailsURL
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

interface updateOrgEmailsRequestBody {
  email: string;
  action: "primary" | "support";
}

interface verifyOrgEmailsRequestBody {
  token: string;
  action: "primary" | "support";
}

interface updateOrgNumbersRequestBody {
  number: string;
  action: "primary" | "support";
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

/*
ORGANIZATION SERVICES
*/

/**
 * Fetch org details service
 * @returns axios promise
 */
export const fetchOrgDetailsService = () => {
  return getRequest({
    url: fetchOrgDetailsURL()
  });
};

/**
 * Update organization profile service
 * @param formData containing update info
 * @returns axios promise
 */
export const updateOrgProfileService = (data: FormData) => {
  return putRequest({
    url: updateOrgProfileURL(),
    data
  });
};

/**
 * Update org emails service
 * @param data containing email update, string and action indicating primary or support
 * @returns axios promise
 */
export const updateOrgEmailsService = (data: updateOrgEmailsRequestBody) => {
  return patchRequest({
    url: updateOrgEmailsURL(),
    data
  });
};

/**
 * REsend verification code for org emails service
 * @returns axios promise
 */
export const resendCodeOrgEmailsService = (data: { action: "primary" | "support" }) => {
  return patchRequest({
    url: resendCodeOrgEmailsURL(),
    data
  });
};

/**
 * Verify org emails service
 * @returns axios promise
 */
export const verifyOrgEmailsService = (data: verifyOrgEmailsRequestBody) => {
  return patchRequest({
    url: verifyOrgEmailsURL(),
    data
  });
};

/**
 * Update org numbers service
 * @returns axios promise
 */
export const updateOrgNumbersService = (data: updateOrgNumbersRequestBody) => {
  return patchRequest({
    url: updateOrgNumbersURL(),
    data
  });
};
