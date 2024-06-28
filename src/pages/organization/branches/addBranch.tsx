import { AddBranchModal } from "components";
import { ModalProps } from "types";

const AddBranch: React.FC<ModalProps> = ({ show, close }) => {
  return (
    <>
      <AddBranchModal
        show={show}
        close={close}
        submit={console.log}
      />
    </>
  );
};

export { AddBranch };
