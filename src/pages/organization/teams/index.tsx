import { TeamsUI } from "modules";
import { useEffect, useState } from "react";
import { AddTeam } from "./addTeam";
import { TeamPermissions } from "./teamPermissions";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";
import { TeamBranches } from "./teamBranches";
import { useFetchTeams } from "hooks";
import { EditTeam } from "./editTeam";
import { useModalContext } from "context";

const Teams = () => {
  const navigate = useNavigate();
  const { addTeam, setAddTeam } = useModalContext();
  const [editTeam, setEditTeam] = useState({ show: false, id: "" });
  const [permissions, setPermissions] = useState(false);
  const [branches, setBranches] = useState(false);
  const [teamId, setTeamId] = useState("");
  const [teamsQueryParams, setTeamsQueryParams] = useState({
    page: 1,
    limit: 20
  });
  const { page, limit } = teamsQueryParams;
  const { fetchAllTeams, loadingTeams, orgTeams } = useFetchTeams({ limit });

  const handlePagination = (param: string, value: number) => {
    setTeamsQueryParams((prev) => ({ ...prev, [param]: value }));
  };
  const handleSetTeamId = (id: string) => {
    setTeamId(id);
  };

  const handlCloseAddTeam = (id) => {
    setAddTeam(false);
    handleShowPermissions();
    handleSetTeamId(id);
  };

  const handleAddTeam = () => setAddTeam(true);
  const handleShowPermissions = () => setPermissions(true);
  const handleClosePermissions = () => setPermissions(false);
  const handleViewTeam = (id: string) => navigate(Routes.team(id));

  const handleShowBranches = (id: string) => {
    setBranches(true);
    setTeamId(id);
  };
  const handleCloseBranches = () => setBranches(false);

  useEffect(() => {
    fetchAllTeams({ page, limit });
  }, [teamsQueryParams]);

  const handleEditTeam = (id: string) => setEditTeam({ show: true, id });
  const handlCloseEditTeam = () => setEditTeam({ show: false, id: "" });

  return (
    <>
      <AddTeam
        callback={(id) => {
          fetchAllTeams({ page: 1, limit });
          handlCloseAddTeam(id);
        }}
        show={addTeam}
        close={() => setAddTeam(false)}
      />
      <TeamPermissions show={permissions} close={handleClosePermissions} teamId={teamId} />
      <TeamBranches show={branches} close={handleCloseBranches} teamId={teamId} />
      <EditTeam
        {...editTeam}
        close={handlCloseEditTeam}
        callback={() => {
          fetchAllTeams({ page: 1, limit });
          handlCloseEditTeam();
        }}
      />
      <TeamsUI
        teams={{
          orgTeams,
          handlePagination,
          loading: loadingTeams
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
