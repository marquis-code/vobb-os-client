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
export const fetchATeamURL = ({ id, page }) => `${prefixTeam}/${id}?page=${page}`;

/**
 * Edit a team URL
 *@param id of team
 * @returns url string
 *
 */
export const editATeamURL = ({ id }) => `${prefixTeam}/edit/${id}`;
