/*
=================================
PIPELINE SERVICES
=================================
*/

import {
  createPipelineStageURL,
  createPipelineURL,
  editPipelineStagesURL,
  editPipelineTitleURL,
  fetchPipelineStagesURL,
  fetchPipelinesURL,
  getRequest,
  patchRequest,
  postRequest
} from "api";
import { EditPipelineStagesDto, fetchPipelinesQueryParams, stagesType } from "types";

export interface createPipelineRequestBody {
  name: string;
  description?: string;
}

export interface createPipelineStageRequestBody {
  pipeline: string;
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
 * Edit a Pipeline's stages service
 * @param data
 * @returns axios promise
 */

export const editPipelineStagesService = (id: string, data: EditPipelineStagesDto) => {
  return patchRequest({
    url: editPipelineStagesURL({ id }),
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

/**
 * Fetch stages for a pipeline Service
 * @returns stages array
 */

export const fetchPipelineStagesService = (id: string) => {
  return getRequest({
    url: fetchPipelineStagesURL({id} )
  })
}