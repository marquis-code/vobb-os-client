import { TransferTeamModal } from "components";
import { ModalProps } from "types";

interface Props extends ModalProps {
  id: string;
  handleTransfer: () => void;
  type: "team" | "branch"
}

const TransferTeam: React.FC<Props> = ({ show, close, id, handleTransfer }) => {
  return (
    <>
      <TransferTeamModal show={show} close={close} submit={handleTransfer} multiple={false} />
    </>
  );
};

export { TransferTeam };
