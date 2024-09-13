import { TeamsUI } from "modules";
import { useState } from "react";
import { AddTeam } from "./addTeam";
import { TeamPermissions } from "./teamPermissions";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";
import { TeamBranches } from "./teamBranches";
import { EditTeam } from "./editTeam";
import { useModalContext } from "context";

const Teams = () => {
  const navigate = useNavigate();
  const { addTeam, setAddTeam } = useModalContext();
  const [editTeam, setEditTeam] = useState({ show: false, id: "" });
  const [permissions, setPermissions] = useState(false);
  const [branches, setBranches] = useState(false);

  const handleAddTeam = () => setAddTeam(true);
  const handlCloseAddTeam = () => {
    setAddTeam(false);
  };
  const handleShowPermissions = () => setPermissions(true);
  const handleClosePermissions = () => setPermissions(false);
  const handleViewTeam = (id) => navigate(Routes.team(id));

  const handleShowBranches = (id) => setBranches(true);
  const handleCloseBranches = () => setBranches(false);

  const handleEditTeam = (id) => setEditTeam({ show: true, id });
  const handlCloseEditTeam = () => setEditTeam({ show: false, id: "" });

  return (
    <>
      <AddTeam callback={handlCloseAddTeam} show={addTeam} close={handlCloseAddTeam} />
      <EditTeam callback={handlCloseAddTeam} {...editTeam} close={handlCloseEditTeam} />
      <TeamBranches show={branches} close={handleCloseBranches} />
      <TeamsUI
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
