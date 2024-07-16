/*
=================================
TEAMS SERVICES
=================================
*/

import { getRequest, postRequest } from "api/requestProcessor";
import {
  createTeamURL,
  editATeamURL,
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
  name: string;
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
export const fetchATeamService = ({ id, page }) => {
  return getRequest({
    url: fetchATeamURL({ id, page })
  });
};

/**
 * Edit a team service
 * @param id of team
 * @returns axios promise
 */
export const editATeamService = (id: string) => {
  return getRequest({
    url: editATeamURL({ id })
  });
};
