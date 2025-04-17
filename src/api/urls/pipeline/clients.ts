/*
=================================
CLIENT URLS
=================================
*/

import { FetchAPipelineQueryParams } from "types";

const prefix = "/pipeline";


/**
 * Get a client URL
 *@param queryParams
 * @returns url string
 *
 */
export const fetchAPipelineClientsURL = (queryParams: FetchAPipelineQueryParams) => {
  let queryParts: string[] = [];

  Object.entries(queryParams).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item: string, index) => {
        if (item !== undefined && item !== "") {
          queryParts.push(`${encodeURIComponent(key)}[${index}]=${encodeURIComponent(item)}`);
        }
      });
    } else if (value !== undefined && value !== "") {
      queryParts.push(`${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`);
    }
  });

  const queryString = queryParts.join("&");

  return `${prefix}/client${queryString ? `?${queryString}` : ""}`;
};

/**
 * Create a Pipeline client URL
 *
 * @returns url string
 *
 */
export const createPipelineClientURL = ({ id }) => `${prefix}/client/create/${id}`;

/**
 * Update a Pipeline client URL
 *
 * @returns url string
 *
 */
export const updatePipelineClientURL = ({ pipelineId, clientId }) => `${prefix}/client/update/${pipelineId}/${clientId}`;

/**
 * Upload a client file URL
 *
 * @returns url string
 *
 */

export const uploadClientFileURL = ({ id }) => `${prefix}/client/upload-files/${id}`

/**
 * Fetch a clients data
 *
 * @returns url string
 *
 */

export const fetchAClientURL = ({ id }) => `${prefix}/client-data/${id}`;

/**
 * Assign a member to a client
 *
 * @returns url string
 *
 */

export const AssignMemberToClientURL = ({ id }) => `${prefix}/client/assign-to/${id}`;

/**
 * Delete a clients
 *
 * @returns url string
 *
 */

export const DeleteClientURL = () => `${prefix}/client/bulk`;