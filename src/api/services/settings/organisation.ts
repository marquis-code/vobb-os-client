/*
=================================
SETTINGS SERVICES
=================================
*/

import {
  addNewOrgBranchURL,
  archiveOrgAttributeURL,
  createOrgAttributeURL,
  deleteOrgBranchURL,
  deleteRequest,
  fetchABranchURL,
  fetchOrgActivitiesURL,
  fetchOrgAttributesURL,
  fetchOrgBranchesURL,
  fetchOrgBranchMembersURL,
  fetchOrgDetailsURL,
  fetchTeamsPerBranchURL,
  getRequest,
  patchRequest,
  postRequest,
  putRequest,
  resendCodeOrgEmailsURL,
  restoreOrgAttributeURL,
  transferAllMembersToBranchURL,
  transferMultipleMembersToBranchURL,
  updateOrgAttributeURL,
  updateOrgBranchURL,
  updateOrgBrandingURL,
  updateOrgEmailsURL,
  updateOrgNumbersURL,
  updateOrgProfileURL,
  updateOrgSusNotifyURL,
  verifyOrgEmailsURL
} from "api";
import { activityParamsProps, branchQueryParamsProps, PaginationProps } from "types";

/*
ORGANIZATION SERVICES
*/

interface updateOrgEmailsRequestBody {
  email: string;
  action: "primary" | "support";
}

interface verifyOrgEmailsRequestBody {
  token: string;
  action: "primary" | "support";
}

interface updateOrgNumbersRequestBody {
  number: string;
  action: "primary" | "support";
}

interface updateBrandingRequestBody {
  primary_color: string;
  secondary_color: string;
}

export interface organisationBranchRequestBody {
  name: string;
  country: string;
  zip_code: string;
  state: string;
  address_line_1: string;
  address_line_2?: string;
  city: string;
  timezone: string;
}

interface addNewBranchRequestBody {
  branches: [organisationBranchRequestBody];
}

export interface createAttributeRequestBody {
  type: string;
  label: string;
  is_required: boolean;
  description?: string;
  is_client_prop?: boolean;
  meta?: any;
}

interface transferMembersRequestBody {
  oldBranch: string;
  newBranch: string;
  members?: string[];
}

/**
 * Fetch org details service
 * @returns axios promise
 */
export const fetchOrgDetailsService = () => {
  return getRequest({
    url: fetchOrgDetailsURL()
  });
};

/**
 * Update organization profile service
 * @param formData containing update info
 * @returns axios promise
 */
export const updateOrgProfileService = (data: FormData) => {
  return putRequest({
    url: updateOrgProfileURL(),
    data
  });
};

/**
 * Update org emails service
 * @param data containing email update, string and action indicating primary or support
 * @returns axios promise
 */
export const updateOrgEmailsService = (data: updateOrgEmailsRequestBody) => {
  return patchRequest({
    url: updateOrgEmailsURL(),
    data
  });
};

/**
 * REsend verification code for org emails service
 * @returns axios promise
 */
export const resendCodeOrgEmailsService = (data: { action: "primary" | "support" }) => {
  return patchRequest({
    url: resendCodeOrgEmailsURL(),
    data
  });
};

/**
 * Verify org emails service
 * @returns axios promise
 */
export const verifyOrgEmailsService = (data: verifyOrgEmailsRequestBody) => {
  return patchRequest({
    url: verifyOrgEmailsURL(),
    data
  });
};

/**
 * Update org numbers service
 * @returns axios promise
 */
export const updateOrgNumbersService = (data: updateOrgNumbersRequestBody) => {
  return patchRequest({
    url: updateOrgNumbersURL(),
    data
  });
};

/**
 * Update org branding service
 * @returns axios promise
 */
export const updateOrgBrandingService = (data: updateBrandingRequestBody) => {
  return patchRequest({
    url: updateOrgBrandingURL(),
    data
  });
};

/**
 * Update temporary suspension service
 * @returns axios promise
 */
export const updateTempSusNotifyService = (data: { temporary_suspension_notify: boolean }) => {
  return patchRequest({
    url: updateOrgSusNotifyURL(),
    data
  });
};

/**
 * Update indefinite suspension service
 * @returns axios promise
 */
export const updateIndefSusNotifyService = (data: { indefinite_suspension_notify: boolean }) => {
  return patchRequest({
    url: updateOrgSusNotifyURL(),
    data
  });
};

