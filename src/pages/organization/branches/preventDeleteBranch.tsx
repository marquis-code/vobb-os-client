import { PreventDeleteBranchModal } from "components";
import { ModalProps } from "types";
import { TransferMember } from "./transferMember";
import { useEffect, useState } from "react";

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
  const [transfer, setTransfer] = useState<{ show: boolean; memberIds?: string[] }>({
    show: false
  });

  const handleTransfer = () => {
    transfer.memberIds ? handleOpen() : handleDeleteBranch();
    setTransfer({ show: false });
  };

  return (
    <>
      <PreventDeleteBranchModal
        show={show}
        close={close}
        handleContinue={(_, memberIds) => {
          setTransfer({ show: true, memberIds });
          close();
        }}
        name={name}
      />
      <TransferMember
        id={transfer.memberIds ? transfer.memberIds : id}
        handleTransfer={handleTransfer}
        close={() => {
          setTransfer({ show: false, memberIds: [] });
          handleOpen();
        }}
        show={transfer.show}
        type={transfer.memberIds ? "member" : "branch"}
      />
    </>
  );
};

export { PreventDeleteBranch };
