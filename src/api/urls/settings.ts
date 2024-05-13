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
 * Verify New Email URL
 *
 * @returns url string
 *
 */
export const personalEmailUpdateVerifyURL = () => `${prefix}/verify-email`;
