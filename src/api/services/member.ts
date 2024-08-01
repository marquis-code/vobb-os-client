/*
=================================
TEAMS SERVICES
=================================
*/

import { getRequest } from "api/requestProcessor";
import {
  fetchMemberBranchesURL,
  fetchMemberProfileURL,
  fetchMemberProsBranchesURL,
  fetchMemberTeamsURL,
  fetchOrgMembersURL,
  removeMemberFromBranchURL
} from "api";
import { fetchMemberQueryParams, PaginationProps } from "types";

interface removeMemberRequestBody {
  member: string;
  branch: string;
}

/**
 * Fetch a organisation's members service
 * @returns axios promise
 */
export const fetchOrgMembersService = (queryParams: fetchMemberQueryParams) => {
  return getRequest({
    url: fetchOrgMembersURL(queryParams)
  });
};

/**
 * Fetch a member's profile service
 * @returns axios promise
 */
export const fetchMemberProfileService = (id: string) => {
  return getRequest({
    url: fetchMemberProfileURL({ id })
  });
};

/**
 * Fetch member's branches service
 * @param id of member requested,
 * @param query requesting filter queries page and limit
 * @returns axios promise
 */
export const fetchMemberBranchesService = (id: string, query: PaginationProps = {}) => {
  return getRequest({
    url: fetchMemberBranchesURL(id, query)
  });
};

/**
 * Fetch member's prospective branches service
 * @param id of member requested,
 * @param query requesting filter queries page and limit
 * @returns axios promise
 */
export const fetchMemberProsBranchesService = (id: string, query: PaginationProps = {}) => {
  return getRequest({
    url: fetchMemberProsBranchesURL(id, query)
  });
};

/**
 * Fetch member's teams service
 * @param id of member requested,
 * @param query requesting filter queries page and limit
 * @returns axios promise
 */
export const fetchMemberTeamsService = (id: string, query: PaginationProps = {}) => {
  return getRequest({
    url: fetchMemberTeamsURL(id, query)
  });
};

/**
 * Remove member from branch Service
 * @returns url string
 *
 */
export const removeMemberFromBranchService = (data: removeMemberRequestBody) => {
  return getRequest({
    url: removeMemberFromBranchURL(),
    data
  });
};
