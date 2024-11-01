/*
=================================
MEMBER TASKS URLS
=================================
*/

import { fetchMemberTasksQueryParams } from "types";
const prefix = "/task";
/**
 * Fetch member's tasks URL
 * @returns url string
 *
 */
export const fetchMembersTasksURL = (queryParams: fetchMemberTasksQueryParams) => {
  const queryString = Object.entries(queryParams)
    .filter(([_, value]) => value !== undefined && value !== "")
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`)
    .join("&");

  return `${prefix}/all${queryString ? `?${queryString}` : ""}`;
};

/**
 * Add a task to a member URL
 * @param object name of the object the task is for
 * @param objectId of the object
 * @returns url string
 *
 */

export const addTaskToMemberURL = ({
  objectName,
  objectId
}: {
  objectName: string;
  objectId?: string;
}) => {
  const idParam = objectId ? `&id=${objectId}` : "";
  return `${prefix}/create?object=${objectName}${idParam}`;
};

/**
 * Change status of a task URL
 * @param id of the task
 * @returns url string
 *
 */

export const changeStatusOfTaskURL = ({ id }) => `${prefix}/change-status/${id}`;

/**
 * Edit a task URL
 * @param id of the task
 * @returns url string
 *
 */

export const editTaskURL = ({ id }) => `${prefix}/edit/${id}`;

/**
 * DElete a task URL
 * @param id of the task
 * @returns url string
 *
 */

export const deleteTaskURL = ({ id }) => `${prefix}/delete/${id}`;

/**
 * Fetch a task URL
 * @param id of the task
 * @returns url string
 *
 */

export const fetchATaskURL = ({ id }) => `${prefix}/${id}`;
