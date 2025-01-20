/*
=================================
MEMBER NOTES URLS
=================================
*/

import { fetchMemberNotesQueryParams } from "types";

const prefix = "/note";

/**
 * Fetch member's notes URL
 * @returns url string
 *
 */
export const fetchMemberNotesURL = (id: string, queryParams: fetchMemberNotesQueryParams) => {
  const queryString = Object.entries(queryParams)
    .filter(([_, value]) => value !== undefined && value !== "")
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`)
    .join("&");

  return `${prefix}/all/user/${id}/${queryString ? `?${queryString}` : ""}`;
};

/**
 * Create a note for a member URL
 * @returns url string
 *
 */

export const createMemberNoteURL = (id: string) => {
  return `${prefix}/create/user/${id}`;
};

/**
 * Update visibility of a note URL
 * @param id of the task
 * @returns url string
 *
 */

export const updateVisibilityOfNoteURL = ({ id }) => `${prefix}/visibility/${id}`;

/**
 *Convert a note to task URL
 * @param id of the note
 * @returns url string
 *
 */

export const convertNoteToTaskURL = ({ id }) => `${prefix}/convert/${id}`;

/**
 * Delete a note URL
 * @param id of the note
 * @returns url string
 *
 */

export const deleteANoteURL = ({ id }) => `${prefix}/delete/${id}`;

/**
 * Edit a note URL
 * @param id of the note
 * @returns url string
 *
 */

export const editANoteURL = ({ id }) => `${prefix}/edit/${id}`;

/**
 * Fetch a note URL
 * @param id of the note
 * @returns url string
 *
 */

export const fetchAMemberNoteURL = ({ id }) => `${prefix}/${id}`;
