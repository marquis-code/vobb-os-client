/*
=================================
MEMBERS URLS
=================================
*/

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
export const removeBranchFromMemberURL = () => `teams/remove-member-branch`;

/**
 * Remove team from member URL
 * @returns url string
 *
 */
export const removeTeamFromMemberURL = () => `teams/remove-member`;
