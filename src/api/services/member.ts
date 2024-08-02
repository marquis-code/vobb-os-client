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
  removeTeamFromMemberURL,
  changeMemberRoleURL,
  editMemberDetailsURL
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

interface changeMemberRoleRequestBody {
  member: string;
  role: string;
}

interface editMemberDetailsRequestBody {
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  avatar?: string;
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

/**
 * Change member role Service
 * @returns url string
 *
 */
export const changeMemberRoleService = (data: changeMemberRoleRequestBody) => {
  return patchRequest({
    url: changeMemberRoleURL(),
    data
  });
};

/**
 * Edit Member details Service
 * @param id of the member to edit details
 * @param data details to edit
 * @returns url string
 *
 */
export const editMemberDetailsService = (id: string, data: editMemberDetailsRequestBody) => {
  return patchRequest({
    url: editMemberDetailsURL({ id }),
    data
  });
};
