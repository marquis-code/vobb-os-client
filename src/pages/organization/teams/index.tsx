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
import { EditTeam } from "./editTeam";

export interface teamsDataProps {
  teamsData: TeamTableData[];
  metaData: MetaDataProps;
}
export interface TeamDataProps {
  id: string;
  icon: string;
  name: string;
  description: string;
  isGeneral: boolean;
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
  const [editTeam, setEditTeam] = useState({ show: false, id: "" });
  const [permissions, setPermissions] = useState(false);
  const [branches, setBranches] = useState(false);
  const [teamId, setTeamId] = useState("");
  const [teamsQueryParams, setTeamsQueryParams] = useState({
    page: 1,
    limit: 20
  });
  const { page, limit } = teamsQueryParams;
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
  const handleViewTeam = (id: string) => navigate(Routes.team(id));
  const handleSetTeamId = (id: string) => {
    setTeamId(id);
  };

  const handleShowBranches = (id: string) => {
    setBranches(true);
    setTeamId(id);
  };
  const handleCloseBranches = () => setBranches(false);

  const fetchAllTeams = () => {
    runFetchTeams(fetchTeamsService({ page, limit }));
  };

  const teamsData = useMemo<teamsDataProps>(() => {
    if (teamsResponse?.status === 200) {
      const teamsData = teamsResponse?.data?.data?.teams.map((item) => ({
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
        date: item.createdAt.slice(0, -8),
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

  const handleEditTeam = (id: string) => setEditTeam({ show: true, id });
  const handlCloseEditTeam = () => setEditTeam({ show: false, id: "" });

  return (
    <>
      <AddTeam
        callback={handlCloseAddTeam}
        show={addTeam}
        close={() => setAddTeam(false)}
        handleSetTeamId={handleSetTeamId}
        fetchAllTeams={fetchAllTeams}
      />
      <TeamPermissions show={permissions} close={handleClosePermissions} teamId={teamId} />
      <TeamBranches show={branches} close={handleCloseBranches} teamId={teamId} />
      <EditTeam {...editTeam} close={handlCloseEditTeam} fetchAllTeams={fetchAllTeams} />
      <TeamsUI
        teams={{
          teamsData,
          handlePagination,
          loading: teamsStatus.isPending
        }}
        handleEditTeam={handleEditTeam}
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
