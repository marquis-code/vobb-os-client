/*
=================================
SETTINGS URLS
=================================
*/

import { PaginationProps } from "types";

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
export const fetchOrgBranchesURL = ({ page, limit }: PaginationProps) => {
  const queryParams = new URLSearchParams();

  if (page !== undefined) queryParams.append("page", page.toString());
  if (limit !== undefined) queryParams.append("limit", limit.toString());

  const queryString = queryParams.toString();

  return `${prefixOrg}/branch${queryString ? `?${queryString}` : ""}`;
};

/**
 * Fetch a branch's teams URL
 * @param id of branch
 * @returns url string
 *
 */
export const fetchTeamsPerBranchURL = ({ id }) => `${prefixOrg}/teams/${id}`;

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
export const createOrgAttributeURL = () => `${prefixOrg}/attribute`;

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
