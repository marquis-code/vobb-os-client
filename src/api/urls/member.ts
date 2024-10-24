/*
=================================
MEMBERS URLS
=================================
*/

import { removeMemberFromBranchRequestBody, removeMemberFromTeamRequestBody } from "api/services";
import { fetchMemberQueryParams, PaginationProps } from "types";
const prefixMember = "/user";

/**
 * Fetch orgnasiation's members URL
 * @returns url string
 *
 */
export const fetchOrgMembersURL = (queryParams: fetchMemberQueryParams) => {
  const queryString = Object.entries(queryParams)
    .filter(([_, value]) => value !== undefined && value !== "")
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`)
    .join("&");

  return `/org/members${queryString ? `?${queryString}` : ""}`;
};

/**
 * Fetch a member's profile URL
 * @param id of the member
 * @returns url string
 *
 */
export const fetchMemberProfileURL = ({ id }) => `/user/member/${id}`;

/**
 * Fetch members's branches URL
 * @returns url string
 *
 */
export const fetchMemberBranchesURL = (id: string, { page, limit }: PaginationProps) => {
  const queryParams = new URLSearchParams();

  if (page !== undefined) queryParams.append("page", page.toString());
  if (limit !== undefined) queryParams.append("limit", limit.toString());

  const queryString = queryParams.toString();

  return `${prefixMember}/branches/${id}${queryString ? `?${queryString}` : ""}`;
};

/**
 * Fetch members's prospective branches URL
 * @returns url string
 *
 */
export const fetchMemberProsBranchesURL = (id: string, { page, limit }: PaginationProps) => {
  const queryParams = new URLSearchParams();

  if (page !== undefined) queryParams.append("page", page.toString());
  if (limit !== undefined) queryParams.append("limit", limit.toString());

  const queryString = queryParams.toString();

  return `${prefixMember}/possible-branches/${id}${queryString ? `?${queryString}` : ""}`;
};

/**
 * Fetch members's teams URL
 * @returns url string
 *
 */
export const fetchMemberTeamsURL = (id: string, { page, limit }: PaginationProps) => {
  const queryParams = new URLSearchParams();

  if (page !== undefined) queryParams.append("page", page.toString());
  if (limit !== undefined) queryParams.append("limit", limit.toString());

  const queryString = queryParams.toString();

  return `${prefixMember}/teams/${id}${queryString ? `?${queryString}` : ""}`;
};

/**
 * Remove branch from member URL
 * @returns url string
 *
 */
export const removeBranchFromMemberURL = (data: removeMemberFromBranchRequestBody) =>
  `user/remove-branch/${data.member}/${data.branch}`;

/**
 * Remove team from member URL
 * @returns url string
 *
 */
export const removeTeamFromMemberURL = (data: removeMemberFromTeamRequestBody) =>
  `teams/remove-member/${data.team}/${data.member}`;

/**
 * Change Member role URL
 * @returns url string
 *
 */
export const changeMemberRoleURL = () => `${prefixMember}/role`;

/**
 * Edit Member details URL
 * @param id of the member to edit details
 * @returns url string
 *
 */
export const editMemberDetailsURL = ({ id }) => `${prefixMember}/edit/${id}`;

/**
 * Change Member email URL
 * @param id of the member to change email
 * @returns url string
 *
 */
export const changeMemberEmailURL = ({ id }) => `${prefixMember}/edit-email/${id}`;

/**
 * Verify Member email URL
 * @param token of the member to verify email
 * @returns url string
 *
 */
export const verifyMemberEmailURL = ({ token }) =>
  `${prefixMember}/verify-member-email?token=${token}`;

/**
 * Edit Member attribute URL
 * @param memberId - id of the member to edit attribute
 * @param attrId - id of the attribute to edit
 * @returns url string
 *
 */
export const editMemberAttributeURL = ({ memberId, attrId }) =>
  `${prefixMember}/attribute/${memberId}/${attrId}`;

/**
 * Fetch teams a member can join within current branches URL
 * @param id of the member
 * @returns url string
 *
 */
export const fetchMemberAllAccessibleTeamsURL = ({ id }) => `/teams/per-member/${id}`;

/**
 * Fetches teams a member can join in a branch URL
 * @param id of the member
 * @returns url string
 *
 */
export const fetchMemberTeamsPerBranchURL = ({ id }) => `/teams/per-branch/${id}`;

/**
 * Add a member to a team URL
 * @param teamId id of team
 * @param memberId id of member
 * @returns url string
 *
 */

export const addMemberToTeamURL = ({ teamId, memberId }) =>
  `teams/add-member/${teamId}/${memberId}`;

/**
 * Add a member to a branch URL
 * @param memberId id member
 * @param branchId id of branch
 * @returns url string
 *
 */

export const addMemberToBranchURL = ({ branchId }) => `${prefixMember}/add-branch/${branchId}`;
