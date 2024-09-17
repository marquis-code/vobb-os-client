import { fetchATeamService, fetchATeamsMembersService, fetchTeamActivitiesService } from "api";
import { TeamMemberTableData } from "components";
import { useApiRequest } from "hooks";
import { TeamActivityData, TeamUI } from "modules";
import { useEffect, useMemo, useState } from "react";
import { MetaDataProps, QueryParamProps, SingleTeamResponseProps } from "types";
import { useNavigate, useParams } from "react-router-dom";
import { Routes } from "router";
import { format, parseISO } from "date-fns";
import { useUserContext } from "context";

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

export interface TeamActivityResponse {
  activityArray: TeamActivityData[];
  metaData: MetaDataProps;
}
export const initActivityData = {
  activityArray: [],
  metaData: {
    currentPage: 1,
    totalPages: 0,
    totalCount: 0,
    pageLimit: 0
  }
};
const Team = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { userDetails } = useUserContext();
  const userDateFormat = userDetails?.dateFormat;
  const dateFormatted =
    userDateFormat === "Month D, Yr"
      ? "MMMM dd, yyyy"
      : userDateFormat === "DD/MM/YYYY"
      ? "dd-MM-yyyy"
      : "MM-dd-yyyy";

  const { run: runFetchATeam, data: teamResponse } = useApiRequest({});

  const {
    run: runFetchMembers,
    data: membersResponse,
    requestStatus: membersStatus
  } = useApiRequest({});

  const {
    run: runFetchHistory,
    data: historyResponse,
    requestStatus: historyStatus
  } = useApiRequest({});

  const [membersQueryParams, setMembersQueryParams] = useState({
    page: 1,
    limit: 20
  });
  const handleMemberPagination = (param: string, value: number) => {
    setMembersQueryParams((prev) => ({ ...prev, [param]: value }));
  };

  const [teamActivitiesParams, setTeamActivitiesParams] = useState<QueryParamProps>({
    page: 1,
    limit: 20,
    order: "desc",
    startDate: "",
    endDate: ""
  });

  const handleUpdateQuery = (param: string, value: Date | string | number) => {
    setTeamActivitiesParams((prev) => ({ ...prev, [param]: value }));
  };

  const fetchATeam = () => {
    if (id) runFetchATeam(fetchATeamService(id));
  };

  const fetchTeamMembers = () => {
    runFetchMembers(
      fetchATeamsMembersService({
        id,
        page: membersQueryParams.page,
        limit: membersQueryParams.limit
      })
    );
  };

  const fetchOrgActivities = () => {
    if (id)
      runFetchHistory(
        fetchTeamActivitiesService(id, {
          page: teamActivitiesParams.page,
          limit: teamActivitiesParams.limit,
          sort: teamActivitiesParams.order,
          start: teamActivitiesParams.startDate,
          end: teamActivitiesParams.endDate
        })
      );
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

  const teamActivities = useMemo<TeamActivityResponse>(() => {
    if (historyResponse?.status === 200) {
      const activityArray = historyResponse?.data?.data?.history.map((item) => ({
        action: item.action.split("-").join("_"),
        date: format(parseISO(item.time), dateFormatted),
        time: format(parseISO(item.time), "h:mma"),
        initiator: item.meta?.user?._id
          ? { name: item.initiator.full_name, id: item.initiator._id }
          : "self",
        metadata: { ...item.meta }
      }));

      const metaData = {
        currentPage: historyResponse?.data?.data?.page ?? 1,
        totalPages: historyResponse?.data?.data?.total_pages,
        totalCount: historyResponse?.data?.data?.total_count,
        pageLimit: teamActivitiesParams.limit
      };

      return { activityArray, metaData };
    }

    return initActivityData;
  }, [historyResponse, teamActivitiesParams.limit]);

  const handleViewMember = (id) => {
    navigate(Routes.member(id));
  };

  useEffect(() => {
    if (id) fetchTeamMembers();
    fetchATeam();
  }, [membersQueryParams, id]);

  useEffect(() => {
    fetchOrgActivities();
  }, [teamActivitiesParams, id]);

  return (
    <>
      <TeamUI
        handleAddMember={console.log}
        handleViewMember={handleViewMember}
        teamName={teamData.name}
        memberData={{
          loading: membersStatus.isPending,
          teamsMembersData,
          handlePagination: handleMemberPagination
        }}
        teamActivities={{
          loading: historyStatus.isPending,
          data: teamActivities,
          params: teamActivitiesParams,
          handleFilter: handleUpdateQuery
        }}
      />
    </>
  );
};

export { Team };
