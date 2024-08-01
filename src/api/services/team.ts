/*
=================================
TEAMS SERVICES
=================================
*/

import { getRequest } from "api/requestProcessor";
import { fetchTeamsURL } from "api";
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
