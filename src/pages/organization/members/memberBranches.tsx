import { MemberBranchesModal } from "components";
import { useState } from "react";
import { ModalProps } from "types";
import { RemoveMemberBranch } from "./removeMemberBranch";

interface MemberBranchesProps extends ModalProps {
  name: string;
  handleAddBranch: () => void;
}

const MemberBranches = (props: MemberBranchesProps) => {
  const [confirm, setConfirm] = useState({ show: false, id: "", branch: "" });

  const confirmRemoval = ({ id, name }) => {
    setConfirm({ show: true, id, branch: name });
    props.close();
  };

  const closeConfirmRemoval = () => {
    setConfirm({ show: false, id: "", branch: "" });
  };

  return (
    <>
      <RemoveMemberBranch
        id={confirm.id}
        branch={confirm.branch}
        name={props.name}
        close={closeConfirmRemoval}
        show={confirm.show}
      />
      <MemberBranchesModal handleRemoveBranch={confirmRemoval} {...props} />;
    </>
  );
};

export { MemberBranches };
