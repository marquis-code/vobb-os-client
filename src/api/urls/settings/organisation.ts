/*
=================================
SETTINGS URLS
=================================
*/

import { activityParamsProps, branchQueryParamsProps } from "types";

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
 * Fetch a branch URL
 * @returns url string
 *
 */
export const fetchABranchURL = ({ id }) => `${prefixOrg}/${id}`;

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

/**
 * Delete organisation's branch URL
 * @returns url string
 *
 */
export const deleteOrgBranchURL = ({ id }) => `${prefixOrg}/branch?branch=${id}`;

/**
 * Fetch organisation's branch members
 * @params must include id of branch, optional query parameters that will not be included if not called for.
 * @returns url string
 *
 */
export const fetchOrgBranchMembersURL = ({
  id,
  queryParams = {}
}: {
  id: string;
  queryParams?: branchQueryParamsProps;
}) => {
  const queryString = Object.entries(queryParams)
    .filter(([_, value]) => value !== undefined && value !== null)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`)
    .join("&");

  return `${prefixOrg}/members/${id}${queryString ? `?${queryString}` : ""}`;
};

/**
 * TRansfers organisation's branch's one or more members to another branch.
 * @returns url string
 *
 */
export const transferMultipleMembersToBranchURL = () => `${prefixOrg}/transfer/members`;

/**
 * TRansfers all of an organisation's branch's members to another branch.
 * @returns url string
 *
 */
export const transferAllMembersToBranchURL = () => `${prefixOrg}/transfer/members/all`;

/**
 * Fetch teams per branch URL
 * @returns url string
 *
 */
export const fetchTeamsPerBranchURL = ({ id, page, limit }) =>
  `${prefixOrg}/teams/${id}?page=${page}&limit=${limit}`;

/**
 * Fetch org's activities URL
 * @returns url string
 *
 */
export const fetchOrgActivitiesURL = ({
  page,
  limit,
  sort,
  ...queryParams
}: activityParamsProps) => {
  const queryString = Object.entries(queryParams)
    .filter(([_, value]) => value !== undefined && value !== "")
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`)
    .join("&");

  return `${prefixOrg}/activity?page=${page}&limit=${limit}&sort=${sort}${
    queryString ? `&${queryString}` : ""
  }`;
};
