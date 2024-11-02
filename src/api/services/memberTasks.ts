/*
=================================
MEMBER TASKS SERVICES
=================================
*/

import {
  deleteRequest,
  getRequest,
  patchRequest,
  postRequest,
  addTaskToMemberURL,
  changeStatusOfTaskURL,
  deleteTaskURL,
  editTaskURL,
  fetchMembersTasksURL,
  fetchATaskURL
} from "api";
import { fetchMemberTasksQueryParams } from "types";

interface addTaskRequestBody {
  title: string;
  description: string;
  assigned_to: string[];
  priority: string;
  due_date: string;
  status?: string;
}

/**
 * Fetch member's tasks Service
 * @returns url string
 *
 */
export const fetchMembersTasksService = (queryParams: fetchMemberTasksQueryParams) => {
  return getRequest({
    url: fetchMembersTasksURL(queryParams)
  });
};

/**
 * Add a task to a member Service
 * @returns url string
 *
 */
export const addTaskToMemberService = (
  objectName: string,
  data: addTaskRequestBody,
  objectId?: string
) => {
  return postRequest({
    url: addTaskToMemberURL({ objectName, objectId }),
    data
  });
};

/**
 * Change status of a task Service
 * @returns url string
 *
 */
export const changeStatusOfTaskService = (id: string, data: { status: string }) => {
  return postRequest({
    url: changeStatusOfTaskURL({ id }),
    data
  });
};

/**
 * Change status of a task Service
 * @returns url string
 *
 */
export const editTaskService = (id: string, data: addTaskRequestBody) => {
  return patchRequest({
    url: editTaskURL({ id }),
    data
  });
};

/**
 * Delete task Service
 * @returns url string
 *
 */
export const deleteTaskService = (id: string) => {
  return deleteRequest({
    url: deleteTaskURL({ id })
  });
};

/**
 * Fetch a task Service
 * @returns url string
 *
 */
export const fetchATaskService = (id: string) => {
  return getRequest({
    url: fetchATaskURL({ id })
  });
};
