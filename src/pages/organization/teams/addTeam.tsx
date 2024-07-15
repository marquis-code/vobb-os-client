import { AddTeamModal } from "components";
import { ModalProps } from "types";

interface AddTeamProps extends ModalProps {
  callback: () => void;
}

const AddTeam = (props: AddTeamProps) => {
  const handleSubmit = (data) => {
    console.log(data);
    props.callback();
  };
  return (
    <>
      <AddTeamModal submit={handleSubmit} {...props} />
    </>
  );
};

export { AddTeam };
