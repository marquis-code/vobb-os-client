import { fetchTeamsService } from "api";
import { useApiRequest } from "hooks/useApiRequest";
import { useMemo } from "react";
import { PaginationProps, TeamDataProps } from "types";

const initTeamsData = {
  teamsData: [],
  metaData: {
    currentPage: 1,
    totalCount: 0,
    totalPages: 0,
    pageLimit: 0
  }
};

export const useFetchTeams = ({ limit }: { limit?: number }) => {
  const { run, data: response, error, requestStatus } = useApiRequest({});

  const fetchAllTeams = ({ page, limit }: PaginationProps) => {
    run(fetchTeamsService({ page, limit }));
  };

  const orgTeams = useMemo<TeamDataProps>(() => {
    if (response?.status === 200) {
      const teamsData = response?.data?.data?.teams.map((item) => ({
        id: item._id,
        icon: item.icon,
        name: item.name,
        teamLeads:
          Array.isArray(item?.team_leads) && item.team_leads.length > 0
            ? item.team_leads.map((lead) => lead.name)
            : [""],
        teamManagers:
          Array.isArray(item?.team_managers) && item.team_managers.length > 0
            ? item.team_managers.map((mgr) => mgr.name)
            : [""],
        date: item.createdAt,
        numberOfMembers: item.members,
        numberOfBranches: item.total_branches
      }));
      const metaData = {
        currentPage: response?.data?.data?.page ?? 1,
        totalPages: response?.data?.data?.total_pages,
        totalCount: response?.data?.data?.total_count,
        pageLimit: limit
      };
      return { teamsData, metaData };
    }
    return initTeamsData;
  }, [response, error]);

  return { orgTeams, fetchAllTeams, loadingTeams: requestStatus.isPending };
};
