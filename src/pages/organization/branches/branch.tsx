import { OrgBranchUI } from "modules";
import { useEffect, useMemo, useState } from "react";
import { TransferMember } from "./transferMember";
import { useApiRequest, useDebounce } from "hooks";
import {
  addExistingMembersToBranchService,
  fetchABranchService,
  fetchEligibleMembersForBranchService,
  fetchOrgBranchMembersService,
  fetchTeamsPerBranchService
} from "api";
import { BranchMembersProps, BranchTeamsProps, OrganisationBranchesData } from "types";
import { useCountriesContext, useUserContext } from "context";
import { format, parseISO } from "date-fns";
import { useParams } from "react-router-dom";
import { InviteMemberToBranch } from "./inviteMemberToBranch";
import { toast } from "components";

export const initBranchData = {
  id: "",
  name: "",
  country: "",
  province: "",
  city: "",
  timeZone: "",
  zipCode: "",
  addressLine1: "",
  addressLine2: "",
  isPrimary: false,
  hasMembers: false
};

const initMembersData: BranchMembersProps = {
  membersArray: [],
  membersMetaData: {
    currentPage: 1,
    totalCount: 0,
    totalPages: 0,
    pageLimit: 0
  }
};

const initTeamsData: BranchTeamsProps = {
  teamsArray: [],
  teamsMetaData: {
    currentPage: 1,
    totalCount: 0,
    totalPages: 0,
    pageLimit: 0
  }
};

