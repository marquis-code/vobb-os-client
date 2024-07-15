import { TeamsUI } from "modules";
import { useState } from "react";
import { AddTeam } from "./addTeam";
import { TeamPermissions } from "./teamPermissions";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";

const Teams = () => {
  const navigate = useNavigate();
  const [addTeam, setAddTeam] = useState(false);
  const [permissions, setPermissions] = useState(false);

  const handlCloseAddTeam = () => {
    setAddTeam(false);
    handleShowPermissions();
  };
  const handleAddTeam = () => setAddTeam(true);
  const handleShowPermissions = () => setPermissions(true);
  const handleClosePermissions = () => setPermissions(false);
  const handleViewTeam = (id) => navigate(Routes.team(id));
  return (
    <>
      <AddTeam callback={handlCloseAddTeam} show={addTeam} close={handlCloseAddTeam} />
      <TeamPermissions show={permissions} close={handleClosePermissions} />
      <TeamsUI
        handleEditTeam={console.log}
        handleViewBranches={console.log}
        handleTeamHistory={console.log}
        handleViewTeam={handleViewTeam}
        handleAddTeam={handleAddTeam}
      />
    </>
  );
};

export { Teams };
export * from "./team";
