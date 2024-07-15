import { TeamsUI } from "modules";
import { useState } from "react";
import { AddTeam } from "./addTeam";
import { TeamPermissions } from "./teamPermissions";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";
import { TeamBranches } from "./teamBranches";

const Teams = () => {
  const navigate = useNavigate();
  const [addTeam, setAddTeam] = useState(false);
  const [permissions, setPermissions] = useState(false);
  const [branches, setBranches] = useState(false);

  const handlCloseAddTeam = () => {
    setAddTeam(false);
    handleShowPermissions();
  };
  const handleAddTeam = () => setAddTeam(true);
  const handleShowPermissions = () => setPermissions(true);
  const handleClosePermissions = () => setPermissions(false);
  const handleViewTeam = (id) => navigate(Routes.team(id));

  const handleShowBranches = (id) => setBranches(true);
  const handleCloseBranches = () => setBranches(false);

  return (
    <>
      <AddTeam callback={handlCloseAddTeam} show={addTeam} close={handlCloseAddTeam} />
      <TeamPermissions show={permissions} close={handleClosePermissions} />
      <TeamBranches show={branches} close={handleCloseBranches} />
      <TeamsUI
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
