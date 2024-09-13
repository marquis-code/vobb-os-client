import { MetaDataProps } from "types/interfaces";

export interface UserProfileProps {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  avatar: string;
  phoneNumber: string;
  dateFormat: string;
  language: string;
  twoFaStatus: boolean;
  googleStatus: boolean;
  timezone: string;
  pendingEmail: string | null;
  fluentLanguages: string[];
  userAttributes: { attribute: []; data: [] }[];
}
export interface BlacklistProps {
  ipAddress: string;
  status: boolean;
}

export interface OrganisationProfileProps {
  organisation: string;
  logo: string;
  sector: string[];
  website: string;
  primaryEmail: string;
  secondaryEmail: string;
  pendingPrimaryEmail: string;
  pendingSecondaryEmail: string;
  primaryPhoneNumber: string;
  secondaryPhoneNumber: string;
  tempSuspensionNotice: boolean;
  indefiniteSuspensionNotice: boolean;
  primaryBrandColor: string;
  secondaryBrandColor: string;
}

export interface OrganisationBranchesData {
  id: string;
  name: string;
  country: string;
  zipCode: string;
  province: string;
  isPrimary: boolean;
  addressLine1: string;
  addressLine2: string;
  city: string;
  timeZone: string;
  hasMembers: boolean;
}
export interface UserBranchesData {
  id: string;
  branch: string;
  country: string;
  province: string;
  city: string;
  time: string;
  dateAdded: string;
}
export interface OrganisationAttributesData {
  id: string;
  title: string;
  type: string;
  required: boolean;
  isSystem: boolean;
  isActive: boolean;
  description?: string;
  metaData?: any;
}
export interface BranchesDataProps {
  branchesArray: OrganisationBranchesData[];
  branchesMetaData: MetaDataProps;
}

export interface UserBranchesDataProps {
  branchesArray: UserBranchesData[];
  branchesMetaData: MetaDataProps;
}

export interface AttributesDataProps {
  attributesArray: OrganisationAttributesData[];
  attributesMetaData: MetaDataProps;
}

export interface MemberPropertiesData {
  id: string;
  attribute: string;
  values: string[];
  label: string;
  type: string;
}

export type BranchMemberTableData = {
  id: string;
  name: string;
  email: string;
  teams: string[];
  role: string;
  date: string;
};

export interface BranchMembersProps {
  membersArray: BranchMemberTableData[];
  membersMetaData: MetaDataProps;
}

export type BranchTeamTableData = {
  id: string;
  icon: string;
  name: string;
  teamLeads: string[];
  teamManagers: string[];
  date: string;
  numberOfMembers: number;
};

export interface BranchTeamsProps {
  teamsArray: BranchTeamTableData[];
  teamsMetaData: MetaDataProps;
}

type conditions = "is" | "is_not" | "contains" | "not_contain" | "starts_with" | "ends_with";

interface filterParamsStructure {
  value: string;
  cond: conditions;
}

export interface branchQueryParamsProps {
  page?: number;
  limit?: number;
  type?: string;
  name?: filterParamsStructure[];
  team?: filterParamsStructure[];
  role?: filterParamsStructure[];
  email?: filterParamsStructure[];
  operation?: string;
}

export interface activityParamsProps {
  page: number;
  limit: number;
  sort: string;
  start?: string;
  end?: string;
  start_date?: string;
  end_date?: string;
}

export interface PaginationProps {
  page?: number;
  limit?: number;
  search?: string;
}
