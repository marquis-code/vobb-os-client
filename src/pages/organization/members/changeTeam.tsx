import { ChangeTeamModal } from "components";
import { ModalProps } from "types";

interface ChangeTeamProps extends ModalProps {
  name: string;
  id: string;
}

const ChangeTeam = (props: ChangeTeamProps) => {
  return <ChangeTeamModal submit={console.log} {...props} />;
};

export { ChangeTeam };
