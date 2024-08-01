import { PaginationProps } from "types";

/*
=================================
TEAMS URLS
=================================
*/
const prefixTeam = "/teams";

/**
 * Create a team URL
 *
 * @returns url string
 *
 */
export const createTeamURL = () => `${prefixTeam}/create`;

/**
 * Set a team's permissions URL
 *@param id of team
 * @returns url string
 *
 */
export const setTeamPermissionsURL = ({ id }) => `${prefixTeam}/set-permissions/${id}`;

/**
 * Fetch all teams in an organisation's URL
 * @param page number
 * @param limit number
 * @returns url string
 *
 */
export const fetchTeamsURL = ({ page, limit }: PaginationProps) => {
  const queryParams = new URLSearchParams();

  if (page !== undefined) queryParams.append("page", page.toString());
  if (limit !== undefined) queryParams.append("limit", limit.toString());

  const queryString = queryParams.toString();
  return `${prefixTeam}/all${queryString ? `?${queryString}` : ""}`;
};
