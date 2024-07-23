/*
=================================
SETTINGS URLS
=================================
*/

import { activityParamsProps } from "types";

/*
PERSONAL PROFILE URLS
*/
const prefixAcc = "/settings/acc";

/**
 * Personal account details URL
 *
 * @returns url string
 *
 */
export const personalAccountDetailsURL = () => `${prefixAcc}/details`;

/**
 * Update personal account URL
 *
 * @returns url string
 *
 */
export const personalAccountUpdateURL = () => `${prefixAcc}/profile`;

/**
 * Update New Email URL
 *
 * @returns url string
 *
 */
export const personalEmailUpdateURL = () => `${prefixAcc}/new-email`;

/**
 * Resend New Email Verification URL
 *
 * @returns url string
 *
 */
export const personalEmailResendVerifyURL = () => `${prefixAcc}/resend-email-code`;

/* 

/**
 * Verify New Email URL
 *
 * @returns url string
 *
 */
export const personalEmailUpdateVerifyURL = () => `${prefixAcc}/verify-email`;

/* 
SECURITY URLS
*/

/**
 * Change password URL
 * @returns url string
 *
 */
export const changePasswordProfileURL = () => `${prefixAcc}/change-password`;

/**
 * Send 2fa code URL
 * @returns url string
 *
 */
export const send2faCodeURL = () => `${prefixAcc}/send-2fa-code`;

/**
 * Toggle 2fa status URL
 * @returns url string
 *
 */
export const toggle2faStatusURL = () => `${prefixAcc}/toggle-2fa`;

/**
 * Fetch login history URL
 * @returns url string
 *
 */
export const fetchLoginHistoryURL = ({ page, limit }) =>
  `${prefixAcc}/login-history?page=${page}&limit=${limit}`;

/**
 * Toggle google auth URL
 * @returns url string
 *
 */
export const toggleGoogleAuthURL = () => `${prefixAcc}/google-auth`;

/**
 * Blacklist IP address URL
 * @returns url string
 *
 */
export const blacklistIpAddressURL = () => `${prefixAcc}/blacklist-ip`;

/**
 * Fetch member's set properties for the account URL
 * @returns url string
 *
 */
export const fetchMemberPropertiesURL = () => `${prefixAcc}/attribute`;

/**
 * Fetch organisation's properties URL
 * @returns url string
 *
 */
export const fetchOrgPropertiessURL = ({ page, limit }) =>
  `${prefixAcc}/org-attribute?page=${page}&limit=${limit}`;

/**
 * Create organisation's properties URL
 * @returns url string
 *
 */
export const createOrgPropertiesURL = () => `${prefixAcc}/attribute/`;

/**
 * Update organisation's properties URL
 * @returns url string
 *
 */

export const updateOrgPropertiesURL = ({ id }) => `${prefixAcc}/attribute/${id}`;

/**
 * Fetch user's activities URL
 * @returns url string
 *
 */

export const fetchUserActivitiesURL = ({
  page,
  limit,
  sort,
  ...queryParams
}: activityParamsProps) => {
  const queryString = Object.entries(queryParams)
    .filter(([_, value]) => value !== undefined && value !== "")
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`)
    .join("&");

  return `${prefixAcc}/activity?page=${page}&limit=${limit}&sort=${sort}${
    queryString ? `&${queryString}` : ""
  }`;
};
