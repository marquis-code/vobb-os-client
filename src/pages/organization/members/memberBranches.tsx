import { MemberBranchesModal } from "components";
import { useState } from "react";
import { ModalProps } from "types";
import { RemoveMemberBranch } from "./removeMemberBranch";
import { MemberBranchesDataProps } from "./member";

interface MemberBranchesProps extends ModalProps {
  id: string;
  name: string;
  handleAddBranch: () => void;
  memberBranches: {
    data: MemberBranchesDataProps;
    handlePagination: (page: number) => void;
    loading: boolean;
    callback: () => void;
  };
}

const MemberBranches = (props: MemberBranchesProps) => {
  const { data: memberBranches, handlePagination, loading, callback } = props.memberBranches;
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
        fetchMemberBranches={callback}
      />
      <MemberBranchesModal
        handleRemoveBranch={confirmRemoval}
        {...props}
        handleViewBranches={{
          memberBranches,
          loading,
          handlePagination
        }}
      />
    </>
  );
};

export { MemberBranches };
