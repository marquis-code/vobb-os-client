import { OrgBranchUI } from "modules";
import { useEffect, useMemo, useState } from "react";
import { TransferMember } from "./transferMember";
import { useApiRequest } from "hooks";
import { fetchOrgBranchMembersService, fetchTeamsPerBranchService } from "api";
import { BranchMembersProps, BranchTeamsProps } from "types";
import { useUserContext } from "context";

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
  const { branchMembers, branchTeams, handleUpdateBranchMembers, handleUpdateBranchTeams } =
    useUserContext();
  const { currentPage: memberPage } = branchMembers?.membersMetaData || {
    currentPage: 1
  };
  const { currentPage: teamPage } = branchTeams?.teamsMetaData || {
    currentPage: 1
  };

  const [memberQueryParams, setMemberQueryParams] = useState({
    page: memberPage,
    limit: 20,
    name: undefined,
    team: undefined,
    role: undefined,
    email: undefined,
    operation: undefined
  });

  const [teamQueryParams, setTeamsQueryParams] = useState({
    page: teamPage,
    limit: 20
  });

  const branchPath = window.location.pathname.split("/");
  const branchId = branchPath[branchPath.length - 1];
  const [transfer, setTransfer] = useState({ show: false, id: "" });
  const handleTransferMember = (id: string) => {
    setTransfer({ show: true, id });
  };

  const { run: runTeams, data: teamsResponse } = useApiRequest({});
  const { run: runMembers, data: membersResponse } = useApiRequest({});

  const fetchBranchMembers = () => {
    runMembers(
      fetchOrgBranchMembersService(branchId, {
        page: memberQueryParams.page,
        limit: memberQueryParams.limit,
        name: memberQueryParams.name,
        team: memberQueryParams.team,
        role: memberQueryParams.role,
        email: memberQueryParams.email,
        operation: memberQueryParams.operation
      })
    );
  };

  const fetchBranchTeams = () => {
    runTeams(
      fetchTeamsPerBranchService({
        id: branchId,
        page: teamQueryParams.page,
        limit: teamQueryParams.limit
      })
    );
  };

  useMemo<BranchMembersProps>(() => {
    if (membersResponse?.status === 200) {
      const membersArray = membersResponse?.data?.data?.members.map((item) => ({
        name: item.name,
        id: item._id,
        email: item.email,
        role: item.role,
        date: item.date_added.split(" ")[0],
        teams: item.teams.map((team) => team.name)
      }));

      const membersMetaData = {
        currentPage: membersResponse?.data?.data?.page ?? 1,
        totalPages: membersResponse?.data?.data?.total_pages,
        totalCount: membersResponse?.data?.data?.total_count,
        pageLimit: memberQueryParams.limit
      };

      handleUpdateBranchMembers({ membersArray, membersMetaData });
      return { membersArray, membersMetaData };
    }

    return initMembersData;
  }, [membersResponse]);

  useMemo<BranchTeamsProps>(() => {
    if (teamsResponse?.status === 200) {
      const teamsArray = teamsResponse?.data?.data?.teams.map((item) => ({
        name: item.name,
        id: item._id,
        icon: item.icon ?? "",
        date: item.date_added.split(" ")[0],
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

      handleUpdateBranchTeams({ teamsArray, teamsMetaData });
      return { teamsArray, teamsMetaData };
    }

    return initTeamsData;
  }, [teamsResponse]);

  useEffect(() => {
    fetchBranchMembers();
  }, [branchId, memberQueryParams]);

  useEffect(() => {
    fetchBranchTeams();
  }, [branchId, teamQueryParams]);

  const handleUpdateMembersParams = (param: string, value: number | string) => {
    setMemberQueryParams((prev) => ({ ...prev, [param]: value }));
  };

  const handleUpdateTeamsParams = (param: string, value: number) => {
    setTeamsQueryParams((prev) => ({ ...prev, [param]: value }));
  };
  return (
    <>
      <TransferMember
        show={transfer.show}
        id={branchId}
        type="member"
        transferIds={[transfer.id]}
        handleTransfer={console.log}
        fetchBranchMembers={fetchBranchMembers}
        close={() => setTransfer({ show: false, id: "" })}
      />
      <OrgBranchUI
        handleViewMember={console.log}
        handleTransferMember={handleTransferMember}
        handleUpdateMembersParams={handleUpdateMembersParams}
        handleUpdateTeamsParams={handleUpdateTeamsParams}
      />
    </>
  );
};

export { OrgBranch };
