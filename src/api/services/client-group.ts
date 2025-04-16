/*
=================================
CLIENT GROUP SERVICES
=================================
*/

import { getRequest, postRequest, deleteRequest } from "api/requestProcessor";
import {
  createClientGroupURL,
  fetchClientGroupURL,
  addClientToGroupURL,
  removeClientFromGroupURL,
  assignMemberToGroupURL,
  editGroupNameURL,
  updateClientGroupStageURL,
  fetchClientGroupDetailURL,
  ungroupClientGroupURL,
  fetchGroupActivitiesURL,
  addClientsToGroupURL,
  fetchOrgMembersListURL
} from "api/urls/client-group";
import { fetchClientGroupQueryParams, fetchGroupActivitiesQueryParams } from "types/client-group";

export interface CreateClientGroupRequestBody {
  name: string;
  clients: string[];
}

export interface AddClientToGroupRequestBody {
  client: string;
}

export interface RemoveClientFromGroupRequestBody {
  client: string;
}

export interface AssignMemberToGroupRequestBody {
  member: string | string[];
}

export interface EditGroupNameRequestBody {
  name: string;
}

export interface UpdateClientGroupStageRequestBody {
  stage: string;
}

export interface AddClientsToGroupRequestBody {
  clients: string[];
}

/**
 * Create a Group service
 * @param pipelineId
 * @param data
 * @returns axios promise
 */
export const createClientGroupService = (
  pipelineId: string,
  data: CreateClientGroupRequestBody
) => {
  return postRequest({
    url: createClientGroupURL({ pipelineId }),
    data
  });
};

/**
 * Fetch client groups Service
 * @param queryParams
 * @returns axios promise
 */
export const fetchClientGroupService = (queryParams: fetchClientGroupQueryParams) => {
  return getRequest({
    url: fetchClientGroupURL(queryParams)
  });
};

/**
 * Add client to a group service
 * @param groupId
 * @param data
 * @returns axios promise
 */
export const addClientToGroupService = (groupId: string, data: AddClientToGroupRequestBody) => {
  return postRequest({
    url: addClientToGroupURL({ groupId }),
    data
  });
};

/**
 * Remove client from a group service
 * @param groupId
 * @param data
 * @returns axios promise
 */
export const removeClientFromGroupService = (
  groupId: string,
  data: RemoveClientFromGroupRequestBody
) => {
  return postRequest({
    url: removeClientFromGroupURL({ groupId }),
    data
  });
};

/**
 * Assign a member to a group service
 * @param groupId
 * @param data
 * @returns axios promise
 */
export const assignMemberToGroupService = (
  groupId: string,
  data: AssignMemberToGroupRequestBody
) => {
  return postRequest({
    url: assignMemberToGroupURL({ groupId }),
    data
  });
};

/**
 * Edit group name service
 * @param groupId
 * @param data
 * @returns axios promise
 */
export const editGroupNameService = (groupId: string, data: EditGroupNameRequestBody) => {
  return postRequest({
    url: editGroupNameURL({ groupId }),
    data
  });
};

/**
 * Update client group stage service
 * @param groupId
 * @param data
 * @returns axios promise
 */
export const updateClientGroupStageService = (
  groupId: string,
  data: UpdateClientGroupStageRequestBody
) => {
  return postRequest({
    url: updateClientGroupStageURL({ groupId }),
    data
  });
};

/**
 * Fetch a client group service
 * @param groupId
 * @returns axios promise
 */
export const fetchClientGroupDetailService = (groupId: string) => {
  return getRequest({
    url: fetchClientGroupDetailURL({ groupId })
  });
};

/**
 * Ungroup a client group service
 * @param groupId
 * @returns axios promise
 */
export const ungroupClientGroupService = (groupId: string) => {
  return deleteRequest({
    url: ungroupClientGroupURL({ groupId })
  });
};

/**
 * Fetch group activities service
 * @param groupId
 * @returns axios promise
 */
export const fetchGroupActivitiesService = (
  groupId: string,
  queryParams: fetchGroupActivitiesQueryParams
) => {
  return getRequest({
    url: fetchGroupActivitiesURL({ groupId, queryParams })
  });
};

/**
 * Add clients to group service
 * @param groupId
 * @param data
 * @returns axios promise
 */
export const addClientsToGroupService = (groupId: string, data: AddClientsToGroupRequestBody) => {
  return postRequest({
    url: addClientsToGroupURL({ groupId }),
    data
  });
};

/**
 * Fetch group activities service
 * @param groupId
 * @returns axios promise
 */
export const fetchOrgMembersListService = () => {
  return getRequest({
    url: fetchOrgMembersListURL()
  });
};
