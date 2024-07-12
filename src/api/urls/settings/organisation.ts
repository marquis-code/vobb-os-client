/*
=================================
SETTINGS URLS
=================================
*/

const prefixOrg = "/settings/org";

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

/*
=================================
ATTRIBUTES
=================================
*/

/**
 * Fetch organisation's attribute URL
 * @returns url string
 *
 */
export const fetchOrgAttributesURL = ({ page, limit, type }) =>
  `${prefixOrg}/attribute?page=${page}&limit=${limit}&type=${type}`;

/**
 * Create organisation's attribute URL
 * @returns url string
 *
 */
export const createOrgAttributeURL = (type: "member" | "client") =>
  `${prefixOrg}/attribute?type=${type}`;

/**
 * Update organisation's attribute URL
 * @returns url string
 *
 */
export const updateOrgAttributeURL = ({ id }) => `${prefixOrg}/attribute/${id}`;

/**
 * Archive organisation's attribute URL
 * @returns url string
 *
 */
export const archiveOrgAttributeURL = ({ id }) => `${prefixOrg}/archive-attribute/${id}`;

/**
 * Restore organisation's attribute URL
 * @returns url string
 *
 */
export const restoreOrgAttributeURL = ({ id }) => `${prefixOrg}/restore-attribute/${id}`;
