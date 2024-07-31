import { TeamUI } from "modules";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";

const Team = () => {
  const navigate = useNavigate();

  const handleViewMember = (id) => {
    navigate(Routes.member(id));
  };
  
  return (
    <>
      <TeamUI handleAddMember={console.log} handleViewMember={handleViewMember} />
    </>
  );
};

export { Team };
