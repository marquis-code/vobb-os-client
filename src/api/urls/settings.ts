/*
=================================
SETTINGS URLS
=================================
*/

/*
PERSONAL PROFILE URLS
*/
const prefixAcc = "/settings/acc";
const prefixOrg = "/settings/org";

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

/* 
ORGANIZATION URLS
*/

/**
 * FEtch org details URL
 * @returns url string
 *
 */
export const fetchOrgDetailsURL = () => `${prefixOrg}/details`;

/**
 * Update organization profile URL
 * @returns url string
 *
 */
export const updateOrgProfileURL = () => `${prefixOrg}/profile`;

/**
 * Update org emails URL
 * @returns url string
 *
 */
export const updateOrgEmailsURL = () => `${prefixOrg}/email`;

/**
 * REsend verification code for org emails URL
 * @returns url string
 *
 */
export const resendCodeOrgEmailsURL = () => `${prefixOrg}/email/resend`;

/**
 *  Verify org emails URL
 * @returns url string
 *
 */
export const verifyOrgEmailsURL = () => `${prefixOrg}/email/verify`;

/**
 *  Update org numbers URL
 * @returns url string
 *
 */
export const updateOrgNumbersURL = () => `${prefixOrg}/number`;

/**
 *  Update org branding URL
 * @returns url string
 *
 */
export const updateOrgBrandingURL = () => `${prefixOrg}/branding`;

/**
 *  Update suspension notify URL
 * @returns url string
 *
 */
export const updateOrgSusNotifyURL = () => `${prefixOrg}/suspension`;

/**
 * Fetch organisation's branches URL
 * @returns url string
 *
 */
export const fetchOrgBranchesURL = ({ page, limit }) =>
  `${prefixOrg}/branch?page=${page}&limit=${limit}`;

/**
 * Add a new organisation's branch URL
 * @returns url string
 *
 */
export const addNewOrgBranchURL = () => `${prefixOrg}/branch`;

/**
 * Update an organisation's branch URL
 * @returns url string
 *
 */
export const updateOrgBranchURL = (id: string) => `${prefixOrg}/branch/${id}`;
