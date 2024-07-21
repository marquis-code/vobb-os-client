/*
=================================
TEAMS SERVICES
=================================
*/

import { getRequest, patchRequest, postRequest } from "api/requestProcessor";
import {
  createTeamURL,
  editATeamURL,
  fetchATeamBranchesURL,
  fetchATeamsMembersURL,
  fetchATeamURL,
  fetchTeamsURL,
  setTeamPermissionsURL
} from "api";

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
