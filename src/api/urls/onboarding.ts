/*
=================================
ONBOARDING URLS
=================================
*/
const prefix = "/auth/onboard";

/**
 * Personal details URL
 *
 * @returns url string
 *
 */
export const personalDetailsURL = () => `${prefix}/user-details`;

/**
 * Company name URL
 *
 * @returns url string
 *
 */
export const companyNameURL = () => `${prefix}/company-name`;

/**
 * Company size URL
 *
 * @returns url string
 *
 */
export const companySizeURL = () => `${prefix}/company-size`;

/**
 * Company sector URL
 *
 * @returns url string
 *
 */
export const companySectorURL = () => `${prefix}/company-sector`;

/**
 * Company website URL
 *
 * @returns url string
 *
 */
export const companyWebsiteURL = () => `${prefix}/company-website`;

/**
 * Company country URL
 *
 * @returns url string
 *
 */
export const companyCountryURL = () => `${prefix}/operating-country`;

/**
 * Company zipcode URL
 *
 * @returns url string
 *
 */
export const companyZipcodeURL = () => `${prefix}/operating-zipcode`;

/**
 * Company state URL
 *
 * @returns url string
 *
 */
export const companyStateURL = () => `${prefix}/operating-state`;

/**
 * Company Addresses URL
 *
 * @returns url string
 *
 */
export const companyAddressesURL = () => `${prefix}/operating-address`;
