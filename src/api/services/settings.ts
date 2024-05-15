/*
=================================
SETTINGS SERVICES
=================================
*/

import {
  getRequest,
  patchRequest,
  postRequest,
  changePasswordProfileURL,
  send2faCodeURL,
  toggle2faStatusURL,
  fetchLoginHistoryURL
} from "api";

interface changePasswordRequestBody {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
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
