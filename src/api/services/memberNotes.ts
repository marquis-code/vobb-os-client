/*
=================================
MEMBER NOTES SERVICES
=================================
*/

import {
  convertNoteToTaskURL,
  createMemberNoteURL,
  deleteANoteURL,
  deleteRequest,
  editANoteURL,
  fetchAMemberNoteURL,
  fetchMemberNotesURL,
  getRequest,
  patchRequest,
  postRequest,
  updateVisibilityOfNoteURL
} from "api";
import { fetchMemberNotesQueryParams } from "types";

interface createNoteRequestBody {
  body: string;
  title: string;
  is_public: boolean;
}

interface updateNoteVisibilityRequestBody {
  is_public: boolean;
  allowed_members: string[];
}

interface convertToTaskRequestBody {
  assigned_to: string[];
}

interface editNoteRequestBody {
  title: string;
  body: string;
}

/**
 * Fetch member's notes Service
 * @returns url string
 *
 */
export const fetchMemberNotesService = (id: string, queryParams: fetchMemberNotesQueryParams) => {
  return getRequest({
    url: fetchMemberNotesURL(id, queryParams)
  });
};

/**
 * Create a note for a member Service
 * @returns url string
 *
 */
export const createMemberNoteService = (id: string, data: createNoteRequestBody) => {
  return postRequest({
    url: createMemberNoteURL(id),
    data
  });
};

/**
 * Update visibility of a note  Service
 * @returns url string
 *
 */
export const updateVisibilityOfNoteService = (
  id: string,
  data: updateNoteVisibilityRequestBody
) => {
  return patchRequest({
    url: updateVisibilityOfNoteURL({ id }),
    data
  });
};

/**
 * Convert note to task  Service
 * @returns url string
 *
 */
export const convertNoteToTaskService = (id: string, data: convertToTaskRequestBody) => {
  return patchRequest({
    url: convertNoteToTaskURL({ id }),
    data
  });
};

/**
 * Delete note Service
 * @returns url string
 *
 */
export const deleteANoteService = (id: string) => {
  return deleteRequest({
    url: deleteANoteURL({ id })
  });
};

/**
 * EDit a note Service
 * @returns url string
 *
 */
export const editNoteService = (id: string, data: editNoteRequestBody) => {
  return patchRequest({
    url: editANoteURL({ id }),
    data
  });
};

/**
 * Fetch a note Service
 * @returns url string
 *
 */
export const fetchAMemberNoteService = (id: string) => {
  return getRequest({
    url: fetchAMemberNoteURL({ id })
  });
};
