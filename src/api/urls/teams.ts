import { activityParamsProps, fetchMemberQueryParams, PaginationProps } from "types";

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

/**
 * Invite a member to organisation URL
 * @returns url string
 *
 */
export const inviteMemberURL = () => `${prefixTeam}/invite`;

/**
 * Resend/Cancel invite to a member to organisation URL
 * @param id of number to resend/cancel invite to.
 * @returns url string
 *
 */
export const resendOrCancelInviteToMemberURL = ({ id }) => `${prefixTeam}/invite/${id}`;

/**
 * Suspend Member URL
 * @returns url string
 *
 */
export const suspendMemberURL = () => `/user/suspend`;

/**
 * Unsuspend Member URL
 * @returns url string
 *
 */
export const unsuspendMemberURL = () => `/user/unsuspend`;

/**
 * Fetch team roles URL
 * @param id of team
 * @returns url string
 *
 */
export const fetchTeamRolesURL = ({ id }) => `${prefixTeam}/roles/${id}`;

/**
 *Validate invite to a member to organisation URL
 * @returns url string
 *
 */
export const validateInviteURL = () => `${prefixTeam}/invite/validate`;

/**
 *Accept invite by a member to the organisation URL
 * @returns url string
 *
 */
export const acceptInviteURL = () => `${prefixTeam}/invite`;

/**
 * Fetch team's activities URL
 * @returns url string
 *
 */
export const fetchTeamActivitiesURL = (
  id: string,
  { page, limit, sort, ...queryParams }: activityParamsProps
) => {
  const queryString = Object.entries(queryParams)
    .filter(([_, value]) => value !== undefined && value !== "")
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`)
    .join("&");

  return `${prefixTeam}/history/${id}?page=${page}&limit=${limit}&sort=${sort}${
    queryString ? `&${queryString}` : ""
  }`;
};
