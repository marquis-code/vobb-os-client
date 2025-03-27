/*
=================================
PIPELINE URLS
=================================
*/

import { fetchPipelinesQueryParams } from "types";

const prefix = "/pipeline";

/**
 * Create a pipeline URL
 *
 * @returns url string
 *
 */
export const createPipelineURL = () => `${prefix}`;

/**
 * Edit pipeline title URL
 *
 * @returns url string
 *
 */
export const editPipelineStagesURL = ({ id }) => `${prefix}/stage/${id}`;

/**
 * Create a pipeline stage URL
 *
 * @returns url string
 *
 */
export const createPipelineStageURL = () => `${prefix}/stage`;

/**
 * Fetch pipelines URL
 * @returns url string
 *
 */
export const fetchPipelinesURL = (queryParams: fetchPipelinesQueryParams) => {
  const queryString = Object.entries(queryParams)
    .filter(([_, value]) => value !== undefined && value !== "")
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`)
    .join("&");

  return `${prefix}${queryString ? `?${queryString}` : ""}`;
};

/**
 * Edit pipeline title URL
 *
 * @returns url string
 *
 */
export const editPipelineTitleURL = ({ id }) => `${prefix}/edit-name/${id}`;

/**
 * Fetch stages for a pipeline
 *
 * @returns url string
 *
 */

export const fetchPipelineStagesURL = ({ id }) => `${prefix}/stage/${id}`;