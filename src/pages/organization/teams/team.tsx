import { TeamUI } from "modules";

const Team = () => {
  return (
    <>
      <TeamUI handleAddMember={console.log} handleViewMember={console.log} />
    </>
  );
};

export { Team };
