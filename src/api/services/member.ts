/*
=================================
TEAMS SERVICES
=================================
*/

import { deleteRequest, getRequest, patchRequest } from "api/requestProcessor";
import {
  fetchMemberBranchesURL,
  fetchMemberProfileURL,
  fetchMemberProsBranchesURL,
  fetchMemberTeamsURL,
  fetchOrgMembersURL,
  removeBranchFromMemberURL,
  removeTeamFromMemberURL
} from "api";
import { fetchMemberQueryParams, PaginationProps } from "types";

interface removeMemberFromBranchRequestBody {
  member: string;
  branch: string;
}

interface removeMemberFromTeamRequestBody {
  member: string;
  team: string;
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
 * Remove branch from member Service
 * @returns url string
 *
 */
export const removeBranchFromMemberService = (data: removeMemberFromBranchRequestBody) => {
  return patchRequest({
    url: removeBranchFromMemberURL(),
    data
  });
};

/**
 * Remove team from member Service
 * @returns url string
 *
 */
export const removeTeamFromMemberService = (data: removeMemberFromTeamRequestBody) => {
  return deleteRequest({
    url: removeTeamFromMemberURL(),
    data
  });
};
