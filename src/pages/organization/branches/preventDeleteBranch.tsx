import { PreventDeleteBranchModal } from "components";
import { ModalProps } from "types";
import { TransferTeam } from "./transferTeam";
import { useState } from "react";

interface Props extends ModalProps {
  id: string;
  name: string;
  handleDeleteBranch: () => void;
  handleOpen: () => void;
}

const PreventDeleteBranch: React.FC<Props> = ({
  show,
  close,
  id,
  name,
  handleOpen,
  handleDeleteBranch
}) => {
  const [transfer, setTransfer] = useState<{ show: boolean; teamId?: string }>({
    show: false
  });

  const handleTransfer = () => {
    transfer.teamId ? handleOpen() : handleDeleteBranch();
    setTransfer({ show: false });
  };

  return (
    <>
      <PreventDeleteBranchModal
        show={show}
        close={close}
        handleContinue={(teamId) => {
          setTransfer({ show: true, teamId });
          close();
        }}
        name={name}
      />
      <TransferTeam
        id={transfer.teamId ? transfer.teamId : id}
        handleTransfer={handleTransfer}
        close={() => {
          setTransfer({ show: false, teamId: "" });
          handleOpen();
        }}
        show={transfer.show}
        type={transfer.teamId ? "team" : "branch"}
      />
    </>
  );
};

export { PreventDeleteBranch };
