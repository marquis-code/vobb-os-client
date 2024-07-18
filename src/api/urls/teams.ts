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
export const fetchTeamsURL = ({ page, limit }) => `${prefixTeam}/all?page=${page}&limit=${limit}`;

/**
 * Fetch a team URL
 *@param id of team
 * @returns url string
 *
 */
export const fetchATeamURL = ({ id }) => `${prefixTeam}/${id}`;

/**
 * Edit a team URL
 *@param id of team
 * @returns url string
 *
 */
export const editATeamURL = ({ id }) => `${prefixTeam}/edit/${id}`;

/**
 * Fetch a team's branches URL
 * @param id id of team
 * @param page current page
 * @returns url string
 *
 */
export const fetchATeamBranchesURL = ({ id, page }) => `${prefixTeam}/branch/${id}?page=${page}`;

/**
 * Fetch a team's members URL
 * @param id id of team
 * @param page page number
 * @param limit number per page
 * @returns url string
 *
 */
export const fetchATeamsMembersURL = ({ id, page, limit }) =>
  `${prefixTeam}/members/${id}?page=${page}&limit=${limit}`;
