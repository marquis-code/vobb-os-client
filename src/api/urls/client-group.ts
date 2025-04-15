/*
=================================
CLIENT GROUP URLS
=================================
*/

import { fetchClientGroupQueryParams, fetchGroupActivitiesQueryParams } from "types/client-group";

const prefix = "/pipeline/group";

/**
 * Create a group URL
 *
 * @returns url string
 *
 */
export const createClientGroupURL = ({ pipelineId }: { pipelineId: string }) =>
  `${prefix}/create/${pipelineId}`;

/**
 * Fetch client groups URL
 * @returns url string
 *
 */
export const fetchClientGroupURL = (queryParams: fetchClientGroupQueryParams) => {
  const queryString = Object.entries(queryParams)
    .filter(([_, value]) => value !== undefined && value !== "")
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`)
    .join("&");

  return `${prefix}/all${queryString ? `?${queryString}` : ""}`;
};

/**
 * Add client to a group URL
 * @returns url string
 *
 */
export const addClientToGroupURL = ({ groupId }: { groupId: string }) =>
  `${prefix}/add-client/${groupId}`;

/**
 * Remove client from a group URL
 * @returns url string
 *
 */
export const removeClientFromGroupURL = ({ groupId }: { groupId: string }) =>
  `${prefix}/remove-client/${groupId}`;

/**
 * Assign a member to a group URL
 * @returns url string
 *
 */
export const assignMemberToGroupURL = ({ groupId }: { groupId: string }) =>
  `${prefix}/assign-member/${groupId}`;

/**
 * Edit group name URL
 * @returns url string
 *
 */
export const editGroupNameURL = ({ groupId }: { groupId: string }) =>
  `${prefix}/edit-name/${groupId}`;

/**
 * Update client group stage URL
 * @returns url string
 *
 */
export const updateClientGroupStageURL = ({ groupId }: { groupId: string }) =>
  `${prefix}/update-stage/${groupId}`;

/**
 * Fetch a client group URL
 * @returns url string
 *
 */
export const fetchClientGroupDetailURL = ({ groupId }: { groupId: string }) =>
  `${prefix}/${groupId}`;

/**
 * Ungroup a client group URL
 * @returns url string
 *
 */
export const ungroupClientGroupURL = ({ groupId }: { groupId: string }) => `${prefix}/${groupId}`;

/**
 * Fetch group activities URL
 * @returns url string
 *
 */
export const fetchGroupActivitiesURL = ({
  groupId,
  queryParams
}: {
  groupId: string;
  queryParams: fetchGroupActivitiesQueryParams;
}) => {
  const queryString = Object.entries(queryParams)
    .filter(([_, value]) => value !== undefined && value !== "")
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`)
    .join("&");

  return `${prefix}/activity/${groupId}${queryString ? `?${queryString}` : ""}`;
};

/**
 * Add clients to group URL
 * @returns url string
 *
 */
export const addClientsToGroupURL = ({ groupId }: { groupId: string }) =>
  `${prefix}/add-clients/${groupId}`;
