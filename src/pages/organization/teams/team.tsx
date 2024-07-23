import { fetchATeamsMembersService } from "api";
import { TeamMemberTableData } from "components";
import { useApiRequest } from "hooks";
import { TeamUI } from "modules";
import { useEffect, useMemo, useState } from "react";
import { MetaDataProps } from "types";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";

export interface TeamMembersDataProps {
  membersArray: TeamMemberTableData[];
  metaData: MetaDataProps;
}

const initMemberData = {
  membersArray: [],
  metaData: {
    currentPage: 1,
    totalCount: 0,
    totalPages: 0,
    pageLimit: 0
  }
};
const Team = () => {
  const navigate = useNavigate();
  const teamPath = window.location.pathname.split("/");
  const id = teamPath[teamPath.length - 1];
  const {
    run: runFetchMembers,
    data: membersResponse,
    requestStatus: membersStatus
  } = useApiRequest({});
  const [membersQueryParams, setMembersQueryParams] = useState({
    page: 1,
    limit: 20
  });

  const { page, limit } = membersQueryParams;
  const handlePagination = (param: string, value: number) => {
    setMembersQueryParams((prev) => ({ ...prev, [param]: value }));
  };
  const fetchTeamMembers = () => {
    runFetchMembers(fetchATeamsMembersService({ id, page, limit }));
  };

  const teamsMembersData = useMemo<TeamMembersDataProps>(() => {
    if (membersResponse?.status === 200) {
      const membersArray = membersResponse?.data?.data?.members.map((item) => ({
        id: item._id,
        name: `${item.first_name} ${item.last_name}`,
        email: item.email ?? "",
        role: item.role,
        date: item.date_added.slice(0, 10)
      }));
      const metaData = {
        currentPage: membersResponse?.data?.data?.page ?? 1,
        totalPages: membersResponse?.data?.data?.total_pages,
        totalCount: membersResponse?.data?.data?.total_count,
        pageLimit: membersQueryParams.limit
      };
      return { membersArray, metaData };
    }
    return initMemberData;
  }, [membersResponse, membersQueryParams]);

  useEffect(() => {
    if (id) fetchTeamMembers();
  }, [membersQueryParams]);

  const handleViewMember = (id) => {
    navigate(Routes.member(id));
  };

  return (
    <>
      <TeamUI
        handleAddMember={console.log}
        handleViewMember={handleViewMember}
        memberData={{
          loading: membersStatus.isPending,
          teamsMembersData: teamsMembersData,
          handlePagination
        }}
      />
    </>
  );
};

export { Team };
