/*
=================================
TEAMS SERVICES
=================================
*/

import {
  axiosInstanceUnauth,
  deleteRequest,
  getRequest,
  patchRequest,
  postRequest
} from "api/requestProcessor";
import {
  fetchMemberBranchesURL,
  fetchMemberProfileURL,
  fetchMemberProsBranchesURL,
  fetchMemberTeamsURL,
  removeBranchFromMemberURL,
  removeTeamFromMemberURL,
  changeMemberRoleURL,
  editMemberDetailsURL,
  editMemberAttributeURL,
  changeMemberEmailURL,
  fetchMemberTeamsPerBranchURL,
  fetchMemberAllAccessibleTeamsURL,
  addMemberToBranchURL,
  verifyMemberEmailURL
} from "api";
import { PaginationProps, updatePropertiesRequestBody } from "types";

interface removeMemberFromBranchRequestBody {
  member: string;
  branch: string;
}

export interface removeMemberFromTeamRequestBody {
  member: string;
  team: string;
}

interface changeMemberRoleRequestBody {
  member: string;
  role: string;
}

interface addMemberToBranchRequestBody {
  members: string[];
  team?: string;
}

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
    url: removeTeamFromMemberURL(data)
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
export const editMemberDetailsService = (id: string, data: FormData) => {
  return patchRequest({
    url: editMemberDetailsURL({ id }),
    data
  });
};

/**
 * Change Member email Service
 * @param id of the member to change email
 * @param email new email
 * @returns url string
 *
 */
export const changeMemberEmailService = (id: string, data: { email: string }) => {
  return patchRequest({
    url: changeMemberEmailURL({ id }),
    data
  });
};

/**
 * Verify Member email Service
 * @param token of member requested,
 * @returns axios promise
 */
export const verifyEmailMemberService = (token: string) => {
  return axiosInstanceUnauth.patch(verifyMemberEmailURL({ token }));
};

/**
 * Edit member's attribute service
 * @returns axios promise
 */
export const editMemberAttributeService = (memberId: string, data: updatePropertiesRequestBody) => {
  return patchRequest({
    url: editMemberAttributeURL({ memberId, attrId: data.attribute }),
    data
  });
};

/**
 * Fetches teams a member can within current branches.
 * @param id of member requested,
 * @returns axios promise
 */
export const fetchMemberAllAccessibleTeamsService = (id: string) => {
  return getRequest({
    url: fetchMemberAllAccessibleTeamsURL({ id })
  });
};

/**
 * Fetches teams a member can join in a branch service
 * @param id of member requested,
 * @returns axios promise
 */
export const fetchMemberTeamsPerBranchService = (id: string) => {
  return getRequest({
    url: fetchMemberTeamsPerBranchURL({ id })
  });
};

/**
 * Add a member to a branch service
 * @returns axios promise
 */
export const addMemberToBranchService = (branchId: string, data: addMemberToBranchRequestBody) => {
  return postRequest({
    url: addMemberToBranchURL({ branchId }),
    data
  });
};
