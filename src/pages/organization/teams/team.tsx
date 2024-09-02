import { fetchATeamService, fetchATeamsMembersService } from "api";
import { TeamMemberTableData } from "components";
import { useApiRequest } from "hooks";
import { TeamUI } from "modules";
import { useEffect, useMemo, useState } from "react";
import { MetaDataProps, SingleTeamResponseProps } from "types";
import { useNavigate, useParams } from "react-router-dom";
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
  const { id } = useParams();
  const {
    run: runFetchMembers,
    data: membersResponse,
    requestStatus: membersStatus
  } = useApiRequest({});
  const [membersQueryParams, setMembersQueryParams] = useState({
    page: 1,
    limit: 20
  });
  const { run: runFetchATeam, data: teamResponse, requestStatus: teamStatus } = useApiRequest({});
  const fetchATeam = () => {
    if (id) runFetchATeam(fetchATeamService(id));
  };

  const { page, limit } = membersQueryParams;
  const handlePagination = (param: string, value: number) => {
    setMembersQueryParams((prev) => ({ ...prev, [param]: value }));
  };
  const fetchTeamMembers = () => {
    runFetchMembers(fetchATeamsMembersService({ id, page, limit }));
  };

  const teamData = useMemo<SingleTeamResponseProps>(() => {
    if (teamResponse?.status === 200) {
      const item = teamResponse?.data?.data;
      const propertyArray = {
        id: item._id,
        icon: item.icon,
        name: item.name,
        description: item.description,
        isGeneral: item.general
      };

      return propertyArray;
    }
    return {
      id: "",
      icon: "",
      name: "",
      description: "",
      isGeneral: true
    };
  }, [teamResponse]);
  const teamsMembersData = useMemo<TeamMembersDataProps>(() => {
    if (membersResponse?.status === 200) {
      const membersArray = membersResponse?.data?.data?.members.map((item) => ({
        id: item._id,
        team: item.team,
        name: `${item.first_name} ${item.last_name}`,
        email: item.email ?? "",
        role: item.role,
        date: item.date_added.split(" ")[0]
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
    fetchATeam();
  }, [membersQueryParams]);

  const handleViewMember = (id) => {
    navigate(Routes.member(id));
  };

  return (
    <>
      <TeamUI
        handleAddMember={console.log}
        handleViewMember={handleViewMember}
        teamName={teamData.name}
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
