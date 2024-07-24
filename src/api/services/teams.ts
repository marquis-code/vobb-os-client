/*
=================================
TEAMS SERVICES
=================================
*/

import { deleteRequest, getRequest, patchRequest, postRequest } from "api/requestProcessor";
import {
  createTeamURL,
  editATeamURL,
  fetchAcceptedMembersURL,
  fetchATeamBranchesURL,
  fetchATeamsMembersURL,
  fetchATeamURL,
  fetchPendingMembersURL,
  fetchTeamsURL,
  inviteMemberURL,
  resendOrCancelInviteToMemberURL,
  setTeamPermissionsURL,
  suspendMemberURL,
  unsuspendMemberURL
} from "api";
import { fetchMemberQueryParams } from "types";

type teamPermissionTypes = {
  manager: boolean;
  lead: boolean;
  member: boolean;
};

export interface createTeamRequestBody {
  name?: string;
  description?: string;
  icon?: string;
  general?: boolean;
  join_team?: boolean;
}

interface setTeamPermissionsRequestBody {
  create: teamPermissionTypes;
  view: teamPermissionTypes;
  modify: teamPermissionTypes;
  delete: teamPermissionTypes;
}

interface inviteMemberRequestBody {
  email: string;
  branch: string;
  team: string;
  role: string;
  title: string;
}

interface suspendMemberRequestBody {
  member: string;
  reason: string;
  duration?: {
    start_date: string;
    end_date: string;
  };
}

/**
 * Create a team service
 * @param data - Formdata
 * @returns axios promise
 */
export const createTeamService = (data: createTeamRequestBody) => {
  return postRequest({
    url: createTeamURL(),
    data
  });
};

/**
 * Set a team's permission service
 * @param id of team
 * @param data team permissions body
 * @returns axios promise
 */
export const setTeamPermissionsService = (id: string, data: setTeamPermissionsRequestBody) => {
  return postRequest({
    url: setTeamPermissionsURL({ id }),
    data
  });
};

/**
 * Fetch all teams service
 * @returns axios promise
 */
export const fetchTeamsService = ({ page, limit }) => {
  return getRequest({
    url: fetchTeamsURL({ page, limit })
  });
};

/**
 * Fetch a team service
 * @param id of team
 * @returns axios promise
 */
export const fetchATeamService = (id: string) => {
  return getRequest({
    url: fetchATeamURL({ id })
  });
};

/**
 * Edit a team service
 * @param id of team
 * @returns axios promise
 */
export const editATeamService = (id: string, data: createTeamRequestBody) => {
  return patchRequest({
    url: editATeamURL({ id }),
    data
  });
};

/**
 * Fetch a team branches service
 * @param id of team
 * @param page page query
 * @returns axios promise
 */
export const fetchATeamBranchesService = ({ id, page }) => {
  return getRequest({
    url: fetchATeamBranchesURL({ id, page })
  });
};

/**
 * Fetch a team's members service
 * @param id of team
 * @param page page query
 * @param limit number per page
 * @returns axios promise
 */
export const fetchATeamsMembersService = ({ id, page, limit }) => {
  return getRequest({
    url: fetchATeamsMembersURL({ id, page, limit })
  });
};

/**
 * Fetch a organisation's accepted members service
 * @returns axios promise
 */
export const fetchAcceptedMembersService = (queryParams: fetchMemberQueryParams) => {
  return getRequest({
    url: fetchAcceptedMembersURL(queryParams)
  });
};

/**
 * Fetch a organisation's pending members service
 * @returns axios promise
 */
export const fetchPendingMembersService = (queryParams: fetchMemberQueryParams) => {
  return getRequest({
    url: fetchPendingMembersURL(queryParams)
  });
};

/**
 * Invite a member to organisation Service
 * @returns axios promise
 */
export const inviteMemberService = (data: inviteMemberRequestBody) => {
  return postRequest({
    url: inviteMemberURL(),
    data
  });
};

/**
 * Resend invite to a member to organisation Service
 * @returns axios promise
 */
export const resendInviteToMemberService = ({ id }) => {
  return patchRequest({
    url: resendOrCancelInviteToMemberURL({ id })
  });
};

/**
 * Cancel invite to a member to organisation Service
 * @returns axios promise
 */
export const cancelInviteToMemberService = ({ id }) => {
  return deleteRequest({
    url: resendOrCancelInviteToMemberURL({ id })
  });
};

/**
 * Suspend member Service
 * @returns axios promise
 */
export const suspendMemberService = (data: suspendMemberRequestBody) => {
  return patchRequest({
    url: suspendMemberURL(),
    data
  });
};

/**
 * Unsuspend member Service
 * @returns axios promise
 */
export const unsuspendMemberService = (data: { member: string }) => {
  return patchRequest({
    url: unsuspendMemberURL(),
    data
  });
};
