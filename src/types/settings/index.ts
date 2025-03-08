import { SortOrderType } from "components";
import { MetaDataProps } from "types/interfaces";

export interface UserProfileProps {
  firstName: string;
  lastName: string;
  jobTitle: string;
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

export interface updatePropertiesRequestBody {
  attribute: string;
  type: string;
  data: string[];
}

export interface PaginationProps {
  page?: number;
  limit?: number;
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
export interface createTeamRequestBody {
  name?: string;
  description?: string;
  icon?: string;
  general?: boolean;
  join_team?: boolean;
}

export interface suspendMemberRequestBody {
  member: string;
  reason?: string;
  duration?: {
    start_date: string;
    end_date: string;
  };
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

export interface fetchMemberQueryParams {
  search?: string;
  page?: number;
  limit?: number;
  status?: string;
  branch?: string;
  team?: string;
}

export type TeamTableData = {
  id: string;
  icon: string;
  name: string;
  teamLeads: string[];
  teamManagers: string[];
  date: string;
  numberOfMembers: number;
  numberOfBranches: number;
};
export interface inviteMemberProperties {
  email: string;
  branch?: string;
  team?: string;
  role: string;
  title: string;
}

export interface TeamDataProps {
  teamsData: TeamTableData[];
  metaData: MetaDataProps;
}
export interface SingleTeamResponseProps {
  id: string;
  icon: string;
  name: string;
  description: string;
  isGeneral: boolean;
}

export type statuses = "invited" | "expired" | "active" | "suspended";

export type MemberTableData = {
  id: string;
  avatar: string;
  name: string;
  branch: string[];
  teams: string[];
  role: string;
  email: string;
  date: string;
  lastActive: string;
  initial: string;
  status: statuses;
};

export interface MemberDataProps {
  membersArray: MemberTableData[];
  metaData: MetaDataProps;
}

export interface MemberProfileProps {
  avatar: string | undefined;
  initials: string;
  fullName: string;
  email: string;
  jobTitle: string;
  role: string;
  status: string;
  timeZone: string;
  phoneNumber: string;
  dateFormat: string;
  syslanguage: string;
  pendingEmail: string | null;
  fluentLanguages: string[];
  userAttributes: any;
}

type conditions = "is" | "is_not" | "contains" | "not_contain" | "starts_with" | "ends_with";

export interface MemberDataProps {
  membersArray: MemberTableData[];
  metaData: MetaDataProps;
}
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
  sort: SortOrderType;
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

export interface editMemberDetailsRequestBody {
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  avatar?: string;
  title?: string;
  language?: string;
  timezone?: string;
  date_format?: string;
  fluent_languages?: string[];
}
export interface QueryParamProps {
  page: number;
  limit: number;
  order: SortOrderType;
  startDate: string;
  endDate: string;
}

export interface NotificationProps {
  title: string;
  description: string;
  inAppSubmit: (enable: string) => void;
  emailSubmit: (enable: string) => void;
  popUpSubmit: (enable: string) => void;
}