/**
 * Fetch organisation's branches service
 * @param page showing page number requested,
 * @param limit showing number of items per page
 * @returns axios promise
 */
export const fetchOrgBranchesService = (query: PaginationProps = {}) => {
  return getRequest({
    url: fetchOrgBranchesURL(query)
  });
};

/**
 * Fetch a branch's service
 * @param id of branch requested
 * @returns axios promise
 */

export const fetchABranchService = ({ id }) => {
  return getRequest({
    url: fetchABranchURL({ id })
  });
};

/**
 * Add a new organisation's branch service
 * @param branches array of properties for the branch
 * @returns axios promise
 */
export const addNewOrgBranchService = (data: addNewBranchRequestBody) => {
  return postRequest({
    url: addNewOrgBranchURL(),
    data
  });
};

/**
 * Update an organisation's branch service
 * @param id of organisation's branch
 * @param updateData branch's details to be changed.
 * @returns axios promise
 */
export const updateOrgBranchService = (id: string, updateData: organisationBranchRequestBody) => {
  return putRequest({
    url: updateOrgBranchURL(id),
    data: updateData
  });
};

/**
 * Mark branch as primary service
 * @param id of organisation's branch
 * @returns axios promise
 */
export const markBranchAsPrimaryService = (id: string) => {
  return patchRequest({
    url: updateOrgBranchURL(id)
  });
};

/**
 * Fetch organisation's attributes service
 * @param page showing page number requested,
 * @param limit showing number of items per page
 * @returns axios promise
 */
export const fetchOrgAttributesService = ({ page, limit, type }: branchQueryParamsProps) => {
  return getRequest({
    url: fetchOrgAttributesURL({ page, limit, type })
  });
};

/**
 * Create an organisation's attribute service
 * @param data request body
 * @returns axios promise
 */
export const createOrgAttributeService = (data: createAttributeRequestBody) => {
  return postRequest({
    url: createOrgAttributeURL(),
    data
  });
};

/**
 * Update an organisation's attribute service
 * @param id of attribute
 * @returns axios promise
 */
export const updateOrgAttributeService = (id: string, data: createAttributeRequestBody) => {
  return putRequest({
    url: updateOrgAttributeURL({ id }),
    data
  });
};

/**
 * Archive an organisation's attribute service
 * @param id of attribute
 * @returns axios promise
 */
export const archiveOrgAttributeService = ({ id }) => {
  return patchRequest({
    url: archiveOrgAttributeURL({ id })
  });
};

/**
 * Restore an organisation's attribute service
 * @param id of attribute
 * @returns axios promise
 */
export const restoreOrgAttributeService = ({ id }) => {
  return patchRequest({
    url: restoreOrgAttributeURL({ id })
  });
};

/**
 * Delete an organisation's branch service
 * @param id of branch
 * @returns axios promise
 */
export const deleteOrgBranchService = ({ id }) => {
  return deleteRequest({
    url: deleteOrgBranchURL({ id })
  });
};

/**
 * Fetch organisation's branch's members service
 * @params must include id of branch, optional query parameters that will not be included if not called for.
 * @returns axios promise
 */
export const fetchOrgBranchMembersService = (
  id: string,
  queryParams: branchQueryParamsProps = {}
) => {
  return getRequest({
    url: fetchOrgBranchMembersURL({ id, queryParams })
  });
};

/**
 * TRansfers organisation's branch's one or more members to another branch.
 * @param data request body
 * @returns axios promise
 */
export const transferMultipleMembersToBranchService = (data: transferMembersRequestBody) => {
  return postRequest({
    url: transferMultipleMembersToBranchURL(),
    data
  });
};

/*TRansfers all of an organisation's branch's members to another branch.
 * @param data request body
 * @returns axios promise
 */
export const transferAllMembersToBranchService = (data: transferMembersRequestBody) => {
  return postRequest({
    url: transferAllMembersToBranchURL(),
    data
  });
};

/**
 * Fetch teams per branch service
 * @param id of branch
 * @returns axios promise
 */
export const fetchTeamsPerBranchService = ({ id, page, limit }) => {
  return getRequest({
    url: fetchTeamsPerBranchURL({ id, page, limit })
  });
};

/**
 * Fetch org's activity service
 * @returns axios promise
 */
export const fetchOrgActivitiesService = ({
  page,
  limit,
  sort,
  ...queryParams
}: activityParamsProps) => {
  return getRequest({
    url: fetchOrgActivitiesURL({ page, limit, sort, ...queryParams })
  });
};
