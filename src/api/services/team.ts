/*
=================================
TEAMS SERVICES
=================================
*/

import { getRequest, postRequest } from "api/requestProcessor";
import { addMemberToTeamURL, fetchTeamsURL } from "api";
import { PaginationProps } from "types";

/**
 * Fetch all teams service
 * @returns axios promise
 */
export const fetchTeamsService = (query: PaginationProps = {}) => {
  return getRequest({
    url: fetchTeamsURL(query)
  });
};

/**
 * Add member to a team service
 * @returns axios promise
 */
export const addMemberToTeamService = ({ teamId, memberId }) => {
  return postRequest({
    url: addMemberToTeamURL({ teamId, memberId })
  });
};