const OrgBranch = () => {
  const [inviteMemberToBranch, setInviteMemberToBranch] = useState(false);
  const [addExistingMembers, setAddExistingMembers] = useState(false);

  const handleInviteMemberToBranch = () => setInviteMemberToBranch(true);
  const closeInviteMemberToBranch = () => setInviteMemberToBranch(false);

  const handleAddExistingMembers = () => setAddExistingMembers(true);
  const closeAddExistingMembers = () => setAddExistingMembers(false);

  const { userDetails } = useUserContext();
  const userDateFormat = userDetails?.dateFormat;
  const dateFormatted =
    userDateFormat === "Month D, Yr"
      ? "MMMM dd, yyyy"
      : userDateFormat === "DD/MM/YYYY"
      ? "dd-MM-yyyy"
      : "MM-dd-yyyy";
  const [memberQueryParams, setMemberQueryParams] = useState({
    page: 1,
    limit: 20
  });

  const [memberFilters, setMemberFilters] = useState({
    name: [], // [{value:'nancy', cond: 'starts_with'}]
    team: [],
    role: [],
    email: [],
    operation: undefined
  });

  const handleUpdateMemberFilters = (transformedArray) => {
    setMemberFilters(transformedArray);
  };

  const [teamQueryParams, setTeamsQueryParams] = useState({
    page: 1,
    limit: 20
  });
  const { countries } = useCountriesContext();
  const { id: branchId = "" } = useParams() || {};

  const [transfer, setTransfer] = useState({ show: false, id: "" });
  const handleTransferMember = (id: string) => {
    setTransfer({ show: true, id });
  };

  const { run: runTeams, data: teamsResponse } = useApiRequest({});
  const {
    run: runMembers,
    data: membersResponse,
    requestStatus: membersStatus
  } = useApiRequest({});
  const {
    run: runFetchBranch,
    data: branchResponse,
    error: branchError,
    requestStatus: branchStatus
  } = useApiRequest({});

  const fetchBranchMembers = () => {
    runMembers(
      fetchOrgBranchMembersService(branchId, {
        page: memberQueryParams.page,
        limit: memberQueryParams.limit,
        name: memberFilters.name,
        team: memberFilters.team,
        role: memberFilters.role,
        email: memberFilters.email,
        operation: memberFilters.operation
      })
    );
  };

  const fetchBranchTeams = () => {
    runTeams(
      fetchTeamsPerBranchService(branchId, {
        page: teamQueryParams.page,
        limit: teamQueryParams.limit
      })
    );
  };
  const fetchBranch = () => {
    runFetchBranch(fetchABranchService({ id: branchId }));
  };

  const branchMembers = useMemo<BranchMembersProps>(() => {
    if (membersResponse?.status === 200) {
      const membersArray = membersResponse?.data?.data?.members.map((item) => ({
        name: item.name,
        id: item._id,
        email: item.email,
        role: item.role,
        date: format(parseISO(item.date), dateFormatted),
        teams: item.teams.map((team) => team.name)
      }));

      const membersMetaData = {
        currentPage: membersResponse?.data?.data?.page ?? 1,
        totalPages: membersResponse?.data?.data?.total_pages,
        totalCount: membersResponse?.data?.data?.total_count,
        pageLimit: memberQueryParams.limit
      };

      return { membersArray, membersMetaData };
    }

    return initMembersData;
  }, [membersResponse, dateFormatted, memberQueryParams.limit]);

  const branchTeams = useMemo<BranchTeamsProps>(() => {
    if (teamsResponse?.status === 200) {
      const teamsArray = teamsResponse?.data?.data?.teams.map((item) => ({
        name: item.name,
        id: item._id,
        icon: item.icon ?? "",
        date: item.date_added,
        teamLeads: item.team_leads.map((lead) => lead.name),
        teamManagers: item.team_managers.map((manager) => manager.name),
        numberOfMembers: item.members
      }));

      const teamsMetaData = {
        currentPage: teamsResponse?.data?.data?.page ?? 1,
        totalPages: teamsResponse?.data?.data?.total_pages,
        totalCount: teamsResponse?.data?.data?.total_count,
        pageLimit: teamQueryParams.limit
      };

      return { teamsArray, teamsMetaData };
    }

    return initTeamsData;
  }, [teamsResponse, teamQueryParams.limit]);

  const branchInfo = useMemo<OrganisationBranchesData>(() => {
    if (branchResponse?.status === 200) {
      const item = branchResponse.data.data;
      const branch = {
        id: item._id,
        name: item.name,
        country: countries.find((country) => country.value === item.country)?.label || "",
        zipCode: item.zip_code,
        province: item.state,
        isPrimary: item.is_primary,
        addressLine1: item.address_line_1,
        addressLine2: item.address_line_2 ?? "",
        city: item.city,
        timeZone: item.timezone ?? "",
        hasMembers: item.member_exists
      };
      return branch;
    }
    return initBranchData;
  }, [branchResponse, branchError]);

  useEffect(() => {
    fetchBranch();
    fetchBranchMembers();
  }, [branchId, memberQueryParams, memberFilters]);

  useEffect(() => {
    fetchBranchTeams();
  }, [branchId, teamQueryParams]);

  const handleUpdateMembersParams = (param: string, value: number | string) => {
    setMemberQueryParams((prev) => ({ ...prev, [param]: value }));
  };

  const handleUpdateTeamsParams = (param: string, value: number) => {
    setTeamsQueryParams((prev) => ({ ...prev, [param]: value }));
  };

  const {
    run: runFetchEligibleMembers,
    data: eligibleMembersResponse,
    error: eligibleMembersError,
    requestStatus: eligibleMembersStatus
  } = useApiRequest({});
  const {
    run: runAddExisting,
    data: existingResponse,
    error: existingError,
    requestStatus: existingStatus
  } = useApiRequest({});

  const [eligibleMembersQueryParams, setEligibleMembersQueryParams] = useState({
    limit: 4,
    search: ""
  });

  const handleUpdateMembersQueryParams = (filter: string, value: string | number) => {
    setEligibleMembersQueryParams((prev) => ({ ...prev, [filter]: value }));
  };
  const { search } = eligibleMembersQueryParams;
  const debouncedSearchTerm = useDebounce(search, 1000);

  const handleFetchEligibleMembers = ({ search = "" }) => {
    runFetchEligibleMembers(
      fetchEligibleMembersForBranchService(branchId, { ...eligibleMembersQueryParams, search })
    );
  };

  const eligibleMembersData = useMemo(() => {
    if (eligibleMembersResponse?.status === 200) {
      const data = eligibleMembersResponse?.data?.data?.users.map((item) => ({
        value: item._id,
        avatar: item.avatar,
        label: item.full_name
      }));
      const metaData = {
        currentPage: eligibleMembersResponse?.data?.data?.page ?? 1,
        totalPages: eligibleMembersResponse?.data?.data?.total_pages,
        totalCount: eligibleMembersResponse?.data?.data?.total_count,
        pageLimit: eligibleMembersQueryParams.limit
      };
      return { data, metaData };
    } else if (eligibleMembersError) {
      toast({
        variant: "destructive",
        description: eligibleMembersError?.response?.data?.error
      });
    }
    return {};
  }, [eligibleMembersResponse, eligibleMembersQueryParams.limit, eligibleMembersError]);

  useEffect(() => {
    if (debouncedSearchTerm.trim()) {
      handleFetchEligibleMembers({ search: debouncedSearchTerm });
    } else {
      handleFetchEligibleMembers({});
    }
  }, [debouncedSearchTerm]);

  const formattedMembers = eligibleMembersData.data;

  //add existing member
  const handleAddMembers = (data: string[]) => {
    runAddExisting(addExistingMembersToBranchService(branchId, { members: data }));
  };
  useMemo(() => {
    if (existingResponse?.status === 200) {
      toast({
        description: existingResponse?.data?.message
      });
      fetchBranchMembers();
    } else if (existingError) {
      toast({
        variant: "destructive",
        description: existingError?.response?.data?.error
      });
    }
  }, [existingResponse, existingError]);

  return (
    <>
      <TransferMember
        show={transfer.show}
        id={branchId}
        type="member"
        transferIds={[transfer.id]}
        fetchBranchMembers={fetchBranchMembers}
        close={() => setTransfer({ show: false, id: "" })}
      />
      <InviteMemberToBranch
        show={inviteMemberToBranch}
        close={closeInviteMemberToBranch}
        callback={() => fetchBranchMembers()}
        currentBranch={{ label: branchInfo?.name, value: branchInfo?.id }}
      />

      <OrgBranchUI
        handleViewMember={console.log}
        handleTransferMember={handleTransferMember}
        handleUpdateMembersParams={handleUpdateMembersParams}
        handleUpdateTeamsParams={handleUpdateTeamsParams}
        handleUpdateMemberFilters={handleUpdateMemberFilters}
        handleInviteMemberToBranch={handleInviteMemberToBranch}
        handleAddExistingMembersToBranch={handleAddExistingMembers}
        loadingMembers={membersStatus.isPending || branchStatus.isPending}
        branchInfo={branchInfo}
        branchMembers={branchMembers}
        branchTeams={branchTeams}
        addExistingMembers={{
          submit: handleAddMembers,
          loading: existingStatus.isPending
        }}
        eligibleMembers={{
          loading: eligibleMembersStatus.isPending,
          data: formattedMembers,
          searchQuery: eligibleMembersQueryParams.search,
          handleParams: handleUpdateMembersQueryParams
        }}
      />
    </>
  );
};

export { OrgBranch };
