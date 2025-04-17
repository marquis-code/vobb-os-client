/*
=================================
CLIENTS SERVICES
=================================
*/

import { deleteRequest, getRequest, postRequest } from "api/requestProcessor";
import {
  AssignMemberToClientURL,
  createPipelineClientURL,
  DeleteClientURL,
  fetchAClientURL,
  fetchAPipelineClientsURL,
  updatePipelineClientURL,
  uploadClientFileURL
} from "api/urls/pipeline/clients";
import { FetchAPipelineQueryParams } from "types";

interface EditClientReqBody {
  branch: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  avatar?: any;
  nationality: string;
  country: string;
  province: string;
  street: string,
  // origin?: string,
  primary_language: string;
}

/**
 * Create a client service
 * @param data - FormData with client information and possibly a file
 * @returns axios promise
 */
export const createPipelineClientService = (data: FormData, id: string) => {
  return postRequest({
    url: createPipelineClientURL({ id }),
    data,
    config: {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  });
};

/**
 * Fetch a pipeline clients service
 * @param id of pipeline
 * @param page page query
 * @param limit number per page
 * @returns axios promise
 */
export const fetchPipelineClientService = (queryParams: FetchAPipelineQueryParams) => {
  return getRequest({
    url: fetchAPipelineClientsURL(queryParams)
  });
};

/**
 * update a client service
 * @param data - Formdata
 * @param pipelineId - string
 * @param clientId - string
 * @returns axios promise
 */
export const updatePipelineClientService = (data: EditClientReqBody,  pipelineId: string, clientId: string) => {
  return postRequest({
    url: updatePipelineClientURL({ pipelineId, clientId }),
    data
  });
};

/**
 * Upload a client file service
 * @param data - Formdata
 * @returns axios promise
 */
export const uploadClientFileService = (data: { file: File }, id: string) => {
  return postRequest({
    url: uploadClientFileURL({ id }),
    data
  });
};

/**
 * Fetch stages for a pipeline Service
 * @returns axios promise
 */

export const fetchAClientService = (id: string) => {
  return getRequest({
    url: fetchAClientURL({ id })
  });
};

/**
 * Assign member to a client service
 * @returns axios promise
 */

export const AssignMemberToClientService = (
  data: {
    member: string;
  },
  id: string
) => {
  return postRequest({
    url: AssignMemberToClientURL({ id }),
    data
  });
};

/**
 * Delete a client service
 *@returns axios promise
 */

export const DeleteClientService = (data: { clients: Array<string> }) => {
  return deleteRequest({
    url: DeleteClientURL(),
    config: {
      data
    }
  });
};