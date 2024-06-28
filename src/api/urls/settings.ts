/*
=================================
SETTINGS URLS
=================================
*/

/*
PERSONAL PROFILE URLS
*/
const prefix = "/settings/acc";

/**
 * Personal account details URL
 *
 * @returns url string
 *
 */
export const personalAccountDetailsURL = () => `${prefix}/details`;

/**
 * Update personal account URL
 *
 * @returns url string
 *
 */
export const personalAccountUpdateURL = () => `${prefix}/profile`;

/**
 * Update New Email URL
 *
 * @returns url string
 *
 */
export const personalEmailUpdateURL = () => `${prefix}/new-email`;

/**
 * Resend New Email Verification URL
 *
 * @returns url string
 *
 */
export const personalEmailResendVerifyURL = () => `${prefix}/resend-email-code`;

/* 

/**
 * Verify New Email URL
 *
 * @returns url string
 *
 */
export const personalEmailUpdateVerifyURL = () => `${prefix}/verify-email`;

/* 
SECURITY URLS
*/

/**
 * Change password URL
 * @returns url string
 *
 */
export const changePasswordProfileURL = () => `${prefix}/change-password`;

/**
 * Send 2fa code URL
 * @returns url string
 *
 */
export const send2faCodeURL = () => `${prefix}/send-2fa-code`;

/**
 * Toggle 2fa status URL
 * @returns url string
 *
 */
export const toggle2faStatusURL = () => `${prefix}/toggle-2fa`;

/**
 * Fetch login history URL
 * @returns url string
 *
 */
export const fetchLoginHistoryURL = ({ page, limit }) =>
  `${prefix}/login-history?page=${page}&limit=${limit}`;

/**
 * Toggle google auth URL
 * @returns url string
 *
 */
export const toggleGoogleAuthURL = () => `${prefix}/google-auth`;

/**
 * Blacklist IP address URL
 * @returns url string
 *
 */
export const blacklistIpAddressURL = () => `${prefix}/blacklist-ip`;
