/*
=================================
TEAMS SERVICES
=================================
*/

import { deleteRequest, getRequest, patchRequest, postRequest } from "api/requestProcessor";
import {
  acceptInviteURL,
  addMemberToTeamURL,
  createTeamURL,
  editATeamURL,
  fetchATeamBranchesURL,
  fetchATeamsMembersURL,
  fetchATeamURL,
  fetchOrgMembersURL,
  fetchTeamActivitiesURL,
  fetchTeamRolesURL,
  fetchTeamsURL,
  inviteMemberURL,
  resendOrCancelInviteToMemberURL,
  setTeamPermissionsURL,
  suspendMemberURL,
  unsuspendMemberURL,
  validateInviteURL
} from "api";
import {
  activityParamsProps,
  fetchMemberQueryParams,
  inviteMemberProperties,
  PaginationProps
} from "types";

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
  members: inviteMemberProperties[];
}

export interface suspendMemberRequestBody {
  member: string;
  reason?: string;
  duration?: {
    start_date: string;
    end_date: string;
  };
}

interface acceptInviteRequestBody {
  first_name: string;
  last_name: string;
  password: string;
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
export const fetchTeamsService = (query: PaginationProps = {}) => {
  return getRequest({
    url: fetchTeamsURL(query)
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
 * Fetch a organisation's members service
 * @returns axios promise
 */
export const fetchOrgMembersService = (queryParams: fetchMemberQueryParams) => {
  return getRequest({
    url: fetchOrgMembersURL(queryParams)
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

/**
 * Fetch team roles Service
 * @returns axios promise
 */
export const fetchTeamRolesService = (id: string) => {
  return getRequest({
    url: fetchTeamRolesURL({ id })
  });
};

/**
 * Validate invite Service
 * @returns axios promise
 */
export const validateInviteService = () => {
  return getRequest({
    url: validateInviteURL()
  });
};

/**
 * Accept invite Service
 * @returns axios promise
 */
export const acceptInviteService = (data: acceptInviteRequestBody) => {
  return patchRequest({
    url: acceptInviteURL(),
    data
  });
};

/**
 * Fetch teams's activity service
 * @returns axios promise
 */
export const fetchTeamActivitiesService = (
  id: string,
  { page, limit, sort, ...queryParams }: activityParamsProps
) => {
  return getRequest({
    url: fetchTeamActivitiesURL(id, { page, limit, sort, ...queryParams })
  });
};

/**
 * Add member to a team service
 * @returns axios promise
 */
export const addMemberToTeamService = ({ teamId, memberId }) => {
  return postRequest({
    url: addMemberToTeamURL({ teamId, memberId })
  });
};
