import { TeamUI } from "modules";
import { useState } from "react";
import { TeamPermissions } from "./teamPermissions";

const Team = () => {
  const [permissions, setPermissions] = useState(false);

  const handleShowPermissions = () => setPermissions(true);
  const handleClosePermissions = () => setPermissions(false);

  return (
    <>
      <TeamPermissions hideSkip show={permissions} close={handleClosePermissions} />
      <TeamUI
        handlePermissions={handleShowPermissions}
        handleAddMember={console.log}
        handleViewMember={console.log}
      />
    </>
  );
};

export { Team };
