/*
=================================
PIPELINE SERVICES
=================================
*/

import {
  createPipelineStageURL,
  createPipelineURL,
  editPipelineTitleURL,
  fetchPipelinesURL,
  getRequest,
  patchRequest,
  postRequest
} from "api";
import { fetchPipelinesQueryParams, stagesType } from "types";

export interface createPipelineRequestBody {
  name: string;
  description?: string;
  sector: string;
  stages?: stagesType[];
}

export interface createPipelineStageRequestBody {
  name: string;
  stages: stagesType[];
}

/**
 * Create a Pipeline service
 * @param data
 * @returns axios promise
 */

export const createPipelineService = (data: createPipelineRequestBody) => {
  return postRequest({
    url: createPipelineURL(),
    data
  });
};

/**
 * Create a Pipeline  Stage service
 * @param data
 * @returns axios promise
 */

export const createPipelineStageService = (data: createPipelineStageRequestBody) => {
  return postRequest({
    url: createPipelineStageURL(),
    data
  });
};

/**
 * Fetch pipelines Service
 * @returns url string
 *
 */
export const fetchPipelinesService = (queryParams: fetchPipelinesQueryParams) => {
  return getRequest({
    url: fetchPipelinesURL(queryParams)
  });
};

/**
 * EDit a Pipeline  title service
 * @param data
 * @returns axios promise
 */

export const editPipelineTitleService = (id: string, data: { name: string }) => {
  return patchRequest({
    url: editPipelineTitleURL({ id }),
    data
  });
};
