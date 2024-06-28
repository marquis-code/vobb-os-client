import { TransferMemberModal } from "components";
import { ModalProps } from "types";

interface Props extends ModalProps {
  id: string | string[];
  handleTransfer: () => void;
  type: "member" | "branch";
}

const TransferMember: React.FC<Props> = ({ show, close, id, handleTransfer }) => {
  return (
    <>
      <TransferMemberModal show={show} close={close} submit={handleTransfer} multiple={false} />
    </>
  );
};

export { TransferMember };
