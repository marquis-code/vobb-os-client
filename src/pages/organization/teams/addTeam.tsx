import { AddTeamModal } from "components";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";
import { ModalProps } from "types";

interface AddTeamProps extends ModalProps {
  callback: () => void;
}

const AddTeam = (props: AddTeamProps) => {
  const navigate = useNavigate();
  const handleSubmit = (data) => {
    console.log(data);
    navigate(Routes.team("1234"));
  };
  return (
    <>
      <AddTeamModal submit={handleSubmit} {...props} />
    </>
  );
};

export { AddTeam };
