/*
=================================
SETTINGS URLS
=================================
*/

import { activityParamsProps, branchQueryParamsProps, PaginationProps } from "types";

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
    .filter(([_, value]) => value !== undefined && value.length)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return `${encodeURIComponent(key)}=${encodeURIComponent(JSON.stringify(value))}`;
      }
      return `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`;
    })
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
export const fetchTeamsPerBranchURL = (id: string, { page, limit }: PaginationProps) => {
  const queryParams = new URLSearchParams();

  if (page !== undefined) queryParams.append("page", page.toString());
  if (limit !== undefined) queryParams.append("limit", limit.toString());

  const queryString = queryParams.toString();
  return `${prefixOrg}/teams/${id}${queryString ? `?${queryString}` : ""}`;
};

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

/**
 * Fetch user's branches URL
 * @returns url string
 *
 */
export const fetchUserBranchesURL = ({ page, limit, search }: PaginationProps) => {
  const queryParams = new URLSearchParams();

  if (page !== undefined) queryParams.append("page", page.toString());
  if (limit !== undefined) queryParams.append("limit", limit.toString());
  if (search && search !== "") queryParams.append("search", search);

  const queryString = queryParams.toString();

  return `/user/branches/${queryString ? `?${queryString}` : ""}`;
};

/**
 * Add members to a branche URL
 * @returns url string
 *
 */

export const addExistingMembersToBranchURL = ({ branchId }) => `/user/add-branch/${branchId}`;

/**
 * Fetch eligible members to join branch URL
 * @returns url string
 *
 */

export const fetchEligibleMembersForBranchURL = (
  id: string,
  { page, limit, search }: PaginationProps
) => {
  const queryParams = new URLSearchParams();

  if (page !== undefined) queryParams.append("page", page.toString());
  if (limit !== undefined) queryParams.append("limit", limit.toString());
  if (search && search !== "") queryParams.append("search", search);

  const queryString = queryParams.toString();

  return `/org/branch/${id}${queryString ? `?${queryString}` : ""}`;
};
