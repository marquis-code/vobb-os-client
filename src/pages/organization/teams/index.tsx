import { TeamsUI } from "modules";
import { useState } from "react";
import { AddTeam } from "./addTeam";

const Teams = () => {
  const [addTeam, setAddTeam] = useState(false);

  const handlCloseAddTeam = () => setAddTeam(false);
  const handleAddTeam = () => setAddTeam(true);
  return (
    <>
      <AddTeam show={addTeam} close={handlCloseAddTeam} />
      <TeamsUI
        handleEditTeam={console.log}
        handleViewBranches={console.log}
        handleTeamHistory={console.log}
        handleViewTeam={console.log}
        handleAddTeam={handleAddTeam}
      />
    </>
  );
};

export { Teams };
