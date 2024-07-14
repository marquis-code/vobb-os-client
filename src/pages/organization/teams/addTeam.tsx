import { AddTeamModal } from "components";
import { ModalProps } from "types";

const AddTeam = (props: ModalProps) => {
  return (
    <>
      <AddTeamModal submit={console.log} {...props} />
    </>
  );
};

export { AddTeam };
