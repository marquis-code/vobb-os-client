import { TeamsUI } from "modules";
import { useEffect, useMemo, useState } from "react";
import { AddTeam } from "./addTeam";
import { TeamPermissions } from "./teamPermissions";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";
import { TeamBranches } from "./teamBranches";
import { useApiRequest } from "hooks";
import { fetchTeamsService } from "api";
import { MetaDataProps } from "types";
import { TeamTableData } from "components";

export interface teamsDataProps {
  teamsData: TeamTableData[];
  metaData: MetaDataProps;
}

const initTeamsData = {
  teamsData: [],
  metaData: {
    currentPage: 1,
    totalCount: 0,
    totalPages: 0,
    pageLimit: 0
  }
};

const Teams = () => {
  const navigate = useNavigate();
  const { run: runFetchTeams, data: teamsResponse, requestStatus: teamsStatus } = useApiRequest({});
  const [addTeam, setAddTeam] = useState(false);
  const [permissions, setPermissions] = useState(false);
  const [branches, setBranches] = useState(false);
  const [teamId, setTeamId] = useState("");
  const [teamsQueryParams, setTeamsQueryParams] = useState({
    page: 1,
    limit: 20
  });

  const handlePagination = (param: string, value: number) => {
    setTeamsQueryParams((prev) => ({ ...prev, [param]: value }));
  };
  const handlCloseAddTeam = () => {
    setAddTeam(false);
    handleShowPermissions();
  };
  const handleAddTeam = () => setAddTeam(true);
  const handleShowPermissions = () => setPermissions(true);
  const handleClosePermissions = () => setPermissions(false);
  const handleViewTeam = (id) => navigate(Routes.team(id));
  const handleSetTeamId = (id: string) => {
    setTeamId(id);
  };

  const handleShowBranches = (id) => {
    setBranches(true);
    setTeamId(id);
  };
  const handleCloseBranches = () => setBranches(false);

  const fetchAllTeams = () => {
    runFetchTeams(
      fetchTeamsService({ page: teamsQueryParams.page, limit: teamsQueryParams.limit })
    );
  };

  const teamsData = useMemo<teamsDataProps>(() => {
    if (teamsResponse?.status === 200) {
      const teamsData = teamsResponse?.data?.data?.teams.map((item) => ({
        id: item._id,
        icon: "FaUsers",
        name: item.name,
        teamLeads:
          Array.isArray(item?.team_leads) && item.team_leads.length > 0
            ? item.team_leads.map((lead) => lead.name)
            : ["No team leads"],
        teamManagers:
          Array.isArray(item?.team_managers) && item.team_managers.length > 0
            ? item.team_managers.map((mgr) => mgr.name)
            : ["No team managers"],
        date: item.createdAt.slice(0, 10),
        numberOfMembers: item.members,
        numberOfBranches: item.total_branches
      }));
      const metaData = {
        currentPage: teamsResponse?.data?.data?.page ?? 1,
        totalPages: teamsResponse?.data?.data?.total_pages,
        totalCount: teamsResponse?.data?.data?.total_count,
        pageLimit: teamsQueryParams.limit
      };
      return { teamsData, metaData };
    }
    return initTeamsData;
  }, [teamsResponse, teamsQueryParams]);

  useEffect(() => {
    fetchAllTeams();
  }, [teamsQueryParams]);

  return (
    <>
      <AddTeam
        callback={handlCloseAddTeam}
        show={addTeam}
        close={handlCloseAddTeam}
        handleSetTeamId={handleSetTeamId}
        fetchAllTeams={fetchAllTeams}
      />
      <TeamPermissions show={permissions} close={handleClosePermissions} teamId={teamId} />
      <TeamBranches show={branches} close={handleCloseBranches} teamId={teamId} />
      <TeamsUI
        teams={{
          teamsData,
          handlePagination,
          loading: teamsStatus.isPending
        }}
        handleEditTeam={console.log}
        handleViewBranches={handleShowBranches}
        handleTeamHistory={console.log}
        handleViewTeam={handleViewTeam}
        handleAddTeam={handleAddTeam}
      />
    </>
  );
};

export { Teams };
export * from "./team";
